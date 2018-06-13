var readyToInit = false;

var map = undefined;
var eqCircles = [];
var radPerTeam = 1600;
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
        lat: Number(earthquake.latitude),
        lng: Number(earthquake.longitude),
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