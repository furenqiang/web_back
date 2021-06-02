<!--  -->
<template>
  <div class="com-container">
    <div class="com-chart" id="sellerId" ref="seller_ref"></div>
  </div>
</template>

<script>
//import {getSellerData} from '../../../request/oneMapApi'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chartInstance:null,
      chartData:[],
      currentPage:1,
      totalPage:0,
      intarvalId:null
    };
  },
  components: {},
  computed: {
  },
  watch:{
  },
  mounted() {
    this.initChart()
    this.$socket.registerCallBack('sellerData',this.getData)
    //this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'sellerData',
      chartName: 'seller',
      value: '',
    })
    window.addEventListener('resize',this.screenAdapter)
    this.screenAdapter()
  },
  created() {},
  methods: {
    initChart(){
      this.chartInstance=this.$echarts.init(document.getElementById('sellerId'),'chalk')
      const initOption={
        title:{
          text:'📕商家销售统计',
          textStyle:{
            fontSize:25
          },
          top:10,
          left:5  
        },
        xAxis:{
          type:'value'
        },
        yAxis:{
          type:'category'
        },
        series:[
          {
            type:'bar',
            barWidth:65,
            label:{
              show:true,
              position:'right',
              textStyle:{
                color:'red'
              }
            },
            itemStyle:{
              barBorderRadius:[0,33,33,0],
              //设置线性渐变，参数分别代表x1,y1,x2,y2,[颜色值],如下,代表从(0,0)到(0,1)方向
              color:new this.$echarts.graphic.LinearGradient(0,0,1,0,[{
                offset:0,//百分之0下的颜色值
                color:'#5052EE'
              },{
                offset:1,
                color:'#AB6EE5'
              }])
            }
          }
        ],
        tooltip:{
          trigger:'axis',
          axisPointer:{
            type:'line',
            lineStyle:{
              width:60,
              color:'#bbd9f5'
            },
            z:0
          }
        },
        grid:{
          height:'50%'
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover',()=>{
        clearInterval(this.intarvalId)
      })
      this.chartInstance.on('mouseout',()=>{
        this.startInterval()
      })
    },
    getData(res){
      // getSellerData({
      //   data:null
      // }).then((res)=>{
      //   this.chartData=res
      //   this.chartData.sort((a,b)=>{
      //     return a.value-b.value
      //   })
      //   this.totalPage= this.chartData.length%5==0?this.chartData.length/5:this.chartData.length/5+1
      //   this.updateChart()
      //   this.startInterval()
      // })
      this.chartData=res
      this.chartData.sort((a,b)=>{
        return a.value-b.value
      })
      this.totalPage= this.chartData.length%5==0?this.chartData.length/5:this.chartData.length/5+1
      this.updateChart()
      this.startInterval()
    },
    updateChart(){
      const start=(this.currentPage-1)*5
      const end=this.currentPage*5
      let showData=this.chartData.slice(start,end)
      const sellerNames=showData.map((item)=>{
        return item.name
      })
      const sellerValues=showData.map((item)=>{
        return item.value
      })
      const dataOption={
        yAxis:{
          data:sellerNames
        },
        series:[
          {
            data:sellerValues
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    startInterval(){
      if(this.intarvalId){
        clearInterval(this.intarvalId)
      }
      this.intarvalId=setInterval(()=>{
        this.currentPage++
        if(this.currentPage>this.totalPage){
          this.currentPage=1
        }
        this.updateChart()
      },3000)
    },
    screenAdapter(){
      const titleFontSize=this.$refs.seller_ref.offsetWidth/100*3.6
      const adapterOption={
          title:{
          textStyle:{
            fontSize:titleFontSize/1.2
          }, 
        },
        series:[
          {
            barWidth:titleFontSize/2,
            itemStyle:{
              barBorderRadius:[0,titleFontSize/2,titleFontSize/2,0]
            }
          }
        ],
        tooltip:{
          axisPointer:{
            lineStyle:{
              width:titleFontSize
            }
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  },
  destroyed(){
    clearInterval(this.intarvalId)
    window.removeEventListener('resize',this.screenAdapter)
    this.$socket.unRegisterCallBack('sellerData')
  }
}
</script>
<style scoped>
  #sellerId {
    background-color: #9cc6ee;
  }
</style>