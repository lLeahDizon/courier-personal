<template>
  <article class="address-info-wrapper">
    <AddressCard/>
    <footer class="footer-affix">
      <button class="btn">管理</button>
      <button class="btn blue" @click="onClickAdd">
        <Icon name="address-add"/>
        添加地址
      </button>
    </footer>
  </article>
</template>

<script>
import AddressCard from '@/components/AddressInfo/AddressCard'
import {$error, $loading} from '@/utils'
import {userAddressList} from '@/service'

export default {
  name: 'AddressInfo',
  components: {AddressCard},
  data() {
    return {
      list: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const loading = $loading()
      try {
        this.list = await userAddressList()
        console.log(this.list)
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    onClickAdd() {
      this.$router.push({name: 'addAddress'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";

.address-info-wrapper {
  position: relative;
  background: #F5F5F5;
  min-height: 100vh;
  padding: 24px 24px 160px;

  > .footer-affix {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    background: #F5F5F5;
    padding: 12px 30px 40px;

    > .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      margin-right: 30px;
      flex-grow: 1;
      font-size: 36px;
      color: #333333;
      line-height: 47px;
      border-radius: 50px;
      @include border-1px(#aaaaaa, 50px);

      &.blue {
        min-width: 500px;
        margin-right: 0;
        color: #FFFFFF;
        background: #12A0FF;
        @include border-1px(#12A0FF, 50px);
      }

      > .icon {
        font-size: 32px;
        margin-right: 10px;
      }
    }
  }
}
</style>
