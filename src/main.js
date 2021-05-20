import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index"
// elementUI 导入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vuescroll from 'vuescroll';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import VueAMap from 'vue-amap';
import './assets/css/global.css';
// import L from "leaflet";
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.pm';
// import 'leaflet.pm/dist/leaflet.pm.css';
// import map from './map/map.js';
// //将map.js挂载到vue上
// Vue.prototype.$map = map;

// 调用插件
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.use(echarts);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

//注册事件总线
Vue.prototype.$bus=new Vue();

//引入高德地图
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'dd987c1fb29d591d0bd93b44205eeb06',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
