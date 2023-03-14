type ROLE_USER = 'user'
type ROLE_ADMIN = 'admin'

export const UserRole: ROLE_USER = 'user'
export const AdminRole: ROLE_ADMIN = 'admin'

export type UserRole = ROLE_USER | ROLE_ADMIN

export interface UserInfo {
  name: string;
  roles: UserRole[]
}

export interface User {
  userId: number; // pk
  username: string;
  password: string;
  userInfo: UserInfo;
}

export interface Item {
  id: number // pk
  owner: {
    userId: number
  },
  content: {
    title: string
    body: string
  }
}
