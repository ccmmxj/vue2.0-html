<template>
  <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selectShow}">
    <div class="layui-select-title">
      <input type="text" placeholder="请选择" @click="changeSelect" readonly :value="currentValue.value" class="layui-input layui-unselect">
      <i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit" v-show="selectShow">
      <dd v-for="item in options" :class="{'layui-this':currentValue.code==item.code}" @click="currentSelect(item)" :key="item.code" :value="item.code">{{item.value}}</dd>
    </dl>
  </div>
</template>

<script>
import {eventBus} from "../../eventBus"

export default {
  props: {
    value: {
      type: [Object],
      default () {
        return {
          code: null,
          value: ''
        }
      }
    },
    options: {
      type: [Array],
      default () {
        return [{
          code: 0,
          value: 'option1'
        },
        {
          code: 1,
          value: 'option2'
        }]
      }
    }
  },
  data () {
    return {
      selectShow: false
    }
  },
  created () {
    this.currentValue = this.value
  },
  methods: {
    currentSelect (item) {
      this.currentValue = item
      this.changeSelect()
      this.$emit('change-type', item)
    },
    changeSelect (event) {
      event.stopPropagation()
      this.selectShow = !this.selectShow
    }
  },
  mounted () {
    eventBus.$on('resetSelectShow', () => {
      this.selectShow = false
    })
  }
}
</script>
