$(document).on('click', '.search-weather', function (event) {
  event.preventDefault();
  //console.log('search button clicked');
  var searchVal = $('.search-location').val();
  $('.f-weather-div').hide();
  //delete previous forecasts
  $('.forecast-container').find('.forecast-week').remove();
  searchInit(searchVal);
  $('.forecast-container').fadeIn();
  $('.main-content').fadeIn();
  $('.search-location').val('');
});
$(document).on('click', '.d3-button', function () {
  roseGraph(globalForecastData)
});
//when a specific day is clicked
$(document).on('click', '.day2', function () {
  //  console.log($(this).html());
  $('.f-weather-div').show();
  var dayClicked = $(this).html();
  var location2 = $('.location').html();
  var location = location2.substring(0, location2.indexOf(','));
  $('.f-weather-div').find('td:not(:first-child)').remove();
  $('.f-weather-div').find('th:not(:first-child)').remove();
  $('.day-weather-f').html('Weather for ' + location + ' ' + dayClicked);
  $('html, body').animate({
    scrollTop: $('.f-weather-div').offset().top
  }, 1000);
  makeCallForSpecificDay(location, dayClicked);
});
$(document).on('click', '#close-popup', function () {
  $('#popup-overlay').hide();
});
$(document).on('click', '.favourites-btn', function () {
  //console.log('fdsf');
  event.preventDefault();
  $('#inner-popup').empty();
  $('#popup-overlay').show();
  $('.popup-title').html('Favourite');
  loadLS();
});
$(document).on('click', '.historic-btn', function (event) {
  //console.log('fdsf');
  event.preventDefault();
  $('#inner-popup').empty();
  $('#popup-overlay').show();
  $('.popup-title').html('Historic data');
  displayHistoricData();
});
$(document).on('click', '.add-favs-btn', function () {
  console.log('add to favs button clicked');
  saveToLS();
});
$(document).on('click', '.given-fav', function () {
  $('.forecast-container').find('.forecast-week').remove();
  $('.forecast-container').show();
  $('.main-content').show();
  searchInit($(this).html());
  $('#popup-overlay').hide();
});
$(document).on('click', '.delete-fav', function () {
  var favToDelete = $(this).prev().html();
  console.log(favToDelete);
  //remove this and its sibling
  deleteFavs();
  $('#popup-overlay').hide();
});
