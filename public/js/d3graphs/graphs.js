/*
Draws three bar charts with lines to indicates different data attributes.
*/
function wind (data) {
// Get the data
var arr = [];
for(var i=0; i< data.list.length; i++) {
  arr.push({
     date: data.list[i].dt_txt,
     clouds: data.list[i].clouds.all,
     wind: data.list[i].wind.speed,
  });
}

var margin = {top: 30, right: 40, bottom: 100, left: 80},
 ww = document.getElementById("chart").clientWidth,            
 //makes the svg part responsive to different devices.
 width = ww - margin.left - margin.right,
 height = 600 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
     arr.forEach(function(d) {
     d.date = parseDate(d.date);
     d.temp = +d.temp;
     d.humidity = +d.humidity;
     d.clouds = +d.clouds;
     d.pressure = +d.pressure;
 });
d3.selectAll("svg > *").remove();

var formatTime = d3.time.format("%b-%a %H:%M");
var x = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(arr, function(d) { return d.date; }));

var y = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(arr,function(d) { return d.wind;}));

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b-%d %H:%M"));

var yAxis = d3.svg.axis().scale(y)
    .orient("left");

// Defines the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.wind); });

// Defines the div for the line graph tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("svg")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 svg.append("g")         // Adds the X Axis
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
 .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", ".15em")
     .attr("transform", "rotate(-40)" );      //Rotates the text label for x-axis

 svg.append("g")         // Adds the Y Axis
     .attr("class", "y axis")
 .attr("id", "leftYAxis")
     .call(yAxis);

 svg.append("path")      // Adds the valueline path.
     .datum(data)
     .attr("class", "line")
     .attr("id", "line")
     .attr("d", valueline(arr));

//Adds the scatterplot
 svg.selectAll("dot")
     .data(arr)

 .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return x(d.date); })
     .attr("cy", function(d) { return y(d.wind); })
     .attr("id", "dots")
     .on("mouseover", function(d) {
         div.transition()
             .duration(200)
             .style("opacity", .9);
         div .html( "Date:"+formatTime(d.date) + "<br/>"+ "wind speed:" + d.wind)
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
         })
     .on("mouseout", function(d) {
         div.transition()
             .duration(500)
             .style("opacity", 0);
     });

 //Adds the line title
 svg.append("text")
    .attr("x", width)
    .attr("y", margin.bottom + height)
    .attr("class", "legend")
    .style("fill", "red")
    .on("click", function(){
     //Determines if current line is visible

     var active   = line.active ? false : true ,
         newOpacity = active ? 0 : 1;

     // Hides or shows the elements
     d3.select("#line").style("opacity", newOpacity);
     d3.select("#leftYAxis").style("opacity", newOpacity);
     d3.selectAll("#dots").style("opacity", newOpacity);       //Hides all dots within the line
     // Updates whether or not the elements are active
     line.active = active;
   })
      .text("Line");

    //Adds titles to the axes
 svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", margin.bottom + height)
    .text("Date & Time");

 svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -90)
    .attr("y", -60)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .text("Wind");
}

function TempCloud(data) {
// Gets the data
var arr = [];
for(var i=0; i< data.list.length; i++) {
  arr.push({
     date: data.list[i].dt_txt,
     temp: data.list[i].main.temp,
     humidity:data.list[i].main.humidity,
     clouds: data.list[i].clouds.all,
     wind: data.list[i].wind.speed,
     pressure:data.list[i].main.pressure
  });
}

var margin = {top: 30, right: 40, bottom: 100, left: 80},
    ww = document.getElementById("chart").clientWidth,         //Makes the svg part responsive to different devices.
    width = ww - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
arr.forEach(function(d) {
     d.date = parseDate(d.date);
     d.temp = +d.temp;
     d.humidity = +d.humidity;
     d.clouds = +d.clouds;
     d.pressure = +d.pressure;
 });
d3.selectAll("svg > *").remove();

var formatTime = d3.time.format("%b-%a %H:%M");
var x = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(arr, function(d) { return d.date; }));

var y = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(arr,function(d) { return d.temp;}));

var y1 = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(arr,function(d) { return d.clouds;}));

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b-%d %H:%M"));

var yAxis = d3.svg.axis().scale(y)
    .orient("left");

var yAxis1 = d3.svg.axis().scale(y1)
    .orient("right");

// Defines the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temp); });

// Defines the div for the line graph tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Defines the div for the bar chart tooltip
var divbar = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("svg")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 svg.append("g")         // Adds the X Axis
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", ".15em")
     .attr("transform", "rotate(-40)" );          //Rotates the text label for x-axis
 svg.append("g")         // Adds the Y Axis
     .attr("class", "y axis")
     .attr("id", "leftYAxis")
     .call(yAxis);

