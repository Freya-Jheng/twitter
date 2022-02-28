import { apiHelper } from '../utils/helpers'

export default {
  get({userId}) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({userId}) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserResponses({userId}) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLiked ({userId}) {
    return apiHelper.get(`/users/${userId}/likes`)
  }
}
