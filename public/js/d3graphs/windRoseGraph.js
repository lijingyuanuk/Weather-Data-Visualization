//modified WindRoseChart template from https://plot.ly/javascript/wind-rose-charts
function roseGraph(data){
var speedRanges = ["< 3 m/s", "3-6 m/s", "6-9 m/s", "> 9 m/s"]
var compass = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

    function extract() {
        var extracted = []
        var winds = []
        for (var i = 0; i < data.list.length; i++) {
            extracted.push({
                dateNum: data.list[i].dt,
                dateStr: data.list[i].dt_txt,
                icon: data.list[i].weather[0].icon,
                description: data.list[i].weather[0].description,
                dayNight: data.list[i].sys.pod,
                pressure: data.list[i].main.pressure,
                wind: {
                    deg: data.list[i].wind.deg,
                    speed: data.list[i].wind.speed
                }
            })
            winds.push({
                deg: data.list[i].wind.deg,
                speed: data.list[i].wind.speed
            })
        }
        return {
            byDate: extracted,
            winds: winds
        }
    }

    function degToCompass(windArr) {

        var compassArray = windArr
        for (var i = 0; i < compassArray.length; i++) {

            var deg = Math.floor(compassArray[i].deg / 45);
            compassArray[i].deg = compass[deg]
            var speed = Math.floor(compassArray[i].speed / 3)
            compassArray[i].speed = speedRanges[speed]
        }
        return compassArray;
    };

    function speedFreq(range) {
        var freq = [0, 0, 0, 0, 0, 0, 0, 0]
        var speedsArray = degToCompass(extract().winds)
        for (var i = 0; i < compass.length; i++) {
            for (var j = 0; j < speedsArray.length; j++) {
                if (speedsArray[j].speed == range && speedsArray[j].deg == compass[i]) {
                    freq[i] = freq[i] + 1
                }
            }
        }
        return {
            range: range,
            compass: compass,
            freq: freq
        }
    }

    var range1 = speedFreq("> 9 m/s")
    var range2 = speedFreq("6-9 m/s")
    var range3 = speedFreq("3-6 m/s")
    var range4 = speedFreq("< 3 m/s")
    var trace1 = {
        r: range1.freq,
        t: compass,
        name: range1.range,
        marker: {
            color: '#ff0000'
        },
        type: 'area'
    };

    var trace2 = {
        r: range2.freq,
        t: compass,
        name: range2.range,
        marker: {
            color: '#ff9900'
        },
        type: 'area'
    };

    var trace3 = {
        r: range3.freq,
        t: compass,
        name: range3.range,
        marker: {
            color: '#99cc00'
        },
        type: 'area'
    };

    var trace4 = {
        r: range4.freq,
        t: compass,
        name: range4.range,
        marker: {
            color: '#66ccff'
        },
        type: 'area'
    };

    var windRoseData = [trace1, trace2, trace3, trace4];
    var layout = {
        title: 'Wind Speed Forecast Distribution in ' + data.city.name,
        font: {
            size: 16
        },
        legend: {
            font: {
                size: 16
            }
        },
        //radialaxis: {ticksuffix: '%'},
        orientation: 270
    };

    Plotly.newPlot('wind-rose-graph', windRoseData, layout);
	
	$('.svg-container').css('width', '100%')
	$('.svg-container').css('height', '100%')
}