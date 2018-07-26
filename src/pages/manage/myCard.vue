<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>我的卡片</legend>
    </fieldset>
    <div>
      <router-link tag="button" :to="{path: addCard}" class="layui-btn layui-btn-warm">添加</router-link>
      <div class="layui-inline">
        <label class="layui-form-label">卡片名称</label>
        <div class="layui-input-inline">
          <input name="title" v-model.lazy="searchTitle" class="layui-input">
        </div>
      </div>
      <button class="layui-btn" @click="reloadTable">搜索</button>
      <table id="cardList" lay-filter="cardFilter"></table>
      <div id="page"></div>
      <script type="text/html" id="cardTool">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
      </script>
    </div>
  </div>
</template>
<script>
import LaySelect from '../../components/manage/LaySelect'
import MyAlert from '../../components/Alert'
import UploadButton from '../../components/manage/UploadButton'
import addr from '../../base/addr'
import jrQrcode from 'jr-qrcode'

export default {
  components: {
    LaySelect,
    MyAlert,
    UploadButton
  },
  name: 'myCard',
  data () {
    return {
      addCard: '/edu/manage/main/card',
      type: 'chinese',
      imgUrl: '',
      audioUrl: '',
      content: '',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      searchTitle: '',
      codeTypes:
        [{
          code: 'chinese',
          value: '文字'
        },
        {
          code: 'english',
          value: '字母'
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
    reloadTable () {
      index.tableReload({
        title: this.searchTitle,
      }, '#cardList')
    },
    chooseType (item) {
      this.type = item.code
    },
    toolFun (layer, obj, tableLay) {
      return {
        'edit': (sessionid) => {
          // layer.msg('编辑操作')
          this.$router.push('card/' + obj.data.id)
        },
        'del': (sessionid) => {
          layer.confirm('真的删除行么', function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'manage/card/del;jsessionid=' + sessionid,
              data: {
                id: obj.data.id
              },
              dataType: 'json',
              success: (data) => {
                if (data.success) {
                  layer.msg(data.message)
                  obj.del()
                  layer.close(index)
                  tableLay.reload()
                }
              },
              error: (error) => {
                console.log(error)
              }})
          })
        }
      }
      // var data = obj.data
      //   ,layEvent = obj.event
      // if(layEvent === 'detail'){
      //   layer.msg('查看操作')
      // } else if(layEvent === 'del') {
      //   layer.confirm('真的删除行么', function(index) {
      //     obj.del()
      //     layer.close(index)
      //     tableLay.reload()
      //   })
      // } else if(layEvent === 'edit') {
      //   layer.msg('编辑操作');
      // }
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
          this.$store.dispatch('logout')
        })
    }
  },
  mounted () {
    this.sessionId = this.$store.getters.getUser.sessionId
    index.table('#cardList', 'cardFilter', '#page', addr.host + 'manage/card/list;jsessionid=' + this.sessionId, this.toolFun, [[
      {title: '序号',
        fixed: 'left',
        width: 100,
        templet: (item) => {
          return item.LAY_INDEX
        }},
      {field: 'id', title: 'ID', width: 100, sort: true, fixed: 'left'},
      {field: 'title', title: '卡片名称', width: 180, sort: true},
      {field: 'type',
        title: '类型',
        width: 180,
        sort: true,
        templet: (item) => {
          return item.type === 0 ? '有图汉字' : item.type === 1 ? '字母' : item.type === 2 ? '数字' : '拼音'
        }},
      {field: 'imgUrl',
        title: '卡片链接',
        width: 180,
        templet: (item) => {
          return '<img src = "' + item.imgUrl + '" width="25px" height="25px" />' + item.imgUrl
        }},
      {field: 'audioUrl', title: '音频链接', width: 180},
      {field: 'videoUrl', title: '视频链接', width: 180},
      {field: 'content', title: '内容'},
      {field: 'qrcode',
        title: '二维码',
        height: 256,
        templet: (item) => {
          var qcImgUrl = jrQrcode.getQrBase64('http://edu.ccmmxj.club/edu/web/card/detail/1/' + item.id, {
            padding: 2,
            width: 256,
            height: 256,
            correctLevel: 2,
            background: '#ffffff',
            foreground: '#000000'
          })
          return "<img height='28px' src='" + qcImgUrl + "'/>"
        }},
      {fixed: 'right', width: 165, align: 'center', toolbar: '#cardTool'}
    ]], this.sessionId,{})
  },
  updated () {
  }
}
</script>
