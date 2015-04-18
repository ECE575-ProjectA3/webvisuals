// Default map coordinates
var homeLatitude  = 35.75;
var homeLongitude = -78.65;
var homeZoom      = 11;

//Marker configuration
var opacity          = 0.5;

//signal strength color ranges
var minSignalGood    = 3;
var minSignalMedium  = 2;
var minSignalPoor    = 1;

//download speed color ranges
var minDownloadGood   = 6;
var minDownloadMedium = 2;
var minDownloadPoor   = 0;

//upload speed color ranges
var minUploadGood   = 3;
var minUploadMedium = 1;
var minUploadPoor   = 0;

//icons for marker display
var markerIconGood   = 
  'https://maps.gstatic.com/mapfiles/ms2/micons/green.png';
var markerIconMedium = 
  'https://maps.gstatic.com/mapfiles/ms2/micons/yellow.png';
var markerIconPoor   = 
  'https://maps.gstatic.com/mapfiles/ms2/micons/red.png';

//parse input form into parameter string
function parseInput(form) {
	var request = 'request?carrier='+form.carrier.value
		+ '&type='+form.type.value;
	
	//only include non-empty parameters	
	if(form.minDate.value != '') {
		request += '&minDate='+form.minDate.value;
	}
	if(form.maxDate.value != '') {
		request += '&maxDate='+form.maxDate.value;
	}
	if(form.minTime.value != '') {
		request += '&minTime='+form.minTime.value;
	}
	if(form.maxTime.value != '') {
		request += '&maxTime='+form.maxTime.value;
	}
	//alert(request);
	return request;	//return request string
}

// Fetch marker data from the given url and add it to the map
function fetchData(url) {
  $.getJSON(url, function(data) { createMap(data); });
}

// Add a marker with the given properties
function addMarker(latitude, longitude, value, type, time) {
  // Choose marker based on signal quality
  if(type=="signalStrength") {
    var icon = (value >= minSignalGood)   ? markerIconGood
             : (value >= minSignalMedium) ? markerIconMedium
             : (value >= minSignalPoor)   ? markerIconPoor
             : null;
  }
  if(type=="downloadSpeed") {
    var icon = (value >= minDownloadGood)   ? markerIconGood
             : (value >= minDownloadMedium) ? markerIconMedium
             : (value >= minDownloadPoor)   ? markerIconPoor
             : null;
  }
  if(type=="uploadSpeed") {
    var icon = (value >= minUploadGood)   ? markerIconGood
             : (value >= minUploadMedium) ? markerIconMedium
             : (value >= minUploadPoor)   ? markerIconPoor
             : null;
  }
  if(icon) { var visible = true; } else { var visible = false; }

  // Add marker to the map
  map.addMarker({
    title: ''+value,
    lat: latitude,
    lng: longitude,
    opacity: opacity,
    visible: visible,
    icon: icon,
    infoWindow: {
      content: type+': '+value+'<br/>&nbsp&nbspTime: '+time
    }
  });
}

// Create a map with the given markers
function createMap(markers) {
  //debug(markers);
  
  // Draw map panel
  map = new GMaps({
    el:   '#map',
    lat:  homeLatitude,
    lng:  homeLongitude,
    zoom: homeZoom
  });
  
  // Add markers to the map
  for(var i in markers) {
    addMarker(markers[i]["latitude"],
              markers[i]["longitude"],
              markers[i]["dataValue"],
              markers[i]["dataType"],
              markers[i]["dateTime"]);
  }
}

// Console debug output
function debug(data) {
  for(var i in data) {
    console.log(data[i]["latitude"]
           +' '+data[i]["longitude"]
           +' '+data[i]["dataValue"]
           +' '+data[i]["dataType"]
           +' '+data[i]["dateTime"]);
  }
  console.log(data);
}
