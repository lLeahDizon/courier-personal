<template>
  <div class="UserInfo">
    <p class="name">name</p>
    <p class="address">namenamenamenamenamenamenamenamenamenamenamenamenamenamename</p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style lang="scss" scoped>
.UserInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35.2%;
  font-size: 26px;
  line-height: 37px;

  > .name {
    color: #666666;
    padding-bottom: 4px;
  }

  > .address {
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
}
</style>
