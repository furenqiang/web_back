<template>
  <div class="menuEditClass">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="editSpanClass">{{toEditParams.editName}}</span>
        <i class="el-icon-circle-close" style="font-size:25px;float: right; padding: 3px 0;" @click="changeMenuEditShow(false)"></i>
      </div>
      <el-form :model="toEditParams.ruleForm" status-icon :rules="rules" label-width="80px" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="上级菜单" prop="title" v-show="!toEditParams.readonlyStatus">
          <el-select v-model="level1Menu" placeholder="请选择" @change="generateParentId">
            <el-option
              v-for="(item,index) in toEditParams.level1Menus"
              :key="item.value"
              :label="item.label"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="toEditParams.ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="菜单等级" prop="level">
          <el-input v-model="toEditParams.ruleForm.level" autocomplete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="toEditParams.ruleForm.path"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="toEditParams.ruleForm.icon" autocomplete="off" :readonly="toEditParams.readonlyStatus"></el-input>
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
import {updateMenu,addMenu} from '../../request/sysApi'

export default {
  name: "MenuEdit",
  data() {
    var validateTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('菜单标题不能为空'));
        }else{
          callback();
        }
      };
    var validatePath = (rule, value, callback) => {
      if(this.toEditParams.ruleForm.level===2){
        if(value.indexOf("/")!=-1){
          callback();
        }else{
          return callback(new Error('菜单路径格式错误!'));
        }
      }else if(this.toEditParams.ruleForm.level===1){
        if(value){
          return callback(new Error('一级菜单不可填路径!'));
        }else{
          callback();
        }
      }else{
        callback();
      }
    };
    var validateLevel=(rule, value, callback)=>{
      if(value==1||value==2){
        callback();
      }else{
        callback(new Error('请输入1或2'));
      }
    };
    return {
      addName:"",
      ruleFrom:{},
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        path: [
          { validator: validatePath, trigger: 'blur' }
        ],
        level: [
          { validator: validateLevel, trigger: 'blur' }
        ]
      },
      level1Menus:[{
        value: '选项1',
        label: '黄金糕'
      }],
      level1Menu:''
    };
  },
  components: {
    
  },
  props:{
    toEditParams:{
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
            if(this.toEditParams.editName=="修改"){
              updateMenu({
                data:{
                  title:this.toEditParams.ruleForm.title,
                  path:this.toEditParams.ruleForm.path,
                  id:this.toEditParams.ruleForm.id
                }
              }).then((res)=>{
                if(res.code===200){
                  this.$message({
                    type:'success',
                    message:res.message
                  })
                }
                this.changeMenuEditShow(false)
                this.$parent.init()
                this.$bus.$emit('refreshMenuTree')
              })
            }else if(this.toEditParams.editName=="添加"){
              addMenu({
                data:this.toEditParams.ruleForm
              }).then((res)=>{
                if(res.code===200){
                  this.$message({
                    type:'success',
                    message:res.message
                  })
                }
                this.changeMenuEditShow(false)
                this.$parent.init()
                this.$bus.$emit('refreshMenuTree')
              })
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeMenuEditShow(param){
        this.$parent.changeMenuEditShow(param)
      },
      generateParentId(value){
        this.toEditParams.ruleForm.level=2
        this.toEditParams.ruleForm.parentId=this.toEditParams.level1Menus[value].value
      }
  }
};
</script>

<style scoped>
  .menuEditClass{
    position: relative;
    bottom: 550px;
    left: 300px;
  }
  .box-card{
    background-color:#d0f0ed;
    width: 500px;
    height: 550px;
  }
  .editSpanClass{
    position: relative;
    font-size: 20px;
    color: rgb(14, 15, 14);
  }
</style>
