angular
.module('app')
.controller('myhomeController',myhomeController);
  myhomeController.inject = ['$scope'];
  myhomeController.inject = ['$http'];
  myhomeController.inject = ['$location'];

  var position_cartelera = [0,1,2];
  var position_festivales = [0,1,2];


  function myhomeController($scope, $http, $location){
    $scope.mywelcome = "Welcome to my Concert";
    $scope.lista_Cartelera=[];
    $scope.lista_Festivales=[];
    $scope.mostrando_cartelera=[];
    $scope.mostrando_festivales=[];
    $scope.admi=true;

    $scope.selectItem = function (item,isCartel){
      if(isCartel){
        var newUrl = "/cartelera/"+item.IdCartelera;
        $location.url(newUrl);
      }
    };

    getAllInfo= function () {
      var CarteleraURL = "http://myconcertv2.cloudapp.net/PEDS/BillboardServices.svc/billboards";
      var FestivalURL = "http://myconcertv2.cloudapp.net/PEDS/BillboardServices.svc/festivals"

        $http({
        method : "GET",
        url : CarteleraURL
      }).then(function mysuccess(response){
        var ListaRaw = angular.fromJson(response.data.getBillBoardResult);
        if($scope.admi){
          CarteleraURL="";
        }
        else {
          CarteleraURL="";
        }
          $scope.lista_Cartelera=ListaRaw;
          for (var i = 0; i < $scope.lista_Cartelera.length; i++) {
            var img = !($scope.lista_Cartelera[i].hasOwnProperty("imagen"));
            if(img){
              $scope.lista_Cartelera[i].imagen="/img/nodisponible.png";
            }
          }
          for (var i = 0; i < 3; i++) {
            $scope.mostrando_cartelera[i]=$scope.lista_Cartelera[i];
          }
      },function myerror (response){
        $scope.prueba = "Request fallido "+ response.statusText;
      });

      $http({
      method : "GET",
      url : FestivalURL
      }).then(function mysuccess(response){
      var ListaRaw = angular.fromJson(response.data.getFestivalsResult);
      if($scope.admi){
        CarteleraURL="";
      }
      else {
        CarteleraURL="";
      }
      $scope.lista_Festivales=ListaRaw;

      for (var i = 0; i < 3; i++) {
          $scope.mostrando_festivales[i]=$scope.lista_Festivales[i];
      }
      },function myerror (response){
        $scope.prueba = "Request fallido "+ response.statusText;
      });
    };

    $scope.slideCartelera = function(left){
      if(left){
        for (var i = 0;i<3;i++){
         position_cartelera[i]=position_cartelera[i]-1;
         if(position_cartelera[i]<0){position_cartelera[i]=$scope.lista_Cartelera.length-1;}
       }
     }
     else {
      for (var i = 0;i<3;i++){
        position_cartelera[i]=position_cartelera[i]+1;
        if(position_cartelera[i]>$scope.lista_Cartelera.length-1){position_cartelera[i]=0;}
        }
      }
      for (var i = 0; i <3; i++) {
        $scope.mostrando_cartelera[i]=$scope.lista_Cartelera[position_cartelera[i]];
      }
    }
    $scope.slidefestivales = function(left){
      if(left){
        for (var i = 0;i<3;i++){
         position_festivales[i]=position_festivales[i]-1;
         if(position_festivales[i]<0){position_festivales[i]=$scope.lista_Festivales.length-1;}
       }
     }
     else {
      for (var i = 0;i<3;i++){
        position_festivales[i]=position_festivales[i]+1;
        if(position_festivales[i]>$scope.lista_Festivales.length-1){position_festivales[i]=0;}
        }
      }
      for (var i = 0; i <3; i++) {
        $scope.mostrando_festivales[i]=$scope.lista_Festivales[position_festivales[i]];
      }
    }
    $scope.CreateNew = function(isCartel){
      var newUrl="";
      if(isCartel){
        newUrl="/newcartelera/"
      }
      else {
        newUrl="/newfestival/"
      }
      $location.url(newUrl);
    }

    getAllInfo();



  };

    //$http.getAllCarteleras();
    //
