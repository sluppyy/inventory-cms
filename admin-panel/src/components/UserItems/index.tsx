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
        <th scope="col">Count</th>
          <th scope="col">Item id</th>
          <th scope="col">Item name</th>
          <th scope="col">Item img</th>
        </tr>
      </thead>
      <tbody>
        {userItems && userItems.map(item => (
          <tr
            key={item.item.id}>
            <th scope="row">{item.count}</th>
            <th>{item.item.id}</th>
            <th>{item.item.name}</th>
            <th><img src={item.item.imgUrl} width={50} height={50} /></th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
