angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ProfilCtrl', function($scope, $ionicModal, $timeout) {
  $scope.profil = {};

  $ionicModal.fromTemplateUrl('templates/profilAdd.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeProfilAdd = function() {
    $scope.modal.hide();
  };

  $scope.modalProfilAdd = function() {
    $scope.modal.show();
  };

  $scope.addProfil = function() {
    //console.log('Doing profil', $scope.profil);

    $timeout(function() {
      $scope.closeProfilAdd();
    }, 1000);
  };
})

.controller('SearchCtrl', function($scope, $stateParams) {
   $scope.searchtrajet = {};
 })

//.controller('SearchCtrl', function($scope, $cordovaGeolocation) {
////Partie géolocalisation
//  var posOptions = {timeout: 10000, enableHighAccuracy: false};
//  $cordovaGeolocation
//    .getCurrentPosition(posOptions)
//    .then(function (position) {
//      var lat  = position.coords.latitude
//      var long = position.coords.longitude
//    }, function(err) {
//      // error
//    });
//
//
//  var watchOptions = {
//    frequency : 1000,
//    timeout : 3000,
//    enableHighAccuracy: false
//  };
//
//  var watch = $cordovaGeolocation.watchPosition(watchOptions);
//  watch.then(
//    null,
//    function(err) {
//      // error
//    },
//    function(position) {
//      var lat  = position.coords.latitude
//      var long = position.coords.longitude
//  });
//
//
//  watch.clearWatch();
//  // OR
//  $cordovaGeolocation.clearWatch(watch)
//    .then(function(result) {
//      // success
//      }, function (error) {
//      // error
//    });
//})

.controller('AddTrajetCtrl', function($scope, $stateParams) {
  $scope.addtrajet = {};
})


//.controller('PlaylistsCtrl', function($scope) {
//  $scope.playlists = [
//    { title: 'cool!', id: 1 },
//    { title: 'Chill', id: 2 },
//    { title: 'Dubstep', id: 3 },
//    { title: 'Indie', id: 4 },
//    { title: 'Rap', id: 5 },
//    { title: 'Cowbell', id: 6 }
//  ];
//})
//
//.controller('PlaylistCtrl', function($scope, $stateParams) {
//});
