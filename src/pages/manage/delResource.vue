<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title">
      <legend>资源回收站(7天有效期)</legend>
    </fieldset>
    <div>
      <div class="layui-inline">
        <label class="layui-form-label">文件名</label>
        <div class="layui-input-inline">
          <input name="title" v-model.lazy="searchTitle" class="layui-input">
        </div>
      </div>
      <button class="layui-btn" @click="reloadTable">搜索</button>
      <table id="resourceList" lay-filter="resourceFilter"></table>
      <script type="text/html" id="cardTool">
        <a class="layui-btn layui-btn-xs" lay-event="restore">恢复</a>
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
  name: 'delResource',
  data () {
    return {
      searchTitle:''
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
        title: this.searchTitle
      }, '#resourceList')
    },
    toolFun (layer, obj, tableLay) {
      return {
        'restore': (sessionid) => {
          layer.confirm('确定回复资源吗？', function (index) {
            $.ajax({
              method: 'post',
              url: addr.host + 'manage/other/restoreResource;jsessionid=' + sessionid,
              data: {
                url: obj.data.url
              },
              dataType: 'json',
              success: (data) => {
                if (data.success) {
                  layer.msg(data.message)
                  console.log(data.result)
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
  created () {
    this.$store.dispatch('fetchCardTypes',{companyId:this.$store.getters.getUser.eduUser.companyId})
  },
  mounted () {
    this.sessionId = this.$store.getters.getUser.sessionId
    index.table('#resourceList', 'resourceFilter', '#page', addr.host + 'manage/other/resourceList;jsessionid=' + this.sessionId, this.toolFun, [[
      {title: '序号',
        fixed: 'left',
        width: 100,
        templet: (item) => {
          return item.LAY_INDEX
        }},
      {field: 'name', title: '资源名', width: 180},
      {field: 'type',
        title: '类型',
        width: 180
      },
      {field: 'url',
        title: '链接'
      },
      {fixed: 'right', width: 165, align: 'center', toolbar: '#cardTool'}
    ]], this.sessionId, {})
  },
  updated () {
  }
}
</script>
