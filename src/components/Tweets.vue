<template>
  <div class="tweets-container">
    <div
      class="tweets-container__tweet"
      v-for="tweet in userTweets"
      :key="tweet.id"
    >
      <router-link
        :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
        class="tweets-container__tweet__user-avatar"
      >
        <img
          v-if="tweet.User.avatar"
          :src="tweet.User.avatar"
          alt=""
          class="user-avatar"
        />
      </router-link>
      <div class="tweets-container__tweet__wrapper">
        <div class="tweets-container__tweet__wrapper__info">
          <router-link
            :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
            class="tweets-container__tweet__wrapper__info--name"
            >{{ tweet.User.name }}</router-link
          >
          <div class="tweets-container__tweet__wrapper__info--account">
            <router-link
              :to="{ name: 'sub-profile', params: { id: tweet.UserId } }"
              class="router-link"
              >{{ '@' + tweet.User.account }}</router-link
            >・{{ tweet.createdAt | fromNow }}
          </div>
        </div>

        <router-link
          :to="{ name: 'individual-tweet', params: { tweet_id: tweet.id } }"
          class="tweets-container__tweet__wrapper__tweet"
        >
          {{ tweet.description }}</router-link
        >

        <div class="tweets-container__tweet__wrapper__icons">
          <div class="tweets-container__tweet__wrapper__icons__comment">
            <img
              src="./../assets/icon_reply@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__comment--icon"
              data-toggle="modal"
              :data-target="'#' + 'tweet-' + tweet.id"
              @click="handleClick(tweet)"
            />
            <span
              class="tweets-container__tweet__wrapper__icons__comment--count"
              >{{ tweet.repliesCount }}</span
            >
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            :id="'tweet-' + tweet.id"
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
                          {{ '@' + tweet.User.account }}
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
                          {{ '@' + tweet.User.account }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-body__reply">
                    <div class="modal-body__reply__user-avatar">
                      <img
                        v-if="currentUser.avatar"
                        :src="currentUser.avatar"
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
                    @click="handleSubmit(tweet.id)"
                  >
                    回覆
                  </button>
                  <button
                    v-if="reply.length === 0 || reply.length > 140"
                    class="btn-modal button"
                    @click="handleSubmit(tweet.id)"
                  >
                    回覆
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="tweets-container__tweet__wrapper__icons__like">
            <img
              v-if="!tweet.isLiked"
              src="./../assets/icon_like@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__like--icon"
              @click.stop.prevent="addLike(tweet.id)"
            />
            <img
              v-if="tweet.isLiked"
              src="./../assets/icon_like_fill@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__like--icon"
              @click.stop.prevent="deleteLike(tweet.id)"
            />
            <span
              class="tweets-container__tweet__wrapper__icons__like--count"
              >{{ tweet.likesCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fromNowFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
import tweetsAPI from './../apis/tweets'

export default {
  name: 'Tweets',
  props: {
    initialUserTweets: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
  data() {
    return {
      userTweets: [],
      tweetModal: [],
      reply: '',
      error: false,
    }
  },
  methods: {
    fetchTweets() {
      this.userTweets = this.initialUserTweets
    },
    async addLike(tweetId) {
      try {
        const response = await tweetsAPI.addLike({ tweetId })

        if (response.data.status !== 'success') {
          throw new Error(response.statusText)
        }

        this.userTweets = this.userTweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet
          } else {
            return {
              ...tweet,
              isLiked: true,
              likesCount: tweet.likesCount + 1,
            }
          }
        })
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

        this.userTweets = this.userTweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet
          } else {
            return {
              ...tweet,
              isLiked: false,
              likesCount: tweet.likesCount - 1,
            }
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚推文，請稍後再試',
        })
      }
    },
    handleClick(tweet) {
      this.tweetModal = tweet
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

        this.userTweets = this.userTweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet
          } else {
            return {
              ...tweet,
              repliesCount: tweet.repliesCount + 1,
            }
          }
        })

        this.reply = ''
        this.error = false

        this.$emit('after-create-reply')
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
    this.fetchTweets()
  },
  watch: {
    initialUserTweets(newValue) {
      this.userTweets = newValue
    },
  },
}
</script>

<style lang="scss" scoped>
.tweets-container {
  margin-top: 10px;
  width: 100%;
  background: var(--background);
  &__tweet {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    border-bottom: 1px solid var(--border-and-divider);
    width: 100%;
    &__user-avatar {
      margin: 3px 10px 0 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--user-avatar);
    }

    &__wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      &__info {
        display: flex;
        flex-direction: row;
        align-items: center;
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
          margin-left: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--smaller-font-color);
          .router-link {
            font-weight: 500;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--smaller-font-color);
          }
        }
      }

      &__tweet {
        margin: 6px 15px 14px 0;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        color: var(--main-font-color);
      }

      &__icons {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__comment,
        &__like {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
          width: 40px;
          height: 15px;
          &--icon {
            width: 15px;
            height: 15px;
          }

          &--count {
            font-weight: 500;
            font-size: 13px;
            line-height: 13px;
            color: var(--smaller-font-color);
          }
        }

        &__comment {
          margin-right: 51px;
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
