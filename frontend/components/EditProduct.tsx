import { updateProductById } from "../api/api"
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import '../scss/pages/EditProduct.scss'
import { useEffect } from "react"

export const EditProduct = ({data}: any) => {

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm() 

  useEffect(() => {
    setValue('title', data.title)
    setValue('price', data.price)
    setValue('category', data.category)
    setValue('brand', data.brand)
    setValue('quantity', data.quantity)
    setValue('typeof_quantity', data.typeof_quantity)
    setValue('image', data.image)
    
    return () => {}
  }, [data])

  const onSubmit = handleSubmit(async (datos) => {
    const formData = new FormData()
    formData.append('title', datos.title)
    formData.append('price', datos.price)
    formData.append('category', datos.category)
    formData.append('quantity', datos.quantity)
    formData.append('typeof_quantity', datos.typeof_quantity)
    formData.append('brand', datos.brand)
    formData.append('image', datos.image[0])

    const response = await updateProductById(data.id, formData)
    
    alert(response.message || response.error)

    location.reload()
  })

  const ALLOWED_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif']);

  const allowedFile = (filename: string): boolean => {
    const fileExtension = filename
      .split('.')
      .pop()
      ?.toLowerCase();

    return fileExtension !== undefined && ALLOWED_EXTENSIONS.has(fileExtension);
  };
  
  return (
    <article className="product-edit">
      <h2>Editar Producto</h2>
      <form
        className="product-form"
        onSubmit={ onSubmit }
      >
        <section className="product-form__item">
          <label htmlFor="title">Título</label>
          <input 
            type="text" 
            placeholder='Arroz'
            defaultValue={data.title}
            id="title"
            {...register('title', {
              required: {
                value: true,
                message: "El título es requerido",
              },
              minLength: {
                value: 2,
                message: "Mínimo 2 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Máximo 30 caracteres",
              },
            })}
          />
          {
            errors.title && 
            <span>{ errors.title.message?.toString() }</span>
          }
        </section>

        <section className="product-form__item">
        <label htmlFor="price">Precio</label>
          <input
            type="number"
            placeholder='S/.'
            defaultValue={data.price}
            step={0.01}
            id="price"
            {...register('price', {
              required: {
                value: true,
                message: "El precio es requerido",
              },
              min: {
                value: 0.1,
                message: 'El precio mínimo es 10 céntimos',
              },
              max: {
                value: 999.99,
                message: 'El precio máximo es 999.99 soles',
              }
            })}
          />
          {
            errors.price &&
            <span>{ errors.price.message?.toString() }</span>
          }
        </section>

        <section className="product-form__item">
          <label htmlFor="category">Categoría</label>
          <select 
            id="category"
            defaultValue={data.category}
            {...register('category')} 
          >
            <option value="FrutasVerduras">Frutas y Verduras</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Higiene">Higiene</option>
            <option value="Otros">Otros</option>
          </select>
        </section>

        <section className="product-form__item">
          <label htmlFor="brand">Marca</label>
          <input 
            type="text" 
            placeholder='Norteño'
            defaultValue={data.brand}
            id="brand"
            {...register('brand', {
              required: {
                value: true,
                message: "La marca es requerida",
              },
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres',
              },
              maxLength: {
                value: 30,
                message: 'Máximo 30 caracteres',
              },
            })}
          />
          {
            errors.brand &&
            <span>{ errors.brand.message?.toString() }</span>
          }
        </section>

        <section className="product-form__item">
          <label htmlFor="quantity">Cantidad</label>
          <select
            defaultValue={data.typeof_quantity}
            {...register('typeof_quantity')}
          >
            <option value="kg">Kg</option>
            <option value="l">L</option>
            <option value="ml">ml</option>
            <option value="g">g</option>
          </select>
          <input
            type="number"
            placeholder='200'
            defaultValue={data.quantity}
            id="quantity"
            {...register('quantity', {
              required: {
                value: true,
                message: "La cantidad es requerida",
              },
              min: {
                value: 1,
                message: 'La cantidad mínima es 1',
              },
              max: {
                value: 999,
                message: 'La cantidad máxima es 999',
              }
            })}
          />
          {
            errors.quantity &&
            <span>{ errors.quantity.message?.toString() }</span>
          }
        </section>

        <section className="product-form__item">
          <label htmlFor="image">Imagen</label>
          <label htmlFor='image'>
            <FontAwesomeIcon icon={faUpload} />
          </label>
          <label htmlFor="image">
            { 
              watch('image')?.length > 2 ?
              data.image_name :
              watch('image')?.[0].name
            }
          </label>
          <input
            type="file"
            id="image"
            {...register('image', {
              required: {
                value: true,
                message: "La imagen es requerida",
              },
              validate: (value: any) => {
                const filename = value[0].name

                return allowedFile(filename) || 'Formato inválido'
              }
            })}
          />
          {
            errors.image &&
            <span>{ errors.image.message?.toString() }</span>
          }
        </section>

        <section className='newproduct-form__image'>
          <img src={
            watch('image')?.length > 2 ?
            `data:image/png;base64,${watch('image')}` 
            :
            watch('image')?.length > 0 ? 
            URL.createObjectURL(watch('image')[0]) : ''
          } alt={ 
            watch('image')?.length > 2 ?
            data.image_name 
            :
            watch('image')?.length > 0 ? 
            watch('image')[0].name : '' } />
        </section>

        <button type='submit'>
          Editar Producto
        </button>
      </form>
    </article>
  )
}