import Vue from "vue";
import Router from "vue-router";
// 后面这里引入可以被用户访问的页面组件
import home from "../components/home/Home";
import user from "../components/sysUser/User";

Vue.use(Router);

export default new Router({
  // 设置路由模式为‘history’，去掉默认的#
  mode: "history",
  routes: [
    // 路由列表
    {
      // path: "路由地址",
      path: "/",
      // component: 组件类名,
      redirect: "/home"
    }, // 路由列表
    {
      // name:"路由别名",
      name: "home",
      // path: "路由地址",
      path: "/home",
      // component: 组件类名,
      component: home
    }, // 路由列表
    {
      // name:"路由别名",
      name: "user",
      // path: "路由地址",
      path: "/user",
      // component: 组件类名,
      component: user
    }
  ]
});

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
