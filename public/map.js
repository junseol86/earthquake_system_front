var readyToInit = false;

var map = undefined;
var structures = [];
var strMarkers = [];

function getReadyToInit() {
  readyToInit = true;
}
function initMap() {
  // Create a map object and specify the DOM element for display.
  if (readyToInit) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.780724, lng: 129.4432829},
      zoom: 12
    });
    clearInterval(initInterval);
  }
}

var initInterval;
function tryInitMap () {
  initInterval = setInterval(initMap, 100);
}

function setStructures(_structures) {
  structures = _structures;
  tryShowStructues();
}

function showStructures() {
  if (readyToInit) {
    strMarkers.forEach(function(strMarker) {
      strMarker.setMap(null);
    });
    strMarkers = [];

    structures.forEach(function(structure) {
      strMarkers.push(
        new google.maps.Marker({
          position: {
            lat: structure.str_latitude,
            lng: structure.str_longitude
          },
          map: map,
          title: structure.str_name
        })
      )
    });
    strMarkers.forEach(function(strMarker) {
      strMarker.setMap(map);
    })
    clearInterval(showStructuresInterval);
  }
}

var showStructuresInterval;
function tryShowStructues() {
  showStructuresInterval = setInterval(showStructures, 100);
}