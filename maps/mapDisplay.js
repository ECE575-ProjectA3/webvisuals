// Default map coordinates
var homeLatitude  = 35.75;
var homeLongitude = -78.65;
var homeZoom      = 11;

//Marker configuration
var opacity          = 0.5;
var minSignalGood    = 24;
var minSignalMedium  = 16;
var minSignalPoor    = 8;
var markerIconGood   = 
  'https://maps.gstatic.com/mapfiles/ms2/micons/green.png';
var markerIconMedium = 
  'https://maps.gstatic.com/mapfiles/ms2/micons/yellow.png';
var markerIconPoor   = 
  'https://maps.gstatic.com/mapfiles/ms2/micons/red.png';

// Fetch marker data from the given url and add it to the map
function fetchData(url) {
  $.getJSON(url, function(data) { createMap(data); });
}

// Add a marker with the given properties
function addMarker(latitude, longitude, signal, date, time) {
  // Choose marker based on signal quality
  var icon = (signal >= minSignalGood)   ? markerIconGood
           : (signal >= minSignalMedium) ? markerIconMedium
           : (signal >= minSignalPoor)   ? markerIconPoor
           : null;
  
  if(icon) { var visible = true; } else { var visible = false; }
  
  map.addMarker({
    title: ''+signal,
    lat: latitude,
    lng: longitude,
    opacity: opacity,
    visible: visible,
    icon: icon,
    infoWindow: {
      content: 'Signal: '+signal
        +'<br/>&nbsp&nbspDate: '+date
        +'<br/>&nbsp&nbspTime: '+time
    }
  });
}

// Create a map with the given markers
function createMap(markers) {
  //debug(markers);	//debug console output
  map = new GMaps({
    el:   '#map',
    lat:  homeLatitude,
    lng:  homeLongitude,
    zoom: homeZoom
  });
  
  for(var i in markers) {
    addMarker(markers[i]["latitude"],
              markers[i]["longitude"],
              markers[i]["signalStrength"],
              markers[i]["date"],
              markers[i]["time"]);
  }
}

function debug(data) {
  for(var i in data) {
    console.log(data[i]["latitude"]
           +' '+data[i]["longitude"]
           +' '+data[i]["signalStrength"]
           +' '+data[i]["date"]
           +' '+data[i]["time"]);
  }
  console.log(data);
}
