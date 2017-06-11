angular
.module('app')
.controller('bandController', bandController);
bandController.$inject = ['$scope'];
 function bandController ($scope) {
  $scope.data = "Hola pinche";
};
