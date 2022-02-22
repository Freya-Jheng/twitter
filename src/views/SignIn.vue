<template>
  <div class="container">
    <form class="sign-in">
      <div class="sign-in__logo">
        <img src="./../assets/logo@2x.png" alt="logo" />
      </div>
      <div class="sign-in__header">登入 Alphitter</div>
      <div class="sign-in__form-label-group form-label-group">
        <label for="account" class="sing-in__form-label-group__account label"
          >帳號</label
        >
        <input
          type="text"
          placeholder=""
          required
          autofocus
          class="sing-in__form-label-group__account--input input"
        />
      </div>

      <div class="sign-in__form-label-group form-label-group">
        <label for="password" class="sing-in__form-label-group__password label"
          >密碼</label
        >
        <input
          type="text"
          placeholder=""
          required
          autofocus
          class="sing-in__form-label-group__password--input input"
        />
      </div>
      <div class="sign-in__button button">
        <button class="sign-in__log-in-button">登入</button>
      </div>
      <div class="sign-in__links">
        <router-link to="" class="sign-in__links--link"
          >註冊 Alphitter</router-link
        >
        <div class="sign-in__links--dot">·</div>
        <router-link to="" class="sign-in__links--link">後台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
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
  }

  &__links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
    height: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26.06px;

    &--dot {
      font-size: 20px;
      color: var(--hyperlink-color);
    }

    &--link {
      color: var(--hyperlink-color);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
