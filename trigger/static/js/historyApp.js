angular.module('historyApp', ['ngRoute'])
.config(function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})
.controller("HistoryController", ['$scope', '$http', function($scope, $http){
    $scope.init = function(){
        $http.get("/api/history")
        .then(function(res){
            $scope.history = res.data;
        }, function(err){
            alert("Error loading history");
        })
    }
}])
.controller("LogController", ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.init = function(){
        var params = $location.search();
        var id = params.id;
        if (typeof id == 'undefined')
            alert("Invalid log ID");
        $http.get("api/log/"+id)
        .then(function(res){
            $scope.log = res.data.log;
        }, function(err){
            alert("Error loading log");
        })
    }
}])