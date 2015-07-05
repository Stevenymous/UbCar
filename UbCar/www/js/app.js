angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

//Welcome page
  .state('app.welcome', {
    url: "/welcome",
    views: {
      'menuContent': {
        templateUrl: "templates/welcome.html",
      }
    }
  })
//Profile : view, create, modify and delete
  .state('app.profil', {
    url: "/profil",
    views: {
      'menuContent': {
        templateUrl: "templates/profil.html",
        controller: 'ProfilCtrl'
      }
    }
  })
//Search a ride
  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'
      }
    }
  })
//Add a ride
  .state('app.addTrajet', {
    url: "/addTrajet",
    views: {
      'menuContent': {
        templateUrl: "templates/trajetAdd.html",
        controller: 'AddTrajetCtrl'
      }
    }
  })
//Rides list
  .state('app.trajets', {
    url: "/trajets",
    views: {
      'menuContent' :{
        templateUrl: "templates/trajets.html",
        controller: 'TrajetsCtrl'
      }
    }
  })

//Ride detail
  .state('app.trajet', {
    url: "/trajets/:id",
    views: {
      'menuContent' :{
        templateUrl: "templates/trajet.html",
        controller: 'TrajetCtrl'
      }
    }
  })

//Users list 
 .state('app.users', {
    url: "/users",
    views: {
      'menuContent' :{
        templateUrl: "templates/users.html",
        controller: 'UsersCtrl'
      }
    }
  })
//User detail
  .state('app.user', {
    url: "/users/:userID",
    views: {
      'menuContent' :{
        templateUrl: "templates/user.html",
        controller: 'UserCtrl'
      }
    }
  })

//User manual
  .state('app.documentation', {
    url: "/documentation",
    views: {
      'menuContent': {
        templateUrl: "templates/documentation.html",
      }
    }
  })

  //Default welcome page
  $urlRouterProvider.otherwise('/app/welcome');
});
