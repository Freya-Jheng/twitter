<template>
  <div class="admin__users">
    <div class="admin__users__title">使用者列表</div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="admin__users__cards">
        <div
          class="admin__users__cards__card"
          v-for="user in users"
          :key="user.id"
        >
          <div class="admin__users__cards__card__top">
            <img
              v-if="user.cover"
              :src="user.cover"
              alt=""
              class="admin__users__cards__card__top--bg-image"
            />
            <img
              :src="user.avatar"
              alt=""
              class="admin__users__cards__card__top--avatar"
            />
          </div>
          <div class="admin__users__cards__card__bottom">
            <div class="admin__users__cards__card__bottom__names">
              <span class="admin__users__cards__card__bottom__names--name">{{
                user.name
              }}</span>
              <span class="admin__users__cards__card__bottom__names--account">{{
                '@' + user.account
              }}</span>
            </div>
            <div class="admin__users__cards__card__bottom__icons">
              <div class="admin__users__cards__card__bottom__icons__response">
                <img
                  src="../assets/icon_reply@2x.png"
                  alt="response"
                  class="admin__users__cards__card__bottom__icons__response--icon"
                />
                <span
                  class="admin__users__cards__card__bottom__icons__response--number"
                  >{{ user.TweetsCount | transNumber }}</span
                >
              </div>
              <div class="admin__users__cards__card__bottom__icons__like">
                <img
                  src="../assets/icon_like@2x.png"
                  alt=""
                  class="admin__users__cards__card__bottom__icons__like--icon"
                />
                <img
                  src="../assets/icon_like_fill@2x.png"
                  alt=""
                  class="admin__users__cards__card__bottom__icons__like--icon d-none"
                />
                <span
                  class="admin__users__cards__card__bottom__icons__like--number"
                  >{{ user.likedCount | transNumber }}</span
                >
              </div>
            </div>
            <div class="admin__users__cards__card__bottom__follows">
              <span
                class="admin__users__cards__card__bottom__follows--followings"
                >{{ user.followingCount + ' 個' }}<span>跟隨中</span></span
              >
              <span
                to="/user/followers/:id"
                class="admin__users__cards__card__bottom__follows--followers"
                >{{ user.followedCount + ' 個' }}<span>跟隨者</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import adminAPI from '../apis/admin'
import Spinner from './../components/Spinner'

export default {
  name: 'AdminUsers',
  components: {
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    }
  },
  filters: {
    transNumber: function (value) {
      if (value >= 1000000000) {
        return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
      }

      if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      }

      if (value >= 1000) {
        return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      }

      return value
    },
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await adminAPI.getUsers()

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.users = response.data
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法成功載入使用者清單！',
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.admin__users {
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-and-divider);
  font-size: 15px;
  font-weight: 500;
  &__title {
    width: 100%;
    padding: 15px 0 14px 26.5px;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid var(--border-and-divider);
  }
  &__cards {
    width: 95%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
    &__card {
      width: 245px;
      height: 314px;
      position: relative;
      border: 1px solid var(--border-and-divider);
      border-radius: 10px;
      margin: 15px;
      &__top {
        height: 140px;
        background-color: var(--user-avatar);
        overflow: hidden;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        &--bg-image {
          position: absolute;
          top: 0;
          width: 100%;
          height: 140px;
          overflow: hidden;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        &--avatar {
          position: absolute;
          top: 65px;
          right: 72.5px;
          width: 100px;
          height: 100px;
          border: 5px solid var(--background);
          border-radius: 50%;
          background-color: var(--user-avatar);
        }
      }
      &__bottom {
        width: 100%;
        height: calc(314px - 140px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        background: var(--admin-user-background);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        &__names {
          display: flex;
          flex-direction: column;
          align-items: center;
          &--name {
            font-weight: 900;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--main-font-color);
          }
          &--account {
            font-weight: 500;
            font-size: 15px;
            line-height: 21.72px;
            color: var(--smaller-font-color);
          }
        }
        &__icons {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 17px;
          &__response {
            display: flex;
            flex-direction: row;
            gap: 7.15px;

            &--icon {
              height: 19.7px;
              width: 19.7px;
            }

            &--number {
              font-weight: 500;
              font-size: 15px;
              line-height: 15px;
              color: var(--main-font-color);
            }
          }
          &__like {
            display: flex;
            flex-direction: row;
            gap: 7.15px;
            &--icon {
              height: 18.91px;
              width: 20.09px;
            }
            &--number {
              font-weight: 500;
              font-size: 15px;
              line-height: 15px;
              color: var(--main-font-color);
            }
          }
        }
        &__follows {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
          font-size: 14px;

          &--followings,
          &--followers {
            span {
              color: var(--smaller-font-color);
            }
          }
        }
      }
    }
  }
}
</style>
