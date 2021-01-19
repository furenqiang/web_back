<template>
  <div id="app">
    <div class="background" v-if="!show">
        <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <Header v-if="!show"></Header>
    <div class="routerView">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <NavMenu v-if="!show"></NavMenu>
    <Footer v-if="!show"></Footer>
  </div>
</template>

<script>
import NavMenu from "./components/common/NavMenu";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
export default {
  name: "App",
  data() {
    return {
      imgSrc:require('./assets/img/background.png')
    };
  },
  components: {
    NavMenu,
    Footer,
    Header
  },
  computed:{
    show:{
      get:function(){
        return this.$store.state.login.show
      }
    }
  }
};
</script>

<style>
  body{
    height :750px;
    padding: 0;
    margin:0;
    overflow :hidden;
  }
  
  .background {
    width: 100%;
    height: 100%; /**宽高100%是为了图片铺满屏幕 */
    z-index: -9999;
    position: absolute;
  }

   .routerView{
    background-color: #f7f1f4;
    width: 100%;
    height: 600px;
    position: relative;
    top: 5px;
    left: 201px;
  }
</style>
