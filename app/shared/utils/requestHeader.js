export const requestHeader = options => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    ...options,
  },
})
export const getToken = () => localStorage.getItem('token')
