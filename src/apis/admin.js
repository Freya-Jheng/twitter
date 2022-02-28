import { apiHelper } from './../utils/helpers'

export default {
  signIn({ account, password }) {
    return apiHelper.post('/admin/signin', {
      account,
      password,
    })
  },
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
  getUsers() {
    return apiHelper.get('/admin/users')
  },
}
