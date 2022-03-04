<template>
  <div class="main-subProfileTop">
    <div class="profile__header">
      <img
        src="./../assets/icon_back@2x.png"
        alt="icon_back"
        class="profile__header__back"
        @click="$router.back()"
      />
      <div class="profile__header__content">
        <span class="profile__header__content__name">
          {{ user.name }}
        </span>
        <span class="profile__header__content__tweetsNum">
          {{ tweetsLength }} 推文</span
        >
      </div>
    </div>
    <div class="profile__container">
      <div class="profile__container__top">
        <img
          :src="user.cover"
          alt="top-background"
          class="profile__container__top__background"
        />
        <img
          :src="user.avatar"
          alt="top-avatar"
          class="profile__container__top__avatar"
        />
        <button
          v-if="user.id === currentUser.id"
          type="button"
          class="profile__container__top__btn"
          data-toggle="modal"
          data-target="#editModal"
        >
          編輯個人資料
        </button>
        <div v-if="user.id !== currentUser.id" class="not-current-user">
          <a href="" class="email">
            <img src="../assets/btn_messege@2x.png" alt="" class="email-ico" />
          </a>
          <router-link to="" class="notice">
            <img
              src="../assets/btn_noti_active@2x.png"
              alt=""
              class="notice-ico"
            />
          </router-link>
          <div class="follow-status">
            <span> 正在跟隨 </span>
          </div>
        </div>
        <!-- Modal -->
        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <form @submit.stop.prevent="handleSubmit">
                <div class="modal-header">
                  <div class="header-left">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <span class="modal-title" id="editModalLabel"
                      >編輯個人資料</span
                    >
                  </div>
                  <button type="submit" class="btn header-right">儲存</button>
                </div>
                <div class="modal-body">
                  <div class="modal-top">
                    <img
                      v-if="user.cover"
                      :src="user.cover"
                      alt="background"
                      class="background"
                    />
                    <label for="cover-upload">
                      <img
                        src="./../assets/icon_uploadPhoto@2x.png"
                        alt="background"
                        class="upload-bg-image upload"
                      />
                    </label>
                    <input
                      id="cover-upload"
                      type="file"
                      name="cover-upload"
                      accept="image/*"
                      class="form-control-file d-none"
                      @change="handleCoverChange"
                    />
                    <img
                      src="./../assets/icon_delete@2x.png"
                      alt=""
                      class="delete-image delete"
                    />
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      alt="avatar"
                      class="avatar"
                    />
                    <label
                      class="upload-avatar-image-label"
                      for="avatar-upload"
                    >
                      <img
                        src="./../assets/icon_uploadPhoto@2x.png"
                        alt="avatar"
                        class="upload-avatar-image upload"
                      />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      name="avatar-upload"
                      accept="image/*"
                      class="form-control-file d-none"
                      @change="handleAvatarChange"
                    />
                  </div>
                  <div class="modal-bottom">
                    <div class="form-group">
                      <label class="name-label" for="name-input">
                        <div class="title">名稱</div>
                        <input
                          v-model="user.name"
                          type="text"
                          class="name-input"
                          id="name-input"
                          name="name-input"
                          required
                        />
                        <span class="letters"
                          >{{ nameRemaining | remainingFilter }} / 50</span
                        >
                      </label>
                      <label class="introduction-label">
                        <div class="title">自我介紹</div>
                        <textarea
                          v-model="user.introduction"
                          name="introduction-input"
                          class="introduction-input"
                          id="description-input"
                          cols="65"
                          rows="5"
                        ></textarea>
                        <span class="letters"
                          >{{ introRemaining | remainingFilter }} / 160</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="profile__container__bottom">
        <div class="profile__container__bottom__introduction">
          <div class="profile__container__bottom__introduction__name">
            <span
              class="profile__container__bottom__introduction__name-user-name"
              >{{ user.name }}</span
            >
            <span
              class="profile__container__bottom__introduction__name-user-account"
              >{{ user.account }}</span
            >
          </div>
          <p class="profile__container__bottom__introduction__description">
            {{ user.introduction }}
          </p>
          <div class="profile__container__bottom__introduction__follow">
            <router-link
              :to="{ name: 'user-followings', params: { id: user.id } }"
              class="profile__container__bottom__introduction__follow__followings"
              >{{ user.followingsCount }}個<span>跟隨中</span></router-link
            >
            <router-link
              :to="{ name: 'user-followers', params: { id: user.id } }"
              class="profile__container__bottom__introduction__follow__followers"
              >{{ user.followersCount }}個<span>跟隨者</span></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  props: {
    tweetsLength: {
      type: Number,
      required: true,
    },
    // currentUserData: {
    //   type: Object,
    //   required: true,
    // }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    nameRemaining() {
      return 50 - this.user.name.length
    },
    introRemaining() {
      return 160 - this.user.introduction.length
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
  data() {
    return {
      user: {
        id: 0,
        name: '',
        introduction: '',
        avatar: '',
        cover: '',
        account: '',
        followingsCount: 0,
        followersCount: 0,
        email: '',
      },
    }
  },
  watch: {
    '$route.params.id': {
      handler: function (id) {
        this.fetchCurrentUser(id)
        // console.log(search)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // const { id } = this.currentUserData;
    const { id } = this.$route.params
    // this.fetchCurrentUser(id);
    console.log(id)
  },
  methods: {
    async fetchCurrentUser(userId) {
      try {
        const { data } = await userAPI.get({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        const {
          name,
          introduction,
          avatar,
          cover,
          account,
          id,
          followingsCount,
          followersCount,
          email,
        } = data
        this.user = {
          name,
          introduction,
          avatar,
          cover,
          account,
          id,
          followingsCount,
          followersCount,
          email,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法成功取得追蹤人數！',
        })
      }
    },
    handleCoverChange(e) {
      const files = e.target.files
      if (files.length === 0) {
        return (this.user.cover = null)
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.cover = imageURL
      }
    },
    handleAvatarChange(e) {
      const files = e.target.files
      if (files.length === 0) {
        return (this.user.avatar = null)
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.avatar = imageURL
      }
    },
    async handleSubmit() {
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫名稱',
          })
          return
        }
        if (!this.user.introduction) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫自我介紹',
          })
          return
        }
        if (!this.user.avatar) {
          Toast.fire({
            icon: 'warning',
            title: '請選擇大頭貼',
          })
          return
        }
        const { data } = await userAPI.update({
          userId: this.user.id,
          name: this.user.name,
          introduction: this.user.introduction,
          avatar: this.user.avatar,
          cover: this.user.cover,
        })
        console.log(data)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '個人資料已更新！',
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法成功更新使用者資料',
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.main-subProfileTop {
  width: 100%;
  position: relative;
  .profile__header {
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 43px;
    padding-left: 15px;
    &__back {
      width: 17px;
      height: 14px;
      cursor: pointer;
    }
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      cursor: default;
      &__name {
        font-size: 19px;
        font-weight: 900;
      }
      &__tweetsNum {
        font-size: 13px;
        font-weight: 500;
        color: var(--smaller-font-color);
      }
    }
  }
  .profile__container {
    width: 100%;
    &__top {
      width: 100%;
      &__background {
        position: absolute;
        top: 55px;
        left: 50%;
        transform: translateX(-50%);
        width: 99%;
        height: 200px;
        background-color: grey;
      }
      &__avatar {
        position: absolute;
        top: 179px;
        left: 15px;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: 4px solid var(--background);
      }
      &__btn {
        position: absolute;
        top: 265px;
        right: 15px;
        width: 120px;
        height: 35px;
        border: 1px solid var(--button-background);
        border-radius: 100px;
        text-align: center;
        font-size: 15px;
        color: var(--button-background);
      }
    }
    &__bottom {
      width: 100%;
      position: absolute;
      top: 324px;
      padding-left: 15px;
      cursor: default;
      &__introduction {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        &__name {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          &-user-name {
            font-size: 19px;
            font-weight: 900;
          }
          &-user-account {
            font-size: 15px;
            font-weight: 500;
            color: var(--smaller-font-color);
            &::before {
              content: '@';
            }
          }
        }
        &__description {
          font-weight: 400;
          font-size: 14px;
        }
        &__follow {
          display: flex;
          flex-direction: row;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          &__followers,
          &__followings {
            cursor: pointer;
            color: var(--main-font-color);
            span {
              color: var(--smaller-font-color);
            }
          }
        }
      }
    }
  }
  .modal-content {
    width: 600px;
    height: 675px;
    border-radius: 14px;
    background-color: var(--background);
    .modal-header {
      width: 100%;
      height: 59px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-left {
        display: flex;
        gap: 45px;
        .close {
          all: unset;
          width: 15px;
          height: 15px;
          color: var(--cancel-button);
          cursor: pointer;
        }
        .modal-title {
          font-size: 19px;
          font-weight: 700;
          cursor: default;
        }
      }
      .header-right {
        width: 66px;
        height: 28px;
        border-radius: 100px;
        color: var(--button-font);
        background-color: var(--button-background);
        font-size: 18px;
        font-weight: 500;
        padding: 0;
      }
    }
    .modal-body {
      width: 100%;
      padding: 0;
      position: relative;
      .modal-top {
        width: 100%;
        .background {
          width: 100%;
          height: 200px;
          background-color: grey;
          position: absolute;
          top: 0;
          border: 1px solid grey;
        }
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid var(--background);
          background-color: pink;
          position: absolute;
          top: 140px;
          left: 14px;
        }
        .upload,
        .delete {
          width: 20px;
          height: 20px;
          color: var(--background);
          background-color: var(--smaller-font-color);
          border-radius: 4px;
          cursor: pointer;
        }
        .delete {
          position: absolute;
          top: 92.5px;
          right: 264.5px;
        }
        .upload-bg-image {
          position: absolute;
          top: 90px;
          left: 262px;
          border: 1px solid var(--user-avatar);
        }
        .upload-avatar-image {
          position: absolute;
          top: 190px;
          left: 65px;
        }
      }
      .modal-bottom {
        width: 100%;
        position: absolute;
        top: 280px;
        .form-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 42px;
          label {
            width: 95%;
            background-color: var(--input-background);
            border-radius: 4px;
            position: relative;
            padding: 0 15px;
            &::after {
              position: absolute;
              content: '';
              top: 100%;
              left: 0;
              width: 100%;
              height: 2px;
              border-radius: 0 0 4px 4px;
              background-color: var(--input-underline);
            }
          }
          input,
          textarea {
            border: unset;
            background-color: var(--input-background);
          }
          .title {
            font-size: 15px;
            font-weight: 500;
            color: var(--smaller-font-color);
          }
          .name-label {
            .name-input {
              font-size: 19px;
              font-weight: 700;
              padding: 0 2px;
            }
            // .title {
            //   padding: 0 15px;
            // }
          }
          .letters {
            position: absolute;
            right: 0;
            top: 100%;
            font-size: 15px;
            font-size: 500;
            color: var(--smaller-font-color);
          }
        }
      }
    }
  }
}
.not-current-user {
  position: absolute;
  top: 265px;
  right: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  img {
    width: 35px;
    height: 35px;
  }
  .follow-status {
    width: 90px;
    height: 35px;
    background-color: var(--button-background);
    border-radius: 100px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;

    span {
      color: var(--background);
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>
