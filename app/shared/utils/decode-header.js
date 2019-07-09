// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const decodeToken = () => {
  const token = localStorage.getItem('token')
  return jwt_decode(token)
}
