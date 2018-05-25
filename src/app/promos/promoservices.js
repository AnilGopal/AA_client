export default class PromoService {
  constructor($http, $q) {
    var vm = this;
    this.$http = $http;
    // this.defer = $q.defer();
    this.getPromosList = ()=>{
        let defer = $q.defer();
        vm.$http.get('http://localhost:5001/promo/all/')
            .then(function(res){
                if(res.data.status){
                    defer.resolve(res.data.data);
                }
            })
            .catch(function(err){
                defer.reject(err);
            });
        return defer.promise;
      };
    this.getPromoDetail = function(promoId,memId){
        let defer = $q.defer();
        let data = {
              "pcode": promoId,
              "mem": memId
          };

          vm.$http.post('http://localhost:5001/promo/detail/',data)
              .then(function(res){
                  defer.resolve(res);
              })
              .catch(function(err){
                  defer.reject(err);
              });
          return defer.promise;
      };
    this.buyPromo = function(promoId, memId){
        let defer = $q.defer();
        let data = {
            "pcode": promoId,
            "mem": memId
        };
        vm.$http.post('http://localhost:5001/promo/buy/',data)
            .then(function(res){
                defer.resolve(res);
            })
            .catch(function(err){
                defer.reject(err);
            });
        return defer.promise;
      };
      this.giftPromo = (promoId, memberId, toMemberId) =>{
          let defer = $q.defer();
          let data = {
              "pcode": promoId,
              "mem": memberId,
              "memto": toMemberId
          };
          vm.$http.post('http://localhost:5001/promo/gift/',data)
              .then(function(res){
                  defer.resolve(res);
              })
              .catch(function(err){
                  defer.reject(err);
              });
          return defer.promise;
      }
  }
}