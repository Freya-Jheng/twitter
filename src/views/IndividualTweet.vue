<template>
  <div class="tweet-main">
    <Navbar />
    <div class="tweet">
      <div class="tweet__header">
        <img
          src="./../assets/icon_back@2x.png"
          alt=""
          class="tweet__header__back"
          @click="$router.back()"
        />
        <div class="tweet__header__content">推文</div>
      </div>
      <div class="tweet__container">
        <div class="tweet__container__user-info">
          <router-link
            :to="{ name: 'sub-profile', params: { id: userTweet.UserId } }"
            class="tweet__container__user-info__user-avatar"
          >
            <img
              v-if="user.avatar"
              :src="user.avatar ? user.avatar : ' '"
              alt=""
              class="user-avatar"
            />
          </router-link>
          <div class="tweet__container__user-info__wrapper">
            <router-link
              :to="{ name: 'sub-profile', params: { id: userTweet.UserId } }"
              class="tweet__container__user-info__wrapper--name"
              >{{ user.name }}</router-link
            >
            <router-link
              :to="{ name: 'sub-profile', params: { id: userTweet.UserId } }"
              class="tweet__container__user-info__wrapper--account"
              >{{ '@' + user.account }}</router-link
            >
          </div>
        </div>
        <div class="tweet__container__content">
          {{ userTweet.description }}
        </div>
        <div class="tweet__container__time">
          {{ userTweet.createdAt | fullTime }}
        </div>
        <div class="tweet__container__numbers">
          <div class="tweet__container__numbers__reply">
            <span class="tweet__container__numbers__reply--counts">{{
              userTweet.repliesCount
            }}</span>
            <span class="tweet__container__numbers__reply--words">回覆</span>
          </div>
          <div class="tweet__container__numbers__like">
            <span class="tweet__container__numbers__like--counts">{{
              userTweet.likesCount
            }}</span>
            <span class="tweet__container__numbers__like--words">喜歡次數</span>
          </div>
        </div>
        <div class="tweet__container__icons">
          <img
            src="./../assets/icon_reply@2x.png"
            alt=""
            class="tweets__container__icons__comment"
            @click="handleClick(userTweet)"
            data-toggle="modal"
            :data-target="'#' + 'tweet-' + userTweet.id"
          />
          <img
            v-if="!userTweet.isLiked"
            src="./../assets/icon_like@2x.png"
            alt=""
            class="tweets__container__icons__like"
            @click.stop.prevent="addLike(userTweet.id)"
          />
          <img
            v-if="userTweet.isLiked"
            src="./../assets/icon_like_fill@2x.png"
            alt=""
            class="tweets__container__icons__like"
            @click.stop.prevent="deleteLike(userTweet.id)"
          />
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        :id="'tweet-' + userTweet.id"
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
                    v-if="userTweet.User.avatar"
                    :src="userTweet.User.avatar ? userTweet.User.avatar : ''"
                    alt=""
                    class="avatar"
                  />
                </div>
                <div class="modal-body__tweet__content">
                  <div class="modal-body__tweet__content__info">
                    <div class="modal-body__tweet__content__info--name">
                      {{ userTweet.User.name }}
                    </div>
                    <div class="modal-body__tweet__content__info--account">
                      {{ '@' + userTweet.User.account }}
                    </div>
                    <div class="modal-body__tweet__content__info--time">
                      {{ userTweet.createdAt | fromNow }}
                    </div>
                  </div>
                  <div class="modal-body__tweet__content__text">
                    {{ userTweet.description }}
                  </div>
                  <div class="modal-body__tweet__content__reply-to">
                    <div class="modal-body__tweet__content__reply-to--reply">
                      回覆給
                    </div>
                    <div class="modal-body__tweet__content__reply-to--account">
                      {{ '@' + userTweet.User.account }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-body__reply">
                <div class="modal-body__reply__user-avatar">
                  <img
                    v-if="currentUser.avatar"
                    :src="currentUser.avatar ? currentUser.avatar : ''"
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
              :class="{
                error: reply.length > 140,
                reply_error: error && reply.length === 0,
              }"
            >
              <button
                v-if="reply.length > 0 && reply.length <= 140"
                class="btn-modal button"
                data-dismiss="modal"
                @click="handleSubmit(tweetModal.id)"
              >
                回覆
              </button>
              <button
                v-if="reply.length === 0 || reply.length > 140"
                class="btn-modal button"
                @click="handleSubmit()"
              >
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>

      <Comments :initial-replies="replies" :user-tweet="userTweet" />
    </div>
    <PopularUsers />
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import Comments from './../components/Comments.vue'
import PopularUsers from './../components/PopularUsers'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import { fromNowFilter } from './../utils/mixins'

