var userModule = angular.module('appModule.user', [
    'ui.router',
    'ui.bootstrap',
    'services.constants'
]);

userModule.config(function config($stateProvider, CONSTANT) {
    $stateProvider.state('userList', {
        url: '/userList',
        views: {
            "main": {
                controller: 'UserController',
                templateUrl: CONSTANT.templateURL + 'user/userList.tpl.html'
            }
        },
        data: {pageTitle: 'User List'}
    });

    $stateProvider.state('userDetails', {
        url: '/userDetails/:index',
        views: {
            "main": {
                controller: 'UserController',
                templateUrl: CONSTANT.templateURL + 'user/userDetails.tpl.html'
            }
        },
        data: {pageTitle: 'User Details'}
    });

    $stateProvider.state('userEdit', {
        url: '/userEdit/:index',
        views: {
            "main": {
                controller: 'UserController',
                templateUrl: CONSTANT.templateURL + 'user/userEdit.tpl.html'
            }
        },
        data: {pageTitle: 'User Edit'}
    });
});

userModule.controller('UserController', [
    '$scope', '$interval', '$location', '$timeout', 'Flash', 'CONSTANT','$stateParams','User',
    function UserController($scope, $interval, $location, $timeout, Flash, CONSTANT,$stateParams,User) {
      $scope.constant=CONSTANT;
      $scope.index='';
      if(angular.isDefined($stateParams) && angular.isDefined($stateParams.index)){
              $scope.index=$stateParams.index;
      }

      $scope.userData=User($scope.index);

      $scope.showDetails=function(index){
        $location.path("/userDetails/"+index);
      };

      $scope.editUser=function(index){
        $location.path("/userEdit/"+index);
      }

      $scope.saveProfile = function() {
        $scope.userData.$save().then(function() {
          alert('Profile saved!');
        }).catch(function(error) {
          alert('Error!');
        });
      };

    }]);

