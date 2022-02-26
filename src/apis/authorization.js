import { apiHelper } from './../utils/helpers'

export default {
  signIn({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password,
    })
  },
  // signUp({ name, email, password, passwordCheck }) {
  //   return apiHelper.post('/signup', { name, email, password, passwordCheck })
  // },
}
