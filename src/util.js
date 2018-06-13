const funcs = {
  isInDay (last_report) {
    if (last_report == null) {
      return false;
    }
    var last = new Date(last_report);
    var now = new Date();
    var hourBefore = now.setDate(now.getDate() - 1);
    return (last > hourBefore);
  },
  willComeUntil (arrive_in) {
    var now = new Date();
    var willComeUntil = new Date(now.getTime() + arrive_in * 60000);
    return ` - ${willComeUntil.getHours()}:${willComeUntil.getMinutes()} 도착`
  },
  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  },
  distBwCoords(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);
  
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }
}

export default funcs
