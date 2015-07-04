var urlApi = 'http://ubcarbackend.herokuapp.com/';
var profil = 'undefined';


angular.module('starter.controllers', ['ui.router'])

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
      profil = $localstorage.getObject('profil');

    if(typeof profil[0] == 'undefined') {    
      if(typeof $scope.loginData.email != 'undefined' && typeof $scope.loginData.password != 'undefined') {    
        $http.get(urlApi + 'user' + '?mail=' + $scope.loginData.email + '&password=' + $scope.loginData.password)
          .success(function(data, status, headers, config) {
            if(data != ""){
              $localstorage.setObject('profil', data);
              $localstorage.set('email', $scope.loginData.email);
              $scope.modal.hide();
              $location.path("/app/profil");
            }
            else {
              var alertPopup = $ionicPopup.alert({
                title: 'Ooooops!',
                template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
              });
            }
          })
          .error(function(data, status, headers, config){
            var alertPopup = $ionicPopup.alert({
              title: 'Ooooops!',
              template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
            });
          })
      }
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Vueillez renseigner tous les champs.'
        });
      }
    }
    else {
      var alertPopup = $ionicPopup.alert({
        title: 'Hum...',
        template: 'Vous êtes déjà connecté =P'
      });
    }
  };

//Met les valeurs de session à vide et ferme l'application
  $scope.logOut = function() {   
    $localstorage.set('email', '');
    $localstorage.set('profil', '');
    ionic.Platform.exitApp();
    if(navigator.app){
        navigator.app.exitApp();
    }else if(navigator.device){
            navigator.device.exitApp();
    }
  }
})

.controller('ProfilCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $localstorage, $http, $state, Camera) {
  profil = $localstorage.getObject('profil');
  $scope.profil = {};

  if( typeof profil[0] != 'undefined' ) {   
    $scope.profil = profil[0];
  }
  else {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Profil non renseigné',
      template: 'Voulez-vous créer votre profil?',
      cssClass: '.popup-container',
      buttons: [{ 
        text: 'Plus tard',
        onTap: function(event) {
          $scope.profil.userCreated = 1;
          confirmPopup.close();
        } 
      },
      {
        text: '<b>Bien sûr!</b>',
        type: 'button-positive',
        onTap: function(event) {
          $scope.modal.show();
        } 
      }]
    })
  }

  $scope.closeProfilAdd = function() {
    $scope.modal.hide();
  };

  $scope.modalProfilAdd = function() {
    $scope.modal.show();
  };

  $scope.addProfil = function() {
    if( typeof $scope.profil.mail != 'undefined' && typeof $scope.profil.password != 'undefined' &&
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
          $localstorage.setObject('profil', data);
          $localstorage.set('email', $scope.profil.email);
          $scope.modal.hide();
        })
        .error(function(data, status, headers, config){
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
      $scope.profil = {};
    }

  }; 

  $ionicModal.fromTemplateUrl('templates/profilAdd.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/profilModify.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalModify = modal;
  });

  $scope.closeProfilModify = function() {
    $scope.modalModify.hide();
  };

  $scope.modalProfilModify = function() {
    $scope.modalModify.show();
  }

  $scope.modfierProfil = function() {
    $http.put(urlApi + 'user/' + profil[0].id, 
      {
        lastName : $scope.profil.lastName,
        name : $scope.profil.name,
        city : $scope.profil.city,
        numberSeat : $scope.profil.numberSeat,
        mail : $scope.profil.mail,
        password : $scope.profil.password
      })
      .success(function(data, status, headers, config) {
        $localstorage.setObject('profil', data);
        profil[0].name = $scope.profil.name;
        profil[0].lastName = $scope.profil.lastName;
        profil[0].city = $scope.profil.city;
        profil[0].numberSeat = $scope.profil.numberSeat;
        profil[0].mail = $scope.profil.mail;
        $scope.modalModify.hide();
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Votre profil n\'a pas pus être modifié, veuillez réesayer.'
        });
      })
  };

  $scope.modalProfilDelete = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Suppression de profil',
      template: 'Etes-vous sûr de vouloir supprimer votre profil?',
      cssClass: '.popup-container',
      buttons: [{ 
        text: 'Non',
        onTap: function(event) {
          confirmPopup.close();
        } 
      },
      {
        text: '<b>Je le veux!</b>',
        type: 'button-positive',
        onTap: function(event) {
          $http.delete(urlApi + 'user', 
            {
              id: profil[0].id
            })
            .success(function(data, status, headers, config) {
              $localstorage.set('profil', '');
              $localstorage.set('email', '');
              $scope.modalModify.hide();
              $scope.profil = {};
              $scope.profil.userCreated = 0;
            })
            .error(function(data, status, headers, config){
              var alertPopup = $ionicPopup.alert({
                title: 'Ooooops!',
                template: 'Votre profil n\'a pas pus être suprimé, veuillez réesayer.'
              });
            })
        } 
      }]
     })
  };

  //Partie camera
  $scope.takePicture = function() {
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      $scope.photo = imageURI;
    }, function(err) {
    });
  }

