angular.module('volare.auth', [])

.controller('AuthController', function ($scope, $window, $location, $http) {
	$scope.$location = $location;
  // $scope.user = {};
  // $scope.auth = Auth.isAuth();
});