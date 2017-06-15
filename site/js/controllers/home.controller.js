angular
.module('app')
.controller('myhomeController',myhomeController);
  myhomeController.inject = ['$scope'];
  myhomeController.inject = ['$http'];
  myhomeController.inject = ['$location'];
  var position = [0,1,2];

  var lista=[
  {"nombre": "Google Festival", "imagen":"http://www.staffcreativa.pe/blog/wp-content/uploads/IMAGEN-4.png","num":1},
  {"nombre": "Google Fest", "imagen":"http://www.staffcreativa.pe/blog/wp-content/uploads/IMAGEN-4.png","num":3},
  {"nombre": "Google Action", "imagen":"http://www.staffcreativa.pe/blog/wp-content/uploads/IMAGEN-4.png","num":2},
  {"nombre": "Viña 2017", "imagen": "http://inklinedesign.com/wp-content/uploads/2013/04/logo-10.jpg","num":4},
  {"nombre": "Festival Imperial", "imagen": "https://dancettradio.files.wordpress.com/2012/01/festivalimperial_1-scaled10001.jpg","num":6},
  {"nombre": "Woodstock", "imagen": "http://i.ebayimg.com/images/a/(KGrHqFHJDME-mK53dw+BPs56i5MVQ~~/s-l300.jpg","num":5}
];
  function myhomeController($scope, $http, $location){
    $scope.admi=true;
    $scope.los3carteles = [];
    $scope.mywelcome = "Welcome to my Concert";
    $scope.prueba = null;
    $scope.lista_Cartelera=[];


    $scope.getCarteles = function(orden){
      //poner la comprobación de admi
      if(orden=="next"){
        for(i=0; i<position.length; i++){
          position[i]=position[i]+1;
          if(position[i]==$scope.lista_Cartelera.length){
            position[i]=0;
          }
        }
      }
      else if (orden=="previous") {
        for(i=0; i<position.length; i++){
          position[i]=position[i]-1;
          if(position[i]==-1){
            position[i]=$scope.lista_Cartelera.length-1 ;
          }
        }
      }
      $scope.los3carteles[0] = $scope.lista_Cartelera[position[0]];
      $scope.los3carteles[1] = $scope.lista_Cartelera[position[1]];
      $scope.los3carteles[2] = $scope.lista_Cartelera[position[2]];
    };

    $scope.showCartel = function (cartel){
      $scope.prueba = "Showing Festival "+cartel.nombre;
      $location.url("/bandas")
    };

    getAllCarteleras= function () {
      var CarteleraURL = "";
      if($scope.admi){
        CarteleraURL="";
      }
      else {
        CarteleraURL="";
      }
        $http({
        method : "GET",
        url : CarteleraURL
      }).then(function mysuccess(response){
          $scope.lista_Cartelera=lista;
      },function myerror (response){
        $scope.prueba = "Request fallido "+ response.statusText;
      });
    };
    getAllCarteleras();



  };

    //$http.getAllCarteleras();
    //
