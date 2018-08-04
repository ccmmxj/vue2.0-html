<template>
  <div style="width:100%;">
    <!--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">-->
      <!--<legend>详情</legend>-->
    <!--</fieldset>-->
    <div class="title"><a :href="'/edu/web/video/detail/' + this.companyId + '/' + this.id" >切换到视频版</a></div>
    <div style="display: flex;justify-content: center;">
      <img :src="code.imgUrl" style="width: 100% ;height: 80%" />
    </div>
    <div style="display: flex;justify-content: center;">
      <audio ref="audio" :src="audioUrl" id="audio" preload="auto" autoplay="" loop="" >该浏览器不支持audio属性</audio>
      <span style="color:red;font-size:14px;">{{message}}</span>
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
      message: ''
    }
  },
  watch: {
    audioUrl () {
      function forceSafariPlayAudio() {
        audioEl.load(); // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
        audioEl.play(); // iOS 7/8 仅需要 play 一下
      }

      var audioEl = this.$refs.audio;
      // audioEl.addEventListener('play', function() {
      //   // 当 audio 能够播放后, 移除这个事件
      //   window.removeEventListener('touchstart', forceSafariPlayAudio, false);
      // }, false);
      window.addEventListener('touchstart', forceSafariPlayAudio, false);
      // var event = document.createEvent('Events');
      // event.initEvent('touchstart', true, true);
      // window.dispatchEvent(event)
    }
  },
  methods: {
    getCode () {
      this.$http.ajax('post', '/card/detail/' + this.companyId + '/' + this.id, {}, (data) => {
        console.log(data)
        if (data.success) {
          this.code = data.result
          if (this.code.audioUrl) {
            this.audioUrl = this.code.audioUrl
          } else {
            this.audioUrl = addr.audioUrl(this.code.content, this.code.type === 1 ? 'en' : 'ch')
          }
        }
      }, (error) => {
        console.log(error)
      })
    },
    autoPlay (name) {
      console.log("autoPlay")
      var audioEl = $(name)
      document.addEventListener('DOMContentLoaded', function () {
        audioEl.load(); // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
        audioEl[0].play()
      });
      document.addEventListener('touchstart', function () {
        audioEl.load(); // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
        audioEl[0].play()
      });
    }
  },
  created () {
    this.id = this.$route.params.id
    this.companyId = this.$route.params.companyId
    this.getCode()
  },
  mounted () {
    console.log(navigator.userAgent.toLowerCase())
    if (/(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase())) {
        this.message = '请点击一下屏幕进行播放'
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
    right: 10px;    font-size: 14px;
    top: 20px;
    z-index:1000
  }
</style>
