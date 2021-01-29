<template>
  <div class="login" v-if="show">
    <img class="img" :src="imgSrc" width="100%" height="100%" />
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {login} from "../../request/sysApi"
  export default {
    data() {
      return {
         imgSrc:require('../../assets/img/login.png'),
         ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      };
    },
    created(){
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login({
              data:{
                username:this.ruleForm.username,
                password:this.ruleForm.password
              }
            }).then((res)=>{
              if(res.code===200){
                this.$store.commit({
                  type:"changeLoginShow",
                  show:false
                })
                this.$router.push({
                  path:"/home"
                })
                //用户信息存session
                sessionStorage.setItem("userInfo",JSON.stringify(res.data))
              }
            })
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed:{
      show:{
        get:function(){
          return this.$store.state.login.show
        }
      }
    }
  }
</script>
<style scoped>
  .login{
    width: 1536px;
    height: 750px;
    position: relative;
    left: -200px;
  }
  .el-input {
    width: 250px !important;
  }
  .img {
     z-index: -8888;
  }
  .demo-ruleForm{
    position: relative;
    top: 30px;
    height: 250px;
    width: 500px;
  }
  .box-card{
    background: url('../../assets/img/login_bg.png');
    height: 250px;
    width: 500px;
    position: relative;
    top: -550px;
    left: 500px;
  }
  /deep/ .el-form-item__label {
    font-size: 19px;
  }
  /* /deep/ .el-form-item.is-error .el-input__inner{
    border-color: red;
  } 
  /deep/ .el-form-item.is-error .el-input__validateIcon{
    color: red;
  } */
  /deep/ .el-form-item__error{
    color: black; 
  }
</style>