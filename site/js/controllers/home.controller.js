angular
.module('app')
.controller('myhomeController',myhomeController);
  myhomeController.inject = ['$scope'];
  function myhomeController($scope){
    $scope.mywelcome = "Welcome to my Concert";
    $scope.estado='Habilitado';
  }
