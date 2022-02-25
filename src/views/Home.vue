<template>
  <div class="home">
    <Navbar />
    <router-view />
    <div class="tweets">
      <CreateTweet />
      <Tweets :initial-user-tweets="userTweets" />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import CreateTweet from './../components/CreateTweet'
import Tweets from './../components/Tweets'

// 模擬 API 傳進來的資料
const dummyData = {
  userTweets: [
    {
      userID: 1,
      id: 1,
      image: '',
      name: 'Apple',
      account: 'apple',
      createdAt: '3 小時',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eu ipsum at sollicitudin. Vivamus tristique lorem vitae erat commodo, quis congue leo pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla rutrum ut tellus viverra congue. Curabitur eu elit et est commodo tempus. ',
      commentCount: 15,
      likeCounts: 16,
      isLiked: false,
    },
    {
      userID: 2,
      id: 2,
      image: '',
      name: 'Orange',
      account: 'orange',
      createdAt: '3 小時',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id lorem nec nisi venenatis blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      commentCount: 5,
      likeCounts: 12,
      isLiked: false,
    },
    {
      userID: 3,
      id: 3,
      image: '',
      name: 'Banana',
      account: 'Banana',
      createdAt: '3 小時',
      content:
        'Sed hendrerit semper aliquet. Proin tincidunt nunc justo, nec varius diam lobortis in. Duis eget massa mauris. ',
      commentCount: 100,
      likeCounts: 500,
      isLiked: false,
    },
  ],
}
export default {
  name: 'Home',
  components: {
    Navbar,
    CreateTweet,
    Tweets,
  },
  data() {
    return {
      userTweets: [
        {
          userID: -1,
          id: -1,
          image: '',
          name: '',
          account: '',
          createdAt: '',
          content: '',
          commentCount: -1,
          likeCounts: -1,
          isLiked: false,
        },
      ],
    }
  },
  methods: {
    fetchTweets() {
      this.userTweets = dummyData.userTweets
    },
  },
  created() {
    this.fetchTweets()
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding:0 6%;
  
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
