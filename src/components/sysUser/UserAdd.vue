<template>
  <div class="userAddClass">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="addSpanClass">{{toAddParams.addName}}</span>
        <i class="el-icon-circle-close" style="font-size:25px;float: right; padding: 3px 0;" @click="changeUserAddShow(false)"></i>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {register} from '../../request/sysApi'

export default {
  name: "UserAdd",
  data() {
    var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      addName:"",
      ruleForm: {
          pass: '',
          checkPass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ]
        }
    };
  },
  components: {
    
  },
  props:{
    toAddParams:{
      type:Object
    }
  },
  mounted() {
   
  },
  created(){
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            register({
              data:{
                username:this.ruleForm.username,
                password:this.ruleForm.pass
              }
            }).then((res)=>{
              if(res.code===200){
                this.$message({
                  type:'success',
                  message:res.message
                })
              }
              this.changeUserAddShow(false)
              this.$parent.init()
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeUserAddShow(param){
        this.$parent.changeUserAddShow(param)
      }
  }
};
</script>

<style scoped>
  .userAddClass{
    position: relative;
    bottom: 550px;
    left: 300px;
  }
  .box-card{
    background-color:#d0f0ed;
    width: 500px;
    height: 550px;
  }
  .addSpanClass{
    position: relative;
    left: -200px;
    font-size: 20px;
    color: rgb(14, 15, 14);
  }
</style>
