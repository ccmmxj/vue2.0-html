<template>
  <div class="body">
    <div class="center">
      <router-view></router-view>
    </div>
    <Footer class="footer"></Footer>
    <div class="advert bottom">
      <Advert v-if="bottom != null" type="bottom" :toUrl="bottom.toUrl" :advertUrl="bottom.advertUrl"></Advert>
    </div>
    <div class="advert">
      <Advert v-if="rights != null" v-for="(item , index) in rights" v-bind:key="item.id" type="right" :to-url="item.toUrl" :advert-url="item.advertUrl"></Advert>
    </div>
  </div>
</template>
<script>
// import '../assets/baguetteBox'
import Footer from '../components/footer'
import Advert from '../components/Advert'

export default {
  components: {
    Footer,
    Advert
  },
  data () {
    return {
      bottom: {},
      rights: []
    }
  },
  created () {
    this.$store.dispatch('fetchToken', {})
  },
  mounted () {
    this.$http.ajax('post', 'advert/list', {type: 0}, (data) => {
      console.log(data)
      if (data.success) {
        this.bottom = data.result[0]
      }
    }, (error) => {
      console.log(error)
      this.$store.dispatch('logout')
    })
    this.$http.ajax('post', 'advert/list', {type: 1}, (data) => {
      console.log(data)
      if (data.success) {
        this.rights = data.result
      }
    }, (error) => {
      console.log(error)
      this.$store.dispatch('logout')
    })
  }
}
</script>
<style scoped>
  .bottom{
    position: fixed;
    bottom: 30px;
    width: 100%;
    height: 50px;
    overflow-y: hidden;
    right: auto;
    opacity: 0.8;
  }
  .advert{
    position: fixed;
    bottom: 30px;
    right: 5px;
    opacity: 0.8;
  }
  .center{
    height:95%;
    overflow-y: scroll;
  }
  .footer{
    height:5%
  }
  .body {
    height: 100%;
    width: 100%;
    position: fixed;
  }
</style>
