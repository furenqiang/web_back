<!-- 可视化demo1 -->
<template>
  <div class="charts">
    <div id="demo1Chart1" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart2" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart3" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart4" :style="{width: '500px', height: '300px'}"></div>
    <div id="aplayerDiv">
       <vue-scroll :ops="ops" class="vueScroll">
       <aplayer autoplay :music="{
          title: '剑心',
          artist: '张杰',
          src: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.m4a',
          pic: 'https://p2.music.126.net/ixIs5kkukgNYMmeDsc35_g==/29686813955450.jpg'
        }" :list="musicList">
        </aplayer>
    </vue-scroll>
    </div>
  </div>
</template>


<script>
require("echarts-wordcloud");
require("echarts-liquidfill");
require('../../assets/data/china')  //引入china.js地图文件
import echartMapData from "../../assets/data/EchartMapData"//引入map数据
import aplayer from "vue-aplayer";
export default {
  data () {
    return {
      ops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {
            keepShow:true
          },
          bar: {
            hoverStyle: true,
            onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
            background: 'green',
            //opacity: 0.5,//滚动条透明度
            "overflow-x": "hidden"
          }
        },
      musicList: [{
          title: '白羊',
          artist:'徐秉龙',
          src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
          pic: 'https://p1.music.126.net/tczb_7II9KzSuLQsVt89Gw==/109951163049336667.jpg',
          },
          {
            title: '说谎',
            artist: '林宥嘉',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p2.music.126.net/mMZNB-jhYsw29K61QtopJA==/109951163187404137.jpg',
          },
          {
            title: '成都',
            artist: '赵雷',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg'
          },
          {
            title: '陪你到底',
            artist: '许华升',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/a7QkLGexMQGT2lF3mqcUdw==/109951163693319625.jpg',
          },
          {
            title: '广东爱情故事',
            artist: '雨神',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/gjvguk9I-QwuyWFjQHM9SA==/109951163189947600.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          }]
    };
  },
  components: {
    aplayer: aplayer
  },
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

  }
  #demo1Chart4{
    border: solid 1px #eea7ba;

  }
  #aplayerDiv{
    border: solid 1px #eea7ba;
    height: 600px;
    width: 330px;
    position: relative;
    left: 1005px;
    top: -605px;
  }
  #aplayerDiv .vueScroll{
    height: 600px !important;
  }
</style>