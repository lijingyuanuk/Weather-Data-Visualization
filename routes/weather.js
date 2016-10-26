var app = require('../app.js');
var express = require('express');
var router = express.Router();
var weatherdb = require('../database.js');
module.exports = router;
//getting the main list
router.get('/getmainlist', function (req, res) {
  weatherdb.get('main_list', {
    revs_info: true
  }, function (err, weatherData) {
    res.json(weatherData['cities_and_date']);
  });
});
//get a specific documnet
router.get('/getweatherdata/:id', function (req, res) {
  weatherdb.get(req.params.id, {
    revs_info: true
  }, function (err, weatherData) {
    res.json(weatherData['weather_data']);
  });
});
//add a new location and time to the main list
router.post('/addtothelist', function (req, res) {
  weatherdb.get('entryID', {
    revs_info: true
  }, function (err, entryID) {
    if (!err) {
      var next_entry = entryID['next_entry'];
      weatherdb.get('main_list', {
        revs_info: true
      }, function (err, wdata) {
        if (!err) {
          wdata['cities_and_date'][next_entry] = req.body;
          entryID['next_entry'] = next_entry + 1;
          updateWeatherDB(entryID, wdata);
          res.writeHead(201, {
            'Location': next_entry
          });
          res.end();
        }
      });
    }
  });
});
function updateWeatherDB(entryID, wdata) {
  weatherdb.insert(entryID, 'entryID', function (err_e, e) {
    weatherdb.insert(wdata, 'main_list', function (err_t, t) {
      console.log('Added task to CouchDB');
      console.log(err_e);
      console.log(err_t);
    });
  });
};
//creating a new document for current weather data
router.post('/sendcurrentweatherdata/:id', function (req, res) {
  //var next_entry = entryID['next_entry'];
  weatherdb.insert(req.body, req.params.id, function (err, body) {
    if (!err) {
      //    entryID['next_entry'] = next_entry + 1;
      //      res.writeHead(201, {
      //      'Location': next_entry
      //    });
      res.end();
    }
  });
});
//creating a new document for forecast data
router.post('/sendforecastdata/:id', function (req, res) {
  //var next_entry = entryID['next_entry'];
  weatherdb.insert(req.body, req.params.id, function (err, body) {
    if (!err) {
      //    entryID['next_entry'] = next_entry + 1;
      //      res.writeHead(201, {
      //      'Location': next_entry
      //    });
      res.end();
    }
  });
});
//for deleting the whole  document, id is the name of the document
router.delete ('/deletedoc/:id', function (req, res) {
  weatherdb.get(req.params.id, function (err, body, header) {
    if (!err) {
      weatherdb.destroy(req.params.id, body._rev, function (err, body, header) {
        if (!err) {
          res.send(200, {
            message: 'deleted '
          });
        }
      });
    }
  });
});
