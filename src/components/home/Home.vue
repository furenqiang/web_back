<template>
    <div class="homeClass" id="home">
      <div class="charts">
        <div id="homeChart1" :style="{width: '500px', height: '300px'}"></div>
        <div id="homeChart2" :style="{width: '500px', height: '300px'}"></div>
        <div id="homeChart3" :style="{width: '500px', height: '300px'}"></div>
        <div id="homeChart4" :style="{width: '500px', height: '300px'}"></div>
      </div>
      <div class="noticeClass">
        <scroll-ul :scrollData="scrollData"></scroll-ul>
      </div>
    </div>
</template>

<script>
import scrollUl from "../common/scroll/Scroll_ul"

export default {
  name: "Home",
  data() {
    return {
      scrollData: [
        { id: 1, title: '架不住公司高层喜欢这种玩意儿' },
        { id: 2, title: '用在vue项目中的需求跟原生js的实现方法' },
        { id: 3, title: '文字间歇无缝向上滚动' },
        { id: 4, title: '即使你有一百个不乐意，谁让是人家给你发工资呢' },
        { id: 5, title: '今天就单拎出来一种实现方法' },
      ]
    };
  },
  components: {
    scrollUl
  },
  created(){

  },
  mounted() {
    document.getElementById("home").style.height =
      document.body.clientHeight + "px";
      this.drawLine();
  },
  methods: {
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('homeChart1'))
        let myChart2 = this.$echarts.init(document.getElementById('homeChart2'))
        let myChart3 = this.$echarts.init(document.getElementById('homeChart3'))
        let myChart4 = this.$echarts.init(document.getElementById('homeChart4'))
        // 绘制图表
        myChart1.setOption({
            title: { text: '请求耗时统计' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        myChart2.setOption({
            title: { text: '请求耗时统计' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        myChart3.setOption({
            title: { text: '请求耗时统计' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        myChart4.setOption({
          title: { text: '请求耗时统计' },
            tooltip: {},
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
          }]
        });
      
    }
  }
};
</script>

<style scoped>
  .charts{
    width: 1010px;
    height: 650px;
    display: flex;
		flex: 1;
    flex-wrap: wrap;
  }
  .noticeClass{
    border: solid 1px #eea7ba;
    height: 500px;
    width: 320px;
    position: relative;
    left: 1010px;
    top: -600px;
  }
  #homeChart1{
    border: solid 1px #eea7ba;
  }
  #homeChart2{
    border: solid 1px #eea7ba;
  }
  #homeChart3{
    border: solid 1px #eea7ba;
    top: -25px;
  }
  #homeChart4{
    border: solid 1px #eea7ba;
    top: -25px;
  }
</style>
