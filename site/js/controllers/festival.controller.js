angular
.module('app')
.controller("festivalController",festivalController);
festivalController.inject = ['$scope'];
festivalController.inject = ['$http'];
festivalController.inject = ['$stateParams'];
festivalController.inject = ['$location'];

var urlgetBanda = "http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/bands/";//MAS ID
var urlgetAllFestivals = "http://myconcertv2.cloudapp.net/PEDS/BillboardServices.svc/festivals";
var urlgetPais = "http://myconcertv2.cloudapp.net/CountriesService.svc/countries";
var urlgetGenero = "http://myconcertv2.cloudapp.net//PEDS/BandsService.svc/genders?idgenero="//Mas ID Género

function festivalController($scope,$http,$stateParams,$location) {

  $scope.Festival={};
  $scope.festivalID=$stateParams.festivalID;

  getInfo = function(id){
    $http({
        method: "GET",
        url: urlgetAllFestivals
      }).then(function mysuccess(response){
          setValues(angular.fromJson(response.data.getFestivalsResult));
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
  }

  getInfoReco = function(idBanda){
    $http({
        method: "GET",
        url: urlgetBanda+idBanda
      }).then(function mysuccess(response){
  				$scope.Festival.Recomendacion = angular.fromJson(response.data.getBandResult);
          getGenero($scope.Festival.Recomendacion.IdGenero);
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
    }

  getGenero = function(idGenero){
    $http({
        method: "GET",
        url: urlgetGenero+idGenero
      }).then(function mysuccess(response){
        var nombre = angular.fromJson(response.data.getGeneroByIdResult);
  			$scope.Festival.Recomendacion.NombreGenero = nombre[0].Nombre;

      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
    }



  getPais =function(idPais){
    $http({
        method: "GET",
        url: urlgetPais
      }).then(function mysuccess(response){
  				var ListaRawPaises = angular.fromJson(response.data.getCountriesResult);
          for (var i = 0; i < ListaRawPaises.length; i++) {
            if(ListaRawPaises[i].IdPais==idPais){
              $scope.Festival.Pais = ListaRawPaises[i].NombrePais;
              break;
            }
          }
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;

      });
  }

  setValues=function(RawValues){
    var indice=0;
    console.log(RawValues);
    while (indice<RawValues.length) {
      if(RawValues[indice].IdFestival==$scope.festivalID){
        $scope.Festival=RawValues[indice];
        break;
      }
      indice++;
    }
    console.log(indice);
    if(indice>=RawValues.length){
      var newUrl = "/404/";
      $location.url(newUrl);
    }
    else {
          getPais($scope.Festival.IdPais);
          console.log("Buscando la banda: "+$scope.Festival.IdBanda);
          getInfoReco($scope.Festival.IdBanda);
    }
  }
  getInfo();
}
