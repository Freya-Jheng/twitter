<template>
  <div class="tweet">
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
          <router-link to="" class="tweet__container__user-info__user-avatar">
            <img src="" alt="" class="user-avatar" />
          </router-link>
          <div class="tweet__container__user-info__wrapper">
            <router-link
              to=""
              class="tweet__container__user-info__wrapper--name"
              >Apple</router-link
            >
            <router-link
              to=""
              class="tweet__container__user-info__wrapper--account"
              >{{ '@apple' }}</router-link
            >
          </div>
        </div>
        <div class="tweet__container__content">
          dnfejidej ijewdij iewjdij idjwidj iwj
        </div>
        <div class="tweet__container__time">2022/2/22 22:22</div>
        <div class="tweet__container__numbers">
          <div class="tweet__container__numbers__reply">
            <span class="tweet__container__numbers__reply--counts">22</span>
            <span class="tweet__container__numbers__reply--words">回覆</span>
          </div>
          <div class="tweet__container__numbers__like">
            <span class="tweet__container__numbers__like--counts">222</span>
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
            src="./../assets/icon_like@2x.png"
            alt=""
            class="tweets__container__icons__like"
          />
          <!-- <img
              src="./../assets/icon_like_fill@2x.png"
              alt=""
              class="tweets__container__icons__like"
            /> -->
        </div>
      </div>
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'

export default {
  name: 'IndividualTweet',
  components: {
    Navbar,
  },
}
</script>

<style lang="scss" scoped>
.tweet {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  .navbar {
    outline: 1px solid red;
  }

  .tweet {
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
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
        border-bottom: 1px solid var(--border-and-divider);
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
