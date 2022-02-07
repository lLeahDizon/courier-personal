<template>
  <div class="tabs">
    <div v-for="item in tabList" :key="item.value" @click="onClick(item)" class="tab-item"
         :class="{'selected': activeValue === item.value}">
      <span>{{ item.label }}</span>
      <Icon v-if="activeValue===item.value" name="tab-line"/>
    </div>
  </div>
</template>

<script>
import {eventBus} from '@/utils'

export default {
  data() {
    return {
      tabList: [
        {
          label: '全部',
          value: null
        },
        {
          label: '待付款',
          value: 0
        },
        {
          label: '已付款',
          value: 10
        },
        {
          label: '已取消',
          value: 30
        }
      ],
      activeValue: null
    }
  },
  methods: {
    onClick({value}) {
      this.activeValue = value
      eventBus.$emit('refreshOrder', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 32px 50px 32px;
  font-size: 32px;
  color: #666666;
  background: #f7f7f7;

  > .tab-item {
    display: flex;
    flex-direction: column;
    position: relative;

    span {
      line-height: 46px;
    }

    .icon {
      position: absolute;
      bottom: -20px;
      width: 76px;
      height: 16px;
    }
  }

  > .tab-item.selected {
    font-size: 36px;
    color: #333333;
    font-weight: bold;
  }
}
</style>
