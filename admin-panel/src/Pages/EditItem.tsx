import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useItems } from "../store"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { deleteItem, updateItem } from "../store/items"

interface Edit {
  name: string,
  description: string,
  imgUrl?: string,
  meta?: string
}

export default function EditItem() {
  const { itemId } = useParams()
  const { items } = useItems()
  const { handleSubmit, register, formState, setValue } = useForm<Edit>()
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const { errors } = formState
  
  const item = items?.find(i => i.id === itemId)
  useEffect(() => {
    if (!item) return
    setValue('description', item.description)
    setValue('name', item.name)
    setValue('imgUrl', item.imgUrl)
    setValue('meta', item.meta)
  }, [item])

  if (!item)
    return (
    <h1>
      404
    </h1>)


  function onSubmit(data: Edit) {
    dispatch(updateItem({
      id: item!.id,
      ...data,
      imgUrl: data.imgUrl ?? null,
      meta: data.meta ?? null,
    })).unwrap().then((res) => {
      if (res.code === 'ok') {
        alert('Saved')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4"> 
      <h1>Id: {item.id}</h1>

      <div className="col-md-6">
        <label className="form-label">
          Name
          <input
            className="form-control"
            required
            placeholder="Name"
            {...register('name', { required: true })}/>
        </label>
        {errors.name && <div className="text-danger">Name required</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Description
          <input
            className="form-control"
            required
            placeholder="Description"
            {...register('description', { required: true })}/>
        </label>
        {errors.description && <div className="text-danger">Description required</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Img
          <input
            className="form-control"
            placeholder="Img url"
            {...register('imgUrl')}/>
        </label>
      </div>

      <div className="col-md-6">
        <label className="form-label">
          Meta
          <input
            className="form-control"
            placeholder="Meta info"
            {...register('meta')}/>
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Save
      </button>

      <button
        className="btn btn-danger mt-3 ms-3"
        onClick={(e) => {
          e.preventDefault()
          dispatch(deleteItem({ id: item.id }))
          .unwrap().then((res) => {
            if (res.code === 'ok') {
              nav('/items')
            }
          })
        }}>
        Delete
      </button>
    </form>
  )
}
