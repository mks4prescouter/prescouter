var appModule = angular.module('newJob', [
    'appModule.user',
    'ui.router',
    'services.constants',
    'flash',
    'firebase'
]);

appModule.factory('myHttpInterceptor', function ($q, $window) {
    return function (promise) {
        return promise.then(function (response) {
            $("#spinner").hide();
            return response;
        }, function (response) {
            $("#spinner").hide();
            return $q.reject(response);
        });
    };
});

appModule.factory(
        "confirm",
        function ($q, $window) {
            // Define promise-based confirm() method.
            function confirm(message) {
                var defer = $q.defer();
                // The native confirm will return a boolean.
                if ($window.confirm(message)) {
                    defer.resolve(true);
                } else {
                    defer.reject(false);
                }
                return(defer.promise);
            }
            return(confirm);
        }
);

appModule.config(function myAppConfig($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/userList');

    /*$httpProvider.responseInterceptors.push('myHttpInterceptor');
    var spinnerFunction = function spinnerFunction(data, headersGetter) {
        $("#spinner").show();
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);*/
});

appModule.factory("User", ["$firebaseObject","CONSTANT",
  function($firebaseObject,CONSTANT) {
    return function(index) {
      var url=CONSTANT.firebaseURL;
      // create a reference to the database where we will store our data
      var ref = new Firebase(url);
      var usersRef = ref.child('users');
      if(index!=""){
          usersRef=usersRef.child(index);
      }
      // return it as a synchronized object
      return $firebaseObject(usersRef);
    }
  }
]);

appModule.controller('AppCtrl', function AppCtrl($scope, $location, CONSTANT, $filter) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | ' + CONSTANT.appName;
        }
    });

    $scope.isEmpty = function (value) {
        if (angular.isUndefined(value) || value === null || value === "") {
            return true;
        }
        return false;
    };

    $scope.indexOfKey = function (array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] == value) {
                return i;
            }
        }
    };

    $scope.redirect=function(url){
     $location.path(url);
    };
});

appModule.directive('footer', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/src/assets/footer.html",
        controller: ['$scope', 'CONSTANT', function ($scope, CONSTANT) {
                $scope.CONSTANT = CONSTANT;
        }],
        link: function (scope, el, attrs) {}
    }
});

appModule.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/pdf/test/src/assets/header.html",
        link: function (scope, element, attrs) {

        },
        controller: ['$scope', '$location', 'CONSTANT', function ($scope, $location, CONSTANT) {
                $scope.CONSTANT = CONSTANT;
                $scope.path = $location.path();
                $scope.setActiveMenu = function ($path)
                {
                    $cPath = $location.path();
                    if ($cPath.slice(0,8) == $path)
                        return true;
                    else if ($cPath.slice(0,10) == $path)
                        return true;
                    else if ($cPath.slice(0,9) == $path)
                        return true;
                };
                $scope.redirect=function(url){
                 $location.path(url);
                };
            }],
    }
});

