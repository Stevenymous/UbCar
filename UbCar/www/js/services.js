angular.module('starter.services', [])

  .factory('UbCarService', function ($http) {

    var urlApi = 'http://localhost:1337/user/';
    //var urlApi = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain';


    return {
          findAll: function() {
          return $http.get(urlApi);
        }   
    }
    
  });