//  $scope.takePicture = function(position) {
//    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
//        destinationType: Camera.DestinationType.DATA_URL
//    });
//    
//    function onSuccess(imageData) {
//        var image = document.getElementById('myImage');
//        image.src = "data:image/jpeg;base64," + imageData;
//    }
//    
//    function onFail(message) {
//      var alertPopup = $ionicPopup.alert({
//        title: 'Ooooops!',
//        template: 'Une erreur est survenue'
//      });
//    }
//  }
  
})

.controller('SearchCtrl', function($scope, $stateParams, $http, $ionicPopup, $state) {
    $scope.searchtrajet = {};
    //Récupération des villes déjà enregistrées pour l'auto-complete des inputs
    $http.get(urlApi + 'trajets')
      .success(function(data, status, headers, config){
        $scope.searchtrajet = [];
        for(var i = 0; i < data.trajets.length; i ++){          
          $scope.searchtrajet.push(data.trajets[i]);
        }
      })
      .error(function(data, status, headers, config){
      })

    $scope.searchtrajet.depart = null;

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
                $scope.searchtrajet.depart = villeDepart; //problème d'appel asynchrone
              } else {
                var alertPopup1 = $ionicPopup.alert({
                  title: 'Ooooops!',
                  template: 'Aucun résultat ne coorespond à votre recherche'
                });
              }
            } else {
              var alertPopup2 = $ionicPopup.alert({
                  title: 'Ooooops!',
                  template: 'Géocoder a eu un problème d\'éxecution'
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
//teste fonctionnel avec Diou / Riom / 2015-07-15
    $scope.searchTrajet = function() {
      var dateFormat = $scope.searchtrajet.date.toLocaleDateString();

      $http.get(urlApi + 'trajet' 
                       + '?startCity='+ $scope.searchtrajet.depart
                       + '&arrivalCity=' + $scope.searchtrajet.arrivee
                       + '&startDate=' + dateFormat)
        .success(function(data, status, headers, config){
          $state.go('app.profil');
          $state.go("app.trajet",{'id': data.trajet[0].id});
        })
        .error(function(data, status, headers, config){
          var alertPopup = $ionicPopup.alert({
            title: 'Ooooops!',
            template: 'Le service de recherche est indisponible pour le moment.'
          });
        } )
    }   
   
})


.controller('AddTrajetCtrl', function($scope, $stateParams, $localstorage, $ionicPopup, $http, $state) {
  $scope.addtrajet = {};

  $scope.addTrajet = function() {
    if(!$localstorage.get('email')) {
      $ionicPopup.alert({
        title: 'Ooooops!',
        template: 'Veuillez vous connecter pour pouvoir ajouter un trajet.'
      });
    }
    else {
      var dateFormat = $scope.addtrajet.startDate.toLocaleDateString();

      $http.post(urlApi + 'trajet',
      {
        startCity : $scope.addtrajet.startCity,
        arrivalCity : $scope.addtrajet.arrivalCity,
        startDate : dateFormat,
        numberSeat : $scope.addtrajet.numberSeat,
        details : $scope.addtrajet.details
      })
      .success(function(data, status, headers, config){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Trajet ajouté =)',
          template: 'Voulez-vous retourner sur votre profil?',
          cssClass: '.popup-container',
          buttons: [{ 
            text: 'Plus tard',
            onTap: function(event) {
              confirmPopup.close();
            } 
          },
          {
            text: '<b>Bien sûr!</b>',
            type: 'button-positive',
            onTap: function(event) {
              $state.go('app.profil');
            } 
          }]
        })
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Un problème est survenue lors de la création, veuillez réesayer. Excusez nous pour la gène occasionée...'
        });
      })
    }

  }
})

