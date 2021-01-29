<template>
  <div class="header">
    <div class="rightClass">
      <template>
        <div class="deamo-type">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit">
                <el-button type="text" @click="editClick">修改信息</el-button>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-lock" @click.native="logoutClick()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </div>
    <div class="centerClass">
      <HeaderTab></HeaderTab>
    </div>
    <div class="leftClass">
      <img :src="imgSrc" >
    </div>
  </div>
</template>

<style>
  .header {
    height: 68px;
    width: 100%;
  }
  .rightClass {
    text-align: right;;
    position: relative;
    top: 30%;
    right: 4.5%;
  }
  .centerClass{
    width: 1000px;
    height: 68.1px;
    position: relative;
    left: 300px;
    top: -10px;
  }
  .leftClass img{
    width: 200px;
    height: 68.1px;
    position: relative;
    top: -111.5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>

<script>
import HeaderTab from "../common/Header_tab"
import {logout,updateUser} from "../../request/sysApi"
export default {
  data() {
    return {
      imgSrc:require('../../assets/img/logo.png')
    };
  },
  components:{
    HeaderTab
  },
  methods: {
    logoutClick(){
      logout({
      }).then(res=>{
        if(res.code===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.$router.push("/login")
          this.$store.commit({
            type:"changeLoginShow",
            show:true
          })
          this.$store.commit("restoreState")
        }
      })
    },
    editClick(){
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator:function(value){
          if(value==""||value==null){
            return "密码不能为空"
          }
        }
        }).then(({ value }) => {
          updateUser({
          data:{
            id:JSON.parse(
              sessionStorage.getItem("userInfo")
            ).id,
            password:value
          }
        }).then((res)=>{
          if(res.code===200){
            this.$message({
              type:'success',
              message:res.message
            })
            logout({
              url:"logout"
            }).then(res=>{
              if(res.code===200){
                this.$message({
                  type:'success',
                  message:res.message
                })
                this.$router.push("/login")
                this.$store.commit({
                  type:"changeLoginShow",
                  show:true
                })
                this.$store.commit("restoreState")
              }else{
                this.$message({
                  type:'error',
                  message:res.message
                })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    }
  },
  mounted(){
    
  }
};
</script>
