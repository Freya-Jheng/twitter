<template>
  <div class="admin__home">
    <AdminNavbar />
    <div class="admin__home__content">
      <router-view />
    </div>
    <PopularUsers />
  </div>
</template>

<script>
import AdminNavbar from './../components/AdminNavbar.vue'
import PopularUsers from './../components/PopularUsers.vue'

export default {
  name: 'AdminHome',
  components: {
    AdminNavbar,
    PopularUsers,
  }
}
</script>

<style scoped lang="scss">
.admin__home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding: 0 6%;
}
</style>