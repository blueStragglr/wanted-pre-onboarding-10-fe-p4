import React from 'react'
import { SidebarElement } from '../types/sidebar'
import { useRouter } from '../hooks/useRouter'
import { logout } from '../api/login'
import { AdminRole } from '../types/user'
import { useRecoilState } from 'recoil'
import { UserAtom } from '../atoms/user'

interface SidebarProps {
  sidebarContent: SidebarElement[]
  // TODO 4-2: Recoil atom `UserAtom`을 이용해 userProfile 값 대체 및 props type 삭제
  // userProfile: User | null
}

// TODO 4-2: Recoil atom `UserAtom`을 이용해 userProfile 값 대체 및 props 삭제
const Sidebar: React.FC<SidebarProps> = ({ sidebarContent }) => {
  // TODO 4-2: Recoil atom `UserAtom`을 이용해 userProfile 값 집어넣기
  // hint: useRecoilValue
  const [userProfile, setUserProfile] = useRecoilState(UserAtom)

  const { currentPath, routeTo } = useRouter()

  const sidebarMenuClickHandler = (path: string) => {
    routeTo(path)
  }

  // TODO 4-2: 로그아웃 호출
  const logoutHandler = async () => {
    await logout()
    setUserProfile(null)
    routeTo('/')
  }

  return (<div className="sidebar">
    <h3 className="sidebar-title">
      실습 3
    </h3>
    <ul>
      { sidebarContent
        .filter((element ) => {
          // TODO 4-1: element.isAdminOnly가 true일 때
          //  admin user(userProfile.userInfo.roles에 'admin'이 포함됨)에게만 메뉴 보여주기
          return element.isAdminOnly ? userProfile?.userInfo.roles.includes('admin') : !!userProfile
        })
        .map((element) => {
        return (<li
            key={ element.path }
            className={ currentPath === element.path ? 'sidebar-menu selected' : 'sidebar-menu'}
            onClick={() => sidebarMenuClickHandler(element.path)}>
          { element.label }
        </li>)
      })
      }
    </ul>
    <div>
      { userProfile
        ? <div className="sidebar-footer">
          {userProfile?.userInfo?.name}{userProfile?.userInfo?.roles.includes(AdminRole) ? '(admin)' : ''}님 환영합니다.
          <button className={'small'} onClick={logoutHandler}>
            로그아웃
          </button>
      </div>
        : <div>로그인이 필요합니다.</div>
      }

    </div>
  </div>)
}

export default Sidebar
