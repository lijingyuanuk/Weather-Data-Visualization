//to get the right picture for the given weather description
function getRightWeatherPic(weather) {
  var halfSun = 'images/icons/icon-1.svg';
  var fullSun = 'images/icons/icon-2.svg';
  var fewClouds = 'images/icons/icon-3.svg';
  var clouds = 'images/icons/icon-5.svg';
  var scatteredClouds = 'images/icons/icon-6.svg';
  var mist = 'images/icons/icon-7.svg';
  var lightRain = 'images/icons/icon-9.svg';
  var heavyRain = 'images/icons/icon-10.svg';
  var storm = 'images/icons/icon-11.svg';
  var lightSnow = 'images/icons/icon-13.svg';
  var heaySnow = 'images/icons/icon-14.svg';
  switch (weather) {
    case 'clear sky':
      return fullSun;
      break;
    case 'few clouds':
      return fewClouds;
      break;
    case 'scattered clouds':
      return clouds;
      break;
    case 'broken clouds':
      return clouds;
      break;
    case 'shower rain':
      return lightRain;
      break;
    case 'light rain':
      return lightRain;
      break;
    case 'rain':
      return heavyRain;
      break;
    case 'thunderstorm':
      return storm;
      break;
    case 'snow':
      return heaySnow;
      break;
    case 'mist':
      return mist;
      break;
    default:
      return clouds;
  }
}
//adapted from http://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words

function degToCompass(num) {
  val = num / 22.5;
  //console.log(val);
  arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ]
  return (arr[Math.round(val)]);
};
