function loadLS() {
  if (localStorage.getItem('FavouritesWeather') != null) {
    var favsTmp = localStorage.getItem('FavouritesWeather');
    //creating an array by splitting elements
    var favsArray = favsTmp.split('%');
    //console.log(favsArray);
    for (i = 0; i < favsArray.length - 1; i++) {
      var divForFav = $('<div class="one-fav"></div>');
      var span1 = $('<span class="given-fav">' + favsArray[i] + '</span>');
      divForFav.append(span1);
      $('#inner-popup').append(divForFav);
    }
  }
  var deleteButton = $('<button class="delete-fav">Clear Favourites</button>');
  $('#inner-popup').append(deleteButton);
};

function saveToLS() {
  var location2 = $('.location').html();
  var location = location2.substring(0, location2.indexOf(','));
  console.log(location);
  if (localStorage.getItem('FavouritesWeather') != null) {
    var Favourites = localStorage.getItem('FavouritesWeather');
    //using '%' character to divide the stored entries
    Favourites += location + '%';
    localStorage.setItem('FavouritesWeather', Favourites);
  }
  else {
    var Favourites = location + '%';
    localStorage.setItem('FavouritesWeather', Favourites);
  }
};

function deleteFavs() {
  if (localStorage.getItem('FavouritesWeather') != null) {
    //using '%' character to divide the stored articles (since they are stored as one string in the local storage)
    localStorage.FavouritesWeather = '';
  }
}
