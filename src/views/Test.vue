<template>
  <div>
    <Navbar/>
    <Setting/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Setting from '../views/Setting.vue'
export default {
  components: {
    Navbar,
    Setting, 
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  gap: 40px;
}


</style>
