import { useState } from "react"
import { useAppDispatch, useUserItems } from "../store";
import { CURRENT, deleteItems, findUserItems, giveItems } from "../store/userItems";
import UserItemsTable from '../components/UserItems'

export default function UserItems() {
  const dispatch = useAppDispatch()
  const { current } = useUserItems()
  const [text, setText] = useState(current ?? '')
  const [form, setForm] = useState({ itemId: '', count: 1 })

  function onSearch() {
    dispatch(CURRENT(text))
    dispatch(findUserItems(text))
  }

  return (
    <div>
      <form className="input-group m-4" style={{ width: 'fit-content' }}>
        <input
          value={text}
          onChange={_ => setText(_.target.value)}
          type="search"
          className="form-control"
          aria-label="Search"
          aria-describedby="search-addon" />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={_ => {_.preventDefault();onSearch()}}>
          Search
        </button>
      </form>

      { current && <UserItemsTable /> }

      {current && <div className="m-3">
        <label>
          Item id
          <input
            value={form.itemId}
            onChange={e => setForm({ ...form, itemId: e.target.value })}
            className="form-control"
            placeholder="Item id"/>
        </label>

        <label className="ms-4">
          Count
          <input
            value={form.count}
            onChange={e => setForm({ 
              ...form, 
              count: Number.parseInt(e.target.value) || 0
            })}
            type="number"
            className="form-control"
            placeholder="Count"/>
        </label>

        <br />

        <button
          className="btn btn-primary mt-4"
          onClick={() => {
            if (!form.itemId) return
            if (form.count <= 0) return
            
            dispatch(giveItems({...form, userId: current}))
          }}>
            Add
        </button>
        <button
          className="btn btn-danger mt-4 ms-4"
          onClick={() => {
            if (!form.itemId) return
            if (form.count <= 0) return
            
            dispatch(deleteItems({...form, userId: current}))
          }}>
            Delete
        </button>
        </div>}
    </div>
  )
}
