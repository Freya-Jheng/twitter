<template>
  <div class="home">
    <Navbar />
    <div class="tweets"></div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar,
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  .navbar {
    outline: 1px solid red;
  }

  .tweets {
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    height: 100%;
    background: lightgrey;
  }

  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>
