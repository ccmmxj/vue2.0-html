var host = 'http://220.190.177.127:8080/'
const audio = 'https://ai.baidu.com/aidemo?type=tns2&idx=1&cuid=baidu_speech_demo&cod=2&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5&tex='

export default { host,
  audioUrl (text, type) {
    text = encodeURI(encodeURI(text))
    return audio + text + '&lan=' + type
  }
}
