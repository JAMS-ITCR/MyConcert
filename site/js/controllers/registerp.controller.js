angular
.module('app')
.controller('registerpController', registerpController);
registerpController.$inject = ['$scope','$http','$window'];
 function registerpController ($scope,$http,$window) {
/*   $scope.user.userName = "";
   $scope.user.name = "";
   $scope.user.surname1 = "";
   $scope.user.surname2 = "";
   $scope.user.mail = "";
   $scope.user.pass= "";
   $scope.user.repass= "";
   $scope.user.rol = "";
   $scope.user.birthdatte = "";
   $scope.user.country = "";
   $scope.user.address = "";
   $scope.user.college = "";
   $scope.user.phone = "";
   $scope.user.description = "";
   $scope.validPass = false;
   $scope.msj = "";
   $scope.register = function(userName, passWord, nameUser, surname1User, surname2User,
   mailUser, passUser, roleUser, birthdateUser, countryUser, addressUser, collegeUser,
   phoneUser, photoUser, descriptionUser) {
        if (passUser!=$scope.repass){

        }
        var Url = "http://myconcertv2.cloudapp.net/UserService.svc/logout/"+userName+"?"+
        "nameUser="+nameUser+"&"+
        "surname1User="+surname1User+"&"+
        "surname2User="+surname2User+"&"+
        "mailUser="+mailUser+"&"+
        "nicknameUser="+nicknameUser+"&"+
        "passUser="+passUser +"&"+
        "roleUser="+roleUser+"&"+
        "birthdateUser="+birthdateUser+"&"+
        "countryUser="+countryUser+"&"+
        "addressUser="+addressUser+"&"+
        "collegeUser="+collegeUser+"&"+
        "phoneUser="+phoneUser+"&"+
        "photoUser="+photoUser+"&"+
        +"descriptionUser="+descriptionUser;
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
    if(sessionStorage.length < 2|| !JSON.parse(sessionStorage.user) || !JSON.parse(sessionStorage.priv)){
      $window.location.href = '/#!/login';
    }*/
};
