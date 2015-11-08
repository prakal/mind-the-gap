angular.module('headcount.events', [])

.controller('EventsController', function ($scope, $http, $window, $timeout, $q, EventsFactory) {

  // Stores all events that were created by you or that you were invited to
$scope.user = {
      title: '',
      email: '',
      firstName: '',
      lastName: '' ,
      company: '' ,
      address: '' ,
      city: '' ,
      state: '' ,
      description: '',
      postalCode : ''
    };
  }
);