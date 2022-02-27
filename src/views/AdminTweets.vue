<template>
  <div class="admin__tweets">
    <div class="admin__tweets__title">推文清單</div>
    <ul class="admin__tweets__list">
      <li class="admin__tweets__list__item">
        <router-link to="" class="admin__tweets__list__item__avatar">
          <img src="" alt="" class="user-avatar" />
        </router-link>
        <div class="admin__tweets__list__item__info">
          <div class="admin__tweets__list__item__info__content">
            <router-link
              to=""
              class="admin__tweets__list__item__info__content--name"
              >tweetName</router-link
            >
            <div class="admin__tweets__list__item__info__content--account">
              <router-link to="" class="router-link">{{
                "@" + account
              }}</router-link>
              {{ " ・ " + createdAt }}
            </div>
          </div>
          <p class="admin__tweets__list__item__info__content__tweet">
            hdbvkahsbdkahbdhvb,hsbdvhs,hdv,hVhdhdbv,
          </p>
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
  
}
</style>