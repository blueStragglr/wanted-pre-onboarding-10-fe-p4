import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Item } from '../types/user'
import { getAllItems } from '../api/login'
import ItemList from '../components/ItemList'

const AdminPage = () => {
  const [ items, setItems ] = useState<Item[] | null>(null)
  const isUserItemsFetched = useRef(false)

  // TODO 4-2: getItems를 호출하여 userItem을 가져온 경우 상태 업데이트
  const fetchUserItems = useCallback(async () => {

    isUserItemsFetched.current = true
  }, [])

  useEffect(() => {
    if (!isUserItemsFetched.current) fetchUserItems()
  }, [])

  return (<div>
      <h1>
        AdminPage
      </h1>
      <p>
        roles 배열 안에 'admin'을 가진 유저에게만 접근을 허용합니다. 또한, 모든 아이템 목록을 가져옵니다. (어드민 전용 API)
      </p>
      <ItemList items={items}/>
    </div>)
}

export default AdminPage
