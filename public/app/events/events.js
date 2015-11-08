angular.module('volare.events', [])

.controller('EventsController', function ($scope, $http, $window, $timeout, $q) {
    console.log('something happend');

  // Stores all events that were created by you or that you were invited to
  $scope.user = {
      firstName: '',
      lastName: '' ,
    };
  }
);