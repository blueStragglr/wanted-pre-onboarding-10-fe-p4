import { atom } from 'recoil'
import { User } from '../types/user'


export const UserAtom = atom<User | null>({
  key: 'user-atom',
  default: null
})
