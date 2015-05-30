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
    console.log('Doing profil', $scope.profil);

    $timeout(function() {
      $scope.closeProfilAdd();
    }, 1000);
  };
})

.controller('SearchCtrl', function($scope, $stateParams) {
    $scope.searchtrajet = {};
   
    $scope.geolocalisation = function(position) {

      navigator.geolocation.getCurrentPosition(onSuccess, onError);

        function onSuccess(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var latlng = new google.maps.LatLng(latitude, longitude);

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode({'latLng': latlng}, function(results, status) {
          
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                var villeDepart = results[1].formatted_address;
                $scope.searchtrajet.depart = villeDepart; //N'est pas passé à la vue du premier coup RIP! (problème d'appel asynchrone)
              } else { alert('No results found');}
            } else { alert('Geocoder failed due to: ' + status); }

          });
        };

        function onError(error) {
          alert("Erreur lors de la géolocalisation", error.code);
        };
    };
   
})


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
