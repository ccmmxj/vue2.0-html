<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive><router-view @clicka="alerta"/></keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    alerta () {
      alert('a')
      // this.$alert('这是一段内容', '标题名称', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${ action }`
      //     });
      //   }
      // })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
