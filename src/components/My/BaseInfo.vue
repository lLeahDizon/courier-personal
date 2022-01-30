<template>
  <div v-if="userInfo" class="baseInfo">
    <img :src="userInfo.userAvatar" alt="">
    <div class="name-wrapper">
      <p>{{ userInfo.userNick }}</p>
      <Icon :name="'certification-'+userInfo.verifyStatus ? 'undo': 'done'" class="certification-undo"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['userInfo'])
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
