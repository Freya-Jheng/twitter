<template>
  <div class="home">
    <Navbar />
    <div class="subProfile">
      <SubProfileTop 
      :current-user-data="user"
      :tweets-length="tweetsLength" />
      <NavTab />
      <router-view :current-user-data="user"/>
    </div>
    <PopularUsers />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SubProfileTop from "../components/SubProfileTop.vue";
import NavTab from "../components/NavTab.vue";
import PopularUsers from "../components/PopularUsers.vue";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "SubProfile",
  data() {
    return {
      user: {
        id: 0,
        account: "",
        avatar: "",
        cover: "",
        createdAt: "",
        followersCount: 0,
        followingsCount: 0,
        introduction: "",
        name: "",
        updatedAt: "",
      },
      tweets: [],
      tweetsLength: 0,
    };
  },
  components: {
    Navbar,
    SubProfileTop,
    NavTab,
    PopularUsers,
  },
  // watch: {
  //   '$route.params.id': {
  //     handler: function(id) {
  //       this.fetchUser(id);
  //       this.fetchUserTweets(id)
  //       // console.log(search)
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
    this.fetchUserTweets(id)
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.get({userId});
        const {
          id,
          account,
          avatar,
          cover,
          createdAt,
          followersCount,
          followingsCount,
          introduction,
          name,
          updatedAt,
        } = data;

        if (data.status === "error") {
          throw new Error(data.message);
        }
        
        this.user = {
          id,
          account,
          avatar,
          cover,
          createdAt,
          followersCount,
          followingsCount,
          introduction,
          name,
          updatedAt,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功取得使用者資料",
        });
      }
    },
    async fetchUserTweets (userId) {
      try {
        const {data} = await userAPI.getUserTweets({userId})

        if (data.status === 'error') {
          throw new Error (data.message)
        }
        this.Tweets = data
        this.tweetsLength = this.Tweets.length

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法成功取得使用者貼文！'
        })
      }
    }
  },
};
</script>


<style scoped lang='scss'>
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  width: 100%;
  height: 100vh;
  padding: 0 6%;
  .subProfile {
    position: relative;
    border: 1px solid var(--profile-border);
    overflow-y: scroll;
  }
  .popular-users {
    height: 100%;
  }
}
</style>

