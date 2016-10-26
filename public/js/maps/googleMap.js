/*
The basic map function to locate the city specified, showing
as a marker on Google Map. Information window is provided to
show details.
*/
var map;
function initMap(data) {
    if (data !== undefined) {
        //Initilises the google map
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 25,
                lng: 15
            },
            zoom: 2,
            scrollwheel: false
        });
        //Creates markers by corresponding lantitudes and longitudes
        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: data.coord.lat,
                lng: data.coord.lon
            },
        });
        //Specifies the content of information window
        var infowindow = new google.maps.InfoWindow({
            content: "City: " + String(data.name) + "<br/>" +
                "Weather: " + data.weather[0].main + "<br/>" +
                "Description: " + data.weather[0].description + "<br/>" +
                "Temp: " + data.main.temp + "<br/>" +
                "Pressure: " + data.main.pressure + "<br/>" +
                "Humidity: " + data.main.humidity + "<br/>" +
                "Visibility: " + data.visibility + "<br/>" +
                "Wind Speed: " + data.wind.speed + "<br/>" +
                "Clouds: " + data.clouds.all + "<br/>",
            maxWidth: 200
        });
        //Adds listeners of markers to show information window
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });}
   }