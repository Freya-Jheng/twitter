<template>
  <div class="home">
    <Navbar />
    <div class="user__followers">
      
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
// import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowers',
  components: {
    Navbar,
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding: 0 6%;
  .user__followers {
    outline: 1px solid red;
  }
  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>