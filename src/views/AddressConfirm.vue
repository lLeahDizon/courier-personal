<template>
  <div class="address-wrapper">
    <div id="container"></div>
    <div class="bottom-fixed">
      <div class="top">请确认发件地址是否准确，如不准确可拖动地图进行调整</div>
      <div class="bottom">
        <div class="desc">
          <div class="circle blue"></div>
          从&nbsp;<span class="blue">仓前街道XX路</span>&nbsp;发件
        </div>
        <button class="btn">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'AddressConfirm',
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: '47b0234461b5db55416a5722594e35f3',             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0',      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map('container', {  //设置地图容器id
          viewMode: '3D',    //是否为3D地图模式
          zoom: 5,           //初始化地图级别
          center: [105.602725, 37.076636], //初始化地图中心点位置
        })
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;

  > .bottom-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;

    > .top {
      background: #FFF8EB;
      border-radius: 40px 40px 0 0;
      padding: 20px 40px;
      font-size: 26px;
      color: #FF8133;
      line-height: 37px;
    }

    > .bottom {
      padding: 40px;
      border-radius: 40px 40px 0 0;

      > .desc {
        display: flex;
        align-items: center;
        font-size: 36px;
        color: #333333;
        line-height: 50px;
        padding-bottom: 40px;

        > .circle {
          width: 16px;
          height: 16px;
          margin-right: 16px;
          border-radius: 50%;

          &.blue {
            background: #12a0ff;
          }

          &.yellow {
            background: #ffbc45;
          }
        }

        > .address {
          font-weight: Medium;
        }

        > .blue {
          color: #12a0ff;
        }

        > .yellow {
          color: #ffbc45;
        }
      }

      > .btn {
        width: 100%;
        padding: 20px 0;
        background: #12A0FF;
        border-radius: 50px;
        font-size: 36px;
        color: #FFFFFF;
        line-height: 43px;
      }
    }
  }

}

#container {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 1012px;
  flex-grow: 1;
}
</style>
