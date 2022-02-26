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
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  儲存
                </button>
              </div>
              <div class="modal-body">
                <div class="modal-top">
                  <img src="" alt="background" class="background" />
                  <img src="" alt="avatar" class="avatar" />
                </div>
                <form class="modal-bottom">
                  <div class="form-group">
                    <label for="name-input" class="name-label">
                      <span class="title"> 名稱 </span>
                      <input type="text" class="name-input" id="name-input" />
                    </label>
                    <label class="description-label">
                      <span class="title"> 自我介紹 </span>
                      <textarea
                        name="description-input"
                        id="description-input"
                        cols="30"
                        rows="10"
                      ></textarea>
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
      outline: 1px solid red;
      width: 100%;
      height: 59px;
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;

    }
    .modal-body {

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
