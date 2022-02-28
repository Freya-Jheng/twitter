import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('/user/get_current_user')
  },
  get(userId) {
    return apiHelper.get(`/user/${userId}`)
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  addFollowing({ userId }) {
    return apiHelper.post('/followships', { id: userId })
  },
  deleteFollowing({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  update({
    userId,
    account,
    name,
    email,
    introduction,
    cover,
    avatar,
    password,
    checkPassword,
  }) {
    return apiHelper.put(`/users/${userId}`, {
      account,
      name,
      email,
      introduction,
      cover,
      avatar,
      password,
      checkPassword,
    })
  },
}
