<template>
  <div class="baseInfo">
    <img src="" alt="">
    <div class="name-wrapper">
      <p>昵称</p>
      <Icon name="certification-undo" class="certification-undo"/>
    </div>
  </div>
</template>

<script>
// todo 根据实名状态动态更新 icon
export default {}
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
