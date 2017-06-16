angular
.module('app')
.controller("carteleraController",carteleraController);
carteleraController.inject = ['$scope'];
carteleraController.inject = ['$http'];
carteleraController.inject = ['$stateParams'];

var info_cartel=
{
	"cartelera": {
		"id": 60,
		"Nombre": "Festival Imperial",
		"pais": "Costa Rica",
		"lugar": "Parque Viva",
		"Cierra": "17-06-2017",
		"fecha_inicio": "17-07-2017",
		"fecha_final": "20-07-2017",
		"estado": true

	}
};

function carteleraController($scope, $stateParams, $http){//
  $scope.admi=false;
  $scope.id=$stateParams.cartelID;
  $scope.Nombre="Cartelera " + info_cartel.cartelera.Nombre;

getInfoCartelera = function  (){
  var urlCartel = "";
    $http({
      method: "GET",
      url: ""
    }).then(function mysuccess(response){
        $scope.info=info_cartel;
    },function myerror (response){
      $scope.info = "Request fallido "+ response.statusText;
    });
  };
};
