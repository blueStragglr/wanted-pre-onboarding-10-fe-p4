import React from 'react';
import { Item } from '../types/user'

interface ItemListProps {
  items: Item[] |  null
}

const ItemList: React.FC<ItemListProps> = ({items}) => {
  return (<p>
      {items?.map((item) => {
        return <div key={item.id}>
          <h3>
            {item.content.title}
          </h3>
          <a target="_blank" href={item.content.body}>{item.content.body}</a>
        </div>
      })}
    </p>)
}

export default ItemList
