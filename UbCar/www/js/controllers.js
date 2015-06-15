//var urlApi = 'http://localhost:1337/';
//$http.get(urlApi + 'user/zefef63200@gmail.com/caca')
var urlApi = 'http://ubcarbackend.herokuapp.com/';
var profil = 'undefined';


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
      profil = $localstorage.getObject('profil');
      console.log('profil[0] doLogin', profil[0]);
      console.log('profil doLogin', profil);

    if(typeof profil[0] == 'undefined') {    
      if(typeof $scope.loginData.email != 'undefined' && typeof $scope.loginData.password != 'undefined') {    
        $http.get(urlApi + 'user' + '?mail=' + $scope.loginData.email + '&password=' + $scope.loginData.password)
          .success(function(data, status, headers, config) {
            console.log('login response');
            console.log(data);
            if(data != ""){
              $localstorage.setObject('profil', data);
              console.log('data profil', profil);
              $localstorage.set('email', $scope.loginData.email);
              $scope.modal.hide();
              $location.path("/app/profil");
              console.log('profil[0] doLoginSucess', profil[0]);
              console.log('profil doLoginSucess', profil);
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

//Met la valeur de session à vide
  $scope.logOut = function() {   
    $localstorage.set('email', '');
    $localstorage.set('profil', '');
    console.log('localstorage logOUT email', $localstorage.get('email'));
    console.log('localstorage profil', $localstorage.get('profil'));
  }

})

.controller('ProfilCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $localstorage, $http) {
  profil = $localstorage.getObject('profil');
  console.log('profil[0] ProfilCtrl', profil[0]);
  $scope.profil = {};

  if( typeof profil[0] != 'undefined' ) {    
    $scope.profil.userCreated = 0;
    $scope.profil.name = profil[0].name;
    $scope.profil.lastName = profil[0].lastName;
    $scope.profil.city = profil[0].city;
    $scope.profil.numberSeat = profil[0].numberSeat;
    $scope.profil.mail = profil[0].mail;
  }
  else {
    console.log('objet profil vide');
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
    console.log('add profil', $scope.profil);

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
    console.log('modify response');
  
    $http.put(urlApi + 'user/' + profil[0].id, 
      {
        lastName : $scope.profil.lastName,
        name : $scope.profil.name,
        city : $scope.profil.city,
        numberSeat : $scope.profil.numberSeat
      })
      .success(function(data, status, headers, config) {
        console.log(data, status, headers, config);
        $localstorage.setObject('profil', data);
        profil[0].name = $scope.profil.name;
        profil[0].lastName = $scope.profil.lastName;
        profil[0].city = $scope.profil.city;
        profil[0].numberSeat = $scope.profil.numberSeat;
        profil[0].mail = $scope.profil.mail;
        $scope.modalModify.hide();
        console.log('profil[0] modfierProfil', profil[0]);

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
          console.log('You are sure');
          console.log('$scope.profil', $scope.profil);
          console.log('profil[0]', profil[0]);

          $http.delete(urlApi + 'user', 
            {
              id: profil[0].id
            })
            .success(function(data, status, headers, config) {
              console.log('delete user', data, status, headers, config);
              $localstorage.set('profil', '');
              $localstorage.set('email', '');
              $scope.modalModify.hide();
              $scope.profil = {};
              $scope.profil.userCreated = 0;


              console.log('localstorage delete user email', $localstorage.get('email'));
              console.log('localstorage delete user profil', $localstorage.get('profil'));
              console.log('$scope.profil delete user', $scope.profil);

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


.controller('AddTrajetCtrl', function($scope, $stateParams, $localstorage, $ionicPopup, $http) {
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
      console.log('$scope.addtrajet', $scope.addtrajet);
      console.log('$scope.addtrajet.startCity', $scope.addtrajet.startCity);

      $http.post(urlApi + 'trajet',
      {
        startCity : $scope.addtrajet.startCity,
        arrivalCity : $scope.addtrajet.arrivalCity,
        startDate : $scope.addtrajet.startDate,
        numberSeat : $scope.addtrajet.numberSeat,
        details : $scope.addtrajet.details
      })
      .success(function(data, status, headers, config){
        console.log('addtrajet success', data);
        //$scope.trajet = data;
        //console.log('$scope.trajet', $scope.trajet);
      })
      .error(function(data, status, headers, config){
        console.log('addtrajet error ' + status, headers, config);
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Un problème est survenue lors de la création, veuillez réesayer. Excusez nous pour la gène occasionée...'
        });
      })
    }

  }
})

.controller('TrajetsCtrl', function($scope, $http) {
  console.log('TrajetsCtrl');

  $http.get(urlApi + 'trajet')
      .success(function(data, status, headers, config){
        console.log('TrajetsCtrl success', data);
        $scope.trajets = [];
        for(var i = 0; i < data.trajets.length; i ++){          
          $scope.trajets.push(data.trajets[i]);
        }
      })
      .error(function(data, status, headers, config){
        console.log('TrajetsCtrl error ' + status, headers, config);
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Les trajets sont indisponibles pour le moment.'
        });
      })
})

.controller('TrajetCtrl', function($scope, $stateParams, $http) {
  console.log('TrajetCtrl', $stateParams );

  $http.get(urlApi + 'trajet',
  {
    startCity : $stateParams.startCity,
    arrivalCity : $stateParams.arrivalCity,
    startDate : $stateParams.startDate
  })
  .success(function(data, status, headers, config){
    console.log('TrajetCtrl success', data);
    $scope.trajet = data;
    console.log('$scope.trajet', $scope.trajet);
  })
  .error(function(data, status, headers, config){
    console.log('TrajetCtrl error ' + status, headers, config);
    var alertPopup = $ionicPopup.alert({
      title: 'Ooooops!',
      template: 'Le détail du trajet n\'a pas été trouvé, veuillez réesayer.'
    });
  })

  $scope.subscribe = function() {
    console.log('subscribe');

  /*  $http.put(urlApi + 'user/' + profil[0].id + '/subscribeTrajet/trajet/' + trajet.id)
      .success(function(data, status, headers, config) {
        console.log(data, status, headers, config);
        $localstorage.setObject('profil', data);
        profil[0].name = $scope.profil.name;
        profil[0].lastName = $scope.profil.lastName;
        profil[0].city = $scope.profil.city;
        profil[0].numberSeat = $scope.profil.numberSeat;
        profil[0].mail = $scope.profil.mail;
        $scope.modalModify.hide();
        console.log('profil[0] modfierProfil', profil[0]);

      })
      .error(function(data, status, headers, config){
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Votre profil n\'a pas pus être modifié, veuillez réesayer.'
        });
      })*/
  }

  $scope.unsubscribe = function() {
    console.log('unsubscribe');
  }
})

.controller('UsersCtrl', function($scope, $http, $stateParams) {
  console.log('UsersCtrl');

  $http.get(urlApi + 'user')
      .success(function(data, status, headers, config){
        console.log('UsersCtrl success', data);
        $scope.users = [];
        for(var i = 0; i < data.length; i ++){          
          $scope.users.push(data[i]);
        }
      })
      .error(function(data, status, headers, config){
        console.log('UsersCtrl error ' + status, headers, config);
        var alertPopup = $ionicPopup.alert({
          title: 'Ooooops!',
          template: 'Les utilisateurs sont indisponibles pour le moment.'
        });
      })
})

.controller('UserCtrl', function($scope, $stateParams) {
 })

