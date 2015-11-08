angular.module('volare.events', ['ngMaterial'])

.controller('EventsController', function ($scope, $http, $window, $timeout, $q) {
    console.log('something happened');
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.minDate = new Date(
    $scope.startDate.getFullYear(),
    $scope.startDate.getMonth(),
    $scope.startDate.getDate());
    $scope.maxDate = new Date(
    $scope.endDate.getFullYear(),
    $scope.endDate.getMonth() + 2,
    $scope.endDate.getDate());
    console.log($scope.startDate,$scope.endDate);
    // Stores all events that were created by you or that you were invited to
    $scope.user = {
        firstName: '',
        lastName: '' ,
    };

    Date.prototype.yyyymmdd = function() {
       var yyyy = this.getFullYear().toString();
       var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
       var dd  = this.getDate().toString();
       return yyyy + '-' +(mm[1]?mm:"0"+mm[0]) + '-' +(dd[1]?dd:"0"+dd[0]); // padding
      };
    $scope.search = function(event){
      console.log('seaRch triggered', $window.ourStartDate, $window.ourEndDate);
      $http.post('/volare/search/', {'startDate':$window.ourStartDate.yyyymmdd(),'endDate':$window.ourEndDate.yyyymmdd()}).then(function(){successCallback}, function(){errorCallback});
    };
    $scope.setNewDate = function(){
      $window.ourStartDate = $scope.startDate;
      $window.ourEndDate = $scope.endDate;

      console.log($window.ourStartDate,$window.ourEndDate);
    };

  }
);

