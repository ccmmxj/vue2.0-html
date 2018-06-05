<template>
  <div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
      <legend>小儿</legend>
    </fieldset>

    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li v-for="(item,index) in types" :key="item.code" :class="{'layui-this':index == 0}" @click="getList(item.code)">{{item.title}}</li>
      </ul>
      <div class="layui-tab-content" style="height: 100px;">
        <div class="layui-tab-item layui-show">
          <ul>
            <!--<li v-for="item in lists" :key="item.id">{{item.content}}</li>-->
            <router-link :to="{path: '/edu/web/detail/1'}" tag="li" active-class="active" v-for="item in lists" :key="item.id">{{item.content}}</router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      types: [
        {
          title: '中文',
          code: 'chinese'
        },
        {
          title: '英语',
          code: 'english'
        }
      ],
      lists: []
    }
  },
  methods: {
    getList (code) {
      this.$http.ajax('post', '/web/getList' + code, { type: code }, (data) => {
        console.log(data)
        this.lists = data.result
      }, (error) => {
        console.log(error)
      })
    }
  },
  created () {
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
</style>
