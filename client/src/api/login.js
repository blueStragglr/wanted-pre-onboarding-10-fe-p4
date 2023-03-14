import { BASE_URL } from './const.js'

export const login = async (args) => {
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify(args)
  })

  return loginRes.ok ? 'success' : 'fail'
}

export const getCurrentUserInfo = async () => {
  const userInfoRes = await fetch(`${ BASE_URL }/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    }
  })

  return userInfoRes.ok ? userInfoRes.json() : null
}

// TODO 4-2: GET, '/items' 호출
export const getItems = async () => {
  return null
}

// TODO 4-2: GET, '/all-items' 호출
export const getAllItems = async () => {
  return null
}

// TODO 4-2: POST, '/logout' 호출
export const logout = async () => {
}
