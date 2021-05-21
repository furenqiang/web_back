<template>
  <div class="com-page">
    <single-map></single-map>
  </div>
</template>

<script>
import Map from "./Map"

export default {
  // 商家地图分布图表
  name: 'MapPage',
  components:{
    'single-map':Map,
  }
}
</script>

<style scoped>

</style>