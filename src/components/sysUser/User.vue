<template>
  <div class="userClass">
    <div class="topClass">
      <span>
        <el-button type="primary" icon="el-icon-circle-plus" class="addBtn" @click="register">创建</el-button>
        用户名：<el-input v-model="inputUsername" class="input"></el-input>
        创建人：<el-input v-model="inputCreatorName" class="input"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="init">搜索</el-button>
      </span>
    </div>
    <div class="tableClass">
      <el-table
      :data="tableData"
      height="500"
      max-height="500"
      border
      style="width: 86%">
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
          prop="creatTime"
          label="创建时间"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.creatTime }}</span>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
  </div>
</template>

<script>
import {getUserListByParams} from '../../request/sysApi'

export default {
  name: "User",
  data() {
    return {
      tableData: [{}],
      currentPage: 1,
      pageSize:10,
      total:1,
      inputUsername:"",
      inputCreatorName:""
    };
  },
  components: {
  },
  mounted() {
    this.init()
  },
  created(){
  },
  methods: {
    init(){
      getUserListByParams({
        url:'sysUser/getUserListByParams',
        data:{
          page:1,
          size:10,
          username:this.inputUsername,
          creatorName:this.inputCreatorName
        }
      }).then((res)=>{
        console.log(res);
        this.tableData=res.data
        this.total=res.total
        this.currentPage=(res.data.total/this.pageSize)
      }).catch((err)=>{
        console.log(err);
      })
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    register(){
      alert("弹出添加的表单")
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
</style>
