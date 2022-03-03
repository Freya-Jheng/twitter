<template>
  <div class="user-followers">
    <div
      v-for="follower in followers"
      :key="follower.followerId"
      class="user-followers-card"
    >
      <router-link
        :to="{ name: 'sub-profile', params: { id: follower.id } }"
        class="user-followers-card__avatar"
      >
        <img
          :src="follower.avatar"
          alt=""
          class="user-followers-card__avatar--img"
        />
      </router-link>
      <div class="user-followers-card__container">
        <div class="user-followers-card__container__info">
          <div class="user-followers-card__container__info__user">
            <router-link
              :to="{ name: 'sub-profile', params: { id: follower.id } }"
              class="user-followers-card__container__info__user--name"
            >
              {{ follower.name }}
            </router-link>
            <router-link
              :to="{ name: 'sub-profile', params: { id: follower.id } }"
              class="user-followers-card__container__info__user--account"
            >
              {{ '@' + follower.account }}
            </router-link>
          </div>
          <button
            v-if="follower.isFollowing"
            class="user-followers-card__container__info__button button button-followed"
            @click.stop.prevent="deleteFollowing(follower.followerId)"
          >
            正在跟隨
          </button>
          <button
            v-if="!follower.isFollowing"
            class="user-followers-card__container__info__button button button-not-followed"
            @click.stop.prevent="addFollowing(follower.followerId)"
          >
            跟隨
          </button>
        </div>
        <div class="user-followers-card__container--text">
          {{ follower.introduction ? follower.introduction : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowers',
  data() {
    return {
      followers: [],
    }
  },
  methods: {
    async fetchFollowers(userId) {
      try {
        const response = await usersAPI.getFollowers({ userId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.followers = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得追蹤資料，請稍後再試',
        })
      }
    },
    async addFollowing(followerId) {
      try {
        const response = await usersAPI.addFollowing({ followerId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.followers = this.followers.map((follower) => {
          if (follower.followerId !== followerId) {
            return follower
          } else {
            return {
              ...follower,
              isFollowing: true,
            }
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者，請稍後再試',
        })
      }
    },

    async deleteFollowing(followerId) {
      try {
        const response = await usersAPI.deleteFollowing({
          followingId: followerId,
        })
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.followers = this.followers.map((follower) => {
          if (follower.followerId != followerId) {
            return follower
          } else {
            return {
              ...follower,
              isFollowing: false,
            }
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤使用者，請稍後再試',
        })
      }
    },
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchFollowers(userId)
  },
}
</script>

<style scoped lang="scss">
.user-followers-card {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border-and-divider);

  &__avatar {
    margin-top: 12px;
    margin-left: 15px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: var(--user-avatar);
  }

  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 15px 10px 10px;

    &__info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__user {
        display: flex;
        flex-direction: column;
        &--name {
          font-weight: 700;
          font-size: 15px;
          line-height: 15px;
          color: var(--main-font-color);
          &:hover {
            text-decoration: underline;
          }
        }

        &--account {
          margin-top: 5px;
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          color: var(--smaller-font-color);
        }
      }
    }

    &--text {
      margin-top: 5px;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      color: var(--main-font-color);
    }
  }
}

.button-followed {
  width: 90px;
  height: 25px;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
}

.button-not-followed {
  background: transparent;
  border: 1px solid var(--button-background);
  color: var(--button-background);
  width: 60px;
  height: 25px;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
}
</style>
