<template>
  <div class="header">
    <div class="rightClass">
      <template>
        <div class="deamo-type">
          <a href="/home" >
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </a>
        </div>
      </template>
    </div>
    <div class="centerClass">
      <HeaderTab></HeaderTab>
    </div>
    <div class="leftClass">
      <img :src="imgSrc" >
    </div>
  </div>
</template>

<style>
  .header {
    height: 68px;
    width: 100%;
  }
  .rightClass {
    text-align: right;;
    position: relative;
    top: 30%;
    right: 4.5%;
  }
  .centerClass{
    width: 1000px;
    height: 68.1px;
    position: relative;
    left: 300px;
    top: -10px;
  }
  .leftClass img{
    width: 200px;
    height: 68.1px;
    position: relative;
    top: -111.5px;
  }
</style>

<script>
import HeaderTab from "../common/Header_tab"
export default {
  data() {
    return {
      isCollapse: true,
      imgSrc:require('../../assets/img/logo.png')
    };
  },
  components:{
    HeaderTab
  },
  methods: {
  },
  mounted(){
    
  }
};
</script>
