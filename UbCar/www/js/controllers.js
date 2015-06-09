angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $localstorage, $http) {
  $scope.loginData = {};
  //var urlApi = 'http://localhost:1337/user/';

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    //console.log('login', $scope.loginData);
    //var emailStorage = $scope.loginData.email;
    if(typeof $scope.loginData.email != 'undefined'){    
      //$http.post(urlApi + 'login', loginData)
      //  .success(function(data, status, headers, config) {
      //    console.log('login response');
      //    console.log(data);
      //  });
        $localstorage.set('email', $scope.loginData.email);
        console.log('localstorage logIN', $localstorage.get('email'));
    }
    else{
      var alertPopup = $ionicPopup.alert({
      title: 'Ooooops!',
      template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
      });
    }
  };
//Met la valeur de session à vide
  $scope.logOut = function(){
    $localstorage.set('email', '');
    console.log('localstorage logOUT', $localstorage.get('email'));
  }

})

.controller('ProfilCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $http) {
  $scope.profil = {};

  $ionicModal.fromTemplateUrl('templates/profilAdd.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
//Chargement de la fiche profil
  $http.get('http://localhost:1337/user/')
    .success(function(data, status, headers,config){
      console.log('profil chargé');
      console.log(data);
      $scope.profil = data[0];
    })
    .error(function(data, status, headers, config){
      var alertPopup = $ionicPopup.alert({
      title: 'Ooooops!',
      template: 'Votre profil n\'a pas été trouvé'
      });
    });

  $scope.closeProfilAdd = function() {
    $scope.modal.hide();
  };

  $scope.modalProfilAdd = function() {
    $scope.modal.show();
  };

  $scope.modalProfilModify = function() {
    $scope.modal.show();
  }

  $scope.addProfil = function() {
    console.log('add profil');
    console.log($scope.profil);

    var post = $scope.profil;
    console.log(post);

  };

  $scope.modalProfilDelete = function() {
   var confirmPopup = $ionicPopup.confirm({
    title: 'Suppression de profil',
    template: 'Etes-vous sûr de vouloir supprimer votre profil?',
    cssClass: '.popup-container',
    buttons: [
      { 
        text: 'Non',
        onTap: function(event) {
          confirmPopup.close();
        } 
      },
      {
        text: '<b>Je le veux!</b>',
        type: 'button-positive',
        onTap: function(event) {
          console.log('You are sure');
        } 
      }
    ]
   })
  };


  //Partie camera
  $scope.takePicture = function(position) {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
    
    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }
    
    function onFail(message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Ooooops!',
        template: 'Une erreur est survenue'
      });
    }
  }
  
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
              } else {
                var alertPopup1 = $ionicPopup.alert({
                  title: 'Ooooops!',
                  template: 'Aucun résultat ne coorespond à votre recherche'
                });
              }
            } else {
              var alertPopup2 = $ionicPopup.alert({
                  title: 'Ooooops!',
                  template: 'Geocoder a eu un problème d\'éxecution'
                });
            }
          });
        };

        function onError(error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Ooooops!',
            template: 'Une erreur est survenue lors de la géolocalisation'
          });
        };
    };
   
})


.controller('AddTrajetCtrl', function($scope, $stateParams, $localstorage, $ionicPopup) {
  $scope.addtrajet = {};
    console.log('localstorage addtrajet', $localstorage.get('email'));

  $scope.addTrajet = function() {

    if(!$localstorage.get('email')) {
      $ionicPopup.alert({
        title: 'Ooooops!',
        template: 'Veuillez vous connecter pour pouvoir ajouter un trajet.'
      });
    }
    else {
      console.log($scope.addtrajet);
    }

  }
})


.controller('TrajetsCtrl', function($scope, $http) {
  var urlApi = 'http://localhost:1337/trajets/';

  $http.get(urlApi)
      .success(function(data, status, headers,config){
        console.log('data success');
        console.log(data);
      })
      .error(function(data, status, headers, config){
        console.log('data error ' + status);
      })

})


.controller('UsersCtrl', function($scope, $http) {
//  var urlApi = 'http://localhost:1337/user/';
//
//  $http.get('http://localhost:1337/user/')
//      .success(function(data, status, headers,config){
//        console.log('data success');
//        console.log(data);
//      })
//      .error(function(data, status, headers, config){
//        console.log('data error ' + status);
//      })

  $scope.users = [
    { user: 'cool!', id: 1 },
    { user: 'Chill', id: 2 },
    { user: 'Dubstep', id: 3 },
    { user: 'Indie', id: 4 },
    { user: 'Rap', id: 5 },
    { user: 'Cowbell', id: 6 }
  ];


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
