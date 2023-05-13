import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../store";
import { createItem } from "../../store/items";
import { useState } from "react";

interface Create {
  name: string,
  description: string,
  imgUrl?: string,
  meta?: string
}

export default function CreateItem() {
  const dispatch = useAppDispatch()
  const { handleSubmit, register, formState: { errors } } = useForm<Create>()
  const [createError, setCreateError] = useState<string | null>(null)

  function onSubmit(data: Create) {
    dispatch(createItem(data)).unwrap().then(res => {
      switch (res.code) {
        case 'ok':
          setCreateError(null)
          break;

        case 'forbidden':
          setCreateError('Forbidden. check your admin token')
          break
      
        default:
          setCreateError('Unknown error')
          break;
      }

      setTimeout(() => {
        setCreateError(null)
      }, 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4"> 
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
        Create
      </button>

      {createError && <div 
        className="alert alert-danger position-absolute bottom-0"
        role="alert"
        >{createError}</div>}
    </form>
  )
}
