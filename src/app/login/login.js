import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './login.routes.js'
import LoginService from './loginservices.js'



class LoginCtrl {
  constructor($state,LoginService, $scope) {
    let vm  = this;
    vm.loginbutton = async function(event) {
        let res = await LoginService.loginUser(vm.usr, vm.pwd);
        console.log(JSON.stringify(res));
        if (res.data.status) {
            $("body").removeClass("modal-open");
            $("#myModal").modal('hide');
            $(".modal-backdrop").hide();
            $scope.$emit('loginSuccess', {name: vm.usr});
            $state.go('promo');
        }
        else {
            alert(res.data.msg);
        }
    }
  }
}

let bannerText = () => {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            flyTo: '@',
            amount: '@',
        },
        template: require('./bannerText.html'),
        link: link,
    };
    function link(scope, element, attrb) {

    }
};

export default angular.module('promoapp.login', [uirouter])
    .controller('LoginCtrl', LoginCtrl)
    .service('LoginService', LoginService)
    .directive('bannerText', bannerText)
    .config(routes)