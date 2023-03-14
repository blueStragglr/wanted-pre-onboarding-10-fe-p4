# Wanted Pre-onboarding 10월 FE 코스 4일차 실습

> 4일차 실습을 위한 스켈레톤 코드 및 샘플 서버입니다. 강의를 듣고 설명에 따라 실습을 진행해보세요!

## CORS
로컬에서 CORS 요청을 허용할 수 있는 브라우저 페이지를 연 뒤, 해당 페이지에서 클라이언트를 실행하여 실습을 진행해 주세요.

## 의존성 설치
실습 4도 실습 3과 같이 서버 실행이 필요합니다.
다음 명령어를 이용해 필요한 의존성들을 설치합니다.

```shell
  $ yarn initialize
```

의존성 설치가 완료되었다면 서버와 클라이언트를 **모두** 실행하고 실습을 진행합니다.

## 서버 실행 방법
예제 서버에는 세션 로그인 기능이 구현되어 있습니다.
서버를 직접 수정하거나 할 필요는 없지만, 실습 진행을 위해 각자 로컬 환경에 서버를 실행하여야 합니다.
```shell
  # 서버 실행
  $ yarn server
  
  # 혹은 디렉토리 이동 후 직접 실행도 가능합니다. 위 명령어와 같은 내용입니다.
  $ cd server && yarn start
```

서버는 4000번 포트를 사용합니다. 서버가 정상적으로 실행되었다면 브라우저를 통해 `localhost:4000`에 접근하였을 때 'Hello World!'가 출력됩니다.

## 클라이언트 실행 방법
실습용 클라이언트는 (항상 그렇듯) Vite를 이용한 SPA 앱으로 구성되어 있습니다.

실행을 위해서는 프로젝트 루트에서 아래 명령어를 실행합니다. 

```shell
  # 클라이언트 실행
  $ yarn client

  # 혹은 디렉토리 이동 후 직접 실행도 가능합니다. 위 명령어와 같은 내용입니다.
  $ cd client && yarn dev
```

## API 스펙

서버에서는 다음과 같은 API를 제공합니다.

1. 로그인 (POST /auth/login)
    - body에 username과 password를 담아 전송합니다. 즉, 다음과 같이 호출합니다.
      ```tsx
        const args = {
          username: 'blue',
          password: '1234!@#$' 
        }
       
        const loginRes = await fetch(`${ BASE_URL }/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            credentials: 'include' // <- 중요! 세션 방식 로그인을 위해 꼭 설정해 주세요. 
          },
            body: JSON.stringify(args)
          })
      ```
    - 로그인 성공시 세션에 유저 정보를 저장합니다.
    - 성공 시 세션이 생성되며, 이후 별도 인증 없이 접근 가능한 `/profile`을 통해 유저 정보를 가져올 수 있습니다.
    - 계정 정보는 다음과 같습니다.
      - username: blue, password: 1234!@#$
      - username: white, password: 1234!@#$
      - username: red, password: 1234!@#$ 

2. 유저 정보 가져오기 (GET `/profile`)
    - 세션에 저장된 유저 정보를 반환합니다.
    - 유저 
    - credentials: 'include' 옵션을 활성화 하는 경우 별도 개발 없이도 자동으로 로그인 여부를 검증하므로, 유저 정보 수신 성공여부만 확인하면 됩니다.
    - 반환되는 데이터 타입은 다음과 같습니다.
      ```tsx
        interface User {
          userId: number
          username: string
          userInfo: {
            name: blueStragglr
            roles: ['user', 'admin'] // 새로 추가된 부분!
          }
        }
      ```

3. 유저의 item 가져오기 (GET `/items`)
   - 세션에 저장된 유저 정보를 확인하여 해당 유저 소유로 저장된 모든 item을 가져옵니다.
   - 반환되는 데이터 타입은 다음과 같습니다.
     ```tsx
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
     
     const response: Items[] = [...]
     ```

4. 모든 유저의 item 가져오기 (GET `/all-items`, admin 전용)
   - 세션에 저장된 유저가 admin일 때만 호출할 수 있습니다.
   - 서버에서 validation 하므로, 클라이언트에서는 별도로 필터링하지 않아도 됩니다.
   - 반환되는 데이터 타입은 다음과 같습니다.
    ```tsx
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
    
    const response: Items[] = [...]
    ```

5. 로그아웃 (POST, `/logout`)
   - 현재 유저가 로그인되어 있는 세션을 destroy합니다.
   - 응답으로 메시지가 오긴 하지만, 사용하지 않아도 됩니다.

