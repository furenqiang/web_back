<!-- 一张图 -->
<template>
  <div class="login" v-if="show">

  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    created(){
      this.$store.commit({//不显示公共部分
        type:"changeLoginShow",
        show:true
      })
    },
    methods: {
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

</style>