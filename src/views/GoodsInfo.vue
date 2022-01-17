<template>
  <div class="GoodsInfo-wrapper">
    <h1 class="title">发件距离</h1>
    <p>根据您当前的收发件信息，距离约为 <span>150km</span></p>
    <p></p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.GoodsInfo-wrapper {
  padding: 40px 30px;

  > .title {
    font-size: 32px;
    color: #333333;
    line-height: 44px;
  }

  > .desc {
    font-size: 28px;
    color: #666666;
    line-height: 40px;
  }
}
</style>
