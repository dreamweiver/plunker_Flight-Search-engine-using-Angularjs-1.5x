//jquery ui datepicker for anugular js
(function() {
  angular.module('flightSearch')
    .directive("datepicker", function() {
      return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, elem, attrs, ngModelCtrl) {
          var updateModel = function(dateText) {
            scope.$apply(function() {
              ngModelCtrl.$setViewValue(dateText);
            });
          };
          var options = {
            dateFormat:"yy-mm-dd",
            numberOfMonths: 2,
            //minDate: 0,
            maxDate: 90,
            onSelect: function(dateText) {
              updateModel(dateText);
            }
          };
          elem.datepicker(options);
        }
      };
    });
})();