<template>
 <div class="leaflet">
    <div class="container">
      <div id="map" class="map"></div>
    </div>
 </div>
</template>
<script>
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';
export default {
  name:'AMap',
  data() {
    return {
      map:""
    }
  },
  methods: {
    
    initMap(){
        this.map = L.map("map", {
        center: [40.02404009136253, 116.50641060224784], // 地图中心
        zoom: 14, //缩放比列
        zoomControl: true, //禁用 + - 按钮
        doubleClickZoom: true, // 禁用双击放大
        attributionControl: true // 移除右下角leaflet标识
      });
      let name = L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
      ).addTo(this.map);
      //   this.map.removeLayer(name)  // 移除图层
      
      // add leaflet.pm controls with some options to the map
      this.map.pm.addControls({
        position: 'topleft',
        drawCircle: false,
      });
      // listen to vertexes being added to currently drawn layer (called workingLayer)
      this.map.on('pm:drawstart', ({ workingLayer }) => {
        workingLayer.on('pm:vertexadded', e => {
          console.log(e);
        });
      });
    }
  },
  mounted(){
   this.initMap()
  }
}
</script>

<style scoped>
.leaflet{
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
.map {
  width: 100%;
  height: calc(100%);
  z-index: 1;
}
</style>
