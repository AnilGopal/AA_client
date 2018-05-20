export default class PromoService {
  constructor($http, $q) {
    var vm = this;
    this.$http = $http;
    this.defer = $q.defer();
    this.getPromosList = ()=>{
        vm.$http.get('http://localhost:5001/promo/all/')
            .then(function(res){
                if(res.data.status){
                    vm.defer.resolve(res.data.data);
                }
            })
            .catch(function(err){
                vm.defer.reject(err);
            });
        return vm.defer.promise;
      };
    this.getPromoDetail = function(promoId,memId){
        memId = 'abc';
        let data = {
              "pcode": "PROMO123",
              "mem": 'memId'
          };
          vm.$http.post('http://localhost:5001/promo/detail/',data)
              .then(function(res){
                  vm.defer.resolve(res);
              })
              .catch(function(err){
                  vm.defer.reject(err);
              });
          return vm.defer.promise;
      };
    this.buyPromo = function(promoId, memId){
        let data = {
            "pcode": promoId,
            "mem": memId
        };
        vm.$http.post('http://localhost:5001/promo/buy/',data)
            .then(function(res){
                vm.defer.resolve(res);
            })
            .catch(function(err){
                vm.defer.reject(err);
            });
        return vm.defer.promise;
      };
      this.giftPromo = (promoId, memberId, toMemberId) =>{
          let data = {
              "pcode": promoId,
              "mem": memberId,
              "memto": toMemberId
          };
          vm.$http.post('http://localhost:5001/promo/gift/',data)
              .then(function(res){
                  vm.defer.resolve(res);
              })
              .catch(function(err){
                  vm.defer.reject(err);
              });
          return vm.defer.promise;
      }
  }



  // getPromoDetail(promoId, memberId){
  //   return {
  //       "id": 0,
  //       "title": "1000 Offer",
  //       "description": "This is 1000 Offer for air asia",
  //       "amount": "1000",
  //       "code": "BIG SAVE 101",
  //       "qty": 1,
  //   }
  // }

    // buyPromo(promoId, memberId){
    //     return {
    //         status:true,
    //         qty:3
    //     }
    // }
    // giftPromo(promoId, memberId, toMemberId){
    //     return {
    //         status:true,
    //         qty:0
    //     }
    // }
}