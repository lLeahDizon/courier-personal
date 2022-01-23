<template>
  <div class="address-wrapper">
    <div class="top-fixed">
      <input id="tipinput" placeholder="请输入地址">
      <Icon name="certification-close"/>
    </div>
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
    this.initAMap()
  },
  methods: {
    initAMap() {
      console.log('---initAMap')
      AMapLoader.load({
        key: '47b0234461b5db55416a5722594e35f3',  //设置您的key
        version: '2.0',
        plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch'],
        AMapUI: {
          version: '1.1',
          plugins: [],
        }
      }).then((AMap) => {
        this.map = new AMap.Map('container', {
          viewMode: '3D',
          resizeEnable: true,
          zoom: 5,
          zooms: [2, 22],
          center: [105.602725, 37.076636],
        })
        AMap.plugin('AMap.Autocomplete', () => {
          console.log(AMap)
          const auto = new AMap.Autocomplete({input: 'tipinput'})
          console.log(auto)
        })
        // const auto = new AMap.Autocomplete({input: 'tipinput'})
        // console.log(auto)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-wrapper {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;

  > .top-fixed {
    position: fixed;
    z-index: 3;
    top: 24px;
    left: 30px;
    right: 30px;
    padding: 20px;
    box-shadow: 0 2px 20px 0 rgba(51, 51, 51, 0.05);
    border-radius: 40px;
    background: white;
    display: flex;
    align-items: center;

    #tipinput {
      flex-grow: 1;
      font-size: 28px;
      line-height: 40px;
    }

    #tipinput::-webkit-input-placeholder {
      color: #aaaaaa;
    }

    #tipinput::-moz-placeholder {
      color: #aaaaaa;
    }

    #tipinput:-moz-placeholder {
      color: #aaaaaa;
    }

    #tipinput:-ms-input-placeholder {
      color: #aaaaaa;
    }

    .icon {
      font-size: 28px;
    }
  }

  > .bottom-fixed {
    position: fixed;
    z-index: 2;
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

  #container {
    position: absolute;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
