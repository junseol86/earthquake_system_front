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
    return ` - ${willComeUntil.getHours()}:${willComeUntil.getMinutes()} 도착`;
  },
  parseIso8601 (dt) {
    var result = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' ;
    result += dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    return result;

  }
}

export default funcs
