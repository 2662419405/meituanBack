import Axios from 'axios'

export const getOrder = payload => {
  return Axios({
    method: 'post',
    data: payload,
    url: '/api/users/server/order'
  })
}
