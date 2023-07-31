import { useForm } from 'react-hook-form'
import '../scss/pages/NewProduct.scss'

export const NewProduct = () => {

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <main className="newproduct-main">
      <h2>NewProduct</h2>
      <form 
        className="newproduct-form"
        onSubmit={ onSubmit }
      >
        <label htmlFor="title">Título</label>
        <input 
          type="text"
          id="title"
          {...register('title', {
            required: {
              value: true,
              message: "El título es requerido",
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
          errors.title && 
          <span>{ errors.title.message?.toString() }</span>
          
        }

        <label htmlFor="price">Precio</label>
        <input
          type="number"
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

        <label htmlFor="category">Categoría</label>
        <select 
          id="category"
          {...register('category')} 
        >
          <option value="FrutasVerduras">Frutas y Verduras</option>
          <option value="Limpieza">Limpieza</option>
        </select>

        <label htmlFor="brand">Marca</label>
        <input 
          type="text" 
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

        <label htmlFor="quantity">Cantidad</label>
        <select
          {...register('typeof_quantity')}
        >
          <option value="kg">kg</option>
          <option value="l">L</option>
        </select>
        <input
          type="number"
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

        <label htmlFor="image">Imagen</label>
        <input
          type="file"
          id="image"
          {...register('image', {
            required: true,
          })}
        />

        <button type='submit'>
          Enviar
        </button>

      </form>
    </main>
  )
}
