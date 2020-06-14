const app = angular.module('app', []);

app.controller('mainController', [
  '$scope',
  'httpService',
  function ($scope, httpService) {
    $scope.heading = 'My Weather report';
    const allCountriesURL = 'https://restcountries.eu/rest/v2/all';
    const weatherDetails = {
      base: 'http://api.openweathermap.org/data/2.5/weather?q=',
      APPID: '794ee95e63c5a32aaf88cd813fa2e425',
    };

    getData = function (url) {
      httpService.get(url).then(
        (data) => {
          console.log('Success ', data);
        },
        (err) => {
          console.log(err, ' from error block');
        }
      );
    };
  },
]);

// Http Service to cater all XMLHTTP requests.
app.factory('httpService', [
  '$http',
  function ($http) {
    var httpObj = {};
    function httpGet(url) {
      return $http.get(url);
    }
    httpObj.get = httpGet;
    return httpObj;
  },
]);
