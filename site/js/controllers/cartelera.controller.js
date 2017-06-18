angular
.module('app')
.controller("carteleraController",carteleraController);
carteleraController.inject = ['$scope'];
carteleraController.inject = ['$http'];
carteleraController.inject = ['$stateParams'];

// Ejemplo para realizar pruebas mientras se sube el servicio

function carteleraController($scope, $stateParams, $http){
  $scope.admi=false;
  $scope.Cartel={};
  $scope.Cartel.idCartel=$stateParams.cartelID;
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
			$http({
        method: "GET",
        url: "http://myconcertv2.cloudapp.net//PEDS/BandsService.svc/bandsbillboards?idcartelera="+$scope.Cartel.idCartel
      }).then(function mysuccess(response){
        var ListaRaw= angular.fromJson(response.data.getBandasXCategoriaXCarteleraResult);
        filterCategory(ListaRaw);
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
		}

		findCartelera = function(ListaRaw){
			for (var i = 0; i < ListaRaw.length; i++) {
				if(ListaRaw[i].IdCartelera==$scope.Cartel.idCartel){
					console.log( "Este Raw se iguala a cartel "+ListaRaw[i]);
					$scope.Cartel.Nombre=ListaRaw[i].Nombre;
          $scope.Cartel.Lugar=ListaRaw[i].Lugar;
          $scope.Cartel.CierreVotacion=ListaRaw[i].CierreVotacion;
          $scope.Cartel.Estado=ListaRaw[i].Estado;
          $scope.Cartel.FechaInicio=ListaRaw[i].FechaInicio;
          $scope.Cartel.FechaFinal=ListaRaw[i].FechaFinal;
          $scope.Cartel.NombrePais=ListaRaw[i].NombrePais;
					break;
				}
			}
		}

    var filterCategory = function(ListaRaw){
      $scope.Cartel.Categories=[];
      for(i = 0; i < ListaRaw.length; i++){
        if(ListaRaw[i].IdCartelera==$scope.Cartel.idCartel){
          var existeCat = true;
          for (var j = 0; j < $scope.Cartel.Categories.length; i++) {
            if($scope.Cartel.Categories[j].IdCategoria==ListaRaw[i].IdCategoria){
              existeCat=false;
              var newBanda = {
                BandaNombre:ListaRaw[i].BandaNombre,
                IdBanda:ListaRaw[i].IdBanda,
                Acumulado: ListaRaw[i].Acumulado
              }
              $scope.Cartel.Categories[j].Bandas.push(newBanda);
              break;
            }}
          if(existeCat){
            var newCate = {
              IdCategoria: ListaRaw[i].IdCategoria,
              CategoriaNombre:ListaRaw[i].CategoriaNombre,
              dineroRestante:100,
              Bandas:[{
                  BandaNombre:ListaRaw[i].BandaNombre,
                  IdBanda:ListaRaw[i].IdBanda,
                  Acumulado: ListaRaw[i].Acumulado

                }]
              };

            $scope.Cartel.Categories.push(newCate);
          }
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
