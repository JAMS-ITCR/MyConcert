angular
.module('app')
.controller("carteleraController",carteleraController);
carteleraController.inject = ['$scope'];
carteleraController.inject = ['$http'];
carteleraController.inject = ['$stateParams'];

// Ejemplo para realizar pruebas mientras se sube el servicio

function carteleraController($scope, $stateParams, $http){
  $scope.admi=false;
  $scope.idCartel=$stateParams.cartelID;
	$scope.Cartel={};
	$scope.UpDown=true;
	$scope.changeIcon= function(){
		if ($scope.UpDown) {
			$scope.UpDown=false;
		}
		else {
			$scope.UpDown=true;
		}
	}

  //function para hacer el request de las carteleras que se van a ocupar
	getInfoCartelera = function  (){
		// Obtener el id de la cartelera $scope.idCartel
    var urlCarteles = "http://myconcertv2.cloudapp.net/PEDS/BillboardServices.svc/billboards";
      $http({
        method: "GET",
        url: urlCarteles
      }).then(function mysuccess(response){
					var ListaRaw = angular.fromJson(response.data.getBillBoardResult);
					findCartelera(ListaRaw);
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
    };
		//servicio para obtener los datos de las bandas por categorías
		getInfoCategorias = function(){
			//$scope.idCartel para obtener id cartelera
			$http({
        method: "GET",
        url: ""
      }).then(function mysuccess(response){
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
		}

		findCartelera = function(ListaRaw){
			var id = $scope.idCartel;
			console.log(id);
			for (var i = 0; i < ListaRaw.length; i++) {
				if(ListaRaw[i].IdCartelera==id){
					console.log(ListaRaw[i]);
					$scope.Cartel=ListaRaw[i];
					break;
				}
			}
		}
		//Se llama a la function
    getInfoCartelera();
		getInfoCategorias();

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    }
  };
