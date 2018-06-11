<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>我的卡片</legend>
    </fieldset>
    <div>
      <router-link tag="button" :to="{path: addCard}" class="layui-btn layui-btn-warm">添加</router-link>
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
          this.$store.commit('logoutUser')
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
          return item.type === 0 ? '汉字' : item.type === 1 ? '英语' : item.type === 2 ? '数字' : '拼音'
        }},
      {field: 'imgUrl',
        title: '卡片链接',
        width: 180,
        templet: (item) => {
          return '<img src = "' + item.imgUrl + '" width="25px" height="25px" />' + item.imgUrl
        }},
      {field: 'audioUrl', title: '音频链接', width: 180},
      {field: 'content', title: '内容'},
      {fixed: 'right', width: 165, align: 'center', toolbar: '#cardTool'}
    ]], this.sessionId)
  },
  updated () {
  }
}
</script>
