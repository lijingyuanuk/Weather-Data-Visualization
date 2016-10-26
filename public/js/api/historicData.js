//rendering the historic data into relevant div
function displayHistoricData() {
  $.getJSON('weather/getmainlist', function (data) {
    $.each(data, function (index) {
      var date2 = this.date;
      var date = new Date(date2 * 1000).toString();
      var singleEntry = $('<p class="historic-entry">' + this.city + '_' + date2 + ':' + date + '</p>');
      $('#inner-popup').append(singleEntry);
    })
  });
};

$(document).on('click', '.historic-entry', function () {
  var entry = $(this).html();
  var id2 = entry.substring(0, entry.indexOf(':'));
  var id = id2.toLowerCase();

  $.getJSON('weather/getweatherdata/' + id, function (data) {
    //console.log('current weather data from the database');
    renderhistoric(data, entry);
  });
});

//rendering the historic data for a specific data entry into relevant div
function renderhistoric(data, entry) {
  $('#inner-popup').empty();
  $('.popup-title').html(entry);
  var name = data.name;
  var country = data.sys.country;
  var weatherDescription = data.weather[0].description;
  var tempMin = data.main.temp_min;
  var tempMax = data.main.temp_max;
  var windSpeed = data.wind.speed;
  var cloudiness = data.clouds.all;
  var pressure = data.main.pressure;
  var humidity = data.main.humidity;
  var contentDiv = $('<div class="historic-data"></div>');
  var tempMinp = $('<p> temp min: ' + tempMin + '</p>');
  var tempMaxp = $('<p> temp max: ' + tempMax + '</p>');
  var windSpeedp = $('<p> wind speed: ' + windSpeed + '</p>');
  var cloudinessp = $('<p> cloudiness: ' + cloudiness + '</p>');
  var pressurep = $('<p> pressure: ' + pressure + '</p>');
  var humidityp = $('<p> humidity: ' + humidity + '</p>');
  contentDiv.append(tempMinp);
  contentDiv.append(tempMaxp);
  contentDiv.append(windSpeedp);
  contentDiv.append(cloudinessp);
  contentDiv.append(pressurep);
  contentDiv.append(humidityp);
  $('#inner-popup').append(contentDiv);
};
