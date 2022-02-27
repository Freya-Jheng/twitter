<template>
  <div class="home">
    <Navbar />
    <div class="user__followings">
      
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
// import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowings',
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
  .user__followings {
    outline: 1px solid red;
  }
  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>