import {decodeToken} from '../decode-header'
export const getSiteIdentifier = () => {
    let token =  localStorage.getItem('token')
    return parseInt(decodeToken()[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ])
}