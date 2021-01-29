<!-- 详情抽屉公用页面 -->
<template>
  <div class="detailClass">
      <el-drawer
        class="drawerClass"
        :title="toDeatilParams.detailTitle"
        :visible.sync="toDeatilParams.detailDrawer">
        <scroll>
          <span class="spanClass" slot="spanSlot">
            {{toDeatilParams.detailData}}
          </span>
        </scroll>
      </el-drawer>
  </div>
</template>

<script>
import scroll from '../scroll/Scroll'

export default {
  data () {
    return {
      
    };
  },
  components: {
    scroll
  },
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
  .spanClass{
    color: red;
  }
</style>