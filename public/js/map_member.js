var members = [];
var mbrMarkers = [];
var mbrMarkerOpen = '';

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
        size: new naver.maps.Size(26, 41),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(13, 41)
      }

      var contentString = '<div class="infoWindow">';
      contentString += '[' + (member.mbr_team == 0 ? '미편성' : (member.mbr_team + '조')) + '] ';
      contentString += member.mbr_name;
      contentString += member.arrival;
      contentString += '<br>';
      contentString += '☎︎ ' + member.mbr_phone;
      contentString += '</div>';

      var infowindow = new naver.maps.InfoWindow({
        content: contentString
      });

      var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(Number(member.latitude), Number(member.longitude)),
          map: map,
          title: member.mbr_name,
          icon: mkrImg
        })

      marker.addListener('click', function() {
        if (mbrMarkerOpen == marker._nmarker_id) {
          infowindow.close()
          mbrMarkerOpen = ''
        } else {
          mbrMarkerOpen = marker._nmarker_id
          infowindow.open(map, marker);
        }
      });

      mbrMarkers.push(marker)
    })
    clearInterval(showMembersInterval)
  }
}