<template>
  <div class="online">
    <p>请详细填写您的收发件地址信息</p>
    <InputPanel/>
    <InputPanel/>
  </div>
</template>

<script>
import InputPanel from '@/components/Home/InputPanel'

export default {
  components: {InputPanel}
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
}
</style>
