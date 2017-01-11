// flight search controller,containing entire business logic
angular.module('flightSearch')
  .controller('flightSearchCtrl', ['$scope', 'flightService',
    function($scope, flightService) {

      var data = [];
      $scope.origin = "";
      $scope.destination = "";
      $scope.price = 3000;
      $scope.roundTrip = false;
      $scope.clear = true;
      $scope.count = 1;
      //$scope.minPrice = 0;
     //$scope.maxPrice = 10000;
      $scope.flightData = [];
      $scope.bookingStatus = 'BOOK';
      
      // max and min default price value for range slider 
      $scope.range = {
        minPrice: 0,
        maxPrice: 3500
      };

      //filter function for price range slider
      $scope.filterRange = function(obj) {
        return obj.price > $scope.range.minPrice && obj.price <= $scope.range.maxPrice;
      };

     //remote data request & processing data for view to render
     $scope.search = function(org, dest) {
        //get flight details for given search criteria
        $scope.submitted = true;
        $scope.clear = true; //clear the container before making fresh search
        org = org.toUpperCase();
        dest = dest.toUpperCase();

        // call flightService to get remote data
        flightService.search()
          .then(function(response) {
            data = [];
            for (var index = 0; index < response.length; index++) {
              var curFlight = response[index];
              if (org.includes(curFlight.from) && dest.includes(curFlight.to)) {
                filterRecords(curFlight, $scope.departureDate, index, $scope.price, $scope.count);
              } else if ($scope.roundTrip && (org.includes(curFlight.to) && dest.includes(curFlight.from))) {
                filterRecords(curFlight, $scope.returnDate, index, $scope.price, $scope.count);
              }
            }
            $scope.flightData = data;
            $scope.clear = false;
          });
      };

      //private functions
      //date equality checker
      var dateComparer = function(firstDate, secondDate) {
        return (new Date(firstDate).getTime() == new Date(secondDate).getTime());
      };

      //traverse & pick matching records from JSON array
      var filterRecords = function(curFlight, date, curIndex, price,seatsCount) {
        var currentRecord = curFlight.detail;
        for (var index = 0; index < currentRecord.length; index++) {
          var curTrip = currentRecord[index];
          if (dateComparer(curTrip.date, date) && parseInt(curTrip.seats) >= seatsCount) {
            curTrip.airline = curFlight.airline;
            curTrip.imgUrl = curFlight.imgURL;
            curTrip.from = curFlight.from;
            curTrip.to = curFlight.to;
            data.push(curTrip);
          }
        }
      };
    }
  ]);