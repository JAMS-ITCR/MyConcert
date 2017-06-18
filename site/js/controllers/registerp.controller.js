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
   $scope.repass = '';
   $scope.validPass = false;
   $scope.msj = "";
   if(sessionStorage.user && sessionStorage.priv){
       $window.location.href = '/#!/home';
   }
   $scope.register = function(user) {
     console.log(user);
     $http({
        method: 'POST',
        url: 'http://myconcertv2.cloudapp.net/UserService.svc/user',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charse=UTF-8'
        },
       params : user
     }).then(
      function (data){
        console.log("CREATE USER", data.data);
        var response = angular.fromJson(data.data.createUserResult);
        switch (response.id) {
          case 100:
            sessionStorage.user=user.nicknameUser;
            sessionStorage.priv=user.roleUser==1 ? "admin" : "fan";
            $scope.msj = "";
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
        $scope.count += 1;
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
          console.error(data);
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
         console.error(data);
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
