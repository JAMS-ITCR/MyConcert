angular
.module('app')
.controller('bandController', bandController);
bandController.$inject = ['$scope','$http','$state'];
 function bandController ($scope,$http,$state) {
  $scope.data = "Hola pinche";
  console.log("bands");
  //get bandas
  
$scope.getArray =function (index){

  return new Array(index);
}
  $scope.getBandas = function (){
    $http({
      method: 'GET',
      url: 'http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/bands'
      }).then(function successCallback(response) {

        console.log("bands",JSON.parse(response.data.getBandsResult));
        $scope.bandas = JSON.parse(response.data.getBandsResult);

      }, function errorCallback(response) {

        console.log("error bands",response);
      });
    };
    $scope.getBandas();
    $scope.getBandasById = function (id){
      $http({
        method: 'GET',
        url: 'http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/bands/'+id
        }).then(function successCallback(response) {

          console.log("bands",JSON.parse(response.data));
        }, function errorCallback(response) {

          console.log("error bands",response);
        });
      };


  };
