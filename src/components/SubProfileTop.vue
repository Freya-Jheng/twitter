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
        <span class="profile__header__content-name">
          {{ currentUserData.name }}
        </span>
        <span class="profile__header__content-tweetsNum"
          >{{ currentUserData.tweetsLength }} 推文</span
        >
      </div>
    </div>
    <div class="profile__container">
      <div class="profile__container__top">
        <img
          :src="currentUserData.backgroundImage"
          alt=""
          class="profile__container__top-background"
        />
        <img src="" alt="" class="profile__container__top-avatar" />
        <button
          type="button"
          class="btn"
          data-toggle="modal"
          data-target="#editModal"
        >
          修改資料
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
                <h5 class="modal-title" id="editModalLabel">New message</h5>
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
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Recipient:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label"
                      >Message:</label
                    >
                    <textarea class="form-control" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile__container__bottom">
        <div class="profile__container__bottom_introduction">
          <div class="profile__container__bottom__introduction__name">
            <span class="profile__container__bottom__introduction__name-user-name">{{currentUserData.name}}</span>
            <span class="profile__container__bottom__introduction__name-user-account">{{currentUserData.account}}</span>
          </div>
          <p class="profile__container__bottom__introduction__description">{{currentUserData.description}}</p>
          <div class="profile__container__bottom__introduction__follow">
            <span class="profile__container__bottom__introduction__follow-followings">{{currentUserData.followingsNum}}個 <span>跟隨中</span></span>
            <span class="profile__container__bottom__introduction__follow-followers">{{currentUserData.followersNum}}個 <span>跟隨者</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-subProfileTop {
  .profile__header {
    width: 100%;
  }
  .profile__header__back {
    width: 20px;
    height: 20px;
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
