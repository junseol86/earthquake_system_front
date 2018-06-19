var readyToInit = false;
var mapReady = false;

var earthquake = null;
var map = undefined;
var eqCircle = null;
var subCircles = [];
var structures = [];
var spots = [];
var spMarkers = [];
var strMarkers = [];
var members = [];
var mbrMarkers = [];

var initPos = { lat: 35.74095, lng: 129.4432829 };
var initZoom = 11;

function getReadyToInit() {
  readyToInit = true;
}
function initMap() {
  // Create a map object and specify the DOM element for display.
  if (readyToInit) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: initPos,
      zoom: initZoom
    });
    mapReady = true;

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

function toInitPosZm() {
  map.panTo(initPos);
  map.setZoom(initZoom);
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
    if (eqCircle != null)
      eqCircle.setMap(null);
    eqCircle = null;

    subCircles.forEach(function(subCircle) {
      subCircle.setMap(null);
    })
    subCircles = [];

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

    for (var i = 1; i < dist / 5; i++) {
      var subCircle = new google.maps.Circle({
        strokeColor: '#527CE9',
        strokeOpacity: 0.67,
        strokeWeight: 1,
        fillColor: '#527CE9',
        fillOpacity: 0,
        map: map,
        center: {
          lat: Number(earthquake.latitude),
          lng: Number(earthquake.longitude),
        },
        radius: i * 5 * 1000
      });
      subCircles.push(subCircle);
    }

    clearInterval(drawEqCircleInterval);
  }
}

// 구조물

function setStructures(_structures) {
  structures = _structures;
  tryShowStructues();
}

var showStructuresInterval;
function tryShowStructues() {
  if (mapReady) {
    showStructures();
  } else {
    showStructuresInterval = setInterval(showStructures, 100);
  }
}

function showStructures() {
  if (mapReady) {
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
  structures.push(structure);
  addStrMarker(structure);
}

function addStrMarker(structure) {

  var mkrImg = {
    url: 'http://35.229.252.63:8080/static/images/mark_' + structure.color + '.png',
    size: new google.maps.Size(25, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(12.5, 32)
  }

  var contentString = '<div class="infoWindow">' + structure.str_branch;
  contentString += ' ' + structure.str_line + '<br>';
  contentString += '<span>' + structure.str_name + '</span></div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  
  var marker = new google.maps.Marker({
      position: {
        lat: Number(structure.latitude),
        lng: Number(structure.longitude)
      },
      map: map,
      title: structure.str_name,
      icon: mkrImg
    })

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  strMarkers.push(
    marker
  )
}

// 고정장소

function setSpots(_spots) {
  spots = _spots;
  tryShowSpots();
}

var showSpotsInterval;
function tryShowSpots() {
  if (mapReady) {
    showSpots();
  } else {
    showSpotsInterval = setInterval(showSpots, 100);
  }
}

function showSpots() {
  if (mapReady) {
    spMarkers.forEach(function(spMarker) {
      spMarker.setMap(null);
    });
    spMarkers = [];

    spots.forEach(function(spot) {

      var sizes = {
        branch: new google.maps.Size(48, 56),
        ic: new google.maps.Size(29, 28),
        jc: new google.maps.Size(29, 28)
      }

      var anchors = {
        branch: new google.maps.Point(24, 56),
        ic: new google.maps.Point(14.5, 28),
        jc: new google.maps.Point(14.5, 28),
      }

      var mkrImg = {
        url: 'http://35.229.252.63:8080/static/images/' + spot.sp_type + '.png',
        size: sizes[spot.sp_type],
        origin: new google.maps.Point(0, 0),
        anchor: anchors[spot.sp_type]
      }

      var contentString = '<div class="infoWindow">' + spot.sp_name;
      contentString += '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
          position: {
            lat: Number(spot.latitude),
            lng: Number(spot.longitude)
          },
          map: map,
          title: spot.sp_name,
          icon: mkrImg
        })

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      spMarkers.push(marker)
    })

    clearInterval(showSpotsInterval)
  }

}

// 직원

function setMembers(_members) {
 members = _members;
 tryShowMembers();
}

var showMembersInterval;
function tryShowMembers() {
  if (mapReady) {
    showMembers();
  } else {
    showMembersInterval = setInterval(showMembers, 100);
  }
}

function showMembers() {
  if (mapReady) {
    mbrMarkers.forEach(function(mbrMarker) {
      mbrMarker.setMap(null);
    });
    mbrMarkers = [];

    members.forEach(function(member) {

      var mkrImg = {
        url: 'http://35.229.252.63:8080/static/images/member' + (member.arrival.length > 0 ? '_pos' : '') + '.png',
        size: new google.maps.Size(26, 41),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(13, 41)
      }

      var contentString = '<div class="infoWindow">';
      contentString += '[' + (member.mbr_team == 0 ? '미편성' : (member.mbr_team + '조')) + '] ';
      contentString += member.mbr_name;
      contentString += member.arrival;
      contentString += '<br>';
      contentString += '☎︎ ' + member.mbr_phone;
      contentString += '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
          position: {
            lat: Number(member.latitude),
            lng: Number(member.longitude)
          },
          map: map,
          title: member.mbr_name,
          icon: mkrImg
        })

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      mbrMarkers.push(marker)
    })
    clearInterval(showMembersInterval)
  }
}