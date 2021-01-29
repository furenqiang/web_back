<!-- 自动向上滚动文字 -->
<template>
  <div class="scrollUlClass" ref="scroll">
    <ul>
      <li v-for="item in scrollData" :key="item.id">
        {{item.title}}
        <!-- <router-link to=""></router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollArea: '',
      speed: 10,
      timer: null,
      delay: 2000,
      liHeight: ''
    };
  },
  components: {},
  props:{
    scrollData:{
      type:Array
    }
  },
  computed: {},
  mounted() {
      //向上滚动文字
      this.$nextTick(() => {
      this.scrollArea = this.$refs.scroll;
      let li = this.scrollArea.getElementsByTagName("li");
      this.liHeight = li[0].offsetHeight;
      this.scrollArea.scrollTop = 0;
      this.scrollArea.innerHTML += this.scrollArea.innerHTML;
      this.scrollData.length > 1 && setTimeout(this.startScroll, this.delay);
    })
  },
  created() {},
  methods: {
    startScroll(){
      this.timer = setInterval(this.scrollUp, this.speed);
      this.scrollArea.scrollTop++;
    },
    scrollUp(){
      if(this.scrollArea.scrollTop % this.liHeight == 0){
        clearInterval(this.timer);
        setTimeout(this.startScroll, this.delay);
      }else{
        this.scrollArea.scrollTop++;
        if(this.scrollArea.scrollTop >= this.scrollArea.scrollHeight / 3.1){
          this.scrollArea.scrollTop = 0;
        }
      }
    },
  }
}
</script>
<style scoped>
.scrollUlClass{
  height: 500px;
  width: 300px;
  line-height:50px;
  overflow:hidden;
}
</style>