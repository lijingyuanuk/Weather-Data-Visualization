$(document).ready(function(){

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(urlGeoRequest);
	} else {
		alert("Geolocation is not supported by this browser.")
	}

	function urlGeoRequest(position) {
		urlGeo = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude +","+position.coords.longitude+"&sensor=true"
		$.get(urlGeo, function(data, status){
			//console.log(data);
			$(".search-location").val(data.results[0].address_components[3].long_name);
			$(".search-weather").click()
		});
	}
});
