import { apiHelper } from './../utils/helpers'

export default {
  get() {
    return apiHelper.get('/tweets')
  },
  create({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  getIndividualTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  deleteLike({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}/like`)
  },
}
