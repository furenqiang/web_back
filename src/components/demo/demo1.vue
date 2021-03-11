<!-- 可视化demo1 -->
<template>
  <div class="charts">
    <div id="demo1Chart1" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart2" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart3" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart4" :style="{width: '500px', height: '300px'}"></div>
  </div>
</template>


<script>
require("echarts-wordcloud");
require("echarts-liquidfill");
require('../../assets/data/china')  //引入china.js地图文件
import echartMapData from "../../assets/data/EchartMapData"//引入map数据
export default {
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.drowWorldCloud()
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },
  created() {},
  methods: {
    drowWorldCloud(){
      let myChart1 = this.$echarts.init(document.getElementById('demo1Chart1'))
      let myChart2 = this.$echarts.init(document.getElementById('demo1Chart2'))
      let myChart3 = this.$echarts.init(document.getElementById('demo1Chart3'))
      let myChart4 = this.$echarts.init(document.getElementById('demo1Chart4'))
      myChart1.setOption({
        backgroundColor:'#fff',
            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
            },
            series: [
              {
                type: "wordCloud",
                gridSize: 2,
                shape: "circle",
                // shape: 'pentagon',
                sizeRange: [12, 50],
                // rotationRange: [-90, 90],
                // width: 600,
                // height: 300,
                left: "center",
                top: "center",
                width: "70%",
                height: "80%",
                right: null,
                bottom: null,
                drawOutOfBound: false,
                textStyle: {
                  normal: {
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: function() {
                      return (
                        "rgb(" +
                        [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                        ].join(",") +
                        ")"
                      );
                    }
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowColor: "#333"
                  }
                },
                data: [{name:"活着", value:2352}, {name:"追风筝的人", value:123}]
              }
            ]
      });
      myChart2.setOption({
        series: [{
        type: 'liquidFill',
        data: [0.6]
       }]
      });

      myChart3.setOption(echartMapData),
        window.addEventListener('resize', () => {
          // 自动渲染echarts
          myChart3.resize();
        })
      myChart4.setOption({
        title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                  {value: 335, name: '直接访问'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                  {value: 135, name: '视频广告'},
                  {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
      });
    }
  }
}
</script>
<style scoped>
  .charts{
      width: 1010px;
      height: 650px;
      display: flex;
      flex: 1;
      flex-wrap: wrap;
    }
  #demo1Chart1{
    border: solid 1px #eea7ba;
  }
  #demo1Chart2{
    border: solid 1px #eea7ba;
  }
  #demo1Chart3{
    border: solid 1px #eea7ba;
    top: -25px;
    z-index: 10000;
  }
  #demo1Chart4{
    border: solid 1px #eea7ba;
    top: -25px;
  }
</style>