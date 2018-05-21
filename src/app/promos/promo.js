import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './promo.routes.js'
import PromoService from './promoservices.js'
import LoginService from '../login/loginservices'


class PromoCtrl {
    constructor($state,PromoService) {
        let vm = this;

        vm.getPromolist = ()=>{
            PromoService.getPromosList()
            .then((res)=>{
                vm.promoList = res;
            })
            .catch((err)=>{
                console.log(err);
            })

        };
        vm.getPromolist();
    }
}

class PromoDetailCtrl {
    constructor($state, $scope, PromoService, $stateParams, LoginService) {
        let vm = this;
        vm.memId = LoginService.getMemberId();
        // let memId = 'abc';
        vm.promoDetail = {};
        vm.getPromoDetail = ()=>{
            PromoService.getPromoDetail($stateParams.id, vm.memId)
                .then((resp)=>{
                    if (resp.data.status) {
                        delete resp.data.status;
                        vm.promoDetail = resp.data;
                    }
                })
                .catch((err)=>{
                    console.log('Couldnt fetch Promo detail');
                })
        };
        $scope.$on('qtyChanged', function(event, data) {
            vm.promoDetail.qty = data;
        });
        vm.getPromoDetail();
    }
}


class PromoPurchaseGiftCtrl {
    constructor($state, $scope, PromoService, $stateParams, LoginService) {
        let vm = this;
        vm.memId = LoginService.getMemberId();
        vm.promoDetail = {};
        vm.getPromoDetail = ()=>{
            PromoService.getPromoDetail($stateParams.id, vm.memId)
            .then((resp)=>{
                if(resp.data.status){
                    delete resp.data.status;
                    vm.promoDetail = resp.data;
                }
            });
        };
        vm.getPromoDetail();
        vm.statusMsg;
        vm.buyPromo = ()=>{
            PromoService.buyPromo(vm.promoDetail.code, vm.memId)
                .then((res)=>{
                    if(res.data.status){
                        vm.promoDetail.qty = res.data.qty;
                        $scope.$emit('qtyChanged', res.data.qty);
                        vm.statusMsg = "Purchase successful. You can now send the voucher to another user with single click";
                        vm.purchaseSuccess = true;
                    }
                    else{
                        vm.statusMsg = "Error during purchase. Please try again"
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        };
        vm.giftPromo = ()=>{
            PromoService.giftPromo(vm.promoDetail.code, vm.memId, vm.sendTo)
                .then((res)=>{
                    if(res.data.status){
                        vm.promoDetail.qty = res.data.qty;
                        $scope.$emit('qtyChanged', res.data.qty);
                        vm.statusMsg = "Transfer successful. ";
                        vm.transferSuccess = true;
                    }
                    else{
                        res.err_msg = "Member not found";
                        vm.statusMsg = res.err_msg;
                    }
                })
                .catch((err)=>{
                    console.log(err);
                });
        };
    }
}


export default angular.module('promoapp.promo', [uirouter])
    .controller('PromoCtrl', PromoCtrl)
    .controller('PromoDetailCtrl', PromoDetailCtrl)
    .controller('PromoPurchaseGiftCtrl', PromoPurchaseGiftCtrl)
    .service('PromoService', PromoService).config(routes)