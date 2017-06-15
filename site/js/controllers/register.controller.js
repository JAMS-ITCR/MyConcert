angular
.module('app')
.controller('registerController', registerController);
registerController.$inject = ['$scope','$http','$window'];
 function registerController ($scope,$http,$window) {
   $scope.userName = "";
   $scope.pass= "";
   $scope.repass= "";
   if(!JSON.parse(sessionStorage.user) || !JSON.parse(sessionStorage.priv)){
     $window.location.href = '/#!/login';
   }
   $scope.log = function(userName, passWord) {
        var Url = "http://myconcertv2.cloudapp.net/UserService.svc/login/"+userName+"/"+passWord;
        $http({
          method: 'GET',
          url: Url
        }).then (
          function (data) {
            sessionStorage.user = JSON.stringify($scope.userName);
            switch (data.data.loginResult) {
              case 103:
                sessionStorage.priv = JSON.stringify("admin");
                $window.location.href = '/#!/home';
                break;
              case 104:
                sessionStorage.priv = JSON.stringify("fan");
                $window.location.href = '/#!/home';
                break;
              case 105:
                sessionStorage.user = JSON.stringify("");
                $scope.msj = "El usuario ya está activo, cierre sesión en el otro dispositivo.";
                break;
              case 106:
                sessionStorage.user = JSON.stringify("");
                $scope.msj = "El usuario y contraseña no coinciden.";
                break;
              default:

            }
          },
          function (error){
            console.error(data);
          }

        );
        $scope.count += 1;
    };
};
