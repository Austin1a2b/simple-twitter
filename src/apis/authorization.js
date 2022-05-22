import { apiHelper } from './../utils/helpers'


export default {
  signIn({ account, password }) {
    return apiHelper.post('/users/login', {
      account,
      password
    })
  },
  regist(data) {
    return apiHelper.post('/users', {
      ...data
    })
  },
  adminSignIn(data) {
    return apiHelper.post('/admin/login', {
      ...data
    })
  }
}