<template>
  <div class="profile__tweets">
    <div
      v-for="tweet in likedTweets"
      :key="tweet.id"
      class="profile__tweets__tweet"
    >
      <router-link to="" class="profile__tweets__tweet__avatar">
        <img :src="tweet.Tweet.User.avatar" alt="" class="user-avatar" />
      </router-link>
      <div class="profile__tweets__tweet__wrapper">
        <div class="profile__tweets__tweet__wrapper__info">
          <router-link
            :to="{
              name: 'sub-profile-tweets',
              params: { id: tweet.Tweet.User.id },
            }"
            class="profile__tweets__tweet__wrapper__info--name"
            >{{ tweet.Tweet.User.name }}</router-link
          >
          <div class="profile__tweets__tweet__wrapper__info--account">
            <router-link
              :to="{
                name: 'sub-profile-tweets',
                params: { id: tweet.Tweet.User.id },
              }"
              class="router-link"
            >
              {{ "@" + tweet.Tweet.User.account }}
            </router-link>
            ・ {{ tweet.createdAt | fromNow }}
          </div>
        </div>
        <router-link
          :to="{
            name: 'individual-tweet',
            params: { tweet_id: tweet.TweetId },
          }"
          class="profile__tweets__tweet__wrapper__tweet"
        >
          {{ tweet.Tweet.description }}
        </router-link>

        <div class="profile__tweets__tweet__wrapper__icons">
          <div class="profile__tweets__tweet__wrapper__icons__comment">
            <img
              src="./../assets/icon_reply@2x.png"
              alt=""
              class="profile__tweets__tweet__wrapper__icons__comment--icon"
              data-toggle="modal"
              :data-target="'#' + 'tweet-' + tweet.TweetId"
              @click="handleClick(tweet)"
            />

            <span
              class="profile__tweets__tweet__wrapper__icons__comment--count"
              >{{ tweet.Tweet.repliesCount }}</span
            >
          </div>
          <!-- Modal -->
          <div
            class="modal fade"
            :id="'tweet-' + tweet.TweetId"
            tabindex="-1"
            aria-labelledby="replyModal"
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
                    @click="handleCancel"
                  >
                    <span aria-hidden="true" class="close--text">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="modal-body__tweet">
                    <div class="modal-body__tweet__user-avatar">
                      <img
                        v-if="tweet.User.avatar"
                        :src="tweet.User.avatar"
                        alt=""
                        class="avatar"
                      />
                    </div>
                    <div class="modal-body__tweet__content">
                      <div class="modal-body__tweet__content__info">
                        <div class="modal-body__tweet__content__info--name">
                          {{ tweet.User.name }}
                        </div>
                        <div class="modal-body__tweet__content__info--account">
                          {{ "@" + tweet.User.account }}
                        </div>
                        <div class="modal-body__tweet__content__info--time">
                          {{ tweet.createdAt | fromNow }}
                        </div>
                      </div>
                      <div class="modal-body__tweet__content__text">
                        {{ tweet.description }}
                      </div>
                      <div class="modal-body__tweet__content__reply-to">
                        <div
                          class="modal-body__tweet__content__reply-to--reply"
                        >
                          回覆給
                        </div>
                        <div
                          class="modal-body__tweet__content__reply-to--account"
                        >
                          {{ "@" + tweet.User.account }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-body__reply">
                    <div class="modal-body__reply__user-avatar">
                      <img
                        v-if="tweet.User.avatar"
                        :src="tweet.User.avatar"
                        alt=""
                        class="avatar"
                      />
                    </div>
                    <form action="" class="reply">
                      <textarea
                        placeholder="推你的回覆"
                        name="reply-textarea"
                        id="reply-textarea"
                        cols="50"
                        rows="4"
                        v-model="reply"
                      ></textarea>
                    </form>
                  </div>
                </div>
                <div
                  class="modal-footer"
                  :class="{ error: reply.length > 140 }"
                >
                  <button
                    class="btn-modal button"
                    data-dismiss="modal"
                    @click="handleSubmit(tweet.TweetId)"
                    :disabled="reply.length > 140 || reply.length === 0"
                  >
                    回覆
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="profile__tweets__tweet__wrapper__icons__like">
            <img
              v-if="!tweet.isLiked"
              @click.stop.prevent="addLike(tweet.Tweet.id)"
              src="./../assets/icon_like@2x.png"
              alt=""
              class="profile__tweets__tweet__wrapper__icons__like--icon"
            />
            <img
              v-if="tweet.isLiked"
              @click.stop.prevent="deleteLike(tweet.Tweet.id)"
              src="./../assets/icon_like_fill@2x.png"
              alt=""
              class="profile__tweets__tweet__wrapper__icons__like--icon"
            />
            <span
              class="profile__tweets__tweet__wrapper__icons__like--count"
            ></span>
            {{ tweet.likesCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import userAPI from "../apis/users";
import { fromNowFilter } from "../utils/mixins";
import tweetsAPI from "../apis/tweets";

export default {
  name: "SubProfileLiked",
  data() {
    return {
      likedTweets: [],
      likesCount: 0,
      reply: "",
    };
  },
  watch: {
    '$route.params.id': {
      handler: function(id) {
        this.fetchUserLiked(id)
        // console.log(search)
      },
      deep: true,
      immediate: true
    }
  },
  mixins: [fromNowFilter],
  created() {
    // const { id } = this.$route.params;
    // this.fetchUserLiked(id);
  },
  methods: {
    async fetchUserLiked(userId) {
      try {
        const { data } = await userAPI.getUserLiked({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.likedTweets = data;
        this.likedTweets = this.likedTweets.map((tweet) => {
          return {
            ...tweet,
            likesCount: tweet.Tweet.likesCount,
            isLiked: true,
          };
        });
        // 排序
        this.likedTweets = this.likedTweets.sort((a, b) => {
          return a.createdAt > b.createdAt
            ? -1
            : a.Tweet.createdAt < b.Tweet.createdAt
            ? 1
            : 0;
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功取的使用者按讚貼文！",
        });
      }
    },
    async addLike(tweetId) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.likedTweets = this.likedTweets.map((tweet) => {
          if (tweet.Tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              isLiked: true,
              likesCount: tweet.likesCount + 1,
            };
          }
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功按讚！",
        });
      }
    },
    async deleteLike(tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.likedTweets = this.likedTweets.map((tweet) => {
          if (tweet.Tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              isLiked: false,
              likesCount: tweet.likesCount - 1,
            };
          }
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功取消按讚！",
        });
      }
    },
    handleClick(tweet) {
      this.tweetModal = tweet;
    },
    handleCancel() {
      this.reply = "";
    },
    async handleSubmit(tweetId) {
      try {
        if (!this.reply) {
          return false;
        }

        const { data } = await tweetsAPI.reply({
          tweetId,
          comment: this.reply,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.likedTweets = this.likedTweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              repliesCount: tweet.repliesCount + 1,
            };
          }
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增回覆，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.profile__tweets {
  position: absolute;
  top: 511px;
  width: 100%;
  border-top: 1px solid var(--border-and-divider);
  &__tweet {
    width: 100%;
    height: 145px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 13px 15px;
    gap: 10px;
    border-bottom: 1px solid var(--border-and-divider);
    &__avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: grey;
      }
    }
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
      font-size: 15px;
      &__info {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 5px;
        &--name {
          font-weight: 700;
          color: var(--main-font-color);
        }
        &--account {
          cursor: pointer;
          font-weight: 500;
          color: var(--smaller-font-color);
          .router-link {
            color: var(--smaller-font-color);
          }
        }
      }
      &__tweet {
        width: 100%;
        color: var(--main-font-color);
      }
      &__icons {
        display: flex;
        flex-direction: row;
        gap: 51px;
        cursor: pointer;
        &__comment,
        &__like {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
        &__comment {
          &--icon {
            height: 12.34px;
            width: 12.34px;
          }
        }
        &__like {
          &--icon {
            height: 11.82px;
            width: 12.57px;
          }
        }
      }
    }
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  &__tweet {
    display: flex;
    flex-direction: row;
    &__user-avatar {
      position: relative;
      padding-top: 3px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--user-avatar);
      &::after {
        content: "";
        position: absolute;
        top: 210%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 80px;
        background: var(--reply-connect-line);
      }
    }

    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      min-height: 150px;

      &__info {
        display: flex;
        flex-direction: row;
        align-items: center;
        &--name {
          font-weight: 700;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--main-font-color);
        }

        &--account {
          margin-left: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--smaller-font-color);
        }

        &--time {
          margin-left: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--smaller-font-color);
        }
      }

      &__text {
        margin-top: 5px;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: var(--main-font-color);
      }
      &__reply-to {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 19px;
        &--reply {
          font-weight: 500;
          font-size: 13px;
          line-height: 13px;
          color: var(--smaller-font-color);
        }

        &--account {
          margin-left: 5px;
          font-weight: 500;
          font-size: 13px;
          line-height: 13px;
          color: var(--mentioned-account);
        }
      }
    }
  }

  &__reply {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    &__user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--user-avatar);
    }
    textarea {
      flex: 1;
      border: none;
      resize: none;
      margin-left: 10px;
      margin-top: 10px;
      width: 100%;
    }
  }
}

.modal-footer {
  border-top: none;
  .btn-modal {
    height: 38px;
    width: 66px;
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
  }
}

.error {
  position: relative;
  &::after {
    content: "字數不可超過 140 字 ";
    position: absolute;
    bottom: 27px;
    right: 101px;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    color: var(--error-color);
  }
}
</style>