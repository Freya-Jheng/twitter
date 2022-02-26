<template>
  <ul class="nav nav-tabs mb-4">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      class="nav-item"
    >
      <router-link
        :to="tab.path"
        class="nav-link"
      >
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import uuid from 'uuid/v4'

export default {
  data () {
    return {
      tabs: [
        {
          id: uuid(),
          title: '推文',
          path: '/profile/:id/tweets'
        },
        {
          id: uuid(),
          title: '推文與回覆',
          path: '/profile/:id/responses'
        },
        {
          id: uuid(),
          title: '喜歡的內容',
          path: '/profile/:id/liked'
        },
      ]
    }
  }
}
</script>

<style scoped>
.nav-tabs {
  position: absolute;
  top: 435px;
  border-bottom: 1px solid #bd2333;
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover,
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  border-color: #bd2333;
  background-color: #bd2333;
  color: white;
}
</style>
