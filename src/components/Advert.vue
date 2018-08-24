<template>
  <div>
    <transition name="fade">
      <div v-show="showAdvert">
        <div class="close" @click="closeAdvert('showAdvert')"><i class="layui-icon"></i></div>
        <div class="item" :style="{width :type == 'right'?'120px':'100%',height: type =='right'?'120px':'50px',backgroundImage:'url(' + advertUrl + ')'}" @click="toLink">
          <!--<img src="http://edu.ccmmxj.club/img/zfb2.png" width="120px"/>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Advert',
  props: {
    type: {
      type: String,
      default () {
        return "right"
      }
    },
    advertUrl: {
      type: String,
      default () {
        return 'http://edu.ccmmxj.club/img/zfb2.png'
      }
    },
    toUrl: {
      type: String,
      default () {
        return 'http://edu.ccmmxj.club/img/zfb2.png'
      }
    }
  },
  data () {
    return {
      showAdvert: true
    }
  },
  methods: {
    closeAdvert (name) {
      this[name] = false
    },
    toLink () {
      window.open(this.toUrl)
    }
  }
}
</script>

<style scoped>
  .advert .item{
    margin-bottom: 5px;
    background: no-repeat center center ;
    background-size: 100%;
  }
  .advert .close{
    opacity: 0.8;
    text-align: center;
    width: 20px;
    height: 20px;
    background: #555;
    color: #fff;
    border-radius: 50px;
    float: right;
    margin-right: 2px;
    margin-top: 2px;
    z-index: 10000;
    /*position: fixed;*/
    /*bottom: 125px;*/
    /*right: 10px;*/
    /*opacity: 0.8;*/
    /*text-align: center;*/
    /*width:20px;*/
    /*height:20px;*/
    /*background: #555;*/
    /*color: #fff;*/
    /*border-radius:50px;*/
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 1s ease
  }
  .fade-enter, .fade-leave-active{
    opacity: 0
  }
</style>
