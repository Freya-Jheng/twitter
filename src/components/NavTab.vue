<template>
  <div class="nav-tab">
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item active">
        <router-link 
        :to="{name: 'sub-profile-tweets', params: {
        id: this.$route.params.id
        }}" class="nav-link">
        推文
        </router-link>
      </li>
      <li class="nav-item">
        <router-link 
        :to="{name: 'sub-profile-responses', params: {
        id: this.$route.params.id
        }}" class="nav-link">
        推文與回覆
        </router-link>
      </li>
      <li class="nav-item">
        <router-link 
        :to="{name: 'sub-profile-liked', params: {
        id: this.$route.params.id
        }}" class="nav-link">
        喜歡的內容
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'SubProfileTweets',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
}
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
        color: var(--smaller-font-cor);
        font-size: 15px;
        font-weight: 700;
        border: unset;
        &:hover,
        &:focus {
          border-bottom: 2px solid var(--active-color);
          color: var(--active-color);
        }
      }
    }
  }
}
</style>
