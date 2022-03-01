<template>
  <div class="popular-users">
    <div class="popular-users__title">Popular</div>
    <div class="popular-users__list">
      <div
        v-for="user in popularUsers"
        :key="user.id"
        class="popular-users__list__user-card"
      >
        <router-link
          :to="{ name: 'sub-profile', params: { id: user.id } }"
          class="popular-users__list__user-card__avatar"
        >
          <img
            :src="user.avatar"
            alt=""
            class="popular-users__list__user-card__avatar-img"
          />
        </router-link>
        <div class="popular-users__list__user-card__wrapper">
          <div class="popular-users__list__user-card__wrapper__info">
            <router-link
              :to="{ name: 'sub-profile', params: { id: user.id } }"
              class="popular-users__list__user-card__wrapper__info--name"
              >{{ user.name }}</router-link
            >
            <router-link
              :to="{ name: 'sub-profile', params: { id: user.id } }"
              class="popular-users__list__user-card__wrapper__info--account"
              >{{ '@' + user.account }}</router-link
            >
          </div>
          <button
            v-if="user.isFollowing"
            class="popular-users__list__user-card__wrapper__button button following button"
            @click.stop.prevent="deleteFollowing(user.id)"
          >
            正在跟隨
          </button>
          <button
            v-if="!user.isFollowing"
            class="popular-users__list__user-card__wrapper__button button follow button-not-followed"
            @click.stop.prevent="addFollowing(user.id)"
          >
            跟隨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: 'TopUsers',
  data() {
    return {
      popularUsers: [],
    }
  },
  created() {
    this.getPopularUsers()
  },
  methods: {
    async getPopularUsers() {
      try {
        const response = await usersAPI.getTopUsers()

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.popularUsers = response.data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得 Popular 資料，請稍後再試',
        })
      }
    },
    async addFollowing(userId) {
      try {
        const response = await usersAPI.addFollowing({ userId })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.popularUsers = this.popularUsers.map((user) => {
          if (user.id != userId) {
            return user
          } else {
            return {
              ...user,
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

    async deleteFollowing(userId) {
      try {
        const response = await usersAPI.deleteFollowing({ userId })

        console.log(response)
        console.log(userId)
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.popularUsers = this.popularUsers.map((user) => {
          if (user.userId != userId) {
            return user
          } else {
            return {
              ...user,
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
}
</script>

<style lang="scss" scoped>
.popular-users {
  margin-top: 15px;
  margin-left: 30px;
  width: 350px;
  height: 760px;
  border-radius: 14px;
  background: var(--popular-users-background);
  &__title {
    height: 45px;
    padding: 10px 0 9px 15px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26.06px;
    color: var(--main-font-color);
  }

  &__list {
    &__user-card {
      display: flex;
      flex-direction: row;
      height: 70px;
      width: 100%;
      border-top: 1px solid var(--border-and-divider);
      &__avatar {
        margin: 10px 10px 10px 15px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--user-avatar);
      }

      &__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        margin-right: 15px;
        &__info {
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
            margin-top: 3px;
            font-weight: 700;
            font-size: 15px;
            line-height: 15px;
            color: var(--smaller-font-color);
          }
        }

        &__button {
          height: 35px;
          font-weight: 700;
          font-size: 15px;
          line-height: 15px;
        }
      }
    }
  }
}

.follow {
  background: transparent;
  border: 1px solid var(--button-background);
  color: var(--button-background);
  width: 60px;
}

.following {
  width: 90px;
}
</style>
