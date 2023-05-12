import { SET, useAppDispatch, useAuth } from "../store"

export default function Auth() {
  const dispatch = useAppDispatch()
  const { token } = useAuth()

  return (<div className="d-flex align-items-center justify-content-center">
    <div className="card text-white bg-dark">
      <form className="card-body" onSubmit={e => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">
            Admin token
            <input
              className="form-control"
              value={token}
              onChange={e => dispatch(SET(e.target.value))}/>
            <div className="form-text">You can generate it by use <br/> "yarn gen:adminToken" in back directory</div>
          </label>
        </div>
      </form>
    </div>
  </div>)
}
