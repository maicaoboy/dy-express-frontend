<template>
  <el-container>
    <BaiduMap></BaiduMap>
  </el-container>
</template>
<script>
import BaiduMap from './BaiduMap'
export default {
  name: 'StationWorkScope',
  components: {
    BaiduMap
  },
  data() {
    return {
      key: 0
    }
  },
  created() {
    this.key = this.$route.query.key
  }
}
</script>

<style>

</style>
