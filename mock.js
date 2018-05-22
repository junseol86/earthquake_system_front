const firstName = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오']
const nameSyl = ['민', '준', '지', '훈', '현', '우', '진', '건', '예', '도', '동', '재', '상', '호']
import _ from 'lodash'

export default {
  members: () => {
    var result = [];
    for (var i = 0; i < 80; i++) {
      var member = {
        mbr_idx: i,
        mbr_team: Math.floor(i / 8 + 1),
        mbr_name: _.sample(firstName) + _.sample(nameSyl) + _.sample(nameSyl)
      }
      result.push(member)
    }
    return result
  }
}