svg.append("g")
     .attr("class", "yAxis1")
     .attr("transform", "translate(" + width + " ,0)")
     .attr("id", "rightYAxis")
     .call(yAxis1);
 svg.append("path")      // Adds the valueline path.
     .datum(data)
     .attr("class", "line")
     .attr("id", "line")
     .attr("d", valueline(arr));

// Adds the bar chart
 svg.selectAll('.chart')
     .data(arr)
     .enter().append('rect')
     .attr('class', 'bar')
     .attr("id", "barchart")
     .attr('x', function(d) { return x(new Date(d.date)); })
     .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom -y1(d.clouds))})
     .attr('width', 10)
     .attr('height', function(d) { return height - y1(d.clouds) })
     //Adds mouse events
     .attr('fill', 'grey')
     .on('mouseover',function(d){
 d3.select(this)
     .attr('fill','orange');
 divbar.transition()
     .duration(200)
     .style("opacity", .9);
 divbar.html( "Date:"+formatTime(d.date) + "<br/>"+ "Cloudiness:" + d.clouds)
     .style("left", (d3.event.pageX) + "px")
     .style("top", (d3.event.pageY - 28) + "px");
 })
     .on('mouseout',function(d){
 d3.select(this)
     .attr('fill','grey');
  divbar.transition()
     .duration(500)
     .style("opacity", 0);
 });

// Adds the scatterplot
 svg.selectAll("dot")
     .data(arr)

     .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return x(d.date); })
     .attr("cy", function(d) { return y(d.temp); })
     .attr("id", "dots")
     .on("mouseover", function(d) {
 div.transition()
     .duration(200)
     .style("opacity", .9);
 div .html( "Date:"+formatTime(d.date) + "<br/>"+ "Temperature:" + d.temp)
     .style("left", (d3.event.pageX) + "px")
     .style("top", (d3.event.pageY - 28) + "px");
     })
     .on("mouseout", function(d) {
 div.transition()
     .duration(500)
     .style("opacity", 0);
     });

 // Adds the bar chart title
 svg.append("text")
    .attr("x", 0)
    .attr("y", margin.bottom + height)
    .attr("class", "legend")
    .style("fill", "blue")
    .on("click", function(){
     // Determine if current line is visible
  var activebar  = barchart.active ? false : true,
      newOpacity = activebar ? 0 : 1;
     // Hide or show the elements
 d3.selectAll("#barchart").style("opacity", newOpacity);
 d3.select("#rightYAxis").style("opacity", newOpacity);
     // Update whether or not the elements are active
     barchart.active = activebar;
   })
   .text("Cloudiness BarChart");

 // Add the line title
 svg.append("text")
    .attr("x", width-160)
    .attr("y", margin.bottom + height)
    .attr("class", "legend")
    .style("fill", "red")
    .on("click", function(){
     // Determine if current line is visible

    var active = line.active ? false : true ,
        newOpacity = active ? 0 : 1;

     // Hide or show the elements
     d3.select("#line").style("opacity", newOpacity);
     d3.select("#leftYAxis").style("opacity", newOpacity);
     d3.selectAll("#dots").style("opacity", newOpacity);       //hide all dots within the line
     // Update whether or not the elements are active
     line.active = active;
   })
   .text("Temperature Line");

// Adds titles to the axes
  svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width/2)
     .attr("y", margin.bottom + height)
     .text("Date & Time");
 svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("x", -90)
     .attr("y", -60)
     .attr("dy", "1em")
     .attr("transform", "rotate(-90)")
     .text("Temperature");
}

function PressureHumid(data) {
// Get the data
var arr = [];
for(var i=0; i< data.list.length; i++) {
  arr.push({
   date: data.list[i].dt_txt,
   temp: data.list[i].main.temp,
   humidity:data.list[i].main.humidity,
   clouds: data.list[i].clouds.all,
   wind: data.list[i].wind.speed,
   pressure:data.list[i].main.pressure
});
}

var margin = {top: 30, right: 40, bottom: 100, left: 80},
    ww = document.getElementById("chart").clientWidth,         //to make the svg part responsive to different devices.
    width = ww - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

arr.forEach(function(d) {
     d.date = parseDate(d.date);
     d.temp = +d.temp;
     d.humidity = +d.humidity;
     d.clouds = +d.clouds;
     d.pressure = +d.pressure;
 });
d3.selectAll("svg > *").remove();

var formatTime = d3.time.format("%b-%a %H:%M");
var x = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(arr, function(d) { return d.date; }));

