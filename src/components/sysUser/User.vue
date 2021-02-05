<template>
  <div class="userClass">
    <div class="topClass">
      <span>
        <el-button type="primary" icon="el-icon-circle-plus" class="addBtn" @click="register">创建</el-button>
        用户名：<el-input v-model="inputUsername" class="input"></el-input>
        创建人：<el-input v-model="inputCreatorName" class="input"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search()" class="searchBtnClass">搜索</el-button>
      </span>
    </div>
    <div class="tableClass">
      <el-table
      v-loading="loading"
      :data="tableData"
      height="500"
      max-height="500"
      border
      style="width: 86%">
        <el-table-column
        type="index"
        width="60"
        label="序号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          >
        </el-table-column>
        <el-table-column
          prop="creatorName"
          label="创建人"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="formatStatus"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150px">
          <template slot-scope="scope">
            <el-button @click="detailClick(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">禁用</el-button>
            <user-detail :toDeatilParams="toDeatilParams"></user-detail>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottomClass">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :pager-count="5">
        </el-pagination>
      </div>
    </div>
    <user-add v-if="userAddShow" :toAddParams=toAddParams></user-add>
  </div>
</template>

<script>
import {getUserListByParams,deleteUser} from '../../request/sysApi'
import UserAdd from './UserAdd.vue';
import userDetail from '../common/detail/Detail_from';

export default {
  name: "User",
  data() {
    return {
      tableData: [{}],
      currentPage:1,
      pageSize:10,
      total:1,
      inputUsername:"",
      inputCreatorName:"",
      userAddShow:false,
      toAddParams:{},
      loading:true,
      toDeatilParams:{
        detailFormVisible:false,
        detailForm:{},
        detailFormKey:["username","creatorName","createTime","password","roles"],
        detailFormValue:["用户名","创建人","创建时间","密码（加密）","所授权限"],
        detailTitle:"用户详情"
      }
    };
  },
  components: {
    UserAdd,
    userDetail
  },
  mounted() {
    this.init()
  },
  created(){
  },
  methods: {
    search(){
      this.currentPage=1
      this.pageSize=10
      this.init()
    },
    init(){
      getUserListByParams({
        data:{
          page:this.currentPage,
          size:this.pageSize,
          username:this.inputUsername,
          creatorName:this.inputCreatorName
        }
      }).then((res)=>{
        if(res.code===200){
          //console.log(res);
          this.tableData=res.data
          this.total=res.total
          this.loading=false
        }
      }).catch((err)=>{
        //console.log(err);
      })
    },
    detailClick(row) {
      if(row.roles instanceof Array){
        let roles="| "
        row.roles.forEach(item => {
          roles+=(item.roleDesc+" | ")
        });
        row.roles=roles
      }
      this.toDeatilParams.detailForm=row
      this.toDeatilParams.detailFormVisible=true
    },
    deleteClick(row){
      this.$confirm('确定永久删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({
          data:{
            id:row.id
          }
        }).then(res=>{
          if(res.code===200){
            this.$message({
              type:'success',
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
    handleSizeChange(val) {
      this.pageSize=val
      this,this.init()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this,this.init()
    },
    register(){
      this.toAddParams={addName:"新建"}
      this.changeUserAddShow(true)
    },
    changeUserAddShow(status){
      this.userAddShow=status
    },
    formatStatus(row, column){
      let res=""
      switch(row.status){
        case 0:
          res="停用"
          break;
        case 1:
          res="可用"
          break;
        default:
          res="未知"
      }
      return res;
    }
  }
};
</script>

<style scoped>
  el-table-column{
    display: flex;
    flex: 1;
  }
  .input{
    width:200px;
  }
  .userClass{
    position: relative;
    top: 10px;
    text-align: center;
  }
  .topClass{
    position: relative;
    left: -230px;
  }
  .addBtn{
    position: relative;
    left: -170px;
  }
  .bottomClass{
    position: relative;
    left: 200px;
    top: 3px;
  }
  .tableClass{
    position: relative;
    top: 10px;
  }
  .searchBtnClass{
    position: relative;
    left: 10px;
  }
</style>
