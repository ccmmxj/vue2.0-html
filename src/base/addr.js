var host = 'http://edu.ccmmxj.club:8001/'
const audio = 'https://ai.baidu.com/aidemo?type=tns2&idx=1&cuid=baidu_speech_demo&cod=2&ctp=1&pdt=1&spd=1&per=0&vol=5&pit=5&tex='
// const tok = '24.5fd78c441f04077f5c5a39a7c13cba70.2592000.1535940789.282335-11380858'
const ios_audio = 'http://tsn.baidu.com/text2audio?tok={tok}&cuid=baidu_speech_demo&ctp=1&spd=1&pit=3&vol=5&per=0&tex='

export default { host,
  audioUrl (text, type,tok) {
    text = encodeURI(encodeURI(text))
    if (/(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase())) {
      return ios_audio.replace(/{tok}/g,tok?tok:'25.4b67f52977b0536f4c076e00a756b730.315360000.1853140259.282335-11380858') + text + '&lan=zh'
    }
    return audio + text + '&lan=' + type
  }
}
