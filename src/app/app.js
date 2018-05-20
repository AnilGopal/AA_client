import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './app.routes'

import login from  './login/login.js'
import promo from  './promos/promo.js'





import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor($state, $scope) {
    let ctr = this;
    ctr.state = $state;
    ctr.loggedIn = false;
    $scope.$on('loginSuccess', function(event, data) {
        ctr.loggedIn = true;
        ctr.userName = data.name;
    });
    ctr.clickme = function(event){
        ctr.state.go('login');
    }
  }

}

const MODULE_NAME = 'promoapp';




angular.module(MODULE_NAME, [uirouter,'promoapp.login','promoapp.promo']).directive('app', app).controller('AppCtrl', AppCtrl).config(routes)

export default MODULE_NAME;