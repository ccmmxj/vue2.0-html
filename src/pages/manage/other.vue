<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
      <legend>清除模块</legend>
    </fieldset>

    <div class="layui-btn-container">
      <button type="button" @click="clearResource" class="layui-btn">清除无用卡片资源</button>
    </div>
    <my-alert :showAlert="showAlert" :messageAlert="messageAlert" :timeout="2000" :type="alertType"></my-alert>
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
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
    }
  },
  watch: {
  },
  methods: {
    clearResource () {
      layer.sessionId = this.$store.getters.getUser.sessionId
      layer.confirm('确认清除无用卡片资源吗？', function (index) {
        $.ajax({
          method: 'get',
          url: addr.host + 'manage/other/clearResource;jsessionid=' + layer.sessionId,
          dataType: 'json',
          success: (data) => {
            if (data.success) {
              layer.msg(data.message + ',清除了' + data.result + '个资源')
            } else {
              return layer.msg('删除失败')
            }
          },
          error: (error) => {
            console.log(error);
            return layer.msg('系统异常')
          }
        })
      })
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>
