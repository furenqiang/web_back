<!-- 可视化demo1 -->
<template>
  <div class="charts">
    <div id="demo1Chart1" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart2" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart3" :style="{width: '500px', height: '300px'}"></div>
    <div id="demo1Chart4" :style="{width: '500px', height: '300px'}"></div>
    <div id="aplayerDiv">
       <vue-scroll :ops="ops" class="vueScroll">
       <aplayer autoplay :float="false" :showlrc="true" :music="{
          title: '阿拉斯加的海湾',
          artist: '男声版',
          src: 'http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3',
          pic: 'https://p2.music.126.net/ixIs5kkukgNYMmeDsc35_g==/29686813955450.jpg',
          lrc: '[ti:阿拉斯加海湾][ar:蓝心羽][al:阿拉斯加海湾][by:][offset:0][00:00.98]阿拉斯加海湾-蓝心羽[00:03.17]词：菲道尔/李康宁[00:04.55]曲：菲道尔[00:05.32]原唱：菲道尔[00:06.29]编曲：于山川@Cstudio[00:07.48]贝斯：石间@Cstudio[00:08.46]吉他：丁兆尊龙[00:09.61]和声编写：田跃君[00:11.00]和声：蓝心羽[00:12.29]混音：王巍MOKA[00:12.45]制作人：杜叔叔[00:12.65]统筹：文氓苏[00:13.76]宣发：张婧/寂瞳/游文雅/杜钰雯[00:15.17]OP：LoolalaMusicMSdn.Bhd.[00:15.52]SP：环球音乐版权管理集团(UniversalMusicPublishingCHINA)[00:17.19]音乐制作：极韵文化/BLUESTUDIO[00:18.35]音乐发行：极韵文化/BLUESTUDIO[00:19.75]出品：「极韵文化」/「BLUESTUDIO」/「造音行动」[00:20.61]（此版本为正式授权翻唱作品）[00:22.25]上天啊[00:25.29]难道你看不出我很爱她[00:29.41]怎么明明相爱的两个人[00:32.86]你要拆散他们啊[00:39.03]上天啊[00:41.93]你千万不要偷偷告诉她[00:46.24]在无数夜深人静的夜晚[00:49.85]有个人在想她[00:55.01]以后的日子你要好好照顾她[01:03.39]我不在她身旁你不能欺负她[01:11.51]别再让人走进她心里[01:15.98]最后却又离开她[01:20.84]因为我不愿再看她流泪啦[01:41.57]上天啊[01:44.55]你是不是在偷偷看笑话[01:48.65]明知我还没能力保护她[01:52.41]让我们相遇啊[01:58.45]上天啊[02:01.17]她最近是否不再失眠啦[02:05.41]愿世间温情化作一缕风[02:09.10]代替我拥抱她[02:14.37]以后的日子你要好好照顾她[02:22.59]我不在她身旁你不能欺负她[02:30.86]别再让人走进她心里[02:34.98]最后却又离开她[02:40.23]因为我不愿再看她流泪啦[02:47.80]希望我的努力能够赶上她[02:56.01]有天我能给她完整的一个家[03:04.41]可若你安排了别人给她[03:09.40]我会祝福她[03:13.24]上天你别管我先让她幸福吧[03:21.63]上天啊[03:24.70]这些晚上我对你说的话[03:28.92]你别不小心漏嘴告诉她[03:32.60]我怕会吵醒她[03:38.64]上天啊[03:41.73]你千万不要偷偷告诉她[03:45.88]在无数夜深人静的夜晚[03:49.55]我依旧在想她',
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
          src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
          pic: 'https://p1.music.126.net/tczb_7II9KzSuLQsVt89Gw==/109951163049336667.jpg',
          },
          {
            title: '说谎',
            artist: '林宥嘉',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p2.music.126.net/mMZNB-jhYsw29K61QtopJA==/109951163187404137.jpg',
          },
          {
            title: '成都',
            artist: '赵雷',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg'
          },
          {
            title: '陪你到底',
            artist: '许华升',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/a7QkLGexMQGT2lF3mqcUdw==/109951163693319625.jpg',
          },
          {
            title: '广东爱情故事',
            artist: '雨神',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/gjvguk9I-QwuyWFjQHM9SA==/109951163189947600.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
            pic: 'https://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
          },
          {
            title: '烟火里的尘埃',
            artist: '华晨宇',
            src: "http://win.web.nf01.sycdn.kuwo.cn/ff51fd86dafa8da1ea2184eb2bc9d58d/6066e065/resource/n1/21/56/1067948247.mp3",
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
<style>
  .aplayer-lrc{
     height: 110px !important;
     position: relative;
     top: -25px;
   }
  .aplayer-info{
    height: 200px !important;
  }
</style>