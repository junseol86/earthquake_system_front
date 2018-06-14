var readyToInit = false;

var earthquake = null;
var map = undefined;
var eqCircle = null;
var structures = [];
var strMarkers = [];
var members = [];
var mbrMarkers = [];

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

    map.addListener('click', function (clicked) {
      console.log(clicked.latLng.lng() + ' ' + clicked.latLng.lat());
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


var drawEqCircleInterval;
function tryDrawEqCircle() {
  drawEqCircleInterval = setInterval(drawEqCircle, 100);
}
function drawEqCircle () {
  if (readyToInit) {
    if (eqCircle != null)
      eqCircle.setMap(null);
    eqCircle = null;
    if (earthquake == null) return;
    var eq = earthquake;
    var dist = 0;

    if (eq.eq_type == 'inland') {
      if (eq.eq_strength >= 3.5 & eq.eq_strength < 4) {
        dist = 25;
      } else if (eq.eq_strength >= 4 && eq.eq_strength < 5) {
        dist = 50;
      } else if (eq.eq_strength >= 5) {
        dist = 100;
      }
    } else if (eq.eq_type == 'waters') {
      if (eq.eq_strength >= 4 & eq.eq_strength < 4.5) {
        dist = 25;
      } else if (eq.eq_strength >= 4.5 && eq.eq_strength < 5.5) {
        dist = 50;
      } else if (eq.eq_strength >= 5.5) {
        dist = 100;
      }
    }
    eqCircle = new google.maps.Circle({
      strokeColor: '#527CE9',
      strokeOpacity: 0.67,
      fillColor: '#527CE9',
      fillOpacity: 0.3,
      map: map,
      center: {
        lat: Number(earthquake.latitude),
        lng: Number(earthquake.longitude),
      },
      radius: dist * 1000
    });
    clearInterval(drawEqCircleInterval);
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
      addStrMarker(structure)
    });
    strMarkers.forEach(function(strMarker) {
      strMarker.setMap(map);
    })
    clearInterval(showStructuresInterval);
  }
}

function addStructure(structure) {
  structures.push(structure)
  addStrMarker(structure)
}

function addStrMarker(structure) {

  var mkrImg = {
    url: 'http://35.229.252.63:8080/static/images/mark_' + structure.color + '.png',
    size: new google.maps.Size(25, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 16)
  }

  strMarkers.push(
    new google.maps.Marker({
      position: {
        lat: Number(structure.latitude),
        lng: Number(structure.longitude)
      },
      map: map,
      title: structure.str_name,
      icon: mkrImg
    })
  )
}

var showStructuresInterval;
function tryShowStructues() {
  showStructuresInterval = setInterval(showStructures, 100);
}

function setMembers(_members) {
 members = _members;
 tryShowMembers();
}

function showMembers() {
  if (readyToInit) {
    mbrMarkers.forEach(function(mbrMarker) {
      mbrMarker.setMap(null);
    });
    mbrMarkers = [];

    members.forEach(function(member) {
      mbrMarkers.push(
        new google.maps.Marker({
          position: {
            lat: Number(member.latitude),
            lng: Number(member.longitude)
          },
          map: map,
          label: 'M',
          title: member.mbr_name
        })
      )
    })
    clearInterval(showMembersInterval)
  }
}

var showMembersInterval;
function tryShowMembers() {
  showMembersInterval = setInterval(showMembers, 100);
}