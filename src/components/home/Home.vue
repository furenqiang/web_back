<template>
    <div class="home" id="home">
      home
    </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
    };
  },
  components: {
  },
  created(){

  },
  mounted() {
    document.getElementById("home").style.height =
      document.body.clientHeight + "px";
  },
  methods: {}
};
</script>

<style scoped>
</style>
