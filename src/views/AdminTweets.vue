<template>
  <div class="admin__tweets">
    <div class="admin__tweets__title">推文清單</div>
    <ul class="admin__tweets__list">
      <li class="admin__tweets__list__item">
        <div class="wrapper">
          <div to="" class="admin__tweets__list__item__avatar">
            <img src="" alt="" class="user-avatar" />
          </div>
          <div class="admin__tweets__list__item__info">
            <div class="admin__tweets__list__item__info__content">
              <span
                class="admin__tweets__list__item__info__content--name"
                >tweetName</span
              >
              <div class="admin__tweets__list__item__info__content--account">
                <span class="router-link">{{
                  "@" + account
                }}</span>
                {{ " ・ " + createdAt }}
              </div>
            </div>
            <p class="admin__tweets__list__item__info__content__tweet">
              hdbvkahsbdkahbdhvb,hsbdvhs,hdv,hVhdhdbv,
            </p>
          </div>
        </div>
        <button type="button" class="admin__tweets__list__item__button">
          <img src="../assets/icon_delete_black@2x.png" alt="" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.admin__tweets {
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-and-divider);
  font-size: 15px;
  font-weight: 500;
  cursor: default;
  &__title {
    width: 100%;
    padding: 15px 0 14px 26.5px;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid var(--border-and-divider);
  }
  &__list {
    width: 100%;
    &__item {
      width: 100%;
      height: 75px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-and-divider);
      padding: 13px 15px;
      .wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 15px;
      }
      &__avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: grey;
        }
      }
      &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 6px;
        &__content {
          display: flex;
          flex-direction: row;
          gap: 5px;
          &--name {
            font-weight: 700;
            color: var(--main-font-color);
          }
          &--account {
            color: var(--smaller-font-color);
            .router-link {
              color: var(--smaller-font-color);
            }
          }
        }
      }
      &__button {
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>