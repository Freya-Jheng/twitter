import { apiHelper } from '../utils/helpers'

export default {
  get(userId) {
    return apiHelper.get(`/user/${userId}`)
  },
  getFollowers(userId) {
    return apiHelper.get(`/user/${userId}/followers`)
  },

  getFollowings(userId) {
    return apiHelper.get(`/user/${userId}/followings`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  // update({
  //   userId,
  //   name,
  //   email,
  //   introduction,
  //   cover,
  //   avatar,
  //   password,
  //   checkPassword,
  // }) {
  //   return apiHelper.put(`/users/${userId}`, {
  //     account,
  //     name,
  //     email,
  //     introduction,
  //     cover,
  //     avatar,
  //     password,
  //     checkPassword,
  //   })
  // },
}
