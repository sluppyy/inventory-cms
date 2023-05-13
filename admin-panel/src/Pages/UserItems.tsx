import { useState } from "react"
import { useAppDispatch } from "../store";
import { CURRENT, findUserItems } from "../store/userItems";
import UserItemsTable from '../components/UserItems'

export default function UserItems() {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')

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

      <UserItemsTable />

      <div>
        
      </div>
    </div>
  )
}
