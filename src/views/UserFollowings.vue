<template>
  <div class="home">
    <Navbar />
    <div class="user-followings"></div>
    <PopularUsers />
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsers from './../components/PopularUsers'
// import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowings',
  components: {
    Navbar,
    PopularUsers,
  },
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding: 0 6%;
  .user-followings {
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    height: 100%;
    background: #e5e5e5;
    overflow-y: scroll;
  }
}
</style>
