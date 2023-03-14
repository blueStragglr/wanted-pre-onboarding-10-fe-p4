import { Item, User } from '../types/user'
import { BASE_URL } from './const'

type LoginResult = 'success' | 'fail'

export interface LoginRequest {
  username: string
  password: string
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  // TODO: POST, '/auth/login' 호출
  // body에는 { username, password }가 들어가야 함
  // 사용하는 기술에 맞추어 적절히 withCredential 설정하기
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

export const getCurrentUserInfo = async (): Promise<User | null> => {
  // TODO: GET, '/profile' 호출
  // 호출 성공시 유저 정보 반환
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
export const getItems = async (): Promise<Item[] | null> => {
  const itemRes = await fetch(`${ BASE_URL }/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    }
  })

  return itemRes.ok ? itemRes.json() : null
}

// TODO 4-2: GET, '/all-items' 호출
export const getAllItems = async (): Promise<Item[] | null> => {
  const itemRes = await fetch(`${ BASE_URL }/all-items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    }
  })

  return itemRes.ok ? itemRes.json() : null
}


// TODO 4-2: POST, '/logout' 호출
export const logout = async (): Promise<void> => {
  await fetch(`${ BASE_URL }/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    }
  })
}
