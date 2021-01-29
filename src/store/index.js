import Vue from "vue";
import Vuex from "vuex"
import router from "../router";

Vue.use(Vuex);
const store= new Vuex.Store({
  state:{
    headerTab:{
      editableTabs: [{
        title: '首页',
        name: '0',
        content: 'Tab 1 content',
        path:"/",
        index:"0"
      }],
      editableTabsValue:"0",
      tabIndex:0
    },
    navMenu:{
      menu:{
        defaultActive:""
      }
    },
    login:{
      show:true
    }
  },
  mutations:{
    handleTabsAdd(state,params){
      state.navMenu.menu.defaultActive=params.tab.index
      for(let item of state.headerTab.editableTabs){
        if(params.tab.name==item.name){
          return;
        }
      }
      state.headerTab.editableTabs.push(params.tab)
    },
    handleTabsEdit(state,params){
      state.headerTab.tabIndex= Number.parseInt(params.tab.name)
      state.headerTab.editableTabsValue=params.tab.name
    },
    handleTabsRemove(state,params){
      let activeMenu=state.headerTab.editableTabs.find(n=>{
        return n.name==params.tab.activeName
      })
      state.navMenu.menu.defaultActive=activeMenu.index
      router.push({
        path:activeMenu.path
      })
      for(let i in state.headerTab.editableTabs){
        if(state.headerTab.editableTabs[i].name==params.tab.name){
          state.headerTab.editableTabs.splice(i,1)
        }
      }
    },
    handleDefaultActive(state,params){
      state.navMenu.menu.defaultActive=params.tab.index
    },
    changeLoginShow(state,params){
      state.login.show=params.show
    },
    restoreState(state){
      state.headerTab.editableTabs= [{
        title: '首页',
        name: '0',
        content: 'Tab 1 content',
        path:"/",
        index:"0"
      }],
      state.headerTab.editableTabsValue="0",
      state.headerTab.tabIndex=0,
      state.navMenu.menu.defaultActive=""
    }
  }
});
export default store
