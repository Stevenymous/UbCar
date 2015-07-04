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

//Page d'accueil
  .state('app.welcome', {
    url: "/welcome",
    views: {
      'menuContent': {
        templateUrl: "templates/welcome.html",
      }
    }
  })
//Profil : consultation et ajout
  .state('app.profil', {
    url: "/profil",
    views: {
      'menuContent': {
        templateUrl: "templates/profil.html",
        controller: 'ProfilCtrl'
      }
    }
  })
//Rechercher un trajet
  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'
      }
    }
  })
//Ajouter un trajet
  .state('app.addTrajet', {
    url: "/addTrajet",
    views: {
      'menuContent': {
        templateUrl: "templates/trajetAdd.html",
        controller: 'AddTrajetCtrl'
      }
    }
  })
//Liste des trajets disponibles
  .state('app.trajets', {
    url: "/trajets",
    views: {
      'menuContent' :{
        templateUrl: "templates/trajets.html",
        controller: 'TrajetsCtrl'
      }
    }
  })

//Détail du trajet
  .state('app.trajet', {
    url: "/trajets/:id",
    views: {
      'menuContent' :{
        templateUrl: "templates/trajet.html",
        controller: 'TrajetCtrl'
      }
    }
  })

//Liste des utilisateurs  
 .state('app.users', {
    url: "/users",
    views: {
      'menuContent' :{
        templateUrl: "templates/users.html",
        controller: 'UsersCtrl'
      }
    }
  })
//Détail d'un utilisateur
  .state('app.user', {
    url: "/users/:userID",
    views: {
      'menuContent' :{
        templateUrl: "templates/user.html",
        controller: 'UserCtrl'
      }
    }
  })

//Documentation de l'application
  .state('app.documentation', {
    url: "/documentation",
    views: {
      'menuContent': {
        templateUrl: "templates/documentation.html",
      }
    }
  })

  // Page d'accueil par défaut
  $urlRouterProvider.otherwise('/app/welcome');
});
