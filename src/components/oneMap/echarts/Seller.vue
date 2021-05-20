<!--  -->
<template>
  <div class="com-container">
    <div class="com-chart" id="sellerId"></div>
  </div>
</template>

<script>
import {getSellerData} from '../../../request/oneMapApi'
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
  computed: {},
  mounted() {
    this.initChart()
    this.getData()
  },
  created() {},
  methods: {
    initChart(){
      this.chartInstance=this.$echarts.init(document.getElementById('sellerId'))
      this.chartInstance.on('mouseover',()=>{
        clearInterval(this.intarvalId)
      })
      this.chartInstance.on('mouseout',()=>{
        this.startInterval()
      })
    },
    getData(){
      getSellerData({
        data:null
      }).then((res)=>{
        this.chartData=res
        this.chartData.sort((a,b)=>{
          return a.value-b.value
        })
        this.totalPage= this.chartData.length%5==0?this.chartData.length/5:this.chartData.length/5+1
        this.updateChart()
        this.startInterval()
      })
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
      const option={
        xAxis:{
          type:'value'
        },
        yAxis:{
          type:'category',
          data:sellerNames
        },
        series:[
          {
            type:'bar',
            data:sellerValues
          }
        ]
      }
      this.chartInstance.setOption(option)
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
    }
  },
  destroyed(){
    clearInterval(this.intarvalId)
  }
}
</script>
<style scoped>
</style>