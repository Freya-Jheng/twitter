<template>
  <div class="profile__responses">
    <Navbar />
    <div class="subProfile">
      <SubProfileTop :current-user-data="user"/>
      <NavTab />
      <router-view />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import SubProfileTop from '../components/SubProfileTop.vue'
import NavTab from '../components/NavTab.vue'

export default {
  name: 'sub-profile-responses',
  components: {
    Navbar,
    SubProfileTop,
    NavTab
  }
}
</script>

<style scoped lang="scss">
.profile__responses {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  height: 100vh;
  padding:0 6%;
}
</style>