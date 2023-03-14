import React, { useCallback, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import { SidebarContent } from '../router'
import { getCurrentUserInfo } from '../api/login'
import { AdminRole } from '../types/user'
import { useRouter } from '../hooks/useRouter'
import { useRecoilState } from 'recoil'
import { UserAtom } from '../atoms/user'

interface GeneralLayoutProps {
  children: React.ReactNode
  isAdminPage?: boolean
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({children, isAdminPage}) => {
  {/* TODO 4-2: Recoil atom `UserAtom`을 이용해 userProfile props 대체 및 삭제 */}
  const [userProfile, setUserProfile] = useRecoilState(UserAtom)
  const {routeTo} = useRouter()

  const fetchUserProfile = useCallback(async () => {
    const userProfileResponse = await getCurrentUserInfo()

    if (userProfileResponse === null) {
      routeTo('/login')
      return
    }

    {/* TODO 4-2: Recoil atom `UserAtom`을 이용해 setUserProfile props 대체 및 삭제 */}
    setUserProfile(userProfileResponse)
  }, [])

  useEffect(() => {
    fetchUserProfile()
  }, [children])

  // TODO 4-1: 응답으로 받은 user의 userInfo.roles가 비어있다면 아무 권한이 없는 user이므로 로그인 페이지로 이동
  if (userProfile?.userInfo.roles.length === 0) {
    routeTo('/login')
    return <></>
  }


  // TODO 4-1: Admin 전용 페이지 접근 시도시 userProfile.userInfo.roles에 admin이 없는 경우에는 page-a로 이동
  if (isAdminPage && !userProfile?.userInfo.roles.includes(AdminRole)) {
    routeTo('/page-a')
    return <></>
  }


  if (userProfile === null) return (<div>loading...</div>)

  return (<div className="general-layout">
    {/* TODO 4-2: Recoil atom `UserAtom`을 이용해 userProfile props 대체 및 삭제 */}
    <Sidebar sidebarContent={SidebarContent} />
    <div className="general-layout__body">
      { children }
    </div>
  </div>)
}

export default GeneralLayout
