<template>
  <div class="user-following">
    <template v-if="followings.length > 0">
      <div
        v-for="following in followings"
        :key="following.followingId"
        class="user-following-card"
      >
        <router-link
          :to="{ name: 'sub-profile', params: { id: following.id } }"
          class="user-following-card__avatar"
        >
          <img
            v-if="following.avatar"
            :src="following.avatar"
            alt=""
            class="user-following-card__avatar--img"
          />
        </router-link>
        <div class="user-following-card__container">
          <div class="user-following-card__container__info">
            <div class="user-following-card__container__info__user">
              <router-link
                :to="{ name: 'sub-profile', params: { id: following.id } }"
                class="user-following-card__container__info__user--name"
              >
                {{ following.name }}
              </router-link>
              <router-link
                :to="{ name: 'sub-profile', params: { id: following.id } }"
                class="user-following-card__container__info__user--account"
              >
                {{ '@' + following.account }}
              </router-link>
            </div>
            <button
              v-if="following.isFollowing"
              class="user-following-card__container__info__button button button-followed"
              @click.stop.prevent="deleteFollowing(following.id)"
            >
              正在跟隨
            </button>
            <button
              v-if="!following.isFollowing"
              class="user-following-card__container__info__button button button-not-followed"
              @click.stop.prevent="addFollowing(following.followingId)"
            >
              跟隨
            </button>
          </div>
          <div class="user-following-card__container--text">
            {{ following.introduction ? following.introduction : '' }}
          </div>
        </div>
      </div>
    </template>
    <div v-else>
      <h5 class="mt-6 text-center">目前沒有追隨中的帳號</h5>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: 'UserFollowings',
  data() {
    return {
      followings: [],
    }
  },
  methods: {
    async fetchFollowings(userId) {
      try {
        const response = await usersAPI.getFollowings({ userId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.followings = response.data

        // 將 followings 進行排序
        this.followings = this.followings.sort((a, b) => {
          return a.createdAt > b.createdAt
            ? -1
            : a.createdAt < b.createdAt
            ? 1
            : 0
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得追蹤資料，請稍後再試',
        })
      }
    },
    async addFollowing(followingId) {
      try {
        const response = await usersAPI.addFollowing({
          followerId: followingId,
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.followings = this.followings.map((following) => {
          if (following.followingId != followingId) {
            return following
          } else {
            return {
              ...following,
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

    async deleteFollowing(followingId) {
      try {
        const response = await usersAPI.deleteFollowing({ followingId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.followings = this.followings.filter(
          (following) => following.followingId !== followingId
        )
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
    this.fetchFollowings(userId)
  },
}
</script>

<style scoped lang="scss">
.user-following-card {
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
    border: none;
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
