<template>
  <div style="width:100%;">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
      <legend>详情</legend>
    </fieldset>
    <div style="display: flex;justify-content: center;">
      <img :src="code.imgUrl" width="50%" />
      <audio loop="" :src="code.audioUrl" id="audio" autoplay="" preload="auto">该浏览器不支持audio属性</audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      code: {}
    }
  },
  methods: {
    getCode (id) {
      this.$http.ajax('post', '/web/getCode', { id: id }, (data) => {
        console.log(data)
        this.code = data.result
      }, (error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getCode(this.$route.params.id)
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
