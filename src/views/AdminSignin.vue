<template>
  <div class="container">
    <form class="sign-in" @submit.stop.prevent="handleSubmit">
      <div class="sign-in__logo">
        <img src="./../assets/logo@2x.png" alt="logo" />
      </div>
      <div class="sign-in__header">後台登入</div>
      <div
        class="sign-in__form-label-group form-label-group"
        :class="{ error: !account && error }"
      >
        <label for="account" class="sing-in__form-label-group__account label"
          >帳號</label
        >
        <input
          type="text"
          placeholder=""
          required
          autofocus
          v-model="account"
          class="sing-in__form-label-group__account--input input"
          :class="{ error_input: !account && error }"
        />
      </div>

      <div class="sign-in__form-label-group form-label-group">
        <label for="password" class="sing-in__form-label-group__password label"
          >密碼</label
        >
        <input
          type="password"
          placeholder=""
          required
          autofocus
          v-model="password"
          class="sing-in__form-label-group__password--input input"
        />
      </div>
      <button
        class="sign-in__button button"
        type="submit"
        :disabled="isProcessing"
      >
        {{ isProcessing ? '處理中' : '登入' }}
      </button>
      <div class="sign-in__links">
        <router-link to="/signin" class="sign-in__links--link"
          >前台登入</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import adminAPI from './../apis/admin'

export default {
  name: 'AdminSignIn',
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false,
      error: false,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'error',
            title: '請輸入帳號和密碼',
          })
          return
        }

        this.error = false
        this.isProcessing = true

        const response = await adminAPI.signIn({
          account: this.account,
          password: this.password,
        })

        if (response.data.status !== 'success') {
          throw new Error(response.data.message)
        }

        localStorage.setItem('token', response.data.data.token)

        this.$router.push('/admin')
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        this.account = ''
        this.password = ''

        if (
          error.response.data.message ===
            'Error: you are not admin user, permission denied' ||
          error.response.data.message === 'Error: acount does not exist.'
        ) {
          this.error = true
        }

        if (error.response.data.message === 'Error: password does not match.') {
          Toast.fire({
            icon: 'warning',
            title: '帳號或密碼錯誤',
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

.sign-in {
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
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;

    &--dot {
      font-size: 20px;
      color: var(--hyperlink-color);
    }

    &--link {
      height: 26px;
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

.error {
  position: relative;
  &::after {
    content: '帳號不存在!';
    position: absolute;
    top: 100%;
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
