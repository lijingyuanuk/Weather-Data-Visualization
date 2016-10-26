/*
The map to show mutiple British cities with icons stored locally.
*/
var map;
function multiCitiesMap(mydata) {
    //Initilises the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 55.9531,
            lng: -3.1889
        },
        zoom: 8,
        scrollwheel: false
    });

    mydata.forEach(function(d) {
        //Requests icons as markers
        var image = "js/maps/icons/" + d.weather[0].icon.toString() + ".png";
        //Creates markers by corresponding lantitudes and longitudes
        var marker = new google.maps.Marker({
            map: map,
            position: {
                lat: d.coord.lat,
                lng: d.coord.lon
            },
            icon: image
        });
        //Specifies the content of information window
        var infowindow = new google.maps.InfoWindow({
            content: "City: " + String(d.name) + "<br/>" +
                "Weather: " + d.weather[0].main + "<br/>" +
                "Description: " + d.weather[0].description + "<br/>" +
                "Temp: " + d.main.temp + "<br/>" +
                "Pressure: " + d.main.pressure + "<br/>" +
                "Humidity: " + d.main.humidity + "<br/>" +
                "Visibility: " + d.visibility + "<br/>" +
                "Wind Speed: " + d.wind.speed + "<br/>" +
                "Clouds: " + d.clouds.all + "<br/>",
            maxWidth: 200
        });
        //Adds listeners of markers to show information window
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    })
}