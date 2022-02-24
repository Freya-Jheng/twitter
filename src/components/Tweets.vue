<template>
  <div class="tweets-container">
    <div class="tweets-container__tweet">
      <div class="tweets-container__tweet__user-avatar">
        <img src="" alt="" class="user-avatar" />
      </div>
      <div class="tweets-container__tweet__wrapper">
        <div class="tweets-container__tweet__wrapper__info">
          <div class="tweets-container__tweet__wrapper__info--name">
            {{ userTweets[0].name }}
          </div>
          <div class="tweets-container__tweet__wrapper__info--account">
            {{ '@' + userTweets[0].account + ' ・ ' + userTweets[0].createdAt }}
          </div>
        </div>
        <div class="tweets-container__tweet__wrapper__tweet">
          {{ userTweets[0].content }}
        </div>
        <div class="tweets-container__tweet__wrapper__icons">
          <div class="tweets-container__tweet__wrapper__icons__comment">
            <img
              src="./../assets/icon_reply@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__comment--icon"
            />
            <span
              class="tweets-container__tweet__wrapper__icons__comment--count"
              >{{ userTweets[0].commentCount }}</span
            >
          </div>
          <div class="tweets-container__tweet__wrapper__icons__like">
            <img
              src="./../assets/icon_like@2x.png"
              alt=""
              class="tweets-container__tweet__wrapper__icons__like--icon"
            />
            <span
              class="tweets-container__tweet__wrapper__icons__like--count"
              >{{ userTweets[0].likeCounts }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tweets',
  data() {
    return {
      userTweets: [
        {
          userID: '1',
          tweetId: '1',
          image: '',
          name: 'Apple',
          account: 'apple',
          createdAt: '',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eu ipsum at sollicitudin. Vivamus tristique lorem vitae erat commodo, quis congue leo pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla rutrum ut tellus viverra congue. Curabitur eu elit et est commodo tempus. ',
          commentCount: 15,
          likeCounts: 16,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.tweets-container {
  margin-top: 10px;
  width: 100%;
  height: 100%;
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
        }
        &--account {
          margin-left: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 21.72px;
          color: var(--smaller-font-color);
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
</style>
