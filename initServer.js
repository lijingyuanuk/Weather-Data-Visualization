
//adapted from the todo in-class example


var nano = require('nano')('http://localhost:5984');


var entryID = { "next_entry" : 2 };

var init_main_list = { "cities_and_date" :
 { "1": {"city": "london", "date": "1461943022"}}};


var init_current_weather_london = { "weather_data" :
{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"cmc stations",
"main":{"temp":282.421,"pressure":1014.28,"humidity":69,"temp_min":282.421,"temp_max":282.421,"sea_level":1024.25,"grnd_level":1014.28},
"wind":{"speed":7.16,"deg":265.5},"clouds":{"all":56},"dt":1461943022,
"sys":{"message":0.0052,"country":"GB","sunrise":1461904458,"sunset":1461957734},"id":2643743,"name":"London","cod":200}};







 nano.db.destroy('weather', function (err, body) {
   console.log(err);
});

weatherdb = nano.db.use('weather')

nano.db.create('weather', function (err, body) {
    weatherdb = nano.db.use('weather');
    if (!err) {

        // Database didn't exist, so populate it with some initial data
        weatherdb.insert(init_main_list, 'main_list', function(err, body) {
            if (!err) {
                console.log("Initialised main list:");
                console.log(body);
            } else {
                console.log("Error when initialising question info");
                console.log(err);
            }
        });

        weatherdb.insert(init_current_weather_london, 'london_1461943022', function(err, body) {
            if (!err) {
                console.log("Initialised answers info:");
                console.log(body);
            } else {
                console.log("Error when initialising question info");
                console.log(err);
            }
        });

        weatherdb.insert(init_current_weather_london, 'london_forecast', function(err, body) {
            if (!err) {
                console.log("Initialised answers info:");
                console.log(body);
            } else {
                console.log("Error when initialising question info");
                console.log(err);
            }
        });

        weatherdb.insert(entryID, 'entryID', function(err, body) {
            if (!err) {
                console.log("Initialised Entry ID:");
                console.log(body);
            } else {
                console.log("Error when initialising entry ID");
                console.log(err);
            }
        })
    }
});
