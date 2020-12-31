import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
// elementUI 导入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 调用插件
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
