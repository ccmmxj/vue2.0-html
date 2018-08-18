<template>
  <div>
    <blockquote class="layui-elem-quote layui-text">
      鉴于小伙伴的普遍反馈，先温馨提醒两个常见“问题”：1. <a href="/doc/base/faq.html#form" target="_blank">为什么select/checkbox/radio没显示？</a> 2. <a href="/doc/modules/form.html#render" target="_blank">动态添加的表单元素如何更新？</a>
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>广告位</legend>
    </fieldset>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">标题</label>
      <div class="layui-input-block">
        <input placeholder="请输入标题" class="layui-input" v-model.lazy="name"/>
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <UploadButton :name="'img'" :url="advertUrl" :title="'上传广告图片'" @changeUrl="changeAdvertUrl"></UploadButton>
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
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">广告链接</label>
      <div class="layui-input-block">
        <input placeholder="请输入广告链接" class="layui-input" v-model.lazy="toUrl"/>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">卡片类型</label>
      <div class="layui-input-inline">
        <LaySelect :options="advertTypes" :value="advertTypes[type]" @change-type="chooseType"></LaySelect>
        <!--<select v-model="type">-->
        <!--<option v-for="item in codeTypes" :value="item.code" :key="item.code" >{{item.value}}</option>-->
        <!--</select>-->
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit="" @click="submitAdvert">立即提交</button>
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
  name: 'advert',
  data () {
    return {
      type: 0,
      advertUrl: '',
      toUrl: '',
      name: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      advertTypes:
        [{
          code: '0',
          value: '底部'
        },
        {
          code: '1',
          value: '右边'
        }]

    }
  },
  watch: {
    advertUrl () {
      console.log('advertUrl:' + this.advertUrl)
    },
    name () {
      console.log('name:' + this.name)
    },
    type () {
      console.log('type:' + this.type)
      eventBus.$emit('setCurrentSelect', this.type)
      console.log('setCurrentSelect')
    }
  },
  methods: {
    changeAdvertUrl (url) {
      this.advertUrl = url
    },
    chooseType (item) {
      this.type = item.code
    },
    submitAdvert () {
      let message = ''
      if (this.name == null || this.name === '') {
        message += '请输入标题,'
      }
      if (this.advertUrl == null || this.advertUrl === '') {
        message += '请上传图片,'
      }
      if (this.type == null || this.type === '') {
        message += '请选择类型,'
      }
      if (this.toUrl == null || this.toUrl === '') {
        message += '请输入广告链接,'
      }
      if (message !== '') {
        index.alert(message)
        return false
      }
      this.$http.ajax('post', '/manage/advert/saveOrUpdate;jsessionid=' + this.$store.getters.getUser.sessionId,
        {
          id: this.id,
          advertUrl: this.advertUrl,
          name: this.name,
          toUrl: this.toUrl,
          type: this.type
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
    index.upload(this.$store.getters.getUser.sessionId)
  },
  updated () {
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.$http.ajax('post', '/manage/advert/detail;jsessionid=' + this.$store.getters.getUser.sessionId, {id: this.id}, (data) => {
        console.log(data)
        if (data.success) {
          this.advertUrl = data.result.advertUrl
          this.type = data.result.type
          this.toUrl = data.result.toUrl
          this.name = data.result.name
        }
      }, (error) => {
        console.log(error)
        this.$store.dispatch('logout')
      })
    }
  }
}
</script>
