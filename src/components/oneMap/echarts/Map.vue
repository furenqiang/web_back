<template>
  <div class="com-container" @dblclick="chinaMap">
    <div class="com-chart" ref="mapRef" id="mapId"></div>
  </div>
</template>

<script>
import { getProvinceMapInfo } from '../../../utils/map_utils'
import {getChainJson,getProvinceData} from '../../../request/oneMapApi'

export default {
  name: 'Map',
  data() {
    return {
      // axios实例对象
      axiosInstance: null,
      // 图表的实例对象
      chartInstance: null,
      // 中国地图数据
      chinaJson: null,
      // 从服务器中获取的所有数据
      allData: null,
      // 获取省份矢量地图数据缓存
      cityMapData: {},
    }
  },
  computed: {
  },
  created() {
    // this.axiosInstance = axios.create({
    //   baseURL:'http://120.53.120.229:9997'
    // })
    this.$socket.registerCallBack('mapData', this.getData)
  },
  mounted() {
    this.getChinaJson()
    window.addEventListener('resize', this.screenAdapter)
    
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
    this.$socket.unRegisterCallBack('stockData')
  },
  methods: {
    // 初始化图表的方法
    initChart() {
      this.chartInstance = this.$echarts.init(document.getElementById('mapId'),'chalk')
      // 获取中国地图的矢量数据： 可以通过发送网络请求获取,staic/map/china.json 的数据
      // 由于配置了基础路径，所以不能直接 this.$http.get 来请求 static下的资源

      // if(!this.chinaMapData){
      //   const { data: res } = await this.axiosInstance.get('../../../assets/data/china')
      //   this.chinaMapData = res
      // }
      // 注册地图数据
      this.$echarts.registerMap('china', this.chinaJson)

      // 初始化配置项
      const initOption = {
        title: {
          text: '🌏商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          //允许拖动及缩放
          roam: true,
          // zoom: 1.1, //默认缩放比例
          itemStyle: {
            // 地图的填充色
            areaColor: '#2E72BF',
            // 省份的边框色
            borderColor: '#333',
          },
          label: {
            show: true,
            color: 'white',
            formatter: `{a}`,
          },
        },
      }
      this.chartInstance.setOption(initOption)
      // 主动触发 响应式配置
      this.screenAdapter()
      //获取散点数据,已转成websocket实现
      //this.getData()
      // 进入省份事件函数
      this.chartInstance.on('click', e => {
        // 通过工具函数拿到点击的地图对应的中文拼音(key),和拼接出需要的文件路径(path)
        const ProvinceInfo = getProvinceMapInfo(e.name)

        // 先判断是否已经存在需要请求的数据
        if (!this.cityMapData[ProvinceInfo.key]) {
          // 不存在： 发送请求,获取点击的地图的矢量数据
          getProvinceData({data:ProvinceInfo.path}).then((res)=>{
            // 注册点击的地图
            this.$echarts.registerMap(ProvinceInfo.key, res)
            // 设置最新的配置项
            const changeOption = {
              geo: {
                map: ProvinceInfo.key,
                center:res.features[0].properties.cp,
              },
            }
            // 赋值给 echarts实例
            this.chartInstance.setOption(changeOption)
            // 把请求到的数据保存下来
            this.cityMapData[ProvinceInfo.key] = res
          })
        }else{
          // //   // 设置最新的配置项
          const changeOption = {
            geo: {
              map: ProvinceInfo.key,
              center:this.cityMapData[ProvinceInfo.key].features[0].properties.cp
            },
          }
          // 赋值给 echarts实例
          this.chartInstance.setOption(changeOption)
        }
      })
      this.$socket.send({
        action: 'getData',
        socketType: 'mapData',
        chartName: 'map',
        value: '',
      })
    },
    // 发送请求，获取数据
    getChinaJson() {
      getChainJson({data:null}).then((res)=>{
        // http://127.0.0.1:8888/api/map
        // const { data: res } = await this.$http.get('/map')
        this.chinaJson = res
        this.$nextTick(()=>{
          this.initChart()
        })
      })
    },
    getData(res){
      // getMapData({data:null}).then((res)=>{
      //   this.allData=res
      //   this.updateChart()
      // })
      this.allData=res
      this.updateChart()
    },
    // 更新图表配置项
    updateChart() {
      // // 图例的数据
      const legendArr = this.allData.map(item => {
        return item.name
      })
      // // 散点图的数据
      const seriesArr = this.allData.map(item => {
        // return 一个类别下的所有散点数据
        return {
          type: 'effectScatter',
          // 图例的name需要与series的name相同
          name: item.name,
          data: item.children,
          // 让散点图使用地图坐标系统
          coordinateSystem: 'geo',
          // 涟漪动画效果配置
          rippleEffect: {
            // 涟漪效果直径
            scale: 15,
            // 空心的涟漪动画效果
            brushType: 'stroke',
            color:'red'
          },
        }
      })

      // // 数据配置项
      const dataOption = {
        legend: {
          left: '2%',
          bottom: '5%',
          // 图例的方向
          orient: 'vertical',
          data: legendArr.reverse(),
        },
        series: seriesArr,
      }
      if(this.chartInstance)this.chartInstance.setOption(dataOption)
    },
    // 不同分辨率的响应式
    screenAdapter() {
      // 当前比较合适的字体大小
      const titleFontSize = (document.getElementById('mapId').offsetWidth / 100) * 3.6

      // // 响应式的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize/2,
          },
        },
        legend: {
          // 图例宽度
          itemWidth: titleFontSize / 2,
          // 图例高度
          itemHeight: titleFontSize / 2,
          // 间隔
          itemGap: titleFontSize / 3,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 回到中国地图
    chinaMap() {
      const chinaMapOption = {
        geo: {
          map: 'china',
        },
      }
      this.chartInstance.setOption(chinaMapOption)
    },
  },
}
</script>

<style scoped>
</style>