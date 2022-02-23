<template>
  <div class="create-tweet">
    <div class="create-tweet__header">首頁</div>
    <form class="create-tweet__container">
      <div class="create-tweet__container__main">
        <div class="create-tweet__container__main__user-avatar">
          <img src="" alt="" class="user-avatar" />
        </div>
        <div class="create-tweet__container__main__text">
          <div></div>
          <textarea
            name="new-tweet"
            id="new-tweet"
            cols="40"
            rows="1"
            wrap="hard"
            placeholder="有什麼新鮮事？"
            class="create-tweet__container__main__text--new-tweet"
            v-model="newTweet"
          ></textarea>
        </div>
      </div>
      <button class="create-tweet__container__button button">推文</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateTweet',
  data() {
    return {
      newTweet: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.create-tweet {
  width: 100%;
  height: calc(54px + 119px);
  background: var(--background);
  &__header {
    height: 55px;
    width: 100%;
    padding: 15px 0 14px 15px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26.06px;
    color: var(--main-font-color);
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 120px;
    &__main {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      padding-top: 10px;
      padding-left: 15px;
      border-top: 1px solid var(--border-and-divider);
      &__user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--user-avatar);
      }

      // TODO 調整依據輸入內如自動換行和變換高度
      &__text {
        flex: 1;
        width: 100%;
        min-height: 26px;
        &--new-tweet {
          padding-left: 10px;
          min-height: 26px;

          border: none;
          overflow: auto;
          outline: none;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          resize: none;
          font-weight: 500;
          font-size: 18px;
          line-height: 26.06px;
          color: var(--main-font-color);
        }

        &--new-tweet::placeholder {
          font-weight: 500;
          font-style: normal;
          font-size: 18px;
          line-height: 26.06px;
          color: var(--tweet-placeholder);
        }
      }
    }

    &__button {
      margin-right: 15px;
      margin-bottom: 10px;
      align-self: flex-end;
      width: 66px;
      height: 38px;
      font-weight: 500;
      font-size: 18px;
      line-height: 18px;
    }
  }
}
</style>
