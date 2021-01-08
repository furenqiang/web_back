<template>
    <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit" @tab-click="handleClick">
      <el-tab-pane
        :key="item.name"
        v-for="(item) in editableTabs"
        :label="item.title"
        :name="item.name"
        :defaultActive="item.index"
        :path="item.path"
      >
      </el-tab-pane>
    </el-tabs>
</template>

<style>
  .el-tabs__item.is-active {
    font-size: 16px;
    background-color: #d0f0ed !important;
  }
</style>

<script>
  export default {
    data() {
      return {
        editableTabs: this.$store.state.headerTab.editableTabs
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$store.commit({
            type:'handleDefaultActive',
            tab:{
              index: tab.$attrs.defaultActive
            }
          })
        this.$router.push({
          path:tab.$attrs.path
        })
      },
      handleTabsEdit(targetName, action) {
        if(targetName==0){
          return;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          this.$store.commit({
            type:'handleTabsRemove',
            tab:{
              name: targetName
          }
          })
        }
      }
    },
    watch: {
    '$store.state.headerTab.editableTabs': function () {
      //你需要执行的代码
      this.editableTabs=this.$store.state.headerTab.editableTabs
      this.editableTabsValue=this.$store.state.headerTab.editableTabsValue
      this.tabIndex= this.$store.state.headerTab.tabIndex
    }
  },
  computed:{
    //这里需要把store 动态的数据放到computed里面才会同步更新 视图
    tabIndex:{
      get:function(){
         return this.$store.state.headerTab.tabIndex
      },
      set:function(v){
      } 
    },
    editableTabsValue:{
      get:function(){
         return this.$store.state.headerTab.editableTabsValue
      },
      set:function(v){
        this.$store.commit({
        type:'handleTabsEdit',
        tab:{
          name: v
          }
        })
      }
    }
  }
  }
</script>