export default {
  name: 'IndividualTweet',
  components: {
    Navbar,
    Comments,
    PopularUsers,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      userTweet: {},
      user: {},
      replies: [],
      tweetModal: [],
      reply: '',
      error: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const response = await tweetsAPI.getIndividualTweet({ tweetId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        this.userTweet = response.data
        this.user = response.data.User
        this.user = {
          ...this.user,
          avatar: this.user.avatar ? this.user.avatar : '',
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試',
        })
      }
    },

    async fetchReplies(tweetId) {
      try {
        const response = await tweetsAPI.getReplies({ tweetId })

        if (response.status !== 200) {
          throw new Error(response.data.statusText)
        }

        this.replies = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆，請稍後再試',
        })
      }
    },
    async addLike(tweetId) {
      try {
        const response = await tweetsAPI.addLike({ tweetId })

        if (response.data.status !== 'success') {
          throw new Error(response.statusText)
        }

        this.userTweet = {
          ...this.userTweet,
          isLiked: true,
          likesCount: this.userTweet.likesCount + 1,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法按讚推文，請稍後再試',
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        const response = await tweetsAPI.deleteLike({ tweetId })

        if (response.data.status !== 'success') {
          throw new Error(response.data.statusText)
        }

        this.userTweet = {
          ...this.userTweet,
          isLiked: false,
          likesCount: this.userTweet.likesCount - 1,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚推文，請稍後再試',
        })
      }
    },
    handleClick(userTweet) {
      this.tweetModal = userTweet
    },
    handleCancel() {
      this.reply = ''
    },
    async handleSubmit(tweetId) {
      try {
        if (!this.reply) {
          this.error = true

          return
        }

        if (this.reply.length > 140) {
          return
        }

        const { data } = await tweetsAPI.reply({
          tweetId,
          comment: this.reply,
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.reply = ''
        this.error = false

        this.fetchTweet(tweetId)
        this.fetchReplies(tweetId)
      } catch (error) {
        console.log(error)
        this.reply = ''
        this.error = false
        Toast.fire({
          icon: 'error',
          title: '無法新增回覆，請稍後再試',
        })
      }
    },
  },
  created() {
    const { tweet_id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
    this.fetchReplies(tweetId)
  },
}
</script>

<style lang="scss" scoped>
.tweet-main {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  width: 100%;
  height: 100vh;
  padding: 0 6%;

  .tweet {
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border-and-divider);
    border-right: 1px solid var(--border-and-divider);
    width: 100%;
    height: 100%;
    background: var(--background);
    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 55px;
      &__back {
        margin-left: 18px;
        width: 23px;
        height: 24px;
        cursor: pointer;
      }
      &__content {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 44px;
        font-weight: 700;
        font-size: 18px;
        line-height: 26.06px;
        height: 24px;
        cursor: default;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--border-and-divider);

      &__user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 15px;
        &__user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--user-avatar);
        }

        &__wrapper {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          &--name {
            font-weight: 700;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--main-font-color);
            &:hover {
              text-decoration: underline;
            }
          }

          &--account {
            font-weight: 500;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--smaller-font-color);
          }
        }
      }

      &__content {
        padding: 0 75px 0 15px;
        font-weight: 500;
        font-size: 23px;
        line-height: 34px;
        color: var(--main-font-color);
      }

      &__time {
        padding: 15px 0 15px 15px;
        font-weight: 500;
        font-size: 15px;
        line-height: 21.72px;
        color: var(--smaller-font-color);
      }

      &__numbers {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 15px;
        height: 68px;
        border-top: 1px solid var(--border-and-divider);
        border-bottom: 1px solid var(--border-and-divider);
        &__reply,
        &__like {
          display: flex;
          flex-direction: row;
          align-items: center;
          &--counts {
            font-weight: 700;
            font-size: 19px;
            line-height: 27.51px;
            color: var(--intro-color);
          }

          &--words {
            margin-left: 4px;
            font-weight: 500;
            font-size: 19px;
            line-height: 27.51px;
            color: var(--smaller-font-color);
          }
        }

        &__like {
          margin-left: 20px;
        }
      }

      &__icons {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 15px;
        height: 61px;

        img {
          cursor: pointer;
          height: 30px;
          width: 30px;
        }
        img:nth-last-child(1) {
          margin-left: 152px;
        }
      }
    }
  }
}

.modal-content {
  width: 600px;
  min-height: 400px;
  border-radius: 14px;
  background: var(--background);
}

.modal-header {
  position: relative;
  height: 54px;
  border-bottom: 1px solid var(--border-and-divider);
}

.close {
  position: absolute;
  left: 0;
  top: 15px;
  width: 15px;
  height: 15px;
  color: var(--cancel-button);
  &--text {
    width: 15px;
    height: 15px;
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
        content: '';
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
    content: '字數不可超過 140 字 ';
    position: absolute;
    bottom: 27px;
    right: 101px;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    color: var(--error-color);
  }
}

.reply_error {
  position: relative;
  &::after {
    content: '內容不可空白';
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
