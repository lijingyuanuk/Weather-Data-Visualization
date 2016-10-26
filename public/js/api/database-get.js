//function which is executed when the search btn is clicked, evaluates whether relevant data is in the database or a new call to
//the weather api has to be made
function searchInit(searchVal) {
  var location = searchVal;

  $.getJSON('weather/getmainlist', function (data) {
    var d = new Date().valueOf();
    //checking whether there is relevant data in the database

    if (lookForRelevantData(data, location, d)) {
      console.log('up to date data available in the database');
      //
      return true;
    } else {
      //if there is outdated data for this location and it has to be removed (forecast data)
      if (isTheCityAlreadyInTheDb(data, location)) {
        console.log('data in the database outdated');
        deletePrevForecastDataAndGetNew(location, searchVal);
      } else {
        //no data for this location
        console.log('data not yet in the database');
        makeWeatherApiCallCurrentWeather(searchVal);
        makeWeatherApiCallForecast(searchVal);
      }
    }
  });

};
//function which checks whether there is outdated data for this location and it has to be removed (forecast data)
function isTheCityAlreadyInTheDb(data, location) {
  var retVal = false;
  $.each(data, function (index) {
    console.log(location);
    console.log(this.city);
    if (location.toLowerCase() === this.city.toLowerCase()) {
      retVal = true;
      return true;
    }
  });
  return retVal;
};
//checking whether there is relevant data in the database
function lookForRelevantData(data, location, d) {
  var retVal = false;
  $.each(data, function (index) {
    if (location.toLowerCase() === this.city.toLowerCase()) {
      var storedDate = this.date
      var convertedDate = new Date(storedDate * 1000).valueOf();
      var timeDiff = d - convertedDate;
      var timeDiffToHours = timeDiff / 1000 / 60 / 60;
      //data is considered relevant when it is not older than 2 hours
      if (timeDiffToHours < 2) {
        // if there is such data, make a call to the database
        console.log('information in the database');
        getCurrentWeatherData(location, storedDate);
        retVal = true;
        return true;
      }
    }
  });
  return retVal;
};
//getting current weather data from the databse for the specific location
function getCurrentWeatherData(location, storedDate) {
  console.log('getCurrentWeatherData executing');
  var id = location + '_' + storedDate;
  $.getJSON('weather/getweatherdata/' + id, function (data) {
    console.log('current weather data from the database');
    renderCurrentWeather(data);
  });
  getWeatherForecastData(location);
};
//getting weather forecast data from the databse for the specific location
function getWeatherForecastData(location) {
  console.log('getWeatherForecastData executing');
  var id = location + '_' + 'forecast';
  $.getJSON('weather/getweatherdata/' + id, function (data) {
    console.log(' weather forecast data from the database');
    sortForecastperDay(data);
  });
};

//making a call to the database to get data for a specific day
function makeCallForSpecificDay(location, dayClicked) {
  var id = location.toLowerCase() + '_' + 'forecast';
  $.getJSON('weather/getweatherdata/' + id, function (data) {
    //console.log(data.list);
    renderDataForSpecificDay(data, dayClicked);
  });
}
