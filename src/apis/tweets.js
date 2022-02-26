import { apiHelper } from './../utils/helpers'

export default {
  get() {
    return apiHelper.get('/tweets')
  },
  getIndividualTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
}
