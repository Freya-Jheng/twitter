<template>
  <div class="create-tweet">
    <div class="create-tweet__header">首頁</div>
    <form class="create-tweet__container" @submit.stop.prevent="handleSubmit">
      <div class="create-tweet__container__main">
        <router-link to="" class="create-tweet__container__main__user-avatar">
          <img v-if="user.avatar" src="" alt="" class="user-avatar" />
        </router-link>
        <div class="create-tweet__container__main__text">
          <div
            contentEditable="true"
            data-text="有什麼新鮮事？"
            class="create-tweet__container__main__text--new-tweet"
          ></div>
        </div>
      </div>
      <button class="create-tweet__container__button button">推文</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

export default {
  name: 'CreateTweet',
  data() {
    return {
      // TODO 需要和 div 內容雙向綁定
      newTweet: '',
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async handleSubmit() {
      try {
        // TODO 等後端 API 資料串接
        console.log(this.newTweet)
        this.newTweet = ''
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法發布推文，請稍後再試',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-tweet {
  width: 100%;
  height: auto;
  background: var(--background);
  &__header {
    height: 55px;
    width: 100%;
    padding: 15px 0 14px 15px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26.06px;
    color: var(--main-font-color);
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    &__main {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;
      padding-top: 10px;
      padding-left: 15px;
      border-top: 1px solid var(--border-and-divider);
      &__user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--user-avatar);
      }

      &__text {
        position: relative;
        margin-top: 10px;
        width: 80%;
        min-height: 26px;

        &--new-tweet {
          width: 100%;
          padding-left: 10px;
          min-height: 26px;
          border: none;
          overflow: auto;
          outline: none;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          resize: none;
          font-weight: 500;
          font-size: 18px;
          line-height: 26.06px;
          color: var(--main-font-color);
        }

        [contentEditable='true']:empty:not(:focus):before {
          content: attr(data-text);
          font-weight: 500;
          font-style: normal;
          font-size: 18px;
          line-height: 26.06px;
          color: var(--tweet-placeholder);
        }
      }
    }

    &__button {
      margin-right: 15px;
      margin-bottom: 10px;
      align-self: flex-end;
      width: 66px;
      height: 38px;
      font-weight: 500;
      font-size: 18px;
      line-height: 18px;
    }
  }
}
</style>
