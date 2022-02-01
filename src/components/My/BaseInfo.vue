<template>
  <div v-if="userInfo" class="baseInfo">
    <img :src="userInfo.userAvatar" alt="">
    <div class="name-wrapper">
      <p>{{ userInfo.userNick }}</p>
      <Icon :name="icon" class="certification-undo" @click="showDialog"/>
    </div>
  </div>
</template>

<script>
import {USER_INFO_KEY} from '@/constants'

export default {
  data() {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY))
    return {
      userInfo,
      icon: userInfo.verifyStatus ? 'certification-done' : 'certification-undo'
    }
  },
  methods: {
    showDialog() {
      if (!this.userInfo.verifyStatus) {
        this.$emit('showDialog')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.baseInfo {
  display: flex;
  padding-bottom: 40px;

  > img {
    width: 144px;
    height: 144px;
    border-radius: 50%;
  }

  > .name-wrapper {
    padding-left: 24px;

    > p {
      font-size: 44px;
      line-height: 62px;
      font-weight: bold;
      padding-bottom: 16px;
    }

    .certification-undo {
      width: 136px;
      height: 46px;
    }

    .certification-done {
      width: 172px;
      height: 44px;
    }
  }
}
</style>
