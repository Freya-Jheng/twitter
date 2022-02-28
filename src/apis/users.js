import { apiHelper } from '../utils/helpers'

export default {
  get(userId) {
    return apiHelper.get(`/user/${userId}`)
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
