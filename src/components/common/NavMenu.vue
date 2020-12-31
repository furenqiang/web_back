<template>
  <div class="navMenu" id="navMenu">
    <el-radio-group fill="#AAE2E1" v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
      :unique-opened="true">
      <el-submenu :index="item.index" v-for="(item,index) in menu" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item-group >
          <el-menu-item 
          :index="children.index"
           v-for="(children,i) in item.children" 
           :key="i" 
           @click="toPath(children.path)">
            {{children.title}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      menu:[
        {"title":"系统管理",
        "index":"1",
        "icon":"el-icon-menu",
        "path":"",
        "children":[{
          "title":"系统用户",
          "index":"1-1",
          "path":"/user",
          },
          {
            "title":"操作日志",
            "index":"1-2",
            "path":"",
              }]
          },
        {"title":"档案设置",
        "index":"2",
        "icon":"el-icon-setting",
        "children":[
          {"title":"用户档案",
          "index":"2-1",
          "path":"",
          }
        ]}
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
    },
    toPath(path){
      this.$router.push({
        path:path
      })
    }
  },
  mounted(){
    
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  background-color: #f4c9da;
}

.el-menu-item-group {
  background-color: #f4c9da;
}
.el-menu-item.is-active{
  font-size: 16px;
  color: #38b4b2 !important;
}
.el-menu-vertical-demo span{
  font-size: 18px;
}
.navMenu {
  height: 100%;
  width: 200px;
  border-right: solid 1px #f8f4f5;
  position: relative;
  top: -598px;
}
</style>
