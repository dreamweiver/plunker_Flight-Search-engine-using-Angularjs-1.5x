//Flight service factory to contact remote server and ask for data
(function() {
  'use strict';
  angular.module('flightSearch')
    .factory('flightService', ['$http', function($http) {

      var flightService = {};

      //private function
      //get request to local resource flights.json
      function getFlightsData() {
        return $http.get('flights.json').then(function(resp) {
          return resp.data;
        });
      }

      //public function exposed outside
      flightService.search = function(origin, destination) {
        return getFlightsData().then(function(response) {
          return response.data;
        });

      };

      return flightService;
    }]);
}());