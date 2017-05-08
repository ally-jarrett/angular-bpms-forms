angular.module('angularWebApp').controller('HeaderController', function($scope, $http, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    }
});