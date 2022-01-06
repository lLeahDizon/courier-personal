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
import tabList from '@/constants/tabList'

export default {
  data() {
    return {
      tabList,
      activeValue: 1
    }
  },
  methods: {
    onClick({value}) {
      this.activeValue = value
      this.$emit('click', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  padding: 0 84px;
  font-size: 34px;
  color: #858585;

  > .tab-item {
    display: flex;
    flex-direction: column;
    position: relative;

    span {
      line-height: 48px;
    }

    .icon {
      position: absolute;
      left: 14px;
      bottom: -18px;
      width: 108px;
      height: 20px;
    }
  }

  > .tab-item.selected {
    color: #333333;
  }
}
</style>
