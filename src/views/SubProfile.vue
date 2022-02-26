<template>
  <div class="home">
    <Navbar />
    <router-view />
    <div class="subProfile">
      <SubProfileTop :current-user-data="user"/>
      <NavTab />
      <router-view />
    </div>
    <div class="popular-users">Popular users</div>
  </div>
</template>


<style scoped lang='scss'>
.home {
  display: grid;
  grid-template-columns: 1fr 600px 1.22fr;
  grid-template-rows: auto;
  width: 100%;
  height: 100vh;
  padding:0 6%;
  outline: 1px solid red;
  .subProfile {
    position: relative;
  }
  .popular-users {
    background: grey;
    height: 100%;
  }
}
</style>

<script>
import Navbar from '../components/Navbar.vue'
import SubProfileTop from '../components/SubProfileTop.vue'
import {v4 as uuidv4} from 'uuid'
import NavTab from '../components/NavTab.vue'

const dummyUser = {
  id: uuidv4(),
  image: 'https://i.pravatar.cc',
  name: 'John Doe',
  account: 'heyjohn',
  backgroundImage: '',
  description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint',
  followersNum: 59,
  followingsNum: 34,
  Tweets: [
    {
      id: uuidv4(),
      createdAt: '2022/2/22 22:22',
      content: 'hdbvwhbrljbkhbvqkbrkhbqlrbfkbwegbwkbgw dhbvlqhbwefhbwjebfkjqw whdblqwhbefhbqwekj dhbflqhwbefl dhbvlqhbwevhb.',
      likedNumber: 96,
      responses: [
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },{
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        }
      ] 
    },
    {
      id: uuidv4(),
      createdAt: '2022/2/22 22:22',
      content: 'hdbvwhbrljbkhbvqkbrkhbqlrbfkbwegbwkbgw dhbvlqhbwefhbwjebfkjqw whdblqwhbefhbqwekj dhbflqhwbefl dhbvlqhbwevhb.',
      likedNumber: 96,
      responses: [
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },{
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        }
      ] 
    },
    {
      id: uuidv4(),
      createdAt: '2022/2/22 22:22',
      content: 'hdbvwhbrljbkhbvqkbrkhbqlrbfkbwegbwkbgw dhbvlqhbwefhbwjebfkjqw whdblqwhbefhbqwekj dhbflqhwbefl dhbvlqhbwevhb.',
      likedNumber: 96,
      responses: [
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },{
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        }
      ] 
    },
    {
      id: uuidv4(),
      createdAt: '2022/2/22 22:22',
      content: 'hdbvwhbrljbkhbvqkbrkhbqlrbfkbwegbwkbgw dhbvlqhbwefhbwjebfkjqw whdblqwhbefhbqwekj dhbflqhwbefl dhbvlqhbwevhb.',
      likedNumber: 96,
      responses: [
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },{
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        }
      ] 
    },
    {
      id: uuidv4(),
      createdAt: '2022/2/22 22:22',
      content: 'hdbvwhbrljbkhbvqkbrkhbqlrbfkbwegbwkbgw dhbvlqhbwefhbwjebfkjqw whdblqwhbefhbqwekj dhbflqhwbefl dhbvlqhbwevhb.',
      likedNumber: 96,
      responses: [
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        },{
          id: uuidv4(),
          userId: uuidv4(),
          content: 'dbvqlhegflqkwl hbfvqkwbe whqbrvqlbrgr vhdvlq.',
          createdAt: '2022/2/22 22:22',
        }
      ] 
    }
  ]
}

export default {
  name: 'SubProfile',
  data () {
    return {
      user: {
        id: -1,
        image: '',
        name: '',
        account: '',
        backgroundImage: '',
        description: '',
        followersNum: 0,
        followingsNum: 0,
        tweetsLength: 0,
        Tweets: []
      }
    }
  },
  components: {
    Navbar,
    SubProfileTop,
    NavTab,
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      const { id, image, name, account, backgroundImage, description, followersNum, followingsNum,Tweets } = dummyUser

      this.user = {
        id,
        image,
        name,
        account,
        backgroundImage,
        description,
        followersNum,
        followingsNum,
        Tweets,
        tweetsLength: Tweets.length,
      }
    }
  }
}
</script>
