<!-- 详情表单公用页面 -->
<template>
  <div class="detailClass">
    <el-dialog :title="toDeatilParams.detailTitle" :visible.sync="toDeatilParams.detailFormVisible">
      <el-form :model="toDeatilParams.detailForm">
        <el-form-item 
        v-for="(item,i) in toDeatilParams.detailFormValue" 
        :key="item"
        :label="item" 
        label-width="150px"
        >
          <el-input v-model="toDeatilParams.detailForm[toDeatilParams.detailFormKey[i]]" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {},
  props:{
    toDeatilParams:{
      type:Object
    }
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style scoped>
</style>