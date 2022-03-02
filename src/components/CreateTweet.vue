<template>
  <div class="create-tweet" :class="{ error: newTweet.length > 140 }">
    <div class="create-tweet__header">首頁</div>
    <form class="create-tweet__container" @submit.stop.prevent="handleSubmit">
      <div class="create-tweet__container__main">
        <router-link to="" class="create-tweet__container__main__user-avatar">
          <img v-if="currentUser.avatar" src="" alt="" class="user-avatar" />
        </router-link>
        <div class="create-tweet__container__main__text">
          <div
            contentEditable="true"
            data-text="有什麼新鮮事？"
            class="create-tweet__container__main__text--new-tweet"
            @input="onInput"
            @click="focus"
            ref="input"
          ></div>
        </div>
      </div>
      <button
        class="create-tweet__container__button button"
        :disabled="newTweet.length > 140"
      >
        推文
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import tweetsAPI from './../apis/tweets'

export default {
  name: 'CreateTweet',
  data() {
    return {
      newTweet: '',
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.newTweet) {
          Toast.fire({
            icon: 'warning',
            title: '內容不可空白!',
          })
          return
        }

        if (this.newTweet.trim().length > 140) {
          this.alert = true
          return
        }

        const response = await tweetsAPI.create({
          description: this.newTweet,
        })

        if (response.data.status !== 'success') {
          throw new Error(response.statusText)
        }

        const id = response.data.data.Tweet.id
        this.$emit('after-create-tweet', {
          id,
          UserId: this.currentUser.id,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
          description: this.newTweet,
        })

        Toast.fire({
          icon: 'success',
          title: '推文發送成功',
        })

        this.newTweet = ''
        this.$refs.input.textContent = ''
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法發布推文，請稍後再試',
        })
      }
    },
    onInput(e) {
      this.newTweet = e.target.innerText
    },
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.create-tweet {
  position: relative;
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

.error {
  position: relative;
  &::after {
    content: '字數超出上限！';
    position: absolute;
    bottom: 20px;
    right: 101px;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    color: var(--error-color);
  }
}
</style>
