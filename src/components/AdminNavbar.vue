<template>
  <nav class="admin__navbar">
    <div class="wrapper">
      <img src="./../assets/logo@2x.png" alt="logo" class="logo" />
      <div class="navbar__items">
        <div class="navbar__items-item home">
          <router-link
            to="/admin/tweets"
            class="navbar__items-link router-like-active"
          >
            <img
              src="./../assets/icon_index@2x.png"
              alt="navbar__items-icon"
              class="navbar__items-icon home-icon"
            />
            <img
              src="./../assets/icon_index_active@2x.png"
              alt="navbar__items-icon"
              class="navbar__items-icon home-icon active"
            />
            <span class="navbar__items-title">推文清單</span>
          </router-link>
        </div>
        <div class="navbar__items-item profile">
          <router-link to="/admin/users" class="navbar__items-link">
            <img
              src="./../assets/icon_user@2x.png"
              alt="navbar__items-icon"
              class="navbar__items-icon profile-icon"
            />
            <img
              src="./../assets/icon_user_active@2x.png"
              alt="navbar__items-icon"
              class="navbar__items-icon profile-icon active"
            />
            <span class="navbar__items-title">使用者列表</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="logout" @click.stop.prevent="logout">
      <img
        src="./../assets/icon_logout@2x.png"
        alt="logout-icon"
        class="logout-icon"
      />
      <span class="logout-title">登出</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNavbar',
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/admin/signin')
    },
  },
}
</script>

<style scoped lang="scss">
.admin__navbar {
  width: 235px;
  height: 100%;
  color: var(--main-font-color);
  font-size: 18px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 14px 0;
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 51.7px;
  }
  .logo {
    width: 30px;
    height: 30px;
  }
  .navbar__items {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 37px;
    .router-link-active {
      color: var(--button-background);
    }
    .navbar__items-item {
      width: 90%;
      .active {
        display: none;
      }
      .navbar__items-link {
        display: flex;
        flex-flow: row nowrap;
        gap: 30px;
        align-items: center;
        &:focus,
        &:hover {
          .navbar__items-icon {
            display: none;
            ~ .active {
              display: block;
            }
          }
          .navbar__items-title {
            color: var(--button-background);
          }
        }
        .home-icon {
          width: 22.2px;
          height: 20.25px;
        }
        .profile-icon {
          width: 20px;
          height: 20.34px;
        }
        .setting-icon {
          width: 20.75px;
          height: 20.75px;
        }
      }
      .navbar__items-title {
        color: var(--main-font-color);
      }
    }
  }

  .logout {
    display: flex;
    flex-direction: row;
    gap: 37px;
    margin-top: 190%;
    color: var(--main-font-color);
    cursor: pointer;
    .logout-icon {
      width: 22px;
      height: 22px;
    }
  }
}
</style>
