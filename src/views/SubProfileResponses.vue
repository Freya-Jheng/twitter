<template>
  <div class="profile__tweets">
    <div class="profile__tweets__tweet">
      <router-link to="" class="profile__tweets__tweet__avatar">
        <img src="" alt="" class="user-avatar" />
      </router-link>
      <div class="profile__tweets__tweet__wrapper">
        <div class="profile__tweets__tweet__wrapper__info">
          <router-link to="" class="profile__tweets__tweet__wrapper__info--name"
            >tweetName</router-link
          >
          <div class="profile__tweets__tweet__wrapper__info--account">
            <router-link to="" class="router-link">
              "@" + account
            </router-link>
            " ・ " + createdAt 
          </div>
        </div>
        <div class="profile__tweets__tweet__wrapper__response">
          <span class="response-to"
            >回覆
            <router-link to="" class="router-link">
              "@" + account
            </router-link>
          </span>
        </div>
        <router-link
          :to="{ name: 'individual-tweet' }"
          class="profile__tweets__tweet__wrapper__tweet"
        >
          hdbvkahsbdkahbdhvb,hsbdvhs,hdv,hVhdhdbv,</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from '../utils/helpers'
import userAPI from '../apis/users'

export default {
  name: 'SubProfileResponse',
  data () {
    return {

    }
  },
  created () {
    const {id} = this.$route.params
    this.fetchResponses(id)
  },
  methods: {
    async fetchResponses(userId) {
      try {
        const {data} = await userAPI.getUserResponses({userId})
        console.log('re',data)
         
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法成功取得回覆資料！'
        })
      }
    }
  }
}
</script>


<style scoped lang="scss">
.profile__tweets {
  position: absolute;
  top: 511px;
  width: 100%;
  border-top: 1px solid var(--border-and-divider);
  &__tweet {
    width: 100%;
    height: 145px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 13px 15px;
    gap: 10px;
    border-bottom: 1px solid var(--border-and-divider);
    &__avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: grey;
      }
    }
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font-size: 15px;
      &__info {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 5px;
        &--name {
          font-weight: 700;
          color: var(--main-font-color);
        }
        &--account {
          font-weight: 500;
          color: var(--smaller-font-color);
          .router-link {
            color: var(--smaller-font-color);
          }
        }
      }
      &__response {
        .response-to {
          color: var(--smaller-font-color);
        }
        .router-link {
          color: var(--active-color);
        }
      }
      &__tweet {
        width: 100%;
        color: var(--main-font-color);
      }
    }
  }
}
</style>