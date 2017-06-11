angular
.module('app')
.controller('loginController', loginController);
loginController.$inject = ['$scope'];
 function loginController ($scope) {
   $scope.userName = "";
   $scope.passWord = "";
   $scope.response = "";
   $scope.count = 0;
   $scope.log = function(userName, passWord) {
        var Url = "http://myconcertv2.cloudapp.net/UserService.svc/login/"+userName+"/"+passWord;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", Url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var response = JSON.parse(xhttp.responseText);
        /*switch(response) {
            case 103:
                code block
                break;
            case 104:
                code block
                break;
            case 105:
                code block
                break;
            case 106:
                code block
                break;
            default:
                code block
                break;
        }*/
        $scope.response = response;
        if (  $scope.response == ""){
          $scope.response = "not cool bro";
        }
        $scope.count += 1;
    };
};
