var readyToInit = false;
var mapReady = false;

var map = undefined;

var earthquake = null;
var eq_level = 0;
var eq_dist = 0;
var eq_color = '';

var eqCircle = null;
var subCircles = [];

var initPos = null;
var initZoom = 11;

function getReadyToInit() {
  readyToInit = true;
}
function initMap() {
  // Create a map object and specify the DOM element for display.
  if (readyToInit) {
    initPos = new naver.maps.LatLng(35.74095, 129.4432829);
    map = new naver.maps.Map('map', {
      center: initPos,
      zoom: 5
    });
    mapReady = true;

    // map.addListener('click', function (clicked) {
    //   console.log(clicked.latLng.lng() + ' ' + clicked.latLng.lat());
    // });

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

function toInitPosZm() {
  map.panTo(initPos);
  map.setZoom(initZoom);
}

function setEarthquake(_eq) {

  if (eqCircle != null)
    eqCircle.setMap(null);
  eqCircle = null;

  subCircles.forEach(function(subCircle) {
    subCircle.setMap(null);
  })
  subCircles = [];

  earthquake = _eq;

  if (earthquake == null) return;
  var eq = earthquake;

  if (eq.eq_type == 'inland') {
    if (eq.eq_strength >= 3.5 & eq.eq_strength < 4) {
      eq_level = 0;
      eq_dist = 25;
      eq_color = '#25AD4E'
    } else if (eq.eq_strength >= 4 && eq.eq_strength < 5) {
      eq_dist = 50;
      eq_color = '#527CE9'
    } else if (eq.eq_strength >= 5) {
      eq_dist = 100;
      eq_color = '#FF5925'
    }
  } else if (eq.eq_type == 'waters') {
    if (eq.eq_strength >= 4 & eq.eq_strength < 4.5) {
      eq_dist = 25;
      eq_color = '#25AD4E'
    } else if (eq.eq_strength >= 4.5 && eq.eq_strength < 5.5) {
      eq_dist = 50;
      eq_color = '#527CE9'
    } else if (eq.eq_strength >= 5.5) {
      eq_dist = 100;
      eq_color = '#FF5925'
    }
  }

  tryDrawEqCircle();
}

var drawEqCircleInterval;
function tryDrawEqCircle() {
  if (mapReady) {
    drawEqCircle();
  } else {
    drawEqCircleInterval = setInterval(drawEqCircle, 100);
  }
}
function drawEqCircle () {
  if (mapReady) {

    eqCircle = new naver.maps.Circle({
      strokeColor: eq_color,
      strokeOpacity: 0.67,
      strokeWeight: 3,
      fillColor: eq_color,
      fillOpacity: 0.3,
      map: map,
      center: new naver.maps.LatLng(earthquake.latitude, earthquake.longitude),
      radius: eq_dist * 1000
    });

    for (var i = 1; i < eq_dist / 5; i++) {
      var subCircle = new naver.maps.Circle({
        strokeColor: eq_color,
        strokeOpacity: 0.67,
        strokeWeight: 1,
        fillColor: eq_color,
        fillOpacity: 0,
        map: map,
        center: new naver.maps.LatLng(earthquake.latitude, earthquake.longitude),
        radius: i * 5 * 1000
      });
      subCircles.push(subCircle);
    }

    clearInterval(drawEqCircleInterval);
  }
}
