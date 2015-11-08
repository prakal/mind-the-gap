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
      $http.post('/volare/search/', {'startDate':$window.ourStartDate.yyyymmdd(),'endDate':$window.ourEndDate.yyyymmdd()}).then(
        function(res){
        // successCallback
        console.log(res);
        var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff'];
        this.colorTiles = (function() {
          var tiles = [];
          for (var i = 0; i < 10; i++) {
            tiles.push({
              color: randomColor(),
              colspan: randomSpan(),
              rowspan: randomSpan()
            });
          }
          return tiles;
        })();
        function randomColor() {
          return COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        function randomSpan() {
          var r = Math.random();
          if (r < 0.8) {
            return 1;
          } else if (r < 0.9) {
            return 2;
          } else {
            return 3;
          }
        }
      }, function(res){
        // errorCallback
        console.log(res);
      });
    };
    $scope.setNewDate = function(){
      $window.ourStartDate = $scope.startDate;
      $window.ourEndDate = $scope.endDate;

      console.log($window.ourStartDate,$window.ourEndDate);
    };

  }
)
.controller('gridController', function($scope) {
  
});

