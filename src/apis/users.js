import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('/users/get_current_user')
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  addFollowing({ followerId }) {
    return apiHelper.post('/followships', { id: followerId })
  },
  deleteFollowing({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
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
    formData
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
      formData
    })
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserResponses({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLiked({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
}
