<template>
  <div class="admin__home">
    <AdminNavbar />
    <div class="admin__home__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminNavbar from './../components/AdminNavbar.vue'

export default {
  name: 'AdminHome',
  components: {
    AdminNavbar,
  },
  created() {
    this.$router.push('/admin/tweets')
  },
}
</script>

<style scoped lang="scss">
.admin__home {
  display: grid;
  grid-template-columns: 1fr 83%;
  grid-template-rows: auto;
  width: 100%;
  height: 100vh;
  padding-left: 6%;
}

.admin__home__content {
  width: 100%;
  padding-right: 19.5px;
}

.router-link-active {
  color: var(--button-background);
}
</style>
