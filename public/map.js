var readyToInit = false;

var map = undefined;
var eqCircles = [];
var radPerTeam = 1600;
var structures = [];
var strMarkers = [];

function getReadyToInit() {
  readyToInit = true;
}
function initMap() {
  // Create a map object and specify the DOM element for display.
  if (readyToInit) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.74095, lng: 129.4432829},
      zoom: 11
    });
    clearInterval(initInterval);
  }
}

var initInterval;
function tryInitMap () {
  initInterval = setInterval(initMap, 100);
}

function moveToAndZoom (position, zoom) {
  if (position != null) {
    map.panTo({
      lat: Number(position.latitude),
      lng: Number(position.longitude)
    })
  }
  if (zoom != null && zoom != map.getZoom()) {
    map.setZoom(zoom)
  }
}

function drawEqCircles (earthquake) {
  eqCircles.forEach(function (eqCircle) {
    eqCircle.setMap(null);
  });
  eqCircles = [];
  for (var i = 0; i < 10; i++) {
    var eqCircle = new google.maps.Circle({
      strokeColor: '#527CE9',
      strokeOpacity: 0.67,
      fillColor: 'rgba(1, 1, 1, 0)',
      fillOpacity: 0.1,
      map: map,
      center: {
        lat: earthquake.latitude,
        lng: earthquake.longitude,
      },
      radius: radPerTeam * (i + 1)
    });
    eqCircles.push(eqCircle);
  }
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
            lat: Number(structure.latitude),
            lng: Number(structure.longitude)
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