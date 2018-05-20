import PromoService from "./promoservices";
import LoginService from "../login/loginservices";

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('promo', {
    url: '/promo',
    template: require('./promo.html'),
    controller:'PromoCtrl',
    controllerAs:'vm'
  })
  .state('promoDetail', {
        url: '/promo/:code',
        template: require('./promoDetail.html'),
        controller:'PromoDetailCtrl',
        controllerAs:'vm',
        // resolve:{
        //     promoDetail: ['$stateParams','PromoService', 'LoginService', function ($stateParams, PromoService, LoginService) {
        //         let memId = LoginService.getMemberId();
        //         memId = 'abc';
        //         return PromoService.getPromoDetail($stateParams.code, memId)
        //             .then(function(resp){
        //                 return resp;
        //             })
        //             .catch(function(err){
        //                 return err;
        //             });
        //     }]
        // }
  })
  .state('promoDetail.purchase', {
      url: '/purchase/',
      template: require('./promoPurchase.html'),
      controller:'PromoPurchaseGiftCtrl',
      controllerAs:'vm'
  })
  .state('promoDetail.gift', {
      url: '/gift/',
      template: require('./promoGift.html'),
      controller:'PromoPurchaseGiftCtrl',
      controllerAs:'vm'
  })
}