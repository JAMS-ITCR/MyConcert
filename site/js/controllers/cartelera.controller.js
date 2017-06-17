angular
.module('app')
.controller("carteleraController",carteleraController);
carteleraController.inject = ['$scope'];
carteleraController.inject = ['$http'];
carteleraController.inject = ['$stateParams'];

// Ejemplo para realizar pruebas mientras se sube el servicio
var info_cartelw3=
{		"id": 6,
		"Nombre": "Festival Imperial",
		"pais": "Costa Rica",
		"lugar": "Parque Viva",
		"Cierra": "17-06-2017",
		"fecha_inicio": "17-07-2017",
		"fecha_final": "20-07-2017",
		"estado": true,
    "imagen": "https://dancettradio.files.wordpress.com/2012/01/festivalimperial_1-scaled10001.jpg"
};

var arreglo_categorias = {
	"categorias": [{
		"idCategoria": 1,
		"nombre": "Nivel 1",
		"bandasXvotar": [{
			"idBanda": 1,
			"nombreBanda": "SanGil",
			"acumulado": 0
		}, {
			"idBanda": 2,
			"nombreBanda": "Vapurrum",
			"acumulado": 0
		}]
	}, {
		"idCategoria": 2,
		"nombre": "Medio malas",
		"bandasXvotar": [{
			"idBanda": 3,
			"nombreBanda": "Tulongo",
			"acumulado": 0
		}]
	}]
};

function carteleraController($scope, $stateParams, $http){
  $scope.admi=false;
  $scope.idCartel=$stateParams.cartelID;
	$scope.iconUpDown="/img/arrowdown.png";;
	var UpDown=false;
  $scope.changeIcon= function(){

		if (UpDown) {
			$scope.iconUpDown="/img/arrowdown.png";
			UpDown=false;
		}
		else {
			$scope.iconUpDown="/img/arrowup.png";
			UpDown=true;
		}
		return src;
	}

  //function para hacer el request de las carteleras que se van a ocupar
	getInfoCartelera = function  (){
		// Obtener el id de la cartelera $scope.idCartel
    var urlCartel = "";
      $http({
        method: "GET",
        url: ""
      }).then(function mysuccess(response){
					$scope.info_cartel=info_cartelw3;
          set_values(true);
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
          set_values(false);
      },function myerror (response){
        $scope.info = "Request fallido "+ response.statusText;
      });
		}
    		//Esta function se llama dentro de get info si el Requestes exitoso, la misma setea todos los valores
    set_values= function (encabezado){
			if(encabezado){
				$scope.Nombre=$scope.info_cartel.Nombre;
				$scope.lugar=$scope.info_cartel.lugar;
				$scope.Id=$scope.info_cartel.id;
				$scope.fecha_inicio=$scope.info_cartel.fecha_inicio;
				$scope.fecha_final=$scope.info_cartel.fecha_final;
				$scope.fecha_cierre=$scope.info_cartel.Cierra;
				$scope.pais=$scope.info_cartel.pais;
				$scope.imagen=$scope.info_cartel.imagen;
			}
			else {

			}
    };
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
