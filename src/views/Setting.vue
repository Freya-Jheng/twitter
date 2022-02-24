<template>
  <div class="setting">
    <div class="setting__title">帳號設定</div>
    <form @submit.stop.prevent="handleSubmit" class="setting__form">
      <div class="setting__form__item account">
        <span class="setting__form__item-title">帳號</span>
        <label class="account-with-special-icon">
          <input
            type="text"
            name="account"
            class="setting__form__item-input account"
            id="account"
            v-model="user.account"
          />
        </label>
      </div>
      <div class="setting__form__item name">
        <span class="setting__form__item-title">名稱</span>
        <input
          type="text"
          name="name"
          class="setting__form__item-input"
          id="name"
          v-model="user.name"
        />
      </div>
      <div class="setting__form__item email">
        <span class="setting__form__item-title">Email</span>
        <input
          type="email"
          name="email"
          class="setting__form__item-input"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="setting__form__item password">
        <span class="setting__form__item-title">密碼</span>
        <input
          type="text"
          name="password"
          class="setting__form__item-input"
          id="password"
          v-model="user.password"
        />
      </div>
      <div class="setting__form__item passwordChecked">
        <span class="setting__form__item-title">密碼確認</span>
        <input
          type="text"
          name="passwordChecked"
          class="setting__form__item-input"
          id="passwordChecked"
          v-model="user.passwordChecked"
        />
      </div>
      <button :disabled="isProcessing" type="submit" class="setting__save btn"> {{isProcessing ? '修改中':'儲存'}} </button>
    </form>
  </div>
</template>

<script>
const dummyUser = {
  id: uuid(),
  account: "wonderman",
  name: "John Doe",
  email: "JohnDoe@gmail.com",
  password: "12345678",
  passwordChecked: "12345678",
};

import uuid from "uuid/v4";
import { Toast } from "../utils/helpers";
// import { mapState } from 'vuex'
// import userAPI from 'api'

export default {
  name: "Setting",
  data() {
    return {
      user: {
        id: 0,
        account: "",
        name: "",
        email: "",
        password: "",
        passwordChecked: "",
      },
      isProcessing: false,
    };
  },
  // components: {
  //   ...mapState(['currentUser'])
  // },
  // watch: {
  //   currentUser (user) {
  //     if (user.id === -1) return
  //     const { id } = this.$route.params
  //     this.fetchUser(id)
  //   }
  // },
  created() {
    this.fetchUser(this.user.id);
  },
  methods: {
    fetchUser(userId) {
      const { id, account, name, email, passwordChecked, password } = dummyUser; 

      // TODO: 綁定API後 這裡要修改成 if currentUser.id != userId
      if (!userId.toString()) {
        this.router.push({name: 'not-found'})
        return
      }

      this.user = {
        id,
        account,
        name,
        email,
        password,
        passwordChecked,
      };
    },
    async handleSubmit(e) {
      try {
        if (
          !this.user.account ||
          !this.user.name ||
          !this.user.email ||
          !this.user.password ||
          !this.user.passwordChecked
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認資料皆已填寫！",
          });
          
          return
        } else {
          this.isProcessing = true
          Toast.fire ({
            icon: 'success',
            title: '儲存成功'
          })
        }
        this.isProcessing = false
        console.log(e)

        //TODO: 串接API，將資料傳回資料庫
        // const form = e.target
        // const formData = new FormData(form)
        // const {data} = await userAPI.update({
        //   userId: this.id,
        //   formData
        // })
        // if (data.status === 'error') {
        //   throw new Error (data.message)
        // }
        
      } catch (error) {
        console.log(error);
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法成功修改資料，請確認輸入資料正確！",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.setting {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 19px;
  font-weight: 500;
  .setting__title {
    font-weight: 700;
    margin-top: 13px;
  }
  form {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 61%;
    gap: 32px;
    .setting__form__item {
      width: 100%;
      background-color: var(--input-background);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .setting__form__item-title {
        font-size: 15px;
        color: var(--smaller-font-color);
        padding: 5px 10px;
      }
      input {
        border: unset;
      }
      .account-with-special-icon {
        padding: 0 20px;
        position: relative;
        &::before {
          position: absolute;
          left: 12px;
          content: "@";
          width: 20px;
          height: 20px;
        }
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
</style>