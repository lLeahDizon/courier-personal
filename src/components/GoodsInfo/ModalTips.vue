<template>
  <van-popup v-model="visible" class="modal-wrapper" round position="bottom" get-container="#app">
    <header>
      <span class="title">禁寄物品目录</span>
      <Icon name="certification-close" @click="onClose"/>
    </header>
    <div class="content-wrapper">
      <div v-for="(item, index) in disableList" :key="index" class="content">
        <h2>{{ item.title }}</h2>
        <template v-if="item.desc.length">
          <p v-for="(text, textIndex) in item.desc" :key="textIndex" class="desc">{{ text }}</p>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
import disableList from '@/constants/disableList'

export default {
  data() {
    return {
      disableList,
      visible: false
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  padding: 30px 40px 40px;
  width: 100%;
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 36px;
      font-weight: bold;
      color: #333333;
      line-height: 50px;
    }

    .icon {
      font-size: 30px;
    }
  }

  .content-wrapper {
    overflow-y: scroll;

    .content {
      font-size: 28px;
      line-height: 40px;
      padding-top: 30px;

      h2 {
        font-weight: bold;
        color: #333333;
      }

      p {
        color: #666666;
      }
    }
  }
}
</style>
