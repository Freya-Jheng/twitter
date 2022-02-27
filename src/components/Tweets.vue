<template>
  <div class="tweets-container">
    <div
      class="tweets-container__tweet"
      v-for="tweet in userTweets"
      :key="tweet.id"
    >
      <router-link
        :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
        class="tweets-container__tweet__user-avatar"
      >
        <img
          v-if="tweet.User.avatar"
          :src="tweet.User.avatar"
          alt=""
          class="user-avatar"
        />
      </router-link>
      <div class="tweets-container__tweet__wrapper">
        <div class="tweets-container__tweet__wrapper__info">
          <router-link
            :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
            class="tweets-container__tweet__wrapper__info--name"
            >{{ tweet.User.name }}</router-link
          >
          <div class="tweets-container__tweet__wrapper__info--account">
            <router-link
              :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
              class="router-link"
              >{{ '@' + tweet.User.account }}</router-link
            >・{{ tweet.createdAt | fromNow }}
          </div>
        </div>

        <router-link
          :to="{ name: 'individual-tweet', params: { tweet_id: tweet.id } }"
          class="tweets-container__tweet__wrapper__tweet"
        >
          {{ tweet.description }}</router-link
        >

        <div class="tweets-container__tweet__wrapper__icons">
          <div class="tweets-container__tweet__wrapper__icons__comment">
            <img
              src="./../assets/icon_reply@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__comment--icon"
            />
            <span
              class="tweets-container__tweet__wrapper__icons__comment--count"
              >{{ tweet.repliesCount }}</span
            >
          </div>
          <div class="tweets-container__tweet__wrapper__icons__like">
            <img
              v-if="!tweet.isLiked"
              src="./../assets/icon_like@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__like--icon"
              @click.stop.prevent="addLike(tweet.id)"
            />
            <img
              v-if="tweet.isLiked"
              src="./../assets/icon_like_fill@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__like--icon"
              @click.stop.prevent="deleteLike(tweet.id)"
            />
            <span
              class="tweets-container__tweet__wrapper__icons__like--count"
              >{{ tweet.likesCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
import tweetsAPI from './../apis/tweets'

export default {
  name: 'Tweets',
  props: {
    initialUserTweets: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  data() {
    return {
      userTweets: [],
    }
  },
  methods: {
    fetchTweets() {
      this.userTweets = this.initialUserTweets

      // 將推文依照時間進行排序
      // this.userTweets = this.userTweets.sort(function (a, b) {
      //   let timeA = new Date(a.createdAt).getTime()
      //   let timeB = new Date(b.createdAt).getTime()
      //   return timeA - timeB
      // })
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
    this.fetchTweets()
  },
  watch: {
    initialUserTweets(newValue) {
      this.userTweets = {
        ...this.userTweets,
        ...newValue,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tweets-container {
  margin-top: 10px;
  width: 100%;
  // height: 200%;
  background: var(--background);
  &__tweet {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    border-bottom: 1px solid var(--border-and-divider);
    width: 100%;
    &__user-avatar {
      margin: 3px 10px 0 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--user-avatar);
    }

    &__wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      &__info {
        display: flex;
        flex-direction: row;
        align-items: center;
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
          margin-left: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--smaller-font-color);
          .router-link {
            font-weight: 500;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--smaller-font-color);
          }
        }
      }

      &__tweet {
        margin: 6px 15px 14px 0;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        color: var(--main-font-color);
      }

      &__icons {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__comment,
        &__like {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
          width: 40px;
          height: 15px;
          &--icon {
            width: 15px;
            height: 15px;
          }

          &--count {
            font-weight: 500;
            font-size: 13px;
            line-height: 13px;
            color: var(--smaller-font-color);
          }
        }

        &__comment {
          margin-right: 51px;
        }
      }
    }
  }
}
</style>
