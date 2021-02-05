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
import scrollUl from "../common/scroll/Scroll_auto"
import {countTimeByParams,countExceptByParams,countExceptTop3} from "../../request/sysApi"


export default {
  name: "Home",
  data() {
    return {
      scrollData: [
        { id: 1, title: '《咏梅》' },
        { id: 2, title: '——王安石' },
        { id: 3, title: '墙角数枝梅，' },
        { id: 4, title: '凌寒独自开。' },
        { id: 5, title: '遥知不是雪，' },
        { id: 6, title: '为有暗香来。' },
      ],
      myChart2series:{
        name: '异常名称',
        type: 'bar',
        data: [],
        excName:[]
      },
      myChart2yAxis:{
        data:[]
      },
      myChart3xAxis:{
        data:[]
      },
      myChart3series:{
        name: '时长(秒)',
        type: 'bar',
        data: []
      },
      myChart4xAxis:{
        data:[]
      },
      myChart4series:{
        name: '异常数',
        type: 'line',
        data: []
      }
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
      this.init();
  },
  methods: {
    init(){
      countTimeByParams({data:null}).then((res)=>{
        if(res.code===200){
          res.data.forEach(n => {
            this.myChart3xAxis.data.push(n.createTime.substring(0, 10))
            this.myChart3series.data.push((n.time/1000))
          });
        }
      })
      countExceptByParams({data:null}).then((res)=>{
        if(res.code===200){
          res.data.forEach(n => {
            this.myChart4xAxis.data.push(n.createTime.substring(0, 10))
            this.myChart4series.data.push(n.num)
          });
        }
      })
      countExceptTop3({data:null}).then((res)=>{
        if(res.code===200){
          let i=res.data.length;
          res.data.forEach(n => {
            this.myChart2yAxis.data.push("TOP"+i--)
            this.myChart2series.data.push(n.num)
            this.myChart2series.excName.push(n.excName)
          });
          this.drawLine();
        }
      })

    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('homeChart1'))
      let myChart2 = this.$echarts.init(document.getElementById('homeChart2'))
      let myChart3 = this.$echarts.init(document.getElementById('homeChart3'))
      let myChart4 = this.$echarts.init(document.getElementById('homeChart4'))
      // 绘制图表
      myChart1.setOption({
          title: { text: '请求耗时统计' },
          tooltip: {
            axisPointer: {
                type: 'cross'
            },
            trigger: 'axis', 
            formatter: function (params) {
                params = params[0];
                return params.name+' 总耗时:' + params.value+'秒'; 
            }
          },
          xAxis: {
              data: this.myChart3xAxis.data
          },
          yAxis: {},
          series: this.myChart3series
      });
      myChart2.setOption({
        title: {
            text: '异常TOP榜',
            subtext: '数据来自本系统'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          },
          formatter: function (params) {
            params = params[0];
            return params.excName+":"+ params.value+'次'; 
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.myChart2yAxis.data
        },
        series: this.myChart2series
      });
      myChart3.setOption({
        color:['#a1e3d1'],
        title: { text: '请求耗时统计' },
          tooltip: {
            axisPointer: {
                type: 'cross'
            },
            trigger: 'axis', 
            formatter: function (params) {
                params = params[0];
                return params.name+' 总耗时:' + params.value+'秒'; 
            }
          },
          xAxis: {
            data: this.myChart3xAxis.data
          },
          yAxis: {},
          series: this.myChart3series
      });
      myChart4.setOption({
        color:['#ed335f'],
        title: { text: '每天异常数统计' },
        tooltip: {
          axisPointer: {
            type: 'cross'
          },
          trigger: 'axis', 
            formatter: function (params) {
              params = params[0];
              return params.name+' 异常数:' + params.value+'个'; 
            }
        },
        xAxis: {
          type: 'category',
          data: this.myChart4xAxis.data
        },
        yAxis: {
          type: 'value'
        },
        series: this.myChart4series
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
