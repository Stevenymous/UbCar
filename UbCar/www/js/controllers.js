//var urlApi = 'http://localhost:1337/';
//$http.get(urlApi + 'user/zefef63200@gmail.com/caca')
var urlApi = 'http://ubcarbackend.herokuapp.com/';


angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $localstorage, $http, $location) {
  $scope.loginData = {};

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
    if(typeof $scope.loginData.email != 'undefined') {    
      $http.get(urlApi + 'user' + '?mail=' + $scope.loginData.email + '&password=' + $scope.loginData.password)
        .success(function(data, status, headers, config) {
          console.log('login response');
          console.log(data);
          if(data != ""){
            $localstorage.setObject('profil', data);
            $localstorage.set('email', $scope.loginData.email);
            $scope.modal.hide();
            $location.path("/app/profil");
            //console.log('localstorage logIN', $localstorage.get('email'));
          }
          else {
            var alertPopup = $ionicPopup.alert({
            title: 'Ooooops!',
            template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
            });
          }
        })
        .error(function(data, status, headers, config){
          console.log('data error ' + status);
        })
    }
    else {
      var alertPopup = $ionicPopup.alert({
      title: 'Ooooops!',
      template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
      });
    }
  };

//Met la valeur de session à vide
  $scope.logOut = function() {   
    $localstorage.set('email', '');
    $localstorage.set('profil', '');
    console.log('localstorage logOUT email', $localstorage.get('email'));
    console.log('localstorage profil', $localstorage.get('profil'));
  }

})

.controller('ProfilCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $localstorage, $http) {
  $scope.profil = {};
  var profil = $localstorage.getObject('profil');

  if( typeof profil[0] != 'undefined' ) {    
    console.log('profil chargé');
    $scope.profil = profil;
    $scope.profil.name = $scope.profil[0].name;
    $scope.profil.lastName = $scope.profil[0].lastName;
    $scope.profil.city = $scope.profil[0].city;
    $scope.profil.numberSeat = $scope.profil[0].numberSeat;
    $scope.profil.mail = $scope.profil[0].mail;
  }
  else {
    console.log('objet profil vide');
       var confirmPopup = $ionicPopup.confirm({
    title: 'Profil non renseigné',
    template: 'Voulez-vous créer votre profil?',
    cssClass: '.popup-container',
    buttons: [
      { 
        text: 'Plus tard',
        onTap: function(event) {
          confirmPopup.close();
        } 
      },
      {
        text: '<b>Bien sûr!</b>',
        type: 'button-positive',
        onTap: function(event) {
          $scope.modal.show();
        } 
      }
    ]
   })
  }

  $scope.closeProfilAdd = function() {
    $scope.modal.hide();
  };

  $scope.modalProfilAdd = function() {
    $scope.modal.show();
  };

  $scope.modalProfilModify = function() {
    $scope.modal.show();
    console.log($scope.profil);
    //$http.get(urlApi + 'user' + '?mail=' + $scope.loginData.email + '&password=' + $scope.loginData.password)
    //  .success(function(data, status, headers, config) {
    //    console.log('login response');
    //    console.log(data);
    //    if(data != ""){
    //      $localstorage.setObject('profil', data);
    //      $localstorage.set('email', $scope.loginData.email);
    //      $scope.modal.hide();
    //      $location.path("/app/profil");
    //      //console.log('localstorage logIN', $localstorage.get('email'));
    //    }
    //    else {
    //      var alertPopup = $ionicPopup.alert({
    //      title: 'Ooooops!',
    //      template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
    //      });
    //    }
    //  })
    //  .error(function(data, status, headers, config){
    //    console.log('data error ' + status);
    //  })
  }

  $ionicModal.fromTemplateUrl('templates/profilAdd.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addProfil = function() {
    console.log('add profil', $scope.profil);
  //http://ubcarbackend.herokuapp.com/user/create?name=lara&lastName=fabian&mail=fabian@dudu.com&city=diou&numberSeat=7&password=coucou

    if( typeof $scope.profil.email != 'undefined' && typeof $scope.profil.password != 'undefined' &&
        typeof $scope.profil.lastName != 'undefined' && typeof $scope.profil.city != 'undefined' &&
        typeof $scope.profil.name != 'undefined' ) {    
      $http.post(urlApi + 'user/create' 
                        + '?name=' + $scope.profil.name 
                        + '&lastName=' + $scope.profil.lastName
                        + '&city=' + $scope.profil.city
                        + '&numberSeat=' + $scope.profil.numberSeat
                        + '&mail=' + $scope.profil.mail
                        + '&password=' + $scope.profil.password )
        .success(function(data, status, headers, config) {
          console.log('login response');
          console.log(data);
          $localstorage.setObject('profil', data);
          $localstorage.set('email', $scope.profil.email);
          $scope.modal.hide();
        })
        .error(function(data, status, headers, config){
          console.log('data error ' + status, data);
          console.log('objet ' , $scope.profil, $scope.profil.email);
          var alertPopup = $ionicPopup.alert({
            title: 'Ooooops!',
            template: 'Votre profil n\'a pas pus être crée, veuillez réesayer.'
          });
        })
    }
    else {
      var alertPopup = $ionicPopup.alert({
      title: 'Ooooops!',
      template: 'Vueillez renseigner tous les champs.'
      });
    }


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


.controller('UsersCtrl', function($scope, $http, $stateParams) {
  $scope.users = [
    { name: 'cool!', id: 1 },
    { name: 'Chill', id: 2 },
    { name: 'Dubstep', id: 3 },
    { name: 'Indie', id: 4 },
    { name: 'Rap', id: 5 },
    { name: 'Cowbell', id: 6 }
  ];


})

.controller('UserCtrl', function($scope, $stateParams) {
 })


.controller('TrajetsCtrl', function($scope) {

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

  $scope.trajets = [
    { title: 'cool!', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('TrajetCtrl', function($scope, $stateParams) {
});
