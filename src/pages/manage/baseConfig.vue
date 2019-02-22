<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>字典</legend>
    </fieldset>
    <div>
      <router-link tag="button" :to="{path: config}" class="layui-btn layui-btn-warm">添加</router-link>
      <div class="layui-inline">
        <label class="layui-form-label">字典名称</label>
        <div class="layui-input-inline">
          <input name="title" v-model.lazy="searchTitle" class="layui-input">
        </div>
      </div>
      <button class="layui-btn" @click="reloadTable">搜索</button>
      <table id="configList" lay-filter="configFilter"></table>
      <div id="page"></div>
      <script type="text/html" id="configTool">
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
  name: 'baseConfig',
  data () {
    return {
      config: '/edu/manage/main/config',
      alertType: 'info',
      showAlert: false,
      messageAlert: '',
      searchTitle: ''
    }
  },
  watch: {
  },
  methods: {
    reloadTable () {
      index.tableReload({
        title: this.searchTitle
      }, '#configList')
    },
    toolFun (layer, obj, tableLay) {
      return {
        'edit': (sessionid) => {
          // layer.msg('编辑操作')
          this.$router.push('config/' + obj.data.id)
        },
        'del': (sessionid) => {
          layer.confirm('真的删除行么', function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'manage/config/del;jsessionid=' + sessionid,
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
    index.table('#configList', 'configFilter', '#page', addr.host + 'manage/config/card/list;jsessionid=' + this.sessionId, this.toolFun, [[
      {title: '序号',
        fixed: 'left',
        width: 100,
        templet: (item) => {
          return item.LAY_INDEX
        }},
      {field: 'id', title: 'ID', width: 100, sort: true, fixed: 'left'},
      {field: 'title', title: '字典名称', width: 360, sort: true},
      {field: 'value',
        title: '值',
        width: 360,
        sort: true
      },
      {field: 'type',
        title: '类型',
        width: 100,
        sort: true},
      {fixed: 'right', align: 'center', toolbar: '#configTool'}
    ]], this.sessionId, {})
  },
  updated () {
  }
}
</script>
