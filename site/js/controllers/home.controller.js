angular
.module('app')
.controller('myhomeController',myhomeController);
  myhomeController.inject = ['$scope'];
  var lista_Cartelera = [
    {nombre: "Google Festival", imagen:"http://www.staffcreativa.pe/blog/wp-content/uploads/IMAGEN-4.png"},
    {nombre: "Google Fest", imagen:"http://www.staffcreativa.pe/blog/wp-content/uploads/IMAGEN-4.png"},
    {nombre: "Google Action", imagen:"http://www.staffcreativa.pe/blog/wp-content/uploads/IMAGEN-4.png"},
    {nombre: "Viña 2017", imagen: "http://inklinedesign.com/wp-content/uploads/2013/04/logo-10.jpg"},
    {nombre: "Festival Imperial", imagen: "https://dancettradio.files.wordpress.com/2012/01/festivalimperial_1-scaled10001.jpg"},
    {nombre: "Woodstock", imagen: "http://i.ebayimg.com/images/a/(KGrHqFHJDME-mK53dw+BPs56i5MVQ~~/s-l300.jpg"}
  ];
  var position = [0,1,2];


  function myhomeController($scope){
    $scope.admi=true;
    $scope.cartelera = [];
    $scope.mywelcome = "Welcome to my Concert";
    $scope.prueba = "";
    $scope.getCarteles = function(orden){
      //poner la comprobación de admi
      if(orden=="next"){
        for(i=0; i<position.length; i++){
          position[i]=position[i]+1;
          if(position[i]==6){
            position[i]=0;
          }
        }
      }
      else if (orden=="previous") {
        for(i=0; i<position.length; i++){
          position[i]=position[i]-1;
          if(position[i]==-1){
            position[i]=5;
          }
        }
      }
      $scope.cartelera[0] = lista_Cartelera[position[0]];
      $scope.cartelera[1] = lista_Cartelera[position[1]];
      $scope.cartelera[2] = lista_Cartelera[position[2]];
    };
    $scope.showCartel = function (cartel){
        $scope.prueba = "Showing Festival "+cartel.nombre;
    };
    $scope.getCarteles("next");
  }
