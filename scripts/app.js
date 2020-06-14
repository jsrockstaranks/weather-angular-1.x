const app = angular.module('app', []);

app.controller('mainController', [
  '$scope',
  'httpService',
  function ($scope, httpService) {
    $scope.heading = 'My Weather report';
    $scope.showList = true;
    $scope.allCountriesURL = 'https://restcountries.eu/rest/v2/all';
    $scope.className = 'grid';
    const weatherDetails = {
      base: 'http://api.openweathermap.org/data/2.5/weather?q=',
      APPID: '794ee95e63c5a32aaf88cd813fa2e425',
    };
    let countryList = [],
      filteredList = [];
    $scope.filterCountry = function (test) {
      const regEx = new RegExp(test, 'gi');
      console.log('I am called ', $scope.filterData, regEx, test);
      if (countryList && countryList.length) {
        filteredList = countryList.filter((item) => regEx.test(item.name));
      }
      // Update display Data and page num
      $scope.displayData = filteredList.slice(0, 16);
      $scope.curPage = 1;
      $scope.pages = new Array(parseInt(filteredList.length / 16) + 1);
    };
    const getWeatherReport = function (name) {
      const url = `${weatherDetails.base}${name}&APPID=${weatherDetails.APPID}`;
      httpService.get(url).then(
        (data) => {
          console.log('Country data ', data);
          $scope.showList = false;
          console.log(data.data.weather, ' weather icons');
          $scope.weather = data.data.main;
        },
        (err) => {
          alert(`Sorry!
          No data found for this location`);
          console.log(err);
        }
      );
    };

    app.filter('TempConverter', function () {
      return function (input) {
        console.log('test ', input);
        return input - 273 + '°C';
      };
    });

    $scope.openWeather = function (e) {
      console.log(e, ' check event', e.capital);
      getWeatherReport(e.capital);
    };

    $scope.updatePage = function (page) {
      $scope.curPage = page;
      const start = 16 * (page - 1),
        end = 16 * page;

      if (filteredList.length === countryList.length) {
        $scope.displayData = filteredList.slice(start, end);
      } else {
        $scope.displayData = countryList.slice(start, end);
      }
    };
    $scope.updateState = function () {
      $scope.showList = !$scope.showList;
      filteredList.length = 0;
      $scope.curPage = 1;
      $scope.pages = new Array(parseInt(countryList.length / 16) + 1);
      $scope.displayData = countryList.slice(0, 16);
    };

    $scope.getData = function (url) {
      if (!countryList.length) {
        httpService.get(url).then(
          (data) => {
            countryList = data.data;
            $scope.curPage = 1;
            $scope.pages = new Array(parseInt(countryList.length / 16) + 1);
            $scope.displayData = countryList.slice(0, 16);
          },
          (err) => {
            console.log(err, ' from error block');
          }
        );
      }
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
