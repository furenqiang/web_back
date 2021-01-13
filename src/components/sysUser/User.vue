<template>
  <div>
    user
  </div>
</template>

<script>
import {getUserListByParams} from '../../request/sysApi'

export default {
  name: "User",
  data() {
    return {
      
    };
  },
  components: {
  },
  mounted() {
    
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      getUserListByParams({
        url:'sysUser/getUserListByParams',
        data:{
          page:1,
          size:10
        }
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
};
</script>

<style scoped>

</style>
