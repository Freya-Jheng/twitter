<template>
  <nav class="navbar">
    <img src="./../assets/logo@2x.png" alt="logo" class="logo" />
    <div class="navbar__items">
      <div class="navbar__items-item home">
        <router-link to="" class="navbar__items-link">
          <img
            src="./../assets/icon_index@2x.png"
            alt="navbar__items-icon"
            class="navbar__items-icon home-icon"
          />
          <span class="navbar__items-title">首頁</span>
        </router-link>
      </div>
      <div class="navbar__items-item profile">
        <router-link to="" class="navbar__items-link">
          <img
            src="./../assets/icon_user@2x.png"
            alt="navbar__items-icon"
            class="navbar__items-icon profile-icon"
          />
          <span class="navbar__items-title">個人資料</span>
        </router-link>
      </div>
      <div class="navbar__items-item setting">
        <router-link to="" class="navbar__items-link">
          <img
            src="./../assets/icon_cog@2x.png"
            alt="navbar__items-icon"
            class="navbar__items-icon setting-icon"
          />
          <span class="navbar__items-title">設定資料</span>
        </router-link>
      </div>
      <button
        type="button"
        class="btn navbar__new__tweet"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        推文
      </button>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button type="button" class="btn">
                推文
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
nav {
  width: 235px;
  height: 100%;
  color: var(--main-font-color);
  font-size: 18px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 48px;
  .logo {
    width: 30px;
    height: 30px;
  }
  .navbar__items {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 37px;
    .navbar__items-item {
      width: 90%;
      .navbar__items-link {
        display: flex;
        flex-flow: row nowrap;
        gap: 30px;
        align-items: center;
        &:focus, &:hover {
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
  .navbar__new__tweet {
    width: 100%;
    background-color: var(--button-background);
    color: var(--background-cancel-button);
    font-weight: 500;
    border-radius: 100px;
  }
}
</style>