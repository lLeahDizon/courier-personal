<template>
  <div class="info-wrapper">
    <div @click="onClickAddress" class="item">
      <div class="left">
        <Icon name="address"/>
        <span class="title">请填写地址</span>
      </div>
      <Icon name="my-right"/>
    </div>
    <div @click="onClickAddress" class="item">
      <div class="left">
        <Icon name="address-number"/>
        <input v-model="number" placeholder="请输入楼号,单元,门牌号(选填项)">
      </div>
    </div>
    <div @click="onClickAddress" class="item">
      <div class="left">
        <Icon name="address-person"/>
        <input v-model="name" placeholder="联系人姓名(必填)">
      </div>
    </div>
    <div @click="onClickAddress" class="item">
      <div class="left">
        <Icon name="address-tel"/>
        <input v-model="tel" type="tel" placeholder="联系电话(必填)">
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" @click="onSubmit">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SenderInfo',
  data() {
    return {
      address: '',
      number: '',
      name: '',
      tel: ''
    }
  },
  methods: {
    onClickAddress() {
      console.log('---onClickAddress')
    },
    onSubmit() {
      if (!this.address) {
        console.log('没写地址')
        return
      }
      if (!this.name) {
        console.log('没写名字')
        return
      }
      if (!this.tel) {
        console.log('没写电话')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  position: relative;
  padding: 24px 30px;

  > .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px 0;
    border-bottom: 1px solid #e6e6e6;

    > .left {
      display: flex;
      align-items: center;
      flex-grow: 1;

      > .icon {
        font-size: 40px;
        margin-right: 20px;
      }

      > .title {
        font-size: 36px;
        line-height: 50px;
        color: #333333;
        font-weight: bold;
      }

      input {
        width: 100%;
        font-size: 30px;
        line-height: 42px;
        color: #333333;
      }
    }

    > .icon {
      width: 14px;
      height: 24px;
    }
  }

  .btn {
    width: 100%;
    background: #12a0ff;
    padding: 20px 0;
    border-radius: 50px;
    font-size: 36px;
    line-height: 44px;
    color: white;

    &-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 30px 40px;
    }
  }
}
</style>
