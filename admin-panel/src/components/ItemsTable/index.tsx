import { Item as Model } from "../../models"

interface Props {
  items: Model[]
}

export default function ItemsTable({ items }: Props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Img</th>
          <th scope="col">Meta</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <th>{item.name}</th>
            <th>{item.description}</th>
            <th><img src={item.imgUrl} alt="img" /></th>
            <th>{item.meta}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
