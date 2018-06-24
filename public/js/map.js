var readyToInit = false;
var mapReady = false;

var map = undefined;

var earthquake = null;
var eq_level = 0;
var eq_dist = 0;
var eq_color = '';

var eqCircle = null;
var subCircles = [];
var subAnimCircles = [];

var initPos = null;
var initZoom = 5;

function getReadyToInit() {
  readyToInit = true;
}
function initMap() {
  // Create a map object and specify the DOM element for display.
  if (readyToInit) {
    initPos = new naver.maps.LatLng(35.74095, 129.4432829);
    map = new naver.maps.Map('map', {
      center: initPos,
      zoom: initZoom
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
  if (zoom != null && zoom != map.getZoom()) {
    map.setZoom(zoom)
  }
  if (position != null) {
    map.panTo({
      lat: Number(position.latitude),
      lng: Number(position.longitude)
    })
  }
}

function toInitPosZm() {
  // console.log(initPos)
  map.setZoom(initZoom)
  map.panTo(initPos);
}

function setEarthquake(_eq) {
  clearInterval(animSubCircleInterval);

  subCircles.forEach(function(subCircle) {
    subCircle.setMap(null);
  })
  subCircles = [];

  subAnimCircles.forEach(function(subCircle) {
    subCircle.setMap(null);
  })
  subAnimCircles = [];

  if (eqCircle != null)
    eqCircle.setMap(null);
  eqCircle = null;


  earthquake = _eq;
  if (earthquake != null) {
    eq_level = earthquake.eq_level;
    eq_color = ['#25AD4E', '#527CE9', '#FF5925'][eq_level]
    eq_dist = [25, 50, 100][eq_level]
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
  if (mapReady && earthquake != null) {

    eqCircle = new naver.maps.Circle({
      strokeColor: eq_color,
      strokeOpacity: 0.67,
      strokeWeight: 3,
      fillColor: eq_color,
      fillOpacity: 0,
      map: map,
      center: new naver.maps.LatLng(earthquake.latitude, earthquake.longitude),
      radius: eq_dist * 1000
    });

    for (var i = 1; i < eq_dist / 5; i++) {
      var subCircle = new naver.maps.Circle({
        strokeColor: eq_color,
        strokeOpacity: 0.75,
        strokeWeight: 1,
        fillColor: eq_color,
        fillOpacity: 0,
        map: map,
        center: new naver.maps.LatLng(earthquake.latitude, earthquake.longitude),
        radius: i * 5 * 1000
      });
      subCircles.push(subCircle);
    }

    startDrawSubCircleAnim()
    // drawSubCircle();
    clearInterval(drawEqCircleInterval);
  }
}

var animOffset = 0;
var animRepeat = 0;
var animSubCircleInterval;
function startDrawSubCircleAnim () {
  animOffset = 0;
  animRepeat = 0;
  animSubCircleInterval = setInterval(drawSubCircle, 10);
}


function drawSubCircle () {
  subAnimCircles.forEach(function(subCircle) {
    subCircle.setMap(null);
  })
  subAnimCircles = [];

  for (var i = 1; i < 4; i++) {
    var animRad = i * (eq_dist / 4.0) * 1000 + (animOffset * 100);
    var subCircle = new naver.maps.Circle({
      strokeColor: eq_color,
      strokeOpacity: 0,
      strokeWeight: 1,
      fillColor: eq_color,
      fillOpacity: 0.2,
      map: map,
      center: new naver.maps.LatLng(earthquake.latitude, earthquake.longitude),
      radius: animRad 
    });
    subAnimCircles.push(subCircle);
    if (animRad > eq_dist * 1000) {
      animOffset = 0;
      animRepeat += 1;
      if (eq_level + animRepeat > 2) {
        clearInterval(animSubCircleInterval);
      }
    }
  }
  animOffset += 1;
}