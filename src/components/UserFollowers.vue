<template>
  <div class="user-followers">
    <div class="user-followers-card">
      <router-link
        :to="{ name: 'sub-profile', params: { id: 1 } }"
        class="user-followers-card__avatar"
      >
        <img src="" alt="" class="user-followers-card__avatar--img" />
      </router-link>
      <div class="user-followers-card__container">
        <div class="user-followers-card__container__info">
          <div class="user-followers-card__container__info__user">
            <router-link
              :to="{ name: 'sub-profile', params: { id: 1 } }"
              class="user-followers-card__container__info__user--name"
            >
              123
            </router-link>
            <router-link
              :to="{ name: 'sub-profile', params: { id: 1 } }"
              class="user-followers-card__container__info__user--account"
            >
              ashley
            </router-link>
          </div>
          <button class="user-followers-card__container__info__button button">
            跟隨
          </button>
        </div>
        <div class="user-followers-card__container--text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserFollowers',
}
</script>

<style scoped lang="scss">
.user-followers-card {
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

      &__button {
        background: transparent;
        border: 1px solid var(--button-background);
        color: var(--button-background);
        width: 60px;
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
