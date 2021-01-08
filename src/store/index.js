import Vue from "vue";
import Vuex from "vuex"

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
        defaultActive:"1-1"
      }
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
      for(let i in state.headerTab.editableTabs){
        if(state.headerTab.editableTabs[i].name==params.tab.name){
          state.headerTab.editableTabs.splice(i,1)
        }
      }
    },
    handleDefaultActive(state,params){
      state.navMenu.menu.defaultActive=params.tab.index
    }
  }
});
export default store
