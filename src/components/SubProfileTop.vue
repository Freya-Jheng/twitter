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
          {{ currentUserData.name }}
        </span>
        <span class="profile__header__content__tweetsNum"
          >{{ currentUserData.tweetsLength }} 推文</span
        >
      </div>
    </div>
    <div class="profile__container">
      <div class="profile__container__top">
        <img
          :src="currentUserData.backgroundImage"
          alt="top-background"
          class="profile__container__top__background"
        />
        <img
          :src="currentUserData.image"
          alt="top-avatar"
          class="profile__container__top__avatar"
        />
        <button
          type="button"
          class="profile__container__top__btn"
          data-toggle="modal"
          data-target="#editModal"
        >
          編輯個人資料
        </button>
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
                <button
                  type="button"
                  class="btn header-right"
                  data-dismiss="modal"
                >
                  儲存
                </button>
              </div>
              <div class="modal-body">
                <div class="modal-top">
                  <img src="" alt="background" class="background" />
                  <img src="./../assets/icon_uploadPhoto@2x.png" alt="" class="upload-bg-image upload">
                  <img src="./../assets/icon_delete@2x.png" alt="" class="delete-image delete">
                  <img src="" alt="avatar" class="avatar"/>
                  <img src="./../assets/icon_uploadPhoto@2x.png" alt="" class="upload-avatar-image upload">  
                </div>
                <form class="modal-bottom">
                  <div class="form-group">
                    <label for="name-input" class="name-label">
                      <div class="title"> 名稱 </div>
                      <input type="text" class="name-input" id="name-input" />
                      <span class="letters">{{"字數"}}<span class="letters-length"></span>/50</span>
                    </label>
                    <label class="introduction-label">
                      <div class="title"> 自我介紹 </div>
                      <textarea
                        name="introduction-input"
                        class="introduction-input"
                        id="description-input"
                        cols="65"
                        rows="5"
                      ></textarea>
                      <span class="letters"><span class="letters-length">{{"字數"}}</span>/160</span>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile__container__bottom">
        <div class="profile__container__bottom__introduction">
          <div class="profile__container__bottom__introduction__name">
            <span
              class="profile__container__bottom__introduction__name-user-name"
              >{{ currentUserData.name }}</span
            >
            <span
              class="
                profile__container__bottom__introduction__name-user-account
              "
              >{{ currentUserData.account }}</span
            >
          </div>
          <p class="profile__container__bottom__introduction__description">
            {{ currentUserData.description }}
          </p>
          <div class="profile__container__bottom__introduction__follow">
            <span
              class="
                profile__container__bottom__introduction__follow__followings
              "
              >{{ currentUserData.followingsNum }}個<span>跟隨中</span></span
            >
            <span
              class="
                profile__container__bottom__introduction__follow__followers
              "
              >{{ currentUserData.followersNum }}個<span>跟隨者</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
              content: "@";
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
          top:0
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
        .upload, .delete {
          width: 20px;
          height: 20px;
          color: var(--background);
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
            padding: 0 15px;
            position: relative;
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
          input, textarea {
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
            }
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
</style>

<script>
export default {
  props: {
    currentUserData: {
      type: Object,
      required: true,
    },
  },
};
</script>
