<!-- 详情抽屉公用页面 -->
<template>
  <div class="detailClass">
      <el-drawer
        class="drawerClass"
        :title="toDeatilParams.detailTitle"
        :visible.sync="toDeatilParams.detailDrawer">
        <vue-scroll :ops="ops" >
          <div class="divClass">
            <span class="spanClass">{{toDeatilParams.detailData}}</span>
          </div>
        </vue-scroll>
      </el-drawer>
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
  props:{
    toDeatilParams:{
      type:Object
    }
  },
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
    height: 100px;
    width: 430px;
  }
  .spanClass{
    color: red;
  }
</style>