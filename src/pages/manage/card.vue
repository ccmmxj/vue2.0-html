<template>
  <div>
    <blockquote class="layui-elem-quote layui-text">
      鉴于小伙伴的普遍反馈，先温馨提醒两个常见“问题”：1. <a href="/doc/base/faq.html#form" target="_blank">为什么select/checkbox/radio没显示？</a> 2. <a href="/doc/modules/form.html#render" target="_blank">动态添加的表单元素如何更新？</a>
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>卡片</legend>
    </fieldset>

    <div class="layui-form-item">
      <div class="layui-input-block">
        <UploadButton :name="'img'" :url="imgUrl" :title="'上传主题图片'" @changeUrl="changeImgUrl"></UploadButton>
        <!--<div class="layui-upload">-->
          <!--<button type="button" class="layui-btn" name="img">上传主题图片</button>-->
          <!--<div class="layui-upload-list">-->
            <!--<img class="layui-upload-img" id="img" :src="imgUrl" style="width:10%" >-->
            <!--<p id="imgText"></p>-->
            <!--<p id="imgUrl" @click="changeImgUrl" style="border: 0;margin-top: 10px;background: none;"></p>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <UploadButton :name="'audio'" :url="audioUrl" :title="'上传主题音频'" @changeUrl="changeAudioUrl"></UploadButton>
        <!--<div class="layui-upload">-->
          <!--<button type="button" class="layui-btn" id="test6"><i class="layui-icon"></i>上传音频</button>-->
          <!--<div class="layui-upload-list">-->
            <!--<img class="layui-upload-img" id="img" :src="imgUrl" style="width:10%" >-->
            <!--<p id="imgText"></p>-->
            <!--<p id="imgUrl" @click="changeImgUrl" style="border: 0;margin-top: 10px;background: none;"></p>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">卡片类型</label>
      <div class="layui-input-inline">
        <LaySelect :options="codeTypes" :value="codeTypes[type]" @change-type="chooseType"></LaySelect>
        <!--<select v-model="type">-->
          <!--<option v-for="item in codeTypes" :value="item.code" :key="item.code" >{{item.value}}</option>-->
        <!--</select>-->
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">标题</label>
      <div class="layui-input-block">
        <input placeholder="请输入标题" class="layui-input" v-model.lazy="title"/>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">内容</label>
      <div class="layui-input-block">
        <textarea placeholder="请输入内容" class="layui-textarea" v-model.lazy="content"></textarea>
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit="" @click="submitCode">立即提交</button>
      </div>
    </div>
    <my-alert :showAlert="showAlert" :messageAlert="messageAlert" :timeout="2000" :type="alertType"></my-alert>
  </div>
</template>
<script>
import LaySelect from '../../components/manage/LaySelect'
import MyAlert from '../../components/Alert'
import UploadButton from '../../components/manage/UploadButton'
import { eventBus } from '../../eventBus'

export default {
  components: {
    LaySelect,
    MyAlert,
    UploadButton
  },
  name: 'card',
  data () {
    return {
      type: 0,
      imgUrl: '',
      audioUrl: '',
      content: '',
      title: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      codeTypes:
        [{
          code: '0',
          value: '汉字'
        },
        {
          code: '1',
          value: '英语'
        },
        {
          code: '2',
          value: '数字'
        },
        {
          code: '3',
          value: '拼音'
        }]
    }
  },
  watch: {
    imgUrl () {
      console.log('imgUrl:' + this.imgUrl)
    },
    content () {
      console.log('content:' + this.content)
    },
    title () {
      console.log('title:' + this.title)
    },
    type () {
      console.log('type:' + this.type)
      eventBus.$emit('setCurrentSelect', this.type)
      console.log('setCurrentSelect')
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
      if (this.title == null || this.title === '') {
        message += '请输入标题,'
      }
      if (this.imgUrl == null || this.imgUrl === '') {
        message += '请上传图片,'
      }
      if (this.type === '3') {
        if (this.audioUrl == null || this.audioUrl === '') {
          message += '请上传音频,'
        }
      } else {
        if (this.content == null || this.content === '') {
          message += '请输入内容,'
        }
      }
      if (message !== '') {
        index.alert(message)
        return
      }
      this.$http.ajax('post', '/manage/card/saveOrUpdate;jsessionid=' + this.$store.getters.getUser.sessionId,
        {
          id: this.id,
          type: this.type,
          imgUrl: this.imgUrl,
          content: this.content,
          title: this.title,
          audioUrl: this.audioUrl
        },
        (data) => {
          if (data.success) {
            console.log(data.message)
            this.id = data.result.id
            this.messageAlert = data.message
            this.alertType = 'success'
            this.showAlert = true
          }
        },
        (error) => {
          console.log(error)
          this.$store.commit('logoutUser')
        })
    }
  },
  mounted () {
    index.upload(this.$store.getters.getUser.sessionId)
  },
  updated () {
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.$http.ajax('post', '/manage/card/detail;jsessionid=' + this.$store.getters.getUser.sessionId, {id: this.id}, (data) => {
        console.log(data)
        if (data.success) {
          this.type = data.result.type
          this.imgUrl = data.result.imgUrl
          this.audioUrl = data.result.audioUrl
          this.title = data.result.title
          this.content = data.result.content
        }
      }, (error) => {
        console.log(error)
        this.$store.commit('logoutUser')
      })
    }
  }
}
</script>
