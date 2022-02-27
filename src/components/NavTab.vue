<template>
  <div class="nav-tab">
    <ul class="nav nav-tabs mb-4">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item">
        <router-link :to="tab.path" class="nav-link">
          {{ tab.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import uuid from "uuid/v4";

export default {
  data() {
    return {
      tabs: [
        {
          id: uuid(),
          title: "推文",
          path: "/profile/tweets/:id",
        },
        {
          id: uuid(),
          title: "推文與回覆",
          path: "/profile/responses/:id",
        },
        {
          id: uuid(),
          title: "喜歡的內容",
          path: "/profile/liked/:id",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.nav-tab {
  position: absolute;
  top: 435px;
  width: 100%;
  margin-top: 35px;
  border: unset;
  .nav-tabs {
    display: flex;
    border: unset;
    .nav-item {
      width: 130px;
      text-align: center;
      margin-right: 2px;
      .nav-link {
        color: var(--smaller-font-color);
        font-size: 15px;
        font-weight: 700;
        &:hover,
        &:focus {
          border: unset;
          border-bottom: 2px solid var(--active-color);
          color: var(--active-color);
        }
      }
    }
  }
}
</style>
