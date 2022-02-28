<template>
  <div class="profile__tweets">
    <div class="profile__tweets__tweet" v-for="tweet in tweets"
      :key="tweet.tweetId">
      <router-link to="" class="profile__tweets__tweet__avatar">
        <img src="" alt="" class="user-avatar" />
      </router-link>
      <div class="profile__tweets__tweet__wrapper">
        <div class="profile__tweetxs__tweet__wrapper__info">
          <router-link to="" class="profile__tweets__tweet__wrapper__info--name"
            >{{currentUserData.name}}</router-link
          >
          <div class="profile__tweets__tweet__wrapper__info--account">
            <router-link to="" class="router-link">
              {{"@" + currentUserData.account}}
            </router-link>
           ・{{ currentUserData.createdAt | fromNow }}
          </div>
        </div>

        <router-link
          :to="{ name: 'individual-tweet' }"
          class="profile__tweets__tweet__wrapper__tweet"
        >
          {{tweet.description}}</router-link
        >

        <div class="profile__tweets__tweet__wrapper__icons">
          <div class="profile__tweets__tweet__wrapper__icons__comment">
            <img
              src="./../assets/icon_reply@2x.png"
              alt=""
              class="profile__tweets__tweet__wrapper__icons__comment--icon"
            />
            <span class="profile__tweets__tweet__wrapper__icons__comment--count"
              >70</span
            >
          </div>
          <div class="profile__tweets__tweet__wrapper__icons__like">
            <img
              src="./../assets/icon_like@2x.png"
              alt=""
              class="profile__tweets__tweet__wrapper__icons__like--icon"
            />
            <img
              src="./../assets/icon_like_fill@2x.png"
              alt=""
              class="profile__tweets__tweet__wrapper__icons__like--icon"
            />
            <span class="profile__tweets__tweet__wrapper__icons__like--count"
              >60</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import userAPI from '../apis/users'
import {Toast} from '../utils/helpers'
import { fromNowFilter } from './../utils/mixins'

export default {
  name: 'SubProfileTweets',
  props: {
    currentUserData: {
      type: Object,
      required: true,
    }
  },
  mixins: [fromNowFilter],
  data () {
    return {
      tweets: [],
      tweetsLength: ''
    }
  },
  created () {
    const {id} = this.$route.params
    this.fetchTweets(id)
  },
  methods: {
    async fetchTweets (userId) {
      try {
        const {data} = await userAPI.getUserTweets({userId})
        console.log('tweets',data)
        if (data.status === 'error') {
          throw new Error (data.message)
        }

        this.tweets = data
        this.tweetsLength = this.tweets.length

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: "無法成功取得推文資料！"
        })
      }
    }
  }
}
</script>


<style scoped lang="scss">
.profile__tweets {
  position: absolute;
  top: 511px;
  width: 100%;
  border-top: 1px solid var(--border-and-divider);
  &__tweet {
    width: 100%;
    height: 145px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 13px 15px;
    gap: 10px;
    border-bottom: 1px solid var(--border-and-divider);
    &__avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: grey;
      }
    }
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
      font-size: 15px;
      &__info {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 5px;
        &--name {
          font-weight: 700;
          color: var(--main-font-color);
        }
        &--account {
          font-weight: 500;
          color: var(--smaller-font-color);
          .router-link {
            color: var(--smaller-font-color);
          }
        }
      }
      &__tweet {
        width: 100%;
        color: var(--main-font-color);
      }
      &__icons {
        display: flex;
        flex-direction: row;
        gap: 51px;
        &__comment,
        &__like {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
        &__comment {
          &--icon {
            height: 12.34px;
            width: 12.34px;
          }
        }
        &__like {
          &--icon {
            height: 11.82px;
            width: 12.57px;
          }
        }
      }
    }
  }
}
</style>