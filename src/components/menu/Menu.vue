<template>
  <div class="menuClass">
    <div class="topClass">
      <span>
        <el-button type="primary" icon="el-icon-circle-plus" class="addBtn" @click="addMenu">添加菜单</el-button>
      </span>
    </div>
    <div class="tableClass">
        <el-table
          :data="tableData"
          style="width: 86%;"
          row-key="id"
          height="555"
          max-height="700"
          border
          default-expand-all
          :tree-props="{children: 'children'}">
          <el-table-column
            prop="title"
            label="菜单标题">
          </el-table-column>
          <el-table-column
            prop="index"
            label="菜单索引">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="菜单图标">
          </el-table-column>
          <el-table-column
            prop="path"
            label="菜单路径">
          </el-table-column>
          <el-table-column
          prop="createTime"
          label="创建时间"
          width="185"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="creatorName"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="level"
            label="菜单等级">
          </el-table-column>
          <el-table-column
          label="操作"
          width="150px">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
    </div>
    <menu-edit v-if="menuEditShow" :toEditParams=toEditParams></menu-edit>
  </div>
</template>

<script>
import {getMenuTree,deleteMenu,logout} from '../../request/sysApi'
import MenuEdit from './MenuEdit';

export default {
  name: "User",
  data() {
    return {
      tableData: [{}],
      loading:true,
      menuEditShow:false,
      toEditParams:{},
      level1Menus:[]
    };
  },
  components: {
    MenuEdit
  },
  mounted() {
    this.init()
  },
  created(){
  },
  methods: {
    init(){
      getMenuTree({
        data:{
        }
      }).then((res)=>{
        this.tableData=res.data
        this.loading=false
        this.level1Menus=[]
        for(let td of this.tableData){
          this.level1Menus.push({
            value: td.id,
            label: td.title
          })
        }
      }).catch((err)=>{
      })
    },
    deleteClick(row){
      this.$confirm('确定删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu({
          data:{
            id:row.id
          }
        }).then(res=>{
          if(res.code===200){
            this.$message({
              type:'success',
              message:res.message
            })
            this.delayLogout()
          }else{
            this.$message({
              type:'error',
              message:res.message
            })
          }
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    editClick(row){
      this.toEditParams={editName:"修改",ruleForm:row,readonlyStatus:true}
      this.changeMenuEditShow(true)
      //alert("开发中。。。")
    },
    addMenu(){
      this.toEditParams={editName:"添加",ruleForm:{level:1},readonlyStatus:false,level1Menus:this.level1Menus}
      this.changeMenuEditShow(true)
    },
    changeMenuEditShow(status){
      this.menuEditShow=status
    },
    delayLogout(){
      setTimeout(()=>{
        logout({
        }).then(res=>{
          if(res.code===200){
            this.$message({
            type:'warning',
            message:"请重新登录！"
          })
            this.$router.push("/login")
            this.$store.commit({
              type:"changeLoginShow",
              show:true
            })
            this.$store.commit("restoreState")
          }
        })
      },800)
    }
  }
};
</script>

<style scoped>
  el-table-column{
    display: flex;
    flex: 1;
  }
  .tableClass{
    position: relative;
    top: 10px;
    overflow: auto;
  }
  .topClass{
    position: relative;
    top: 5px;
    left: 15px;
  }
</style>
