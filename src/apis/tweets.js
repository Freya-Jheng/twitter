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
}
