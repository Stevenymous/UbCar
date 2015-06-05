angular.module('starter.services', [])

  .factory('UbCarService', function ($http) {

    var urlApi = 'http://localhost:1337/user/';

    return {
          findAll: function() {
          return $http.get(urlApi);
        }   
    }
    
  });
