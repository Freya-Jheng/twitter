<template>
  <div class="tweets-container">
    <div
      class="tweets-container__tweet"
      v-for="tweet in userTweets"
      :key="tweet.tweetId"
    >
      <router-link to="" class="tweets-container__tweet__user-avatar">
        <img v-if="tweet.image" src="" alt="" class="user-avatar" />
      </router-link>
      <div class="tweets-container__tweet__wrapper">
        <div class="tweets-container__tweet__wrapper__info">
          <router-link
            to=""
            class="tweets-container__tweet__wrapper__info--name"
            >{{ tweet.name }}</router-link
          >
          <div class="tweets-container__tweet__wrapper__info--account">
            <router-link to="" class="router-link">{{
              '@' + tweet.account
            }}</router-link>
            {{ ' ・ ' + tweet.createdAt }}
          </div>
        </div>

        <router-link
          :to="{ name: 'individual-tweet', params: { tweet_id: tweet.id } }"
          class="tweets-container__tweet__wrapper__tweet"
        >
          {{ tweet.content }}</router-link
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
              >{{ tweet.commentCount }}</span
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
              >{{ tweet.likeCounts }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tweets',
  props: {
    initialUserTweets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      userTweets: [],
    }
  },
  methods: {
    fetchTweets() {
      this.userTweets = this.initialUserTweets
    },
    addLike(tweetId) {
      this.userTweets = this.userTweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet
        } else {
          return {
            ...tweet,
            isLiked: true,
            likeCounts: tweet.likeCounts + 1,
          }
        }
      })
    },
    deleteLike(tweetId) {
      this.userTweets = this.userTweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet
        } else {
          return {
            ...tweet,
            isLiked: false,
            likeCounts: tweet.likeCounts - 1,
          }
        }
      })
    },
  },
  created() {
    this.fetchTweets()
  },
}
</script>

<style lang="scss" scoped>
.tweets-container {
  margin-top: 10px;
  width: 100%;
  height: 100%;
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