var y = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(arr,function(d) { return d.pressure;}));

var y1 = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(arr,function(d) { return d.humidity;}));

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b-%d %H:%M"));

var yAxis = d3.svg.axis().scale(y)
    .orient("left");

var yAxis1 = d3.svg.axis().scale(y1)
    .orient("right");

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.pressure); });

// Define the div for the line graph tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//  Define the div for the bar chart tooltip
var divbar = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("svg")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 svg.append("g")         // Add the X Axis
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
 .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", ".15em")
     .attr("transform", "rotate(-40)" );          //rotate the text label for x-axis

 svg.append("g")         // Add the Y Axis
     .attr("class", "y axis")
     .attr("id", "leftYAxis")
     .call(yAxis);

svg.append("g")
     .attr("class", "yAxis1")
     .attr("transform", "translate(" + width + " ,0)")
     .attr("id", "rightYAxis")
             .call(yAxis1);

 svg.append("path")      // Add the valueline path.
     .datum(data)
     .attr("class", "line")
     .attr("id", "line")
     .attr("d", valueline(arr));

// add the bar chart
 svg.selectAll('.chart')
     .data(arr)
     .enter().append('rect')
     .attr('class', 'bar')
     .attr("id", "barchart")
     .attr('x', function(d) { return x(new Date(d.date)); })
     .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom -y1(d.humidity))})
     .attr('width', 10)
     .attr('height', function(d) { return height - y1(d.humidity) })
     //add mouse events
     .attr('fill', 'grey')
     .on('mouseover',function(d){
d3.select(this)
       .attr('fill','orange');
 divbar.transition()
       .duration(200)
       .style("opacity", .9);
 divbar.html( "Date:"+formatTime(d.date) + "<br/>"+ "Humidity:" + d.humidity)
       .style("left", (d3.event.pageX) + "px")
       .style("top", (d3.event.pageY - 28) + "px");
 })
       .on('mouseout',function(d){
  d3.select(this)
       .attr('fill','grey');
  divbar.transition()
       .duration(500)
       .style("opacity", 0);
 });

// Add the scatterplot
 svg.selectAll("dot")
     .data(arr)
     .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return x(d.date); })
     .attr("cy", function(d) { return y(d.pressure); })
     .attr("id", "dots")
     .on("mouseover", function(d) {
 div.transition()
     .duration(200)
     .style("opacity", .9);
 div .html( "Date:"+formatTime(d.date) + "<br/>"+ "Pressure:" + d.pressure)
     .style("left", (d3.event.pageX) + "px")
     .style("top", (d3.event.pageY - 28) + "px");
    })
     .on("mouseout", function(d) {
 div.transition()
     .duration(500)
     .style("opacity", 0);
    });

 // Add the bar chart title
 svg.append("text")
   .attr("x", 0)
   .attr("y", margin.bottom + height)
   .attr("class", "legend")
   .style("fill", "blue")
   .on("click", function(){
     // Determine if current line is visible
    var activebar = barchart.active ? false : true,
       newOpacity = activebar ? 0 : 1;
     // Hide or show the elements
     d3.selectAll("#barchart").style("opacity", newOpacity);
     d3.select("#rightYAxis").style("opacity", newOpacity);
     // Update whether or not the elements are active
     barchart.active = activebar;
   })
   .text("Humidity BarChart");

 // Add the line title
 svg.append("text")
    .attr("x", width-160)
    .attr("y", margin.bottom + height)
    .attr("class", "legend")
    .style("fill", "red")
    .on("click", function(){
     // Determine if current line is visible
     var active   = line.active ? false : true ,
       newOpacity = active ? 0 : 1;
     // Hide or show the elements
     d3.select("#line").style("opacity", newOpacity);
     d3.select("#leftYAxis").style("opacity", newOpacity);
     d3.selectAll("#dots").style("opacity", newOpacity);       //hide all dots within the line
     // Update whether or not the elements are active
     line.active = active;
   })
   .text("Pressure Line");

// add titles to the axes
 svg.append("text")
 .attr("class", "x label")
 .attr("text-anchor", "end")
 .attr("x", width/2)
 .attr("y", margin.bottom + height)
 .text("Date & Time");
 svg.append("text")
 .attr("class", "y label")
 .attr("text-anchor", "end")
 .attr("x", -90)
 .attr("y", -60)
 .attr("dy", "1em")
 .attr("transform", "rotate(-90)")
 .text("Pressure");
}
