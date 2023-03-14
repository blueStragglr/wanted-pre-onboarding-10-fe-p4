import React from 'react'
import { useRouter } from '../hooks/useRouter'

const Home = () => {
  const { routeTo } = useRouter()

  return (<div className="non-logged-in-body">
    <h1>
      Home!
    </h1>
    <p>
      로그인을 필요로 하지 않는 메인 페이지입니다. <br/>
      만약 로그인이 된 상태에서 접근했다면 Page A로 자동으로 이동시킵니다. <br/>
      로그인 하러 가기 버튼을 아래에 구현합니다.
    </p>
    <div className="center">
      <button onClick={() => {routeTo('login')}}>
        로그인 하러 가기
      </button>
    </div>
  </div>)
}

export default Home
