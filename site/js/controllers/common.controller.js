angular
.module('app')
.controller('commonController', commonController);
commonController.$inject = ['$scope','$http','$window'];
 function commonController ($scope,$http,$window) {
   if(!sessionStorage.user || !sessionStorage.priv){
     sessionStorage.user = "";
     sessionStorage.priv = "";
     $window.location.href = '/#!/login';
   }
   $scope.logout = function() {
     var Url = "http://myconcertv2.cloudapp.net/UserService.svc/logout/"+sessionStorage.user;
     $http({
       method: 'GET',
       url: Url
     }).then (
       function (data) {;
         $scope.response = JSON.parse(data.data.logoutResult);
         switch ($scope.response.id) {
           case 100:
             sessionStorage.user = "";
             sessionStorage.priv = "";
             $scope.msj = "";
             $window.location.href = '/#!/login';
             break;
           case 101:
             sessionStorage.user = "";
             sessionStorage.priv = "";
             $scope.msj = "";
             $window.location.href = '/#!/login';
             break;
           case 102:
             $scope.msj = "El usuario no existe.";
             sessionStorage.user = "";
             sessionStorage.priv = "";
             alert($scope.msj);
             $scope.msj = "";
        //     $window.location.href = '/#!/login';
             break;
           default:
         }
       },
       function (error){
         console.error(data);
       }
     );
   };
};
