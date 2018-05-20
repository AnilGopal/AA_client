import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './promo.routes.js'
import PromoService from './promoservices.js'
import LoginService from '../login/loginservices'


class PromoCtrl {
    constructor($state,PromoService) {
        let vm = this;

        vm.getPromolist = function(){
            PromoService.getPromosList()
            .then(function(res){
                vm.promoList = res;
            })
            .catch(function(err){
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
        let memId = 'abc';
        vm.promoDetail = {};
        vm.getPromoDetail = function() {
            PromoService.getPromoDetail($stateParams.id, memId)
                .then(function (resp) {
                    if (resp.data.status) {
                        delete resp.data.status;
                        vm.promoDetail = resp.data;
                    }
                });
        }
        $scope.$on('qtyChanged', function(event, data) {
            vm.promoDetail.qty = data;
        });
        vm.getPromoDetail();
    }
}


class PromoPurchaseGiftCtrl {
    constructor($state, $scope, PromoService, $stateParams, LoginService) {
        let vm = this;
        vm.memId = 'abc';
        let memId = 'abc';
        // vm.promoDetail = {};
        // vm.getPromoDetail = function(){
        //     PromoService.getPromoDetail($stateParams.id, memId)
        //     .then(function(resp){
        //         if(resp.data.status){
        //             delete resp.data.status;
        //             vm.promoDetail = resp.data;
        //         }
        //     });
        // };
        // vm.getPromoDetail();
        // vm.memId = LoginService.getMemberId();
        vm.statusMsg;
        vm.buyPromo = function(){
            let res = PromoService.buyPromo(vm.promoDetail.id, memId);
            console.log(res);
            if(res.status){
                vm.promoDetail.qty = res.qty;
                vm.statusMsg = "Purchase successful. You can now send the voucher to another user with single click";
                vm.purchaseSuccess = true
            }
            else{
                vm.statusMsg = "Error during purchase. Please try again"
            }
        };
        vm.giftPromo = ()=>{
            let res = PromoService.giftPromo(vm.promoDetail.id, vm.memId, vm.sendTo);
            console.log(res);
            if(res.status){
                vm.promoDetail.qty = res.qty;
                $scope.$emit('qtyChanged', res.qty);
                vm.statusMsg = "Transfer successful. ";
                vm.transferSuccess = true
            }
            else{
                res.err_msg = "Member not found";
                vm.statusMsg = res.err_msg;
            }
        };
    }
}


export default angular.module('promoapp.promo', [uirouter])
    .controller('PromoCtrl', PromoCtrl)
    .controller('PromoDetailCtrl', PromoDetailCtrl)
    .controller('PromoPurchaseGiftCtrl', PromoPurchaseGiftCtrl)
    .service('PromoService', PromoService).config(routes)