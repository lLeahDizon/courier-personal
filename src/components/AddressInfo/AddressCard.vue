<template>
  <div class="box-wrapper">
    <Card class-prefix="AddressCard">
      <div class="top">
        <span>{{ info.name }}</span>
        <span class="tel">{{ info.phone }}</span>
      </div>
      <div class="bottom">
        <div class="left">{{ info.detailAddress + ' ' + info.number }}</div>
        <div class="right" @click="onClickEdit">编辑</div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import {mapActions} from 'vuex'

export default {
  props: ['info'],
  components: {Card},
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setAddressInfo']),
    onClickEdit() {
      this.setAddressInfo({
        searchValue: this.info.detailAddress,
        lng: this.info.lng,
        lat: this.info.lat,
        district: this.info.district,
        number: this.info.number,
        name: this.info.name,
        tel: this.info.phone,
        id: this.info.id
      })
      this.$router.push({name: 'editAddress', query: {addressId: this.info.id}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/styles/mixins.scss";

.box-wrapper {
  width: 100%;
  margin-bottom: 24px;

  ::v-deep .AddressCard-wrapper {
    padding: 24px;
    box-shadow: none;
    flex-grow: 1;
  }

  .top {
    display: flex;
    align-items: baseline;
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    line-height: 44px;

    > .tel {
      padding-left: 20px;
      font-size: 26px;
      font-weight: normal;
      color: #888888;
      line-height: 37px;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    color: #333333;

    > .left {
      padding-right: 24px;
      font-size: 28px;
      line-height: 40px;
    }

    > .right {
      display: flex;
      align-items: center;
      padding-left: 24px;
      min-width: 80px;
      font-size: 26px;
      line-height: 37px;
      @include border-1px($color: #E6E6E6, $direction: left);
    }
  }
}
</style>
