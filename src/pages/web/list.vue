<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
      <legend>小儿识字</legend>
    </fieldset>
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li v-for="(item,index) in types" :key="item.code" :class="{'layui-this':index == 0}" @click="getList(item.code)">{{item.title}}</li>
      </ul>
    </div>
    <section class = "gallery">
      <div>
        <router-link :to="{path: '/edu/web/detail/' + companyId + '/' + item.id}" tag="div" v-for="item in lists" :key="item.id"><img class="item" :src="item.imgUrl" :alt="item.content"></router-link>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'list',
  data () {
    return {
      types: [{
        code: '0',
        title: '汉字'
      },
      {
        code: '1',
        title: '英语'
      },
      {
        code: '2',
        title: '数字'
      },
      {
        code: '3',
        title: '拼音'
      }],
      lists: []
    }
  },
  methods: {
    getList (code) {
      this.$http.ajax('post', 'card/list/' + this.companyId, {
        type: code
      }, (data) => {
        console.log(data)
        if (data.success) {
          this.lists = data.result
          console.log(this.lists)
        } else {
          index.alert(data.msg)
        }
      }, (error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.companyId = this.$route.params.companyId
    if (this.companyId) {
      this.companyId = 1
    }
    this.getList(this.types[0].code)
  },
  mounted () {
  }
}
</script>

<style scoped>
  .active{
    font-width: 1;
  }
  .item{
    max-width: 50%;
    max-height: 50%;
  }
</style>
