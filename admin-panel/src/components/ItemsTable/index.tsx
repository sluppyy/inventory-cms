import { useNavigate } from "react-router-dom"
import { Item as Model } from "../../models"

interface Props {
  items: Model[]
}

export default function ItemsTable({ items }: Props) {
  const nav = useNavigate()  

  return (
    <table className="table table-striped align-middle table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Img</th>
          <th scope="col">Meta</th>
        </tr>
      </thead>
      <tbody style={{ cursor: 'pointer' }}>
        {items.map(item => (
          <tr
            key={item.id}
            id={`item${item.id}`}
            onClick={(e) => nav(`/edit-item/${item.id}`)}>
            <th scope="row">{item.id}</th>
            <th>{item.name}</th>
            <th>{item.description}</th>
            <th>{item.imgUrl && <img width={50} height={50} src={item.imgUrl} alt="img" />}</th>
            <th>{item.meta}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
