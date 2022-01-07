<template>
  <div class="online">
    <p>请详细填写您的收发件地址信息</p>
    <InputPanel :value.sync="sendAdd" class-prefix="send" placeholder="请填写发件地址"/>
    <InputPanel :value.sync="receiptAdd" class-prefix="receipt" placeholder="请填写收件地址"/>
  </div>
</template>

<script>
import InputPanel from '@/components/Home/InputPanel'
// todo 如何在线下单
export default {
  components: {InputPanel},
  data() {
    return {
      sendAdd: '',
      receiptAdd: ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
      background: #12a0ff;
    }
  }

  ::v-deep .receipt-wrapper {
    margin-top: 24px;

    .receipt-circle {
      background: #ffbc45;
    }
  }
}
</style>
