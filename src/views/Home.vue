<template>
  <div class="home">
    <Navbar />
    <!-- <router-view /> -->
    <div class="tweets">
      <CreateTweet @after-create-tweet="afterCreateTweet" />
      <Tweets :initial-user-tweets="userTweets" />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import CreateTweet from './../components/CreateTweet.vue'
import Tweets from './../components/Tweets'
import { Toast } from './../utils/helpers'
import tweetsAPI from './../apis/tweets'

export default {
  name: 'Home',
  components: {
    Navbar,
    CreateTweet,
    Tweets,
  },
  data() {
    return {
      userTweets: [],
    }
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.get()

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        this.userTweets = response.data

        // 將推文進行排序
        this.userTweets = this.userTweets.sort((a, b) => {
          return a.createdAt > b.createdAt
            ? -1
            : a.createdAt < b.createdAt
            ? 1
            : 0
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試',
        })
      }
    },
    afterCreateTweet(payload) {
      const { id, UserId, account, avatar, description } = payload

      this.userTweets.push({
        id,
        UserId,
        User: {
          account,
          avatar: avatar ? avatar : '',
        },
        description,
      })
    },
  },
  created() {
    this.fetchTweets()
  },
  updated() {
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
  padding: 0 6%;
  .tweets {
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    height: 100%;
    background: #e5e5e5;
    overflow-y: scroll;
  }

  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>
