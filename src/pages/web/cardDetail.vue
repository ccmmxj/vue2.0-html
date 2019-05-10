<template>
  <div style="width:100%;">
    <!--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">-->
      <!--<legend>详情</legend>-->
    <!--</fieldset>-->
    <div class="title">
      <!--<a :href="'/edu/web/video/detail/' + this.companyId + '/' + this.id" >切换到视频版</a>-->
    </div>
    <div style="display: flex;justify-content: center;">
      <img :src="code.imgUrl" style="width: 100% ;height: 80%" />
    </div>
    <div style="display: flex;justify-content: center;">
      <button class="layui-btn btn" id="play" @click="play">播放</button>
      <audio ref='audio' :src="audioUrl" id='audio' :preload="preload" :autoplay="autoplay" :loop="loop">该浏览器不支持audio属性</audio>
      <span style="color:red;font-size:14px;" id="message">{{message}}</span>
    </div>
  </div>
</template>

<script>
import addr from '../../base/addr'

export default {
  name: 'detail',
  data () {
    return {
      code: {},
      audioUrl: '',
      message: '',
      loop: false,
      preload:true,
      autoplay:true
    }
  },
  watch: {
    audioUrl () {
      this.beforeLoad('audio', this.audioUrl)
    }
  },
  computed: {
  },
  methods: {
    play(){
      let audio = document.getElementById('audio')
      if(audio.paused)                     {
        audio.play();//audio.play();// 这个就是播放
      }else{
        audio.pause();// 这个就是暂停
      }
    },
    beforeLoad (type, src) {
      if (type === 'audio') {
        let audio = document.createElement('audio')
        audio.src = src
        audio.type='audio/mpeg'
        audio.load()
      }
    },
    iosInit () {
      function forceSafariPlayAudio () {
        console.log('forceSafariPlayAudio')
        var audioEl = document.getElementById('audio')
        audioEl.type='audio/mpeg'
        audioEl.load() // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
        audioEl.play() // iOS 7/8 仅需要 play 一下
      }
      // document.getElementById('audio').addEventListener('pause', forceSafariPlayAudio, false)
      // document.getElementById('audio').addEventListener('ended', forceSafariPlayAudio, false)
      document.getElementById('audio').addEventListener('play', function () {
        document.getElementById('play').removeEventListener('touchstart', forceSafariPlayAudio, false)
        document.getElementById('message').innerHTML = ''
      }, false)
      document.getElementById('play').addEventListener('touchstart', forceSafariPlayAudio, false)
    },
    getCode () {
      this.$http.ajax('post', '/card/detail/' + this.companyId + '/' + this.id, {}, (data) => {
        console.log(data)
        if (data.success) {
          this.code = data.result
          if (this.code.audioUrl) {
            this.audioUrl = this.code.audioUrl
          } else {
            try{
              this.audioUrl = addr.audioUrl(this.code.content, this.code.type === 1 ? 'en' : 'ch', this.$store.getters.getToken);
            }catch (e) {
              this.$http.ajax('post',host.host + '/baidu/getToken', {}, (data) => {
                console.log(res)
                this.audioUrl = addr.audioUrl(this.code.content, this.code.type === 1 ? 'en' : 'ch', JSON.parse(res.data.result).access_token)
              }, (error) => {
                console.log(error)
              })
            }
          }
        }
      }, (error) => {
        console.log(error)
      })
    },
    autoPlay (name) {

    }
  },
  updated () {

  },
  created () {
    this.id = this.$route.params.id
    this.companyId = this.$route.params.companyId
    this.getCode()
  },
  mounted () {
    console.log(navigator.userAgent.toLowerCase())
    if (document.getElementById('audio').paused || document.getElementById('audio').ended) {
    // if (/(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase())) {
      // this.loop = false
      this.message = '请点击一下屏幕进行播放'
      this.iosInit()
      console.log('forceSafariPlayAudio')
      var time = setInterval(() => {
        console.log('time')
        var audioEl = document.getElementById('audio')
        if (audioEl.paused || audioEl.ended) {
          audioEl.load() // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
          audioEl.play() // iOS 7/8 仅需要 play 一下
        }
        clearInterval(time)
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .title{
    height: 50px;
    width: 100%;
    position: fixed;
    text-align: right;
    right: 10px;
    font-size: 14px;
    top: 20px;
    z-index:1000
  }
</style>
