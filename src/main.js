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
// 调用插件
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.use(echarts);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
