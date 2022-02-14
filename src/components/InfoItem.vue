<template>
  <div class="InfoItem" @click="$emit('click',$event)">
    <div class="item">
      <span :class="{isRequired}">{{ title }}</span>
      <div class="right">
        <div :class="{'placeholder':!content}">{{ content || placeholder }}</div>
        <Icon name="my-right"/>
      </div>
    </div>
    <div v-if="desc" class="desc">{{ desc }}</div>
  </div>
</template>

<script>
export default {
  name: 'InfoItem',
  props: {
    'isRequired': {
      type: Boolean,
      default: true
    },
    'title': {
      type: String,
      required: true
    },
    'placeholder': {
      type: String,
      default: ''
    },
    'content': {
      type: String,
      default: ''
    },
    'desc': {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";

.InfoItem {
  padding: 30px 0;
  @include border-1px(#e6e6e6, 0, bottom);

  > .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    line-height: 44px;
    color: #333333;

    span {
      min-width: 230px;
    }

    > .isRequired:before {
      content: '*';
      color: #f12323;
      padding-right: 12px;
    }

    > .right {
      display: flex;
      align-items: center;

      > .placeholder {
        color: #aaaaaa;
      }

      .icon {
        margin-left: 16px;
        width: 14px;
        height: 24px;
      }
    }
  }

  > .desc {
    font-size: 26px;
    line-height: 36px;
    color: #666666;
    background: url("~@/assets/icons/info-item-desc.png") no-repeat;
    background-size: 100% auto;
    padding: 29px 24px 18px;
    margin-top: 16px;
  }
}
</style>
