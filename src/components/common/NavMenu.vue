<template>
  <div class="navMenu" id="navMenu">
    <el-radio-group fill="#AAE2E1" v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      :default-active="defaultActive"
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
           @click="toPath(children)">
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
        "name":"0",
        "children":[{
          "title":"系统用户",
          "index":"1-1",
          "path":"/user",
          "name":"1"
          },
          {
            "title":"操作日志",
            "index":"1-2",
            "path":"",
            "name":"2"
              }]
          },
        {"title":"档案设置",
        "index":"2",
        "icon":"el-icon-setting",
        "name":"",
        "children":[
          {"title":"用户档案",
          "index":"2-1",
          "path":"",
          "name":"3"
          }
        ]}
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
      //console.log(key, keyPath);
    },
    toPath(children){
      let path=children.path
      this.$router.push({
        path:path
      })
      this.addTab(children)
    },
    addTab(children){
      this.$store.commit({
        type:'handleTabsAdd',
        tab:{
          title: children.title,
          name: children.name,
          content: children.icon,
          path:children.path,
          index:children.index
      }
      })
      this.$store.commit({
        type:'handleTabsEdit',
        tab:{
          index:children.index,
          name: children.name
      }
      })
      this.$store.commit({
        type:'handleDefaultActive',
        tab:{
          index:children.index
      }
      })
    }
  },
  computed:{
    //这里需要把store 动态的数据放到computed里面才会同步更新 视图
    defaultActive:{
      get:function() {
        return this.$store.state.navMenu.menu.defaultActive
      },
      set:function(v){
      } 
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
