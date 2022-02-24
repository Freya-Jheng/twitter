<template>
  <div class="home">
    <Navbar />
    <div class="tweets">
      <CreateTweet />
      <Tweets />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import CreateTweet from './../components/CreateTweet'
import Tweets from './../components/Tweets'

export default {
  name: 'Home',
  components: {
    Navbar,
    CreateTweet,
    Tweets,
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
    background: #e5e5e5;
  }

  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>
