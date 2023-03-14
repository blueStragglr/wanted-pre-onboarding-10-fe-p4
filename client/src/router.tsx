import { SidebarElement } from './types/sidebar'
import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import Home from './pages/Home'
import GeneralLayout from './layout/GeneralLayout'
import Login from './pages/Login'
import PageA from './pages/PageA'
import PageB from './pages/PageB'
import PageC from './pages/PageC'
import AdminPage from './pages/AdminPage'

interface RouterBase {
  id: number // 페이지 아이디 (반복문용 고유값)
  path: string // 페이지 경로
  label: string // 사이드바에 표시할 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
}

interface UserAccessibleRouterElement extends RouterBase {
  withAuth?: boolean // 인증이 필요한 페이지 여부
}

interface AdminAccessibleRouterElement extends RouterBase {
  withAuth: true // 인증이 필요한 페이지 여부
  isAdminPage?: boolean // 어드민 페이지 여부
}

type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home/>,
    withAuth: false
  },
  {
    id: 1,
    path: '/login',
    label: '로그인',
    element: <Login/>,
    withAuth: false
  },
  {
    id: 2,
    path: '/page-a',
    label: '페이지 A',
    element: <PageA/>,
    withAuth: true
  },
  {
    id: 3,
    path: '/page-b',
    label: '페이지 B',
    element: <PageB/>,
    withAuth: true
  },
  {
    id: 4,
    path: '/page-c',
    label: '페이지 C',
    element: <PageC/>,
    withAuth: true
  },
  // TODO 4-1: Admin페이지를 router에 추가
  {
    id: 5,
    path: '/admin',
    label: '어드민 페이지',
    element: <AdminPage/>,
    withAuth: true,
    isAdminPage: true
  }
]

export const routers: RemixRouter = createBrowserRouter(
  // TODO 4-1: 어드민 전용 페이지이거나 auth가 필요한 페이지는 GeneralLayout으로 감싸기
  // 어드민 전용 페이지는 isAdminPage = true를 전달
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <GeneralLayout
          isAdminPage={ 'isAdminPage' in router && router.isAdminPage }>
          { router.element }
        </GeneralLayout>
      }
    } else {
      return {
        path: router.path,
        element: router.element
      }
    }
  })
)

export const SidebarContent: SidebarElement[] = routerData.reduce((prev, router) => {
  // TODO 4-1. isAdminOnly 프로퍼티를 추가하여 admin 페이지로 가는 사이드바 요소를 선택적으로 렌더링 (어드민에게만 보이도록 하기)
  if (!router.withAuth) return prev

  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      isAdminOnly: 'isAdminPage' in router && router.isAdminPage
    }
  ]
}, [] as SidebarElement[])
