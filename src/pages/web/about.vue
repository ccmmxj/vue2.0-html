<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend class="skeleton">关于我们（蓝黑工作室）</legend>
    </fieldset>
    <div class="layui-form-item">
      <label class="layui-form-label skeleton">手机</label>
      <div class="layui-input-block">
        <input type="text" name="title" lay-verify="title" disabled="false" v-model="phone" autocomplete="off"
                class="layui-input skeleton">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label skeleton">微信</label>
      <div class="layui-input-block">
        <input type="text" name="title" lay-verify="title" disabled="false" v-model="wx" autocomplete="off"
                class="layui-input skeleton">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label skeleton">QQ</label>
      <div class="layui-input-block">
        <input type="text" name="title" lay-verify="title" disabled="false" v-model="qq" autocomplete="off"
               class="layui-input skeleton">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <label type="text" name="title" lay-verify="title" disabled="false"  autocomplete="off" style="font-size:18px"
               class="layui-label skeleton">{{content}}</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'about',
  data() {
    return {
      qq: '593004108、274996641',
      wx: 'chen_m_xi',
      phone: '17682348621',
      content: '欢迎光临 蓝黑工作室 ! 我们主要负责网页的开发，小程序开发，公众号开发等，如果您有什么想法，都可联系我们！\n如果您是想租广告位的话，请直接联系手机或加微信/QQ 联系我们！'
    }
  },
  watch : {
    content () {
      console.log(this.content)
    }
  },
  methods: {},
  created() {
  },
  mounted() {
    try {
      index.uploadFinish()
    }catch (e) {
      setInterval(()=>{
        if(!index || !index.uploadFinish()){
          setInterval(()=>{
            if(!!index || !index.uploadFinish()){
              return
            }
          },1000)
        }
      },1000)
    }
  }
}
</script>

<style scoped>
</style>
