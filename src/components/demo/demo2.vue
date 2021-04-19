<template>
 <div class="AMap">
    <div class="container">
      
    </div>
 </div>
</template>
<script>
 import AMap from './AMap'
export default {
  name:'AMap',
  data() {
    return {
    }
  },
  methods: {
    initMap(){
      const map=new AMap.Map('container',{
        resizeEnable:true,//监控地图容器尺寸变化
        zoom:10,//缩放级别
        showIndoorMap:true,//是否在有矢量底图的时候自动展示室内地图，PC端默认是true，移动端默认是false
        showBuildingBlock:false//设置地图显示3D楼块效果，移动端也可使用。推荐使用。
      });
    }
  },
  mounted(){
   this.initMap()
  }
}
</script>

<style scoped>
.AMap{
  width: 100%;
  height: 600px;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 50.1%;
  top: 300px;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}
</style>
