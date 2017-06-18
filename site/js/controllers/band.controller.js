angular
.module('app')
.controller('mybandController', mybandController);
bandController.$inject = ['$scope',"$http","$stateParams"];
 function mybandController ($scope,$http,$stateParams) {
   $scope.rating = $stateParams.rating;
   $scope.stars=[];
   $scope.members = [{id: 'choice1'}, {id: 'choice2'}];
   $scope.songs = [{id: 'choice1'}, {id: 'choice2'}];
   $scope.comments = [{id: 'choice1'}, {id: 'choice2'}];
   $scope.bandId = $stateParams.id;

   console.log("log",$scope.rating);
   var getArray =function (index){
     console.log("rating",index);

     for (var i = 0; i < index; i++) {
       $scope.stars.push(i);
     }
     //return new Array(index);
   }
   getArray($scope.rating);
   $scope.getBandasById = function (id){
     $http({
       method: 'GET',
       url: 'http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/bands/'+id
       }).then(function successCallback(response) {
         console.log("bands",JSON.parse(response.data.getBandResult));
         $scope.banda = JSON.parse(response.data.getBandResult);
       }, function errorCallback(response) {
         console.log("error bands",response);
       });
     };
     $scope.getBandMembers = function (id){
       $http({
         method: 'GET',
         url: 'http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/bandmembers?idbanda='+id
         }).then(function successCallback(response) {
           var string_data = JSON.parse(response.data.getMembersByBandResult).value;
           var array_data = JSON.parse(string_data);
           $scope.members = array_data;
           console.log("members",array_data);
           //$scope.banda = JSON.parse(response.data.getBandResult);
         }, function errorCallback(response) {
           console.log("error bands",response);
         });
       };
     $scope.getBandSongs = function (id){
         $http({
           method: 'GET',
           url: 'http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/bands/'+id
           }).then(function successCallback(response) {
             console.log("bands",JSON.parse(response));
             //$scope.banda = JSON.parse(response.data.getBandResult);
           }, function errorCallback(response) {
             console.log("error bands",response);
           });
         };

         $scope.getComments = function (id){
           $http({
             method: 'GET',
             url: 'http://myconcertv2.cloudapp.net/PEDS/BandsService.svc/comments?idbanda='+id
             }).then(function successCallback(response) {
               var data_string =JSON.parse(response.data.getCommentsResult).value;
               var data_json = JSON.parse (data_string);
               $scope.comments = data_json;
               console.log("comments",data_json);
               //$scope.banda = JSON.parse(response.data.getBandResult);
             }, function errorCallback(response) {
               console.log("error bands",response);
             });
           };


   $scope.getBandasById ( $scope.bandId);
   $scope.getBandMembers ( $scope.bandId);
   $scope.getComments ( $scope.bandId);

   $scope.addNewMember  = function() {
     var newItemNo = $scope.members.length+1;
   $scope.members.push({'id':'choice'+newItemNo});
   };

   $scope.removeMember = function() {
     var lastItem =$scope.members.length-1;
   $scope.members.splice(lastItem);
   };
   $scope.addNewSong = function() {
     var newItemNo =   $scope.songs.length+1;
     $scope.songs.push({'id':'choice'+newItemNo});
   };

   $scope.removeSong = function() {
     var lastItem =   $scope.songs.length-1;
     $scope.songs.splice(lastItem);
   };

  };
