<template>
  <div>
    <blockquote class="layui-elem-quote layui-text">
      鉴于小伙伴的普遍反馈，先温馨提醒两个常见“问题”：1. <a href="/doc/base/faq.html#form" target="_blank">为什么select/checkbox/radio没显示？</a> 2. <a href="/doc/modules/form.html#render" target="_blank">动态添加的表单元素如何更新？</a>
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>字典</legend>
    </fieldset>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">类型</label>
      <div class="layui-input-block">
        <input placeholder="请输入类型" class="layui-input" v-model.lazy="type"/>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">标题</label>
      <div class="layui-input-block">
        <textarea placeholder="请输入标题" class="layui-textarea" v-model.lazy="title"></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">值</label>
      <div class="layui-input-block">
        <input placeholder="请输入值" class="layui-input" v-model.lazy="value"/>
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
      type: '',
      value: '',
      title: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
    }
  },
  watch: {
    value () {
      console.log('value:' + this.value)
    },
    title () {
      console.log('title:' + this.title)
    },
    type () {
      console.log('type:' + this.type)
    }
  },
  methods: {
    submitCode () {
      let message = ''
      if (this.type == null || this.type === '') {
        message += '请选择类型,'
      }
      if (this.title == null || this.title === '') {
        message += '请输入标题,'
      }
      if (this.value == null || this.value === '') {
        message += '请输入值,'
      }
      if (message !== '') {
        index.alert(message)
        return false
      }
      this.$http.ajax('post', '/manage/config/saveOrUpdate;jsessionid=' + this.$store.getters.getUser.sessionId,
        {
          id: this.id,
          type: this.type,
          title: this.title,
          value: this.value
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
          this.$store.dispatch('logout')
        })
    }
  },
  mounted () {
  },
  updated () {
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.$http.ajax('post', '/manage/config/detail;jsessionid=' + this.$store.getters.getUser.sessionId, {id: this.id}, (data) => {
        console.log(data)
        if (data.success) {
          this.type = data.result.type
          this.value = data.result.value
          this.title = data.result.title
        }
      }, (error) => {
        console.log(error)
        this.$store.dispatch('logout')
      })
    }
  }
}
</script>
