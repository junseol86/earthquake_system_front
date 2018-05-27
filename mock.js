const firstName = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오']
const nameSyl = ['민', '준', '지', '훈', '현', '우', '진', '건', '예', '도', '동', '재', '상', '호']
import _ from 'lodash'

export default new function() {
  this.members = () => {
    var result = [];
    for (var i = 0; i < 77; i++) {
      var member = {
        mbr_idx: i,
        mbr_team: Math.floor(i / 7),
        mbr_name: _.sample(firstName) + _.sample(nameSyl) + _.sample(nameSyl)
      }
      result.push(member)
    }
    return result
  }
  this.teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  this.memberNamesSorted = () => {
    return _.orderBy(this.members(), ['mbr_name'], ['asc'])
  }
  this.chats = () => {
    return [
      {
        msg_idx: 11,
        msg_from_idx: '',
        msg_from_name: 'HQ',
        msg_to_which: 'team',
        msg_to_idx: '4',
        msg_to_name: '전체',
        msg_content: '도착하면 바로 메시지들 주고.',
        msg_datetime: '2018-05-22 13:13:12'
      },
      {
        msg_idx: 10,
        msg_from_idx: '2',
        msg_from_name: '한기호',
        msg_to_which: '',
        msg_to_idx: '',
        msg_to_name: 'HQ',
        msg_content: '알겠습니다.',
        msg_datetime: '2018-05-22 13:11:49'
      },
      {
        msg_idx: 9,
        msg_from_idx: '2',
        msg_from_name: '정규제',
        msg_to_which: '',
        msg_to_idx: '',
        msg_to_name: 'HQ',
        msg_content: '넵.',
        msg_datetime: '2018-05-22 13:11:49'
      },
      {
        msg_idx: 8,
        msg_from_idx: '2',
        msg_from_name: '편승연',
        msg_to_which: '',
        msg_to_idx: '',
        msg_to_name: 'HQ',
        msg_content: '네.',
        msg_datetime: '2018-05-22 13:11:09'
      },
      {
        msg_idx: 7,
        msg_from_idx: '',
        msg_from_name: 'HQ',
        msg_to_which: 'team',
        msg_to_idx: '4',
        msg_to_name: '전체',
        msg_content: '조 편성 일부 수정했으니 알람 온 사람들 체크해봐.  조장들 연락 안된 조원 없나 조방에서 한명 한명 확인하고.',
        msg_datetime: '2018-05-22 13:10:38'
      },
      {
        msg_idx: 6,
        msg_from_idx: '',
        msg_from_name: 'HQ',
        msg_to_which: 'team',
        msg_to_idx: '4',
        msg_to_name: '4조',
        msg_content: 'ㅇㅋ',
        msg_datetime: '2018-05-22 13:03:21'
      },
      {
        msg_idx: 5,
        msg_from_idx: '2',
        msg_from_name: '편승연',
        msg_to_which: '',
        msg_to_idx: '',
        msg_to_name: 'HQ',
        msg_content: '순원이 모레까지 휴가입니다.  정은이도 출장 가있어서 저희 조에 인원 두어 명 더 필요하겠는데요.',
        msg_datetime: '2018-05-22 13:01:13'
      },
      {
        msg_idx: 4,
        msg_from_idx: '',
        msg_from_name: 'HQ',
        msg_to_which: 'team',
        msg_to_idx: '4',
        msg_to_name: '4조',
        msg_content: '박순원이랑 연락 닿는 사람?',
        msg_datetime: '2018-05-22 12:58:35'
      },
      {
        msg_idx: 3,
        msg_from_idx: '',
        msg_from_name: 'HQ',
        msg_to_which: 'member',
        msg_to_idx: '3',
        msg_to_name: '박순원',
        msg_content: '넌 왜 위치가 오키나와로 찍혀',
        msg_datetime: '2018-05-22 12:45:17'
      },
      {
        msg_idx: 2,
        msg_from_idx: '2',
        msg_from_name: '장그래',
        msg_to_which: '',
        msg_to_idx: '',
        msg_to_name: 'HQ',
        msg_content: '트래픽이 있어서 조금 걸리겠네요 ㅠ',
        msg_datetime: '2018-05-22 12:33:12'
      },
      {
        msg_idx: 1,
        msg_from_idx: '1',
        msg_from_name: '김두환',
        msg_to_which: '',
        msg_to_idx: '',
        msg_to_name: 'HQ',
        msg_content: '알겠습니다.',
        msg_datetime: '2018-05-22 12:31:59'
      },
      {
        msg_idx: 0,
        msg_from_idx: '',
        msg_from_name: 'HQ',
        msg_to_which: 'all',
        msg_to_idx: '',
        msg_to_name: '전체',
        msg_content: '각자 위치로 출동바람',
        msg_datetime: '2018-05-22 12:31:04'
      },
    ]
  }
  this.structures = () => {
    return [
      {
        selected: false,
        str_type: '다리',
        str_name: '다리1',
        latitude: 35.750725,
        longitude: 129.3432829
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리2',
        latitude: 35.880724,
        longitude: 129.4432828
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리3',
        latitude: 35.720723,
        longitude: 129.4563829
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리4',
        latitude: 35.786724,
        longitude: 129.4732827
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리5',
        latitude: 35.750726,
        longitude: 129.4532821
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리6',
        latitude: 35.7957245,
        longitude: 129.44328294
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리7',
        latitude: 35.8251255,
        longitude: 129.4632824
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리8',
        latitude: 35.850724,
        longitude: 129.3932830
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리9',
        latitude: 35.740726,
        longitude: 129.3632821
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리10',
        latitude: 35.8007245,
        longitude: 129.49328294
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리11',
        latitude: 35.7807255,
        longitude: 129.4432824
      },
      {
        selected: false,
        str_type: '다리',
        str_name: '다리12',
        latitude: 35.790724,
        longitude: 129.3232830
      }
    ]
  }
  this.earthquakes = () => {
    return [
      {
        eq_type: '내륙',
        eq_datetime: '18-05-17 23:34:28',
        latitude: 35.780724,
        longitude: 129.4832829
      },
      {
        eq_type: '해안',
        eq_datetime: '18-04-01 07:42:10',
        latitude: 35.780724,
        longitude: 129.3432829
      },
      {
        eq_type: '내륙',
        eq_datetime: '18-03-15 17:30:59',
        latitude: 35.720724,
        longitude: 129.5432829
      },
      {
        eq_type: '내륙',
        eq_datetime: '18-03-12 04:28:32',
        latitude: 35.640724,
        longitude: 129.4932829
      }
    ]
  }
}