<template>
  <div class="user-following">
    <div class="user-following-card">
      <div class="user-following-card__avatar">
        <img src="" alt="" class="user-following-card__avatar--img" />
      </div>
      <div class="user-following-card__container">
        <div class="user-following-card__container__info">
          <div class="user-following-card__container__info__user">
            <div class="user-following-card__container__info__user--name">
              123
            </div>
            <div class="user-following-card__container__info__user--account">
              132
            </div>
          </div>
          <button
            class="user-following-card__container__info__button-followed button"
          >
            正在跟隨
          </button>
        </div>
        <div class="user-following-card__container--text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowings',
}
</script>

<style scoped lang="scss">
.user-following-card {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border-and-divider);

  &__avatar {
    margin-top: 12px;
    margin-left: 15px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: var(--user-avatar);
  }

  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 15px 10px 10px;

    &__info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__user {
        display: flex;
        flex-direction: column;
        &--name {
          font-weight: 700;
          font-size: 15px;
          line-height: 15px;
          color: var(--main-font-color);
        }

        &--account {
          margin-top: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          color: var(--smaller-font-color);
        }
      }

      &__button-followed {
        width: 90px;
        height: 25px;
        font-weight: 700;
        font-size: 15px;
        line-height: 15px;
      }
    }

    &--text {
      margin-top: 5px;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      color: var(--main-font-color);
    }
  }
}
</style>
