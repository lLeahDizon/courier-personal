<template>
  <div class="online">
    <p>请详细填写您的收发件地址信息</p>
    <InputPanel class-prefix="send" placeholder="请填写发件地址" @goToInfo="goToInfo('send')"/>
    <InputPanel class-prefix="receipt" placeholder="请填写收件地址" @goToInfo="goToInfo('receipt')"/>
  </div>
</template>

<script>
import InputPanel from '@/components/Home/InputPanel'
import {mapGetters} from 'vuex'

export default {
  components: {InputPanel},
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    goToInfo(type) {
      this.$router.push({
        name: type === 'send' ? 'senderInfo' : 'receiptInfo',
        query: {type}
      })
      // if (this.userInfo && this.userInfo.verifyStatus)
      //   this.$router.push({
      //     name: type === 'send' ? 'senderInfo' : 'receiptInfo',
      //     query: {type}
      //   })
      // else
      //   this.$emit('showDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.online {
  padding-top: 56px;

  p {
    background: rgba(255, 188, 69, 0.1);
    border-radius: 20px;
    padding: 20px 0;
    line-height: 38px;
    font-size: 26px;
    color: #ff8133;
    text-align: center;
  }

  ::v-deep .send-wrapper {
    margin-top: 40px;

    .send-circle {
      background: $color-send;
    }
  }

  ::v-deep .receipt-wrapper {
    margin-top: 24px;

    .receipt-circle {
      background: $color-receipt;
    }
  }
}
</style>
