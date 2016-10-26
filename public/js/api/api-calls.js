var apikey = '&APPID=ea40ed6cc6f51c8c39c0cd32cbcd7ab4';
var baseURL = 'http://api.openweathermap.org/data/2.5/';
//example calls
//http://api.openweathermap.org/data/2.5/forecast?q=london&APPID=ea40ed6cc6f51c8c39c0cd32cbcd7ab4
//http://api.openweathermap.org/data/2.5/weather?q=StAndrews&APPID=ea40ed6cc6f51c8c39c0cd32cbcd7ab4
//making a call to the weather api for the current weather data
var makeWeatherApiCallCurrentWeather = function (searchVal) {
  var URLstring = baseURL + 'weather?q=' + searchVal + '&units=metric' + apikey;
  $.getJSON(URLstring, function (data) {
    var date2 = data.dt;
    var name = data.name;
    var locationAndTime = {
      'city': name,
      'date': date2
    };
    //send the new information to the database
    updateMainWeatherList(locationAndTime, data);
    //render the data
    globalCurrentData = data;
    renderCurrentWeather(data);
    initMap(globalCurrentData);
  });
};
//making a call to the weather api for the forecast weather data
function makeWeatherApiCallForecast(searchVal) {
  var URLstring = baseURL + 'forecast?q=' + searchVal + '&units=metric' + apikey;
  $.getJSON(URLstring, function (data) {
    var cityName = data.city.name;
    globalForecastData = data;
    sortForecastperDay(data);
    sendForecastData(data, cityName);
  });
};
<<<<<<< HEAD

//Makes a call for the forecast weather data specificed by British area
=======
//sorry, don't know where to call it
>>>>>>> 46f6e6d4f2e85c2b0f0e16a73df520fa04eb753e
makeWeatherApiCall();
function makeWeatherApiCall() {
  //Generates the URL request for making the call
  var URLstring = baseURL + 'box/city?bbox=-10,49,3,58,10&cluster=yes' + apikey;
  $.getJSON(URLstring, function (data) {
    var mydata = data.list;
    //Creates a global variance to transfer data to map functions
    globalMapData = mydata;
  });
};
