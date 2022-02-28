<template>
  <div class="container">
    <form class="sign-up" @submit.stop.prevent="handleSubmit">
      <div class="sign-up__logo">
        <img src="./../assets/logo@2x.png" alt="logo" />
      </div>
      <div class="sign-up__header">建立你的帳號</div>
      <div class="sign-up__form-label-group form-label-group">
        <label for="account" class="sing-up__form-label-group__account label"
          >帳號</label
        >
        <input
          type="text"
          placeholder=""
          required
          autofocus
          v-model="account"
          class="sing-up__form-label-group__account--input input"
        />
      </div>

      <div class="sign-up__form-label-group form-label-group name">
        <label
          for="name"
          class="sing-up__form-label-group__name label"
          :class="{ error: name.length > 50 }"
          >名稱</label
        >
        <input
          type="text"
          placeholder=""
          required
          v-model="name"
          class="sing-up__form-label-group__name--input input"
          :class="{ error_input: name.length > 50 }"
        />
        <span class="remaining">{{ remaining }} / 50</span>
      </div>

      <div class="sign-up__form-label-group form-label-group">
        <label for="email" class="sing-up__form-label-group__email label"
          >Email</label
        >
        <input
          type="email"
          placeholder=""
          required
          v-model="email"
          class="sing-up__form-label-group__email--input input"
        />
      </div>

      <div class="sign-up__form-label-group form-label-group">
        <label for="password" class="sing-up__form-label-group__password label"
          >密碼</label
        >
        <input
          type="password"
          placeholder=""
          required
          v-model="password"
          class="sing-up__form-label-group__password--input input"
        />
      </div>

      <div class="sign-up__form-label-group form-label-group">
        <label
          for="password-check"
          class="sing-up__form-label-group__password-check label"
          >密碼確認</label
        >
        <input
          type="password"
          placeholder=""
          required
          v-model="checkPassword"
          class="sing-up__form-label-group__password-check--input input"
        />
      </div>
      <button class="sign-up__button button" :disabled="isProcessing">
        {{ isProcessing ? '處理中' : '註冊' }}
      </button>
      <div class="sign-up__links">
        <router-link to="/signin" class="sign-up__links--link"
          >取消</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  name: 'SignUp',
  data() {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入使用者帳號',
          })
          return
        }

        if (!this.name) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入使用者名稱',
          })
          return
        }

        if (!this.email) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入 email',
          })
          return
        }

        if (!this.password | !this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入 password',
          })
          return
        }

        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '密碼輸入不一致',
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '帳號或 email 已經註冊，請選擇其他帳號或 email',
        })
      }
    },
  },
  computed: {
    remaining() {
      return 50 - this.name.length ? 50 - this.name.length : 0
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

.sign-up {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 3.75rem;
  width: 540px;

  &__logo {
    width: 50px;
    height: 50px;
  }

  &__header {
    padding: 1.5625rem 0 0.625rem;
    font-weight: 700;
    font-size: 23px;
    line-height: 33.3px;
    color: var(--main-font-color);
  }
  &__form-label-group {
    margin-top: 1.875rem;
    height: 58px;
    width: 100%;
    label {
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
    }
  }

  &__button {
    margin-top: 40px;
    height: 46px;
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    line-height: 26.06px;
  }

  &__links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 26px;

    &--link {
      font-weight: 700;
      font-size: 18px;
      line-height: 26.06px;
      color: var(--hyperlink-color);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.name {
  position: relative;
}

.remaining {
  position: absolute;
  top: 100%;
  right: 0;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: var(--smaller-font-color);
}

.error {
  position: relative;
  &::after {
    content: '字數超出上限';
    position: absolute;
    top: 60px;
    left: 0px;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    color: var(--error-color);
  }
}

.error_input {
  border-bottom: 2px solid var(--error-color);
}
</style>
