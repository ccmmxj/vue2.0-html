<template>
  <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selectShow}">
    <div class="layui-select-title">
      <input type="text" placeholder="请选择" @click="changeSelect" readonly v-model="currentValue.title" class="layui-input layui-unselect">
      <i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit" v-show="selectShow">
      <dd v-for="item in options" :class="{'layui-this':currentValue.value==item.value}" @click="currentSelect(item)" :key="item.value" :value="item.value">{{item.title}}</dd>
    </dl>
  </div>
</template>

<script>
import { eventBus } from '../../eventBus'

export default {
  props: {
    value: {
      type: [Object],
      default () {
        return {
          value: null,
          title: ''
        }
      }
    },
    options: {
      type: [Array],
      default () {
        return [{
          value: 0,
          title: 'option1'
        },
        {
          value: 1,
          title: 'option2'
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
      this.setCurrentValue(item)
      this.$emit('change-type', item)
      this.changeSelect()
    },
    setCurrentValue (item) {
      this.currentValue = item
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
    eventBus.$on('setCurrentSelect', (item) => {
      debugger
      this.selectShow = !this.selectShow
      this.setCurrentValue(item)
      debugger
      this.selectShow = !this.selectShow
    })
  }
}
</script>
