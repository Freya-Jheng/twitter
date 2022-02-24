<template>
  <nav class="navbar">
    <img src="./../assets/logo@2x.png" alt="logo" class="logo" />
    <div class="navbar__items">
      <div class="navbar__items-item home">
        <router-link to="/home" class="navbar__items-link">
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
          <span class="navbar__items-title">首頁</span>
        </router-link>
      </div>
      <div class="navbar__items-item profile">
        <router-link to="/profile/1" class="navbar__items-link">
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
          <span class="navbar__items-title">個人資料</span>
        </router-link>
      </div>
      <div class="navbar__items-item setting">
        <router-link to="/setting/1" class="navbar__items-link">
          <img
            src="./../assets/icon_cog@2x.png"
            alt="navbar__items-icon"
            class="navbar__items-icon setting-icon"
          />
          <img
            src="./../assets/icon_cog_active@2x.png"
            alt="navbar__items-icon"
            class="navbar__items-icon setting-icon active"
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
            <div class="modal-body">
              <img :src="user.image" alt="avatar" class="avatar" />
              <form action="" class="create__tweet">
                <textarea
                  v-model="tweet"
                  placeholder="有什麼新鮮事？"
                  name="create__tweet-textarea"
                  id="create__tweet-textarea"
                  cols="50"
                  rows="4"
                ></textarea>
              </form>
            </div>
            <div class="modal-footer">
              <router-link to="" class="btn-modal" data-dismiss="modal">
                推文
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/signin" class="logout">
      <img
        src="./../assets/icon_logout@2x.png"
        alt="logout-icon"
        class="logout-icon"
      />
      <span class="logout-title">登出</span>
    </router-link>
  </nav>
</template>

<script>
const dummyUser = {
  id: uuid(),
  image: "https://i.pravatar.cc",
};

import uuid from "uuid/v4";

export default {
  name: "Navbar",
  data() {
    return {
      tweet: "",
      user: dummyUser,
    };
  },
  methods: {},
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
  .navbar__new__tweet {
    width: 100%;
    background-color: var(--button-background);
    color: var(--background-cancel-button);
    font-weight: 500;
    border-radius: 100px;
  }
  .modal {
    .modal-content {
      width: 600px;
      height: 300px;
      border-radius: 14px;
      .modal-header {
        display: flex;
        justify-content: flex-start;
        border-color: var(--border-and-divider);

        button {
          margin-left: 0;
          padding-left: 0;
          span {
            width: 20px;
            height: 20px;
            color: var(--button-background);
          }
        }
      }
      .modal-body {
        display: flex;
        flex-direction: row;
        gap: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        textarea {
          margin-top: 8px;
          border: unset;
        }
      }
      .modal-footer {
        border: unset;
      }
    }
  }
  .btn-modal {
    width: 66px;
    height: 38px;
    background-color: var(--button-background);
    border-radius: 100px;
    color: var(--button-font);
    line-height: 38px;
    text-align: center;
  }
  .logout {
    display: flex;
    flex-direction: row;
    gap: 37px;
    margin-top: 190%;
    color: var(--main-font-color);
    .logout-icon {
      width: 22px;
      height: 22px;
    }
  }
}
</style>