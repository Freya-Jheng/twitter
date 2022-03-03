<template>
  <div class="home">
    <Navbar />
    <div class="followers">
      <div class="followers__header">
        <router-link
          :to="{ name: 'sub-profile-tweets', params: { id: user.id } }"
          class="navbar__items-link"
          ><img
            src="./../assets/icon_back@2x.png"
            alt=""
            class="followers__header__back"
        /></router-link>
        <div class="followers__header__content">
          <div class="followers__header__content__user-name">
            {{ user.name }}
          </div>
          <div class="followers__header__content__tweet-counts">
            {{ userTweets.length + ' 推文' }}
          </div>
        </div>
      </div>
      <ul class="followers__nav-tabs">
        <li
          class="followers__nav-tabs__item"
          :class="{ active: $route.path === 'following' }"
        >
          <router-link
            class="followers__nav-tabs__item--link"
            :to="{
              name: 'user-followers',
              params: { id: this.$route.params.id },
            }"
            >跟隨者</router-link
          >
        </li>
        <li class="followers__nav-tabs__item" :class="{ active: $route.path }">
          <router-link
            class="followers__nav-tabs__item--link"
            :to="{
              name: 'user-followings',
              params: { id: this.$route.params.id },
            }"
            >正在跟隨</router-link
          >
        </li>
      </ul>
      <router-view></router-view>
    </div>
    <PopularUsers />
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsers from './../components/PopularUsers'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import usersAPI from './../apis/users'

export default {
  name: 'UserFollowers',
  components: {
    Navbar,
    PopularUsers,
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
  data() {
    return {
      user: {},
      userTweets: {},
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.get({ userId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.user = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資利，請稍後再試',
        })
      }
    },
    async fetchTweets(userId) {
      try {
        const response = await usersAPI.getUserTweets({ userId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.userTweets = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試',
        })
      }
    },
  },
  created() {
    const userId = this.$route.params.id
    this.fetchUser(userId)
    this.fetchTweets(userId)
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
  .followers {
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    height: 100%;
    background: var(--background);
    overflow-y: scroll;
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
        cursor: pointer;
      }
      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 44px;

        &__user-name {
          font-weight: 900;
          font-size: 19px;
          line-height: 27.51px;
          color: var(--main-font-color);
        }
        &__tweet-counts {
          font-weight: 500;
          font-size: 13px;
          line-height: 18.82px;
          color: var(--smaller-font-color);
        }
      }
    }

    &__nav-tabs {
      border-bottom: 1px solid var(--border-and-divider);
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 12px;
      height: 50px;
      &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130px;
        height: 100%;
        // border-bottom: 1px solid var(--border-and-divider);
        padding-bottom: 0;
        &:hover {
          border-bottom: 2px solid var(--active-color);
        }
        &--link {
          padding-bottom: 14px;
          font-weight: 700;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--smaller-font-color);
          &:hover {
            color: var(--active-color);
          }
        }
      }
    }
  }
}
</style>
