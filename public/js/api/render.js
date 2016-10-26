//filling the table with the current weather data
function renderCurrentWeather(data) {
  var date2 = data.dt;
  var name = data.name;
  var country = data.sys.country;
  var date = new Date(date2 * 1000).toString().slice(0, 15);
  var weather = data.weather[0].description;
  var currentTemp = data.main.temp;
  var windDeg = data.wind.deg;
  var windSpeed = data.wind.speed;
  var cloudiness = data.clouds.all;
  var pressure = data.main.pressure;
  var humidity = data.main.humidity;
  if (data.hasOwnProperty('rain')) {
    var rainArray = $.map(data.rain, function (value, index) {
      return [value];
    })
    var rain = rainArray[0];
  } else {
    var rain = 0;
  }
  var sunrise2 = data.sys.sunrise;
  var sunrise = new Date(sunrise2 * 1000).toString().slice(16, 25);
  var sunset2 = data.sys.sunset;
  var sunset = new Date(sunset2 * 1000).toString().slice(16, 25);
  var geocoordsLat = data.coord.lat;
  var geocoordsLon = data.coord.lon;
  var picPath = getRightWeatherPic(weather);
  var pic = '<div class="forecast-icon"><img src="' + picPath + '" alt="" width=90></div>';
  $('.forecast-icon').empty();
  $('.forecast-icon').append(pic);
  //console.log(rain);
  $('.location').html(name + ', ' + country);
  $('.day').html(date);
  $('.weather-description').html(weather);
  $('.num').html(currentTemp + '℃');
  $('.wind-deg').html('Wind Direction: ' + degToCompass(windDeg));
  $('.wind-speed').html('Wind Speed: ' + windSpeed + 'km/h');
  $('.rain').html('Rain: ' + rain);
};
//dispaying the table with the forecast data
function addToForecastTable(date, tempsWholeDay, windSpeedWholeDay, cloudinessWholeDay, weather, pressureWholeDay) {
  var picPath = getRightWeatherPic(weather);
  var newForecastDiv = $('<div class="forecast forecast-week"></div>');
  var dateToDisplay = date.slice(0, 11);
  var header = '<div class="forecast-header"><div class=day2>' + dateToDisplay + '</div></div>';
  //gets and displays min and max values for a given day
  var tdMin = '<small>' + Math.min.apply(Math, tempsWholeDay) + '℃' + '</small>';
  var forecastContent = $('<div class="forecast-content"></div>');
  var tdMax = '<div class="degree">' + Math.max.apply(Math, tempsWholeDay) + '℃' + '</div>';
  var tdWeather = '<div class="w-desc">' + weather + '</div>';
  var pic = '<div class="forecast-icon"><img src="' + picPath + '" alt="" width=48></div>';
  newForecastDiv.append(header);
  //need the picture
  forecastContent.append(pic);
  forecastContent.append(tdWeather);
  forecastContent.append(tdMax);
  forecastContent.append(tdMin);
  newForecastDiv.append(forecastContent);
  $('.forecast-container').append(newForecastDiv);
};
//this happens when a specific day is being clicked
function renderDataForSpecificDay(data, dayClicked) {
  $.each(data.list, function (index) {
    var date2 = this.dt;
    var date = new Date(date2 * 1000).toString().slice(0, 11);
    var time = new Date(date2 * 1000).toString().slice(16, 25);
    //console.log(date);
    //console.log(dayClicked);
    if (date === dayClicked) {
      var name = this.name;
      var country = this.sys.country;
      var weatherDescription = this.weather[0].description;
      var tempMin = this.main.temp_min;
      var tempMax = this.main.temp_max;
      var windDeg = this.wind.deg;
      var windSpeed = this.wind.speed;
      var cloudiness = this.clouds.all;
      var pressure = this.main.pressure;
      var humidity = this.main.humidity;
      var sunrise2 = this.sys.sunrise;
      var sunrise = new Date(sunrise2 * 1000).toString().slice(16, 25);
      var sunset2 = this.sys.sunset;
      var sunset = new Date(sunset2 * 1000).toString().slice(16, 25);
      //var geocoordsLat = this.coord.lat;
      //var geocoordsLon = this.coord.lon;
      //creating a new header with the time for the given data set
      var timeToDisplay = time;
      var header = '<th>' + time + '</th>';
      $('.f-times').append(header);
      //creating new cells (a new column) for each time
      var tempMinTd = '<td>' + tempMin + '</td>';
      $('.f-min').append(tempMinTd);
      var tempMaxTd = '<td>' + tempMax + '</td>';
      $('.f-max').append(tempMaxTd);
      var weatherDescriptionTd = '<td>' + weatherDescription + '</td>';
      $('.f-weather-description').append(weatherDescriptionTd);
      var windDegTd = '<td>' + windDeg + '</td>';
      $('.f-wind-deg').append(windDegTd);
      var windSpeedTd = '<td>' + windSpeed + '</td>';
      $('.f-wind-speed').append(windSpeedTd);
      var cloudinessTd = '<td>' + cloudiness + '</td>';
      $('.f-cloudiness').append(cloudinessTd);
      var pressureTd = '<td>' + pressure + '</td>';
      $('.f-pressure').append(pressureTd);
      var humidityTd = '<td>' + humidity + '</td>';
      $('.f-humidity').append(humidityTd);
    }
  });
}
