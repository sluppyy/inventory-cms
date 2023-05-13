import { useNavigate } from "react-router-dom"
import { Item } from "../../models"
import { useItems, useUserItems } from "../../store"

export default function UserItems() {
  const { items: itemsMap, current } = useUserItems()
  const userItems = itemsMap[current ?? '']
  const { items } = useItems()
  const nav = useNavigate()

  const map = new Map<string, Item>()
  items?.forEach(item => map.set(item.id, item))
  
  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th scope="col">User id</th>
          <th scope="col">Item id</th>
          <th scope="col">Item name</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody style={{ cursor: 'pointer' }}>
        {userItems && userItems.map(item => (
          <tr
            key={item.userId + item.itemId}>
            <th scope="row">{item.userId}</th>
            <th>{item.itemId}</th>
            <th>{map.get(item.itemId)?.name}</th>
            <th>{item.count}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
