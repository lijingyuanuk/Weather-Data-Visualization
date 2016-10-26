//sorting the forecast data so it can be displayed per whole days (it's received as per 3 hours each day)
function sortForecastperDay(data) {
  //console.log(data.list[0]);

  //drawing the graphs
 TempCloud(data);
 roseGraph(data);

  var cityName = data.city.name;
  var tempsWholeDay = [
  ];
  var windSpeedWholeDay = [
  ];
  var pressureWholeDay = [
  ];
  var cloudinessWholeDay = [
  ];
  var rainWholeDay = [
  ];
  var givenDate = '';
  var firstTime = data.list[0].dt;
  var locationAndTime = cityName.toLowerCase() + '_' + firstTime;
  //console.log(data.list);
  $.each(data.list, function (index) {
    //console.log(data.list);
    var dateTime = this.dt
    var date = new Date(dateTime * 1000).toString().slice(0, 15);
    var weather = this.weather[0].description;
    var currentTemp = this.main.temp;
    var tempMin = this.main.temp_min;
    var tempMax = this.main.temp_max;
    var windDeg = this.wind.deg;
    var windSpeed = this.wind.speed;
    var cloudiness = this.clouds.all;
    var pressure = this.main.pressure;
    var humidity = this.main.humidity;
    var rain = 0 //this.rain[0];
    //if it's the first value in the data set or still data for the same date
    if (givenDate === '' || givenDate === date) {
      givenDate = date;
      tempsWholeDay.push(tempMin);
      tempsWholeDay.push(tempMax);
      windSpeedWholeDay.push(windSpeed);
      pressureWholeDay.push(pressure);
      cloudinessWholeDay.push(cloudiness);
    }
    //if it is the next day in the data

    if (givenDate !== '' && givenDate !== date) {
      //first add the data for the previous day
      addToForecastTable(givenDate, tempsWholeDay, windSpeedWholeDay, cloudinessWholeDay, weather, pressureWholeDay);
      //restart the arrays
      tempsWholeDay = [
      ];
      windSpeedWholeDay = [
      ];
      pressureWholeDay = [
      ];
      rainWholeDay = [
      ];
      cloudinessWholeDay = [
      ];
      givenDate = date;
      tempsWholeDay.push(tempMin);
      tempsWholeDay.push(tempMax);
      windSpeedWholeDay.push(windSpeed);
      pressureWholeDay.push(pressure);
      cloudinessWholeDay.push(cloudiness);
    }
    //if it is the last data entry

    if (index + 1 === data.list.length) {
      addToForecastTable(date, tempsWholeDay, windSpeedWholeDay, cloudinessWholeDay, weather, pressureWholeDay);
    }
  });
};
