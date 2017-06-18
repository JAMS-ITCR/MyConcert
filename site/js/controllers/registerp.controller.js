angular
.module('app')
.controller('registerpController', registerpController);
registerpController.$inject = ['$scope','$http','$window', '$mdDialog'];
 function registerpController ($scope,$http,$window,$mdDialog) {
   $scope.user = {
       nameUser:'',
       surname1User:'',
       surname2User:'',
       mailUser:'',
       nicknameUser:'',
       passUser:'',
       roleUser:0,
       birthdateUser:'',
       countryUser:0,
       addressUser:'',
       collegeUser:'',
       phoneUser:'',
       photoUser:'',
       descriptionUser:''
     };
   $scope.genres=[];
   $scope.repass = '';
   $scope.validPass = false;
   $scope.msj = "";
   if(sessionStorage.user && sessionStorage.priv){
       $window.location.href = '/#!/home';
   }
   $scope.register = function(user) {
     $http({
        method: 'POST',
        url: 'http://myconcertv2.cloudapp.net/UserService.svc/user',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charse=UTF-8'
        },
       params : user
     }).then(
      function (data){
        var response = angular.fromJson(data.data.createUserResult);
        switch (response.id) {
          case 100:
            sessionStorage.user=user.nicknameUser;
            sessionStorage.priv=user.roleUser==1 ? "admin" : "fan";
            $scope.msj = "";
            $scope.postGenres();
            $window.location.href = '/#!/home';
            break;
          default:
            $scope.msj =response.info;
        }
      },
      function (error){
        console.error("CREATE USER",error);
        $scope.msj = response.info;
      }
    );
    };
    $scope.isValidData = function(user) {
      if(user.roleUser==1){
        if(user.nameUser && user.surname1User && user.surname2User
          && user.nicknameUser && user.mailUser && user.passUser &&
           user.passUser == $scope.repass){
          return true;
        }
        else{
          return false;
        }
      }else{
        if(user.nameUser && user.surname1User && user.surname2User
          && user.nicknameUser && user.mailUser && user.passUser && 
          user.passUser == $scope.repass && user.countryUser 
          && user.phoneUser && user.birthdateUser && $scope.genres.length >= 5){
          return true;
        }else{
          return false;
        }
      }
    };
    $scope.addGenre = function(ev) {
      $mdDialog.show({
        controller: dialogGenreController,
        templateUrl: '../../views/pages/dialogGenres.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(selection) {
        $scope.genres =  selection;
      },
      function (error){
        console.error(error);
      });
    };
    $scope.removeGenre = function(data) {
       var index=$scope.genres.indexOf(data);
       $scope.genres.splice(index, 1);
    };
    $scope.postGenres = function() {
      var param = {nusuario:$scope.user.nicknameUser}
      var id=0;
      $http({
          method: 'GET',
          url: 'http://myconcertv2.cloudapp.net/UserService.svc/user/nuser',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charse=UTF-8'
          },
         params : param
       }).then (
        function (data) {
          id= angular.fromJson(data.data.getIdByNombreUsuarioResult).value;
          console.log("reps", $scope.genres);
          for(var i=0; i < $scope.genres.length; i++){
            var genreJson = {
                          idusuario : id, 
                          idgenero :  $scope.genres[i].IdGenero
                        };
            console.log("scope json", $scope.genres[i]);
            console.log("json" , genreJson);
            console.log("iterator", i);
            $scope.postGenresAux(genreJson);
          }
        },
        function (error){
          console.error(error);
        }
      );
    };
    $scope.postGenresAux = function(param){
       $http({
         method: 'POST',
         url: 'http://myconcertv2.cloudapp.net/UserService.svc/fan/gender',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded; charse=UTF-8'
         },
        params : param
      }).then(
       function (data){
         console.log(data);
         var response = angular.fromJson(data.data.asignarGeneroFanaticoResult);
         switch (response.id) {
           case 100:
             $scope.msj = "";
             break;
           default:
             $scope.msj =response.info;
             console.log(response);
         }
       },
       function (error){
         console.error("AddGenre",error);
         $scope.msj = response.info;
       });
    };
    getcountries = function() {
      var Url = "http://myconcertv2.cloudapp.net/CountriesService.svc/countries";
      $http({
        method: 'GET',
        url: Url
      }).then (
        function (data) {
          $scope.countries = angular.fromJson(data.data.getCountriesResult);
        },
        function (error){
          console.error(error);
        }
      );
    };
    getcountries();
};
function dialogGenreController($scope, $http, $mdDialog) {
     $scope.selection = [];
     var Url = "http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/genders";
     $http({
       method: 'GET',
       url: Url
     }).then (
       function (data) {
         $scope.allGenres = angular.fromJson(data.data.getGendersResult);
       },
       function (error){
         console.error(error);
       }
     );
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.accept = function(selection) {
    $mdDialog.hide($scope.selection);
    return $scope.selection;
  };
  $scope.toggleSelection =function(data){
    //console.log('my seletion',data);
    var index=$scope.selection.indexOf(data);
    if(index==-1){
      $scope.selection.push(data);
    }
    else{
      $scope.selection.splice(index, 1);
    }
  }
};
