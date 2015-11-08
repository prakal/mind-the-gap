angular.module('volare', ['volare.events','volare.auth','ngRoute','ngMaterial'])
.config(function($routeProvider) {
  $routeProvider
    // .when('/', {
    //   templateUrl: 'index.html',
    //   controller: 'DemoController'
    // })
    .when('/events', {
      templateUrl: 'app/events/events.html',
      controller: 'EventsController',
      // authenticate: true,
    })
    .when('/login', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      // authenticate: true,
    })
    .otherwise({
      redirectTo: '/events'
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
})
// .controller('DemoCtrl', function($scope) {

// })
// .factory('EventsFactory', function ($rootScope) {
//   var eventServices = {};

//   eventServices.hasNotAuthorizedVenmo = false;

//   eventServices.currentEvent = {};
//   return eventServices;
// })
// .factory('AttachTokens', function ($window, $location) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   // TODO: Make this more secure, use passport or bcrypt.
//   var attach = {
//     request: function (object) {
//       var username = $window.sessionStorage.getItem('user');
//       if (username) {
//         object.headers['x-access-token'] = username;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// })
;