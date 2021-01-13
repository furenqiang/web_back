<template>
  <div class="login">
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
  </div>
</template>

<script>
import {login} from "../../request/sysApi"
  export default {
    data() {
      return {
         ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
        }
      };
    },
    created(){
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          debugger
          if (valid) {
            login({
              url:'login',
              data:{
                username:this.ruleForm.username,
                password:this.ruleForm.password
              }
            }).then((res)=>{
              if(res.code===200){
                this.$parent.show=true
              }else{
                this.$message({
                  type:"error",
                  message:res.message
                })
              }
              console.log(res);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .login{
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  .el-input {
    width: 200px !important;
  }
</style>