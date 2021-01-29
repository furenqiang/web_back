<template>
  <div class="logClass">
    <div class="topClass">
      <span>
        操作人：<el-input v-model="inputUsername" class="input"></el-input>
        操作名称：<el-input v-model="inputOperation" class="input"></el-input>
        请求IP：<el-input v-model="inputIp" class="input"></el-input>
        <el-select v-model="selectOrderField" placeholder="请选择排序字段" class="select">
          <el-option label="所用时长" value="1"></el-option>
          <el-option label="操作时间" value="2"></el-option>
        </el-select>
        <el-select v-model="selectOrderType" placeholder="请选择排序类型" class="select">
          <el-option label="正序" value="1"></el-option>
          <el-option label="倒序" value="2"></el-option>
        </el-select>
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
          prop="operation"
          label="操作名称"
          >
        </el-table-column>
        <el-table-column
          prop="time"
          label="所用时长（毫秒）"
          >
        </el-table-column>
        <el-table-column
          prop="ip"
          label="请求IP"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="请求时间"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px">
          <template slot-scope="scope">
            <el-button @click="detailClick(scope.row)" type="text" size="small">查看详情</el-button>
            <log-detail :toDeatilParams="toDeatilParams"></log-detail>
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
import {getLogListByParams} from '../../request/sysApi'
import logDetail from '../common/detail/Detail_from'

export default {
  name: "User",
  data() {
    return {
      tableData: [{}],
      currentPage:1,
      pageSize:10,
      total:1,
      inputUsername:"",
      inputOperation:"",
      inputIp:"",
      selectOrderField:null,
      selectOrderType:null,
      loading:true,
      toDeatilParams:{
        detailFormVisible:false,
        detailForm:{},
        detailFormKey:["username","operation","time","ip","createTime","method","params","result"],
        detailFormValue:["操作人","操作名称","所用时长（毫秒）","请求IP","请求时间","请求方法","请求参数","返回结果"],
        detailTitle:"日志详情"
      }
    };
  },
  components: {
    logDetail
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
      getLogListByParams({
        data:{
          page:this.currentPage,
          size:this.pageSize,
          username:this.inputUsername,
          operation:this.inputOperation,
          ip:this.inputIp,
          orderField:this.selectOrderField,
          orderType:this.selectOrderType
        }
      }).then((res)=>{
        this.tableData=res.data
        this.total=res.total
        this.loading=false
      }).catch((err)=>{
      })
    },
    detailClick(row) {
      this.toDeatilParams.detailForm=row
      this.toDeatilParams.detailFormVisible=true
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
  .logClass{
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
