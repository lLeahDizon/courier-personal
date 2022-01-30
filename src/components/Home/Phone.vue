<template>
  <div class="phone">
    <img src="@/assets/icons/phone-order.png" alt="" @click="clickPhone">
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    clickPhone() {
      if (this.userInfo && this.userInfo.verifyStatus)
        window.location.href = 'tel:4000129068'
      else
        this.$emit('showDialog')
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