.controller('TrajetsCtrl', function($scope, $http) {
  $http.get(urlApi + 'trajets')
      .success(function(data, status, headers, config){
        $scope.trajets = [];
        for(var i = 0; i < data.trajets.length; i ++){          
          $scope.trajets.push(data.trajets[i]);
        }
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Les trajets sont indisponibles pour le moment.'
        });
      })
})

.controller('TrajetCtrl', function($scope, $stateParams, $http, $ionicPopup, $localstorage, $state) {
  if(typeof $stateParams.startCity != 'undefined') {  
    $http.get(urlApi + 'trajet',
    {
      startCity : $stateParams.startCity,
      arrivalCity : $stateParams.arrivalCity,
      startDate : $stateParams.startDate
    })
    .success(function(data, status, headers, config){
      $scope.trajet = data;
    })
    .error(function(data, status, headers, config){
      var alertPopup = $ionicPopup.alert({
        title: 'Ooooops!',
        template: 'La liste des trajets n\'a pas été trouvé, veuillez réesayer.'
      });
    })
  }
  else {
    $http.get(urlApi + 'trajetById?id=' + $stateParams.id)
      .success(function(data, status, headers, config){
        $scope.trajet = data.trajet;
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Le détail du trajet n\'a pas été trouvé, veuillez réesayer.'
        });
      })
  }

  $scope.subscribe = function() {
    profil = $localstorage.getObject('profil');
    $http.put(urlApi + 'user/' + profil[0].id + '/subscribeTrajet/trajet/' + $scope.trajet.id)
      .success(function(data, status, headers, config) {
        $http.get(urlApi + 'user' + '?mail=' + profil[0].mail + '&password=' + profil[0].password)
          .success(function(data, status, headers, config) {
            if(data != ""){
              $localstorage.setObject('profil', data);
              profil = $localstorage.getObject('profil');
            }
            else {
              var alertPopup = $ionicPopup.alert({
                title: 'Ooooops!',
                template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
              });
            }
          })
          .error(function(data, status, headers, config){
            var alertPopup = $ionicPopup.alert({
              title: 'Ooooops!',
              template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
            });
          })

        var confirmPopup = $ionicPopup.confirm({
          title: 'Inscription réussie =)',
          template: 'Voulez-vous voir vos trajets réservés sur votre profil?',
          cssClass: '.popup-container',
          buttons: [{ 
            text: 'Plus tard',
            onTap: function(event) {
              confirmPopup.close();
            } 
          },
          {
            text: '<b>Bien sûr!</b>',
            type: 'button-positive',
            onTap: function(event) {
              $state.go('app.profil');
            } 
          }]
        })
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Vous n\'avez pas été inscrit, veuillez réesayer.'
        });
      })
  }

  $scope.unsubscribe = function() {
    profil = $localstorage.getObject('profil');
    $http.put(urlApi + 'user/' + profil[0].id + '/unsubscribeTrajet/trajet/' + $scope.trajet.id)
      .success(function(data, status, headers, config) {
        $http.get(urlApi + 'user' + '?mail=' + profil[0].mail + '&password=' + profil[0].password)
          .success(function(data, status, headers, config) {
            if(data != ""){
              $localstorage.setObject('profil', data);
              profil = $localstorage.getObject('profil');
            }
            else {
              var alertPopup = $ionicPopup.alert({
                title: 'Ooooops!',
                template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
              });
            }
          })
          .error(function(data, status, headers, config){
            var alertPopup = $ionicPopup.alert({
              title: 'Ooooops!',
              template: 'Votre profil n\'a pas été trouvé, veuillez réesayer.'
            });
          })

        var confirmPopup = $ionicPopup.confirm({
          title: 'Désinscription réussie =)',
          template: 'Voulez-vous voir vos trajets restant réservés sur votre profil?',
          cssClass: '.popup-container',
          buttons: [{ 
            text: 'Plus tard',
            onTap: function(event) {
              confirmPopup.close();
            } 
          },
          {
            text: '<b>Bien sûr!</b>',
            type: 'button-positive',
            onTap: function(event) {
              $state.go('app.profil');
            } 
          }]
        })
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Vous n\'avez pas été inscrit, veuillez réesayer.'
        });
      })
  }

})

.controller('UsersCtrl', function($scope, $http, $stateParams) {
  $http.get(urlApi + 'user')
      .success(function(data, status, headers, config){
        $scope.users = [];
        for(var i = 0; i < data.length; i ++){          
          $scope.users.push(data[i]);
        }
      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Les utilisateurs sont indisponibles pour le moment.'
        });
      })
})

.controller('UserCtrl', function($scope, $stateParams) {
 })