<!-- 公共滚动条插槽 
使用：
<scroll>
  <span class="spanClass" slot="spanSlot">
    {{toDeatilParams.detailData}}
  </span>
</scroll>
-->
<template>
  <div class="scrollSolt">
    <vue-scroll :ops="ops" >
      <div class="divClass">
        <slot name="spanSlot"></slot>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
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
            background: 'red',
            //opacity: 0.5,//滚动条透明度
            "overflow-x": "hidden"
          }
        },
    };
  },
  components: {},
  computed: {},
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style scoped>
  .divClass{
    position: relative;
    left: 15px;
    height: 650px;
    width: 430px;
  }
</style>