<template>
  <div class="comments">
    <div class="comments__user-avatar">
      <img src="" alt="" class="comments__user-avatar--img" />
    </div>
    <div class="comments__container">
      <div class="comments__container__info">
        <div class="comments__container__info--name">Banana</div>
        <div class="comments__container__info--account">@banana</div>
        <div class="comments__container__info--time">三小時</div>
      </div>
      <div class="comments__container__reply-to">
        <div class="comments__container__reply-to--reply">回覆</div>
        <div class="comments__container__reply-to--account">@apple</div>
      </div>
      <div class="comments__container__text">good job</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Comments',
}
</script>

<style lang="scss" scoped>
.comments {
  display: flex;
  flex-direction: row;
  padding: 15px;
  border-bottom: 1px solid var(--border-and-divider);
  border-top: 1px solid var(--border-and-divider);

  &__user-avatar {
    margin-top: 3px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--user-avatar);
  }

  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
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
        margin-left: 4px;
        font-weight: 500;
        font-size: 15px;
        line-height: 21.72px;
        color: var(--smaller-font-color);
      }
    }

    &__reply-to {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 4px;
      &--reply {
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        color: var(--smaller-font-color);
      }

      &--account {
        margin-left: 4px;
        font-weight: 500;
        font-size: 15px;
        line-height: 21.72px;
        color: var(--mentioned-account);
      }
    }

    &__text {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 5px;
      font-weight: 400;
      font-size: 15px;
      line-height: 21.72px;
      color: var(--main-font-color);
    }
  }
}
</style>
