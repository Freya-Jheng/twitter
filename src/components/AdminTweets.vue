<template>
  <div class="admin__tweets">
    <div class="admin__tweets__title">推文清單</div>
    <Spinner v-if="isLoading" />
    <template>
      <ul class="admin__tweets__list">
        <li
          v-for="tweet in allTweets"
          :key="tweet.id"
          class="admin__tweets__list__item"
        >
          <div class="wrapper">
            <div
              :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
              class="admin__tweets__list__item__avatar"
            >
              <img :src="tweet.User.avatar" alt="" class="user-avatar" />
            </div>
            <div class="admin__tweets__list__item__info">
              <div
                :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
                class="admin__tweets__list__item__info__content"
              >
                <span class="admin__tweets__list__item__info__content--name">{{
                  tweet.User.name
                }}</span>
                <div
                  :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
                  class="admin__tweets__list__item__info__content--account"
                >
                  <span class="router-link"
                    >{{ '@' + tweet.User.account }}
                  </span>
                  ・ {{ tweet.createdAt | fromNow }}
                </div>
              </div>
              <p class="admin__tweets__list__item__info__content__tweet">
                {{ tweet.description | ellipsis }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="admin__tweets__list__item__button"
            @click.stop.prevent="deleteTweet(tweet.id)"
          >
            <img src="../assets/icon_delete_black@2x.png" alt="" />
          </button>
        </li></ul
    ></template>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import { fromNowFilter } from './../utils/mixins'
import Spinner from './../components/Spinner'

export default {
  name: 'AdminTweets',
  components: {
    Spinner,
  },
  data() {
    return {
      allTweets: [],
      isLoading: true,
    }
  },
  mixins: [fromNowFilter],
  filters: {
    ellipsis: function (value) {
      if (value.length > 50) {
        let newValue = value.slice(0, 50) + '.'.repeat(3)

        return newValue
      }

      return value
    },
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.get()
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.allTweets = response.data
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試',
        })
      }
    },
    async deleteTweet(tweetId) {
      try {
        const { data } = await adminAPI.deleteTweet({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.allTweets = this.allTweets.filter((tweet) => tweet.id !== tweetId)

        this.fetchTweets()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除評論，請稍後再試',
        })
      }
    },
  },
  created() {
    this.fetchTweets()
  },
}
</script>

<style scoped lang="scss">
.admin__tweets {
  position: relative;
  width: 100%;
  height: 100vh;
  border: 1px solid var(--border-and-divider);
  font-size: 15px;
  font-weight: 500;
  cursor: default;
  overflow-y: scroll;

  &__title {
    position: sticky;
    top: 0;
    width: 100%;
    padding: 15px 0 14px 26.5px;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid var(--border-and-divider);
    z-index: 2;
    background: var(--background);
  }
  &__list {
    width: 100%;

    &__item {
      width: 100%;
      height: 75px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-and-divider);
      padding: 13px 15px;
      .wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 15px;
      }
      &__avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--user-avatar);
        }
      }
      &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 6px;
        &__content {
          display: flex;
          flex-direction: row;
          gap: 5px;
          &--name {
            font-weight: 700;
            font-size: 15px;
            line-height: 21.75px;
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
            .router-link {
              color: var(--smaller-font-color);
            }
          }

          &__tweet {
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            color: var(--main-font-color);
          }
        }
      }
      &__button {
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>
