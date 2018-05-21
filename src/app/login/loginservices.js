export default class LoginService {
  constructor($http, $q) {
    let vm = this;
    vm.$http = $http;
    vm.memberId = '';
    vm.defer = $q.defer();
    vm.loginUser = (username,password)=>{
      let data = {
          "user": username,
          "password": password
      };
      vm.$http.post('http://localhost:5001/member/login/',data)
          .then(function(res){
              vm.memberId = username;
              vm.defer.resolve(res);
          })
          .catch(function(err){
              vm.defer.reject(err);
          });
      return vm.defer.promise;
      };
    vm.getMemberId = ()=>{
      return vm.memberId
    }
  }

}