<template>
  <div class="main-setting">
    <Navbar />
    <div class="setting">
      <div class="setting__title">帳號設定</div>
      <form @submit.stop.prevent="handleSubmit" class="setting__form">
        <div class="setting__form__item account at">
          <label class="setting__form__item-title">帳號</label>
          <input
            type="text"
            name="account"
            class="setting__form__item-input account-input"
            id="account"
            v-model="user.account"
          />
        </div>
        <div
          class="setting__form__item name"
          :class="{ error: user.name.length > 50 }"
        >
          <label class="setting__form__item-title">名稱</label>
          <input
            type="text"
            name="name"
            class="setting__form__item-input name"
            id="name"
            v-model="user.name"
            :class="{ error_input: user.name.length > 50 }"
          />
          <span
            class="remaining"
            :class="{ error_color: user.name.length > 50 }"
            >{{ remaining | remainingFilter }} / 50</span
          >
        </div>
        <div class="setting__form__item email">
          <label class="setting__form__item-title">Email</label>
          <input
            type="email"
            name="email"
            class="setting__form__item-input"
            id="email"
            v-model="user.email"
          />
        </div>
        <div class="setting__form__item password">
          <label class="setting__form__item-title">密碼</label>
          <input
            type="password"
            name="password"
            class="setting__form__item-input"
            id="password"
            v-model="user.password"
          />
        </div>
        <div class="setting__form__item passwordChecked">
          <label class="setting__form__item-title">密碼確認</label>
          <input
            type="password"
            name="passwordChecked"
            class="setting__form__item-input"
            id="passwordChecked"
            v-model="user.checkPassword"
          />
        </div>
        <button
          :disabled="isProcessing || user.name.length > 50"
          type="submit"
          class="setting__save btn"
        >
          {{ isProcessing ? '修改中' : '儲存' }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'
import usersAPI from './../apis/users'

export default {
  name: 'Setting',
  data() {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        email: '',
        password: '',
        checkPassword: '',
      },
      isProcessing: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
    remaining() {
      return 50 - this.user.name.length ? 50 - this.user.name.length : 0
    },
  },
  components: {
    Navbar,
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.user.id = this.currentUser.id
      this.user.account = this.currentUser.account
      this.user.name = this.currentUser.name
      this.user.email = this.currentUser.email
      this.user.password = this.currentUser.password
      this.user.checkPassword = this.currentUser.checkPassword
    },
    async handleSubmit() {
      try {
        if (!this.user.account) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入使用者帳號',
          })
          return
        }

        if (!this.user.name) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入使用者名稱',
          })
          return
        }

        if (!this.user.email) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入 email',
          })
          return
        }

        if (!this.user.password | !this.user.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入 password',
          })
          return
        }

        if (this.user.password !== this.user.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: 'password 不一致',
          })
          return
        }
        const response = await usersAPI.update({
          userId: this.user.id,
          account: this.user.account,
          name: this.user.name,
          password: this.password,
          checkPassword: this.checkPassword,
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        Toast.fire({
          icon: 'success',
          title: '修改個人資料成功',
        })

        // this.$router.push('/home')
        this.fetchUser()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法修改個人資料，請稍後再試',
        })
      }
    },
  },
  filters: {
    remainingFilter: function (value) {
      if (value < 0) {
        return 0
      }

      return value
    },
  },
}
</script>

<style scoped lang="scss">
.main-setting {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 980px;
  grid-template-rows: auto;
  height: 100vh;
  padding: 0 6%;

  .setting {
    display: flex;
    flex-direction: column;
    width: 100%;
    grid-column: 2/4;
    font-size: 19px;
    font-weight: 500;
    border-left: 1px solid var(--border-and-divider);
    .setting__title {
      border-bottom: 1px solid var(--border-and-divider);
      height: 55px;
      width: 112%;
      line-height: 55px;
      font-size: 19px;
      font-weight: 700;
      padding-left: 20px;
    }
    form {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 662px;
      gap: 32px;
      margin-top: 30px;
      padding-left: 20px;
      .setting__form__item {
        width: 100%;
        height: 52px;
        background-color: var(--input-background);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .setting__form__item-title {
          font-size: 15px;
          line-height: 15px;
          font-weight: 500;
          color: var(--smaller-font-color);
          padding: 5px 0 0 12px;
          margin-bottom: 0;
        }
        input {
          padding-top: 4px;
          margin-top: 0;
          width: 100%;
          height: 32px;
        }
      }
    }
    .setting__save {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 42px;
      width: 116px;
      height: 48px;
      border-radius: 50px;
      background-color: var(--button-background);
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: var(--button-font);
    }
  }
}

.at:after {
  position: absolute;
  content: '@';
  bottom: 4px;
  left: 10px;
}

.account-input {
  padding-left: 30px;
}
.name,
.account {
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
    top: 55px;
    left: 0px;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    color: var(--error-color);
  }
}

.error_color {
  color: var(--error-color);
}

.error_input {
  border-bottom: 2px solid var(--error-color);
}
</style>
