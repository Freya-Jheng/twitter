<template>
  <div class="home">
    <Navbar />
    <div class="followers">
      <div class="followers__header">
        <img
          src="./../assets/icon_back@2x.png"
          alt=""
          class="followers__header__back"
          @click="$router.back()"
        />
        <div class="followers__header__content">
          <div class="followers__header__content__user-name">abc</div>
          <div class="followers__header__content__tweet-counts">123</div>
        </div>
      </div>
      <ul class="followers__nav-tabs">
        <li class="followers__nav-tabs__item">
          <router-link
            class="followers__nav-tabs__item--link"
            :to="{ name: 'user-followers', params: { id: 1 } }"
            >跟隨者</router-link
          >
        </li>
        <li class="followers__nav-tabs__item">
          <router-link
            class="followers__nav-tabs__item--link"
            :to="{ name: 'user-followings', params: { id: 1 } }"
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
// import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowers',
  components: {
    Navbar,
    PopularUsers,
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
