var app = angular.module("app", [
    'ngRoute',
    'Controllers',
    'app.services'
]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1) : '';
    }
    });

    app.filter('lower', function() {
        return function(input) {
          return (!!input) ? input.charAt(0).toLowerCase() + input.substr(1).toLowerCase() : '';
        }
        });