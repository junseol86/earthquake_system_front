var structures = [];
var strMarkers = [];
var strMarkerOpen = '';

// 구조물
function setStructures(_structures) {
  structures = _.orderBy(_structures, ['latitude'],['desc']);
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

  var contentString = '<div class="infoWindow">' + structure.str_branch;
  contentString += ' ' + structure.str_line + '<br>';
  contentString += '<span>' + structure.str_name + '</span></div>';
  var infowindow = new naver.maps.InfoWindow({
    content: contentString
  });
  
  var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(structure.latitude, structure.longitude),
      map: map,
      icon: 'http://35.229.252.63:8080/static/images/mark_' + structure.color + '.png',
      size: new naver.maps.Size(25, 32),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(12.5, 32)
    })

  marker.addListener('click', function() {
    if (strMarkerOpen == marker._nmarker_id) {
      infowindow.close()
      strMarkerOpen = ''
    } else {
      strMarkerOpen = marker._nmarker_id
      infowindow.open(map, marker);
    }
  });

  strMarkers.push(
    marker
  )
}