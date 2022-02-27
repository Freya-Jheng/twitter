<template>
  <div class="tweet-main">
    <Navbar />
    <div class="tweet">
      <div class="tweet__header">
        <img
          src="./../assets/icon_back@2x.png"
          alt=""
          class="tweet__header__back"
          @click="$router.back()"
        />
        <div class="tweet__header__content">推文</div>
      </div>
      <div class="tweet__container">
        <div class="tweet__container__user-info">
          <router-link
            :to="{ name: 'sub-profile', params: { id: userTweet.UserId } }"
            class="tweet__container__user-info__user-avatar"
          >
            <img
              v-if="user.avatar"
              :src="user.avatar ? user.avatar : ''"
              alt=""
              class="user-avatar"
            />
          </router-link>
          <div class="tweet__container__user-info__wrapper">
            <router-link
              :to="{ name: 'sub-profile', params: { id: userTweet.UserId } }"
              class="tweet__container__user-info__wrapper--name"
              >{{ user.name }}</router-link
            >
            <router-link
              :to="{ name: 'sub-profile', params: { id: userTweet.UserId } }"
              class="tweet__container__user-info__wrapper--account"
              >{{ '@' + user.account }}</router-link
            >
          </div>
        </div>
        <div class="tweet__container__content">
          {{ userTweet.description }}
        </div>
        <div class="tweet__container__time">
          {{ userTweet.createdAt | fullTime }}
        </div>
        <div class="tweet__container__numbers">
          <div class="tweet__container__numbers__reply">
            <span class="tweet__container__numbers__reply--counts">{{
              replies.length
            }}</span>
            <span class="tweet__container__numbers__reply--words">回覆</span>
          </div>
          <div class="tweet__container__numbers__like">
            <span class="tweet__container__numbers__like--counts">{{}}</span>
            <span class="tweet__container__numbers__like--words">喜歡次數</span>
          </div>
        </div>
        <div class="tweet__container__icons">
          <img
            src="./../assets/icon_reply@2x.png"
            alt=""
            class="tweets__container__icons__comment"
          />
          <img
            v-if="!userTweet.isLiked"
            src="./../assets/icon_like@2x.png"
            alt=""
            class="tweets__container__icons__like"
            @click.stop.prevent="addLike(userTweet.id)"
          />
          <img
            v-if="userTweet.isLiked"
            src="./../assets/icon_like_fill@2x.png"
            alt=""
            class="tweets__container__icons__like"
            @click.stop.prevent="deleteLike(userTweet.id)"
          />
        </div>
      </div>

      <Comments :initial-replies="replies" />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import Comments from './../components/Comments.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import { fromNowFilter } from './../utils/mixins'

export default {
  name: 'IndividualTweet',
  components: {
    Navbar,
    Comments,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      userTweet: {},
      user: {},
      replies: [],
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const response = await tweetsAPI.getIndividualTweet({ tweetId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.userTweet = response.data
        this.user = response.data.User
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試',
        })
      }
    },

    async fetchReplies(tweetId) {
      try {
        const response = await tweetsAPI.getReplies({ tweetId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.replies = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆資料，請稍後再試',
        })
      }
    },

    async addLike(tweetId) {
      try {
        const response = await tweetsAPI.addLike({ tweetId })

        if (response.data.status !== 'success') {
          throw new Error(response.data.statusText)
        }
        // this.userTweets = this.userTweets.map((tweet) => {
        //   if (tweet.id !== tweetId) {
        //     return tweet
        //   } else {
        //     return {
        //       ...tweet,
        //       // TODO 針對按讚後的狀態顯示和數量做設定
        //     }
        //   }
        // })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法按讚推文，請稍後再試',
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        const response = await tweetsAPI.deleteLike({ tweetId })

        if (response.data.status !== 'success') {
          throw new Error(response.data.statusText)
        }
        // this.userTweets = this.userTweets.map((tweet) => {
        //   if (tweet.id !== tweetId) {
        //     return tweet
        //   } else {
        //     return {
        //       ...tweet,
        //       // TODO 針對取消按讚後的狀態顯示和數量做設定
        //     }
        //   }
        // })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚推文，請稍後再試',
        })
      }
    },
  },
  created() {
    const { tweet_id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
    this.fetchReplies(tweetId)
  },
}
</script>

<style lang="scss" scoped>
.tweet-main {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  width: 100%;
  height: 100vh;
  padding: 0 8%;

  .tweet {
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    width: 100%;
    height: 100%;
    background: var(--background);
    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 55px;
      &__back {
        margin-left: 18px;
        width: 23px;
        height: 24px;
      }
      &__content {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 44px;
        font-weight: 700;
        font-size: 18px;
        line-height: 26.06px;
        height: 24px;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--border-and-divider);

      &__user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 15px;
        &__user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--user-avatar);
        }

        &__wrapper {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          &--name {
            font-weight: 700;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--main-font-color);
            &:hover {
              text-decoration: underline;
            }
          }

          &--account {
            font-weight: 500;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--smaller-font-color);
          }
        }
      }

      &__content {
        padding: 0 75px 0 15px;
        font-weight: 500;
        font-size: 23px;
        line-height: 34px;
        color: var(--main-font-color);
      }

      &__time {
        padding: 15px 0 15px 15px;
        font-weight: 500;
        font-size: 15px;
        line-height: 21.72px;
        color: var(--smaller-font-color);
      }

      &__numbers {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 15px;
        height: 68px;
        border-top: 1px solid var(--border-and-divider);
        border-bottom: 1px solid var(--border-and-divider);
        &__reply,
        &__like {
          display: flex;
          flex-direction: row;
          align-items: center;
          &--counts {
            font-weight: 700;
            font-size: 19px;
            line-height: 27.51px;
            color: var(--intro-color);
          }

          &--words {
            margin-left: 4px;
            font-weight: 500;
            font-size: 19px;
            line-height: 27.51px;
            color: var(--smaller-font-color);
          }
        }

        &__like {
          margin-left: 20px;
        }
      }

      &__icons {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 15px;
        height: 61px;

        img {
          cursor: pointer;
          height: 30px;
          width: 30px;
        }
        img:nth-last-child(1) {
          margin-left: 152px;
        }
      }
    }
  }

  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>
