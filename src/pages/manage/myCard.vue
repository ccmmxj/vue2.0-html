<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>我的卡片</legend>
    </fieldset>

    <div class="layui-form-item">
      <label class="layui-form-label">卡片类型</label>
      <div class="layui-input-inline">
        <LaySelect :options="codeTypes" :value="codeTypes[0]" @change-type="chooseType"></LaySelect>
      </div>
    </div>
    <div>
      <table id="cardlist" lay-filter="test"></table>
    </div>
  </div>
</template>
<script>
import LaySelect from '../../components/manage/LaySelect'
import MyAlert from '../../components/Alert'
import UploadButton from '../../components/manage/UploadButton'
export default {
  components: {
    LaySelect,
    MyAlert,
    UploadButton
  },
  name: 'myCard',
  data () {
    return {
      type: 'chinese',
      imgUrl: '',
      audioUrl: '',
      content: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      codeTypes:
        [{
          code: 'chinese',
          value: '文字'
        },
        {
          code: 'english',
          value: '英语'
        }]
    }
  },
  watch: {
    type () {
      console.log(this.type)
    },
    imgUrl () {
      console.log(this.imgUrl)
    },
    content () {
      console.log(this.content)
    }
  },
  methods: {
    chooseType (item) {
      this.type = item.code
    },
    changeImgUrl (url) {
      this.imgUrl = url
    },
    changeAudioUrl (url) {
      this.audioUrl = url
    },
    submitCode () {
      let message = ''
      if (this.type == null || this.type === '') {
        message += '请选择类型,'
      }
      if (this.content == null || this.content === '') {
        message += '请输入内容,'
      }
      if (this.imgUrl == null || this.imgUrl === '') {
        message += '请上传图片,'
      }
      if (message !== '') {
        alert(message)
        return
      }
      this.$http.ajax('post', '/manage/addCode',
        {
          type: this.type,
          imgUrl: this.imgUrl,
          content: this.content
        },
        (data) => {
          if (data.success) {
            console.log(data.message)
            this.messageAlert = data.message
            this.alertType = 'success'
            this.showAlert = true
          }
        },
        (error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    // index.flow()
  },
  updated () {
  }
}
</script>
