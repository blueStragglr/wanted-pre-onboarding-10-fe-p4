import React from 'react';
import { getCurrentUserInfo, login } from '../api/login'
import { useRouter } from '../hooks/useRouter'

const Login = () => {
  const { routeTo } = useRouter()

  const isLoggedIn = async (): Promise<boolean> => {
    const userProfileResponse = await getCurrentUserInfo()
    return userProfileResponse !== null
  }

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // FormData를 이용해서 로그인 시도
    const formData = new FormData(event.currentTarget)

    const isUserLoggedIn: boolean = await isLoggedIn()
    if (isUserLoggedIn) {
      routeTo('/page-a')
      return
    }

    const loginResult = await login({
      username: formData.get('username') as string,
      password: formData.get('password') as string
    })

    if (loginResult === 'fail') {
      alert('로그인 실패')
      return
    }
    routeTo('/page-a')
  }

  return (<div className="non-logged-in-body">
    <h1>
      로그인 페이지
    </h1>
    <p>
      로그인 성공시 Page A로 이동합니다.<br/>
      실패시 alert를 띄웁니다.
    </p>
    <form onSubmit={loginSubmitHandler}>
      <label>
        Username:
        <input type="text" name="username"/>
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit" value="Submit">submit</button>
    </form>
  </div>)
}

export default Login
