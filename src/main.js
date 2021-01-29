import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index"
// elementUI 导入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vuescroll from 'vuescroll';
// 调用插件
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
