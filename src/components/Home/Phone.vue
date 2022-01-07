<template>
  <div class="phone">
    <img src="@/assets/icons/phone-order.png" alt="" @click="clickPhone">
  </div>
</template>

<script>
export default {
  methods: {
    clickPhone() {
      // todo 替换电话号码
      window.location.href = 'tel:15779500011'
    }
  }
}
</script>

<style lang="scss" scoped>
.phone {
  padding-top: 108px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;

  img {
    width: 340px;
    height: 340px;
  }
}
</style>
