<template>
  <div class="exceptLogClass">
    <div class="topClass">
      <span>
        操作人：<el-input v-model="inputUsername" class="input"></el-input>
        异常名称：<el-input v-model="inputExcName" class="input"></el-input>
        方法名称：<el-input v-model="inputMethod" class="input"></el-input>
        请求IP：<el-input v-model="inputIp" class="input"></el-input>
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
          label="操作人"
          >
        </el-table-column>
        <el-table-column
          prop="ip"
          label="请求IP"
          >
        </el-table-column>
        <el-table-column
          prop="url"
          label="请求地址"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发生时间"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="excName"
          label="异常名称"
          >
        </el-table-column>
        <el-table-column
          prop="method"
          label="方法名称"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px">
          <template slot-scope="scope">
            <el-button @click="detailClick(scope)" type="text" size="small">异常详情</el-button>
            <except-log-detail :toDeatilParams="toDeatilParams" v-if="toDeatilParams.detailDrawer"></except-log-detail>
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
import {getExceptionLogListByParams} from '../../request/sysApi'
import exceptLogDetail from '../common/detail/Detail_drawer'

export default {
  name: "User",
  data() {
    return {
      tableData: [{}],
      currentPage:1,
      pageSize:10,
      total:1,
      inputUsername:"",
      inputExcName:"",
      inputMethod:"",
      inputIp:"",
      loading:true,
      toDeatilParams:{
        detailDrawer: false,
        detailData:{},
        detailTitle:""
      }
    };
  },
  components: {
    exceptLogDetail
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
      getExceptionLogListByParams({
        data:{
          page:this.currentPage,
          size:this.pageSize,
          username:this.inputUsername,
          excName:this.inputExcName,
          method:this.inputMethod,
          ip:this.inputIp
        }
      }).then((res)=>{
        this.tableData=res.data
        this.total=res.total
        this.loading=false
      }).catch((err)=>{
      })
    },
    detailClick(scope) {
      this.toDeatilParams.detailTitle="序号为 "+(scope.$index+1)+" 号的异常信息详情"
      this.toDeatilParams.detailData=scope.row.excMessage
      this.toDeatilParams.detailDrawer=true
    },
    handleSizeChange(val) {
      this.pageSize=val
      this,this.init()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this,this.init()
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
  .select{
    width:150px;
    position: relative;
    left: 10px;
  }
  .exceptLogClass{
    position: relative;
    top: 10px;
    text-align: center;
  }
  .topClass{
    position: relative;
    left: -140px;
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
     left: 20px;
  }
</style>
