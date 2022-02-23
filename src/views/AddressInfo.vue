<template>
  <article class="address-info-wrapper">
    <div v-for="item in list" :key="item.id" class="address-card-wrapper">
      <Icon v-if="isManagement"
            :name="chooseIdList.includes(item.id) ? 'address-delete-select' : 'address-delete-default'"
            @click="chooseAddress(item)"/>
      <AddressCard :info="item"/>
    </div>
    <footer class="footer-affix">
      <template v-if="!isManagement">
        <button class="btn" @click="changeManagementVisible">管理</button>
        <button class="btn blue" @click="onClickAdd">
          <Icon name="address-add"/>
          添加地址
        </button>
      </template>
      <template v-else>
        <button class="btn red" @click="onClickDelete">删除</button>
        <button class="btn blue" @click="changeManagementVisible">
          完成
        </button>
      </template>
    </footer>
  </article>
</template>

<script>
import AddressCard from '@/components/AddressInfo/AddressCard'
import {$error, $loading, $message} from '@/utils'
import {userAddressList, userDeleteAddress} from '@/service'
import {mapActions} from 'vuex'
import {EXIST_ADDRESS_KEY} from '@/constants'

export default {
  name: 'AddressInfo',
  components: {AddressCard},
  data() {
    return {
      list: [],
      chooseIdList: [],
      isManagement: false
    }
  },
  created() {
    this.setAddressInfo({})
    this.init()
  },
  watch: {
    list(val) {
      localStorage.setItem(EXIST_ADDRESS_KEY, JSON.stringify({isExist: !!val.length}))
    }
  },
  methods: {
    ...mapActions(['setAddressInfo']),
    async init() {
      this.chooseIdList = []
      const loading = $loading()
      try {
        this.list = await userAddressList()
      } catch (e) {
        $error(e)
      } finally {
        loading.clear()
      }
    },
    chooseAddress({id}) {
      if (this.chooseIdList.includes(id)) {
        this.chooseIdList = this.chooseIdList.filter(item => item !== id)
      } else {
        this.chooseIdList.push(id)
      }
    },
    changeManagementVisible() {
      if (!this.isManagement && !this.list.length) {
        return
      }
      this.isManagement = !this.isManagement
    },
    async onClickDelete() {
      const loading = $loading()
      try {
        await userDeleteAddress(this.chooseIdList.join(','))
        $message('操作成功')
        this.changeManagementVisible()
        await this.init()
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

  > .address-card-wrapper {
    display: flex;
    align-items: center;

    > .icon {
      min-width: 40px;
      min-height: 40px;
      margin-right: 20px;
    }
  }

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
      min-width: 164px;
      @include border-1px(#aaaaaa, 50px);

      &.red {
        color: #F82B2B;
        @include border-1px(#F82B2B, 50px);
      }

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
