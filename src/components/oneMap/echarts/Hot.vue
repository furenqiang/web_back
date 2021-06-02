<template>
  <div class="com-container">
    <div class="com-chart" ref="hotRef"></div>
    <span class="iconfont icon-left" id="leftId" @click="toLeft" >&#xe6ef;</span>
    <span class="iconfont icon-right" id="rightId" @click="toRight" >&#xe6ed;</span>
    <span class="cate-name" >{{ cateName }}</span>
  </div>
</template>

<script>
//import { getThemeValue } from 'utils/theme_utils'
//import _ from 'lodash'
//import {getHotData} from '../../../request/oneMapApi'

export default {
  name: 'Hot',
  data() {
    return {
      // 图表的实例对象
      chartInstance: null,
      // 从服务器中获取的所有数据
      allData: null,
      // 当前显示的一级分类数据类型
      currentIndex: 0,
      // 字体响应式大小
      titleFontSize: null,
    }
  },
  created() {
    this.$socket.registerCallBack('hotData', this.getData)
  },
  computed: {
    cateName() {
      if (!this.allData) return ''
      return this.allData[this.currentIndex].name
    },
    // themeStyle() { 
    //   if (!this.titleFontSize) {
    //     return { color: getThemeValue(this.theme).titleColor }
    //   }
    //   return {
    //     fontSize: this.titleFontSize + 'px',
    //     color: getThemeValue(this.theme).titleColor,
    //   }
    // },
  },
  watch: {
    // theme() {
    //   console.log('主题切换了')
    //   // 销毁当前的图表
    //   this.chartInstance.dispose()
    //   // 以最新主题初始化图表对象
    //   this.initChart()
    //   // 屏幕适配
    //   this.screenAdapter()
    //   // 渲染数据
    //   this.updateChart()
    // },
  },
  mounted() {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hotproduct',
      value: '',
    })
    window.addEventListener('resize', this.screenAdapter)
    // 主动触发 响应式配置
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
    this.$socket.unRegisterCallBack('hotData')
  },
  methods: {
    // 初始化图表的方法
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hotRef, 'chalk')

      const initOption = {
        title: {
          text: '🔴热销商品占比',
          left: 20,
          top: 20,
        },
        legend: {
          top: '10%',
          left:'20%',
          // 图标类型 圆形
          icon: 'circle',
        },
        tooltip: {
          show: true,
          // formatter:'hhh'
          formatter: arg => {
            // 拿到三级分类的数据
            const thirdCategory = arg.data.children
            // 计算所有三级分类的数值总和，才能计算出百分比
            let total = 0
            thirdCategory.forEach(item => {
              total += item.value
            })
            // 显示的文本
            let showStr = ''
            thirdCategory.forEach(item => {
              showStr +=`${item.name}:${parseInt(item.value/total*100)}%</br>`
            })
            return showStr
          },
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter:`{b}{d}%`
            },
            // 高亮状态下的样式
            emphasis: {
              labelLine: {
                // 连接文字的线条
                show: true,
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
      //this.getData()
    },
    // 发送请求，获取数据
    getData(res) {
      // getHotData({data:null}).then((res)=>{
      //   this.allData = res
      //   this.updateChart()
      // })
      this.allData = res
      this.updateChart()
    },
    // 更新图表配置项
    updateChart() {
      // 处理数据
      const legenDateArr = this.allData[this.currentIndex].children.map(item => item.name)
      const seriesDataArr = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children,
        }
      })
      const dataOption = {
        legend: {
          data: legenDateArr,
        },
        series: [
          {
            data: seriesDataArr,
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
    // 不同分辨率的响应式
    screenAdapter() {
      this.titleFontSize = (this.$refs.hotRef.offsetWidth / 100) * 3.6

      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize/2,
          },
        },
        legend: {
          itemWidth: this.titleFontSize/2,
          itemHeight: this.titleFontSize/2,
          // 图例的间隔
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 1.2,
          },
        },
        series: [
          {
            // 饼图的大小 半径
            radius: this.titleFontSize * 3.5,
            // 控制饼图的位置 x,y
            center: ['40%', '60%'],
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 点击左侧按钮
    toLeft() {
      this.currentIndex--
      // 已到达最左边
      if (this.currentIndex < 0) this.currentIndex = this.allData.length - 1
      this.updateChart()
    },
    // 点击右侧按钮
    toRight() {
      this.currentIndex++
      // 已到达最右边
      if (this.currentIndex > this.allData.length - 1) this.currentIndex = 0
      this.updateChart()
    },
  },
}
</script>

<style scoped>

  #rightId {
    position: absolute;
    top: 50%;
    right: 25%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 50px;
  }
  #leftId {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 50px;
  }
  .cate-name {
    position: absolute;
    right: 30%;
    bottom: 20px;
    z-index: 999;
  }
</style>