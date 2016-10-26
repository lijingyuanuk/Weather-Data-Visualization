//adding a new entry to the main list, happens when a new call to the weather api is made
function updateMainWeatherList(locationAndTime, weatherData) {

var dataToSend = JSON.stringify(locationAndTime);
  $.ajax({
    type: 'POST',
    data: dataToSend,
    url: '/weather/addtothelist',
    processData: false,
    contentType: 'application/json; charset=UTF-8',
  }).done(function (res) {
  sendCurrentWeatherData(weatherData);
  }).fail(function (res) {
    alert(res.responseText);
  });
};

//sending current weather data to the database, happens when a new call to the weather api is made
function sendCurrentWeatherData( weatherData) {
//add to the list and create a new document
var date = weatherData.dt;
var name = weatherData.name.toLowerCase();

var id = name.toLowerCase() + '_' + date;

var dataToSend2 = { "weather_data" : weatherData};
var dataToSend = JSON.stringify(dataToSend2);
//id is the name

  $.ajax({
    type: 'POST',
    data: dataToSend,
    url: '/weather/sendcurrentweatherdata/' + id,
    processData: false,
    contentType: 'application/json; charset=UTF-8',
  }).done(function (res) {

  }).fail(function (res) {
    alert(res.responseText);
  });

};
//deleting previous forecast data from the database (only one such doc per location is stored, deleted when outdated) and starting new calls to the weather api
function deletePrevForecastDataAndGetNew(cityName, searchVal) {
  console.log('deletePrevForecastDataThenSendNew function')

var id = cityName.toLowerCase() + "_" + 'forecast';

  $.ajax({
    type: 'DELETE',
    url: '/weather/deletedoc/' + id
  }).done(function (res) {
    makeWeatherApiCallCurrentWeather(searchVal);
    makeWeatherApiCallForecast(searchVal);

  }).fail(function (res) {
    alert(res.responseText);
  });

};

//sending forecast weather data to the database, happens when a new call to the weather api is made
function sendForecastData(forecastData, cityName) {
  //console.log('sendForecastData function')

var id = cityName.toLowerCase() + "_" + 'forecast';

var dataToSend2 = { "weather_data" : forecastData};
var dataToSend = JSON.stringify(dataToSend2);
//id is the name

  $.ajax({
    type: 'POST',
    data: dataToSend,
    url: '/weather/sendforecastdata/' + id,
    processData: false,
    contentType: 'application/json; charset=UTF-8',
  }).done(function (res) {

  }).fail(function (res) {
    alert(res.responseText);
  });

};
