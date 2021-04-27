import { globalSaga } from './global'
import { authSaga } from './auth'
import { userSaga } from './user'

export default [
  authSaga,
  userSaga,
  globalSaga,
]
