<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
      <legend>按钮主题</legend>
    </fieldset>

    <div class="layui-btn-container">
      <button type="button" @click="clearResource" class="layui-btn">清除无用卡片资源</button>
    </div>
  </div>
</template>
<script>
import LaySelect from '../../components/manage/LaySelect'
import MyAlert from '../../components/Alert'
import UploadButton from '../../components/manage/UploadButton'
import addr from '../../base/addr'

export default {
  components: {
    LaySelect,
    MyAlert,
    UploadButton
  },
  name: 'other',
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    clearResource () {
      this.$http.ajax('get', '/manage/card/clearResource;jsessionid=' + this.$store.getters.getUser.sessionId,
        {},
        (data) => {
          index.alert(data.message)
        },
        (error) => {
          console.log(error)
          this.$store.dispatch('logout')
        })

    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>
