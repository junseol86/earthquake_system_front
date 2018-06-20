var spots = [];
var spMarkers = [];
var spMarkerOpen = '';

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
        branch: new naver.maps.Size(48, 56),
        ic: new naver.maps.Size(29, 28),
        jc: new naver.maps.Size(29, 28)
      }

      var anchors = {
        branch: new naver.maps.Point(24, 56),
        ic: new naver.maps.Point(14.5, 28),
        jc: new naver.maps.Point(14.5, 28),
      }

      var mkrImg = {
        url: 'http://35.229.252.63:8080/static/images/' + spot.sp_type + '.png',
        size: sizes[spot.sp_type],
        origin: new naver.maps.Point(0, 0),
        anchor: anchors[spot.sp_type]
      }

      var contentString = '<div class="infoWindow">' + spot.sp_name;
      contentString += '</div>';

      var infowindow = new naver.maps.InfoWindow({
        content: contentString
      });

      var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(Number(spot.latitude), Number(spot.longitude)),
          map: map,
          title: spot.sp_name,
          icon: mkrImg
        })

      marker.addListener('click', function() {
        if (spMarkerOpen == marker._nmarker_id) {
          infowindow.close()
          spMarkerOpen = ''
        } else {
          spMarkerOpen = marker._nmarker_id
          infowindow.open(map, marker);
        }
      });

      spMarkers.push(marker)
    })

    clearInterval(showSpotsInterval)
  }

}