angular
.module('app')
.controller('loginController', loginController);
loginController.$inject = ['$scope','$http','$window'];
 function loginController ($scope,$http,$window) {
   $scope.userName = "";
   $scope.passWord = "";
   $scope.msj = "";
   $scope.tries = 0 ;
   if(sessionStorage.user && sessionStorage.priv){
       $window.location.href = '/#!/home';
   }
   $scope.log = function(userName, passWord) {
        var Url = "http://myconcertv2.cloudapp.net/UserService.svc/login/"+userName+"/"+passWord;
        $http({
          method: 'GET',
          url: Url
        }).then (
          function (data) {
            $scope.response = JSON.parse(data.data.loginResult);
            switch ($scope.response.id) {
              case 103:
                sessionStorage.user = $scope.userName;
                sessionStorage.priv = "admin";
                $scope.userName = "";
                $scope.passWord = "";
                $scope.msj = "";
                $window.location.href = '/#!/home';
                break;
              case 104:
                sessionStorage.user = $scope.userName;
                sessionStorage.priv = "fan";
                $scope.userName = "";
                $scope.passWord = "";
                $scope.msj = "";
                $window.location.href = '/#!/home';
                break;
              case 105:
                $scope.msj = "El usuario ya está activo, cierre sesión en el otro dispositivo.";
                alert($scope.msj);
                break;
              case 106:
                $scope.msj = "El usuario y contraseña no coinciden.";
                alert($scope.msj);
                break;
              default:

            }
          },
          function (error){
            console.error(data);
          }
        );
        $scope.tries += 1;
    };
};
