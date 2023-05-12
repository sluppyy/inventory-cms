import { useEffect } from "react";
import { useAppDispatch, useItems } from "../store";
import { findAllItems } from "../store/items";
import ItemsTable from "../components/ItemsTable";

export default function Items() {
  const dispatch = useAppDispatch()
  const { items, status } = useItems()

  useEffect(() => {
    dispatch(findAllItems())
  }, [])

  if (status == 'process')
    return (
    <div>
      <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>
    </div>)
  
  if (status == 'error')
    return (
    <div>
      <div className="alert alert-danger" role="alert">
        Can't load items :{'('}
      </div>
    </div>) 

  return (
    <div>
      <ItemsTable items={items ?? []}/>
    </div>
  )
}
