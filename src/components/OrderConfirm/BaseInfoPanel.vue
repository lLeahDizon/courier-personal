<template>
  <Card>
    <div class="item-wrapper">
      <div class="title blue">
        <div class="circle blue"></div>
        发件人
      </div>
      <div class="content-wrapper send">
        <div class="top">
          <div class="user-info"><span class="name">name</span>/13778677898</div>
          <div class="edit">修改
            <Icon name="info-edit"/>
          </div>
        </div>
        <div class="bottom">高新区XX街道XX路999号A幢201</div>
      </div>
    </div>
    <div class="item-wrapper">
      <div class="title yellow">
        <div class="circle yellow"></div>
        收件人
      </div>
      <div class="content-wrapper">
        <div class="top">
          <div class="user-info"><span class="name">name</span>/13778677898</div>
          <div class="edit">修改
            <Icon name="info-edit"/>
          </div>
        </div>
        <div class="bottom">高新区XX街道XX路999号A幢201</div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {Card}
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  > .title {
    align-items: center;
    display: flex;
    font-size: 28px;
    line-height: 40px;

    > .circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 16px;
    }

    > .blue {
      background: #12a0ff;
    }

    &.blue {
      color: #12a0ff;
    }

    > .yellow {
      background: #ffbc45;
    }

    &.yellow {
      color: #ffbc45;
    }
  }

  > .content-wrapper {
    margin: 12px 0 12px 8px;
    padding: 8px 0 18px 24px;

    &.send {
      border-left: 1px solid #d9d9d9;
    }

    > .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;

      > .user-info {
        font-size: 32px;
        color: #333333;
        line-height: 45px;

        > .name {
          font-weight: 600;
        }
      }

      > .edit {
        font-size: 26px;
        color: #666666;
        line-height: 37px;
      }
    }

    > .bottom {
      font-size: 28px;
      color: #333333;
      line-height: 40px;
    }
  }
}
</style>
