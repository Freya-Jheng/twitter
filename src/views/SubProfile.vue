<template>
  <div class="wrapper">
    <Navbar />
    <h1>Here will be the user profile</h1>
  </div>
</template>


<style scoped lang='scss'>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding:0 8%;
}

</style>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'SubProfile',
  data () {
    return {

    }
  },
  components: {
    Navbar,
  }
}
</script>
