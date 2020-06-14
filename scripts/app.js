const app = angular.module('app', []);

app.controller('mainController', [
  '$scope',
  'httpService',
  function ($scope, httpService) {
    $scope.heading = 'My Weather report';
    $scope.allCountriesURL = 'https://restcountries.eu/rest/v2/all';
    $scope.className = 'grid';
    const weatherDetails = {
      base: 'http://api.openweathermap.org/data/2.5/weather?q=',
      APPID: '794ee95e63c5a32aaf88cd813fa2e425',
    };

    $scope.getData = function (url) {
      httpService.get(url).then(
        (data) => {
          $scope.countryList = data.data;
          // console.log($scope.countryList, ' countryList');
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

app.directive('country', function () {
  return {
    restrict: 'E',
    scope: {
      countryInfo: '=info',
    },
    template: `
    <div ng-class="{'country grid': $parent.className == 'grid', 'country list': $parent.className == 'list'}">
      <span>{{countryInfo['name']}}</span>
    </div>
    `,
  };
});
