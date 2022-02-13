<template>
  <div class="otherPanel">
    <div v-for="(item, index) in menuList" :key="index" @click="item.event" class="other-item">
      <div class="left">
        <Icon :name="item.icon"/>
        <span class="title">{{ item.title }}</span>
      </div>
      <Icon name="my-right"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          icon: 'my-other',
          title: '使用指南',
          event: this.handle2Other
        },
        {
          icon: 'my-custom',
          title: '联系客服',
          event: this.handle2Custom
        // },
        // {
        //   icon: 'my-about',
        //   title: '关于环球旅递',
        //   event: this.handle2About
        }
      ]
    }
  },
  methods: {
    handle2Other() {
      console.log('---handle2Other')
    },
    handle2Custom() {
      window.location.href = 'tel:4000129068'
    },
    handle2About() {
      console.log('---handle2Other')
    }
  }
}
</script>

<style lang="scss" scoped>
.otherPanel {
  margin-top: 30px;
  background: white;
  box-shadow: 0 4px 20px 0 rgba(51, 51, 51, 0.05);
  border-radius: 20px;
  padding: 0 30px 0 20px;

  > .other-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #e6e6e6;
    }

    > .icon {
      width: 14px;
      height: 24px;
    }

    > .left {
      display: flex;
      align-items: center;

      .icon {
        font-size: 40px;
      }

      > .title {
        font-size: 30px;
        line-height: 42px;
        padding-left: 18px;
        color: #333333;
      }
    }
  }
}
</style>
