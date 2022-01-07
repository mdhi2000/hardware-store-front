import jwtDecode from "jwt-decode"

let accessToken = ""

export const setAccessToken = token => {
  accessToken = token
}

export const getAccessToken = () => {
  return accessToken
}

export const isAccessTokenValid = () => {
  try {
    const { exp } = jwtDecode(getAccessToken())
    return Date.now() < exp * 1000
  } catch {
    return false
  }
}
