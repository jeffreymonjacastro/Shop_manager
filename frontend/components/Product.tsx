import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../api/api"
import '../scss/pages/Product.scss'
import { set } from "react-hook-form"

export const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({} as any)
  const [units, setUnits] = useState(1)
  
  const callgetProductById = async (id: number) => {
    const response = await getProductById(id)
    setProduct(response || {})
  }

  useEffect(() => {
    if (id) {
      callgetProductById(parseInt(id))
    }
  }, [id])
  

  return (
    <main className="product">
      <article className="product-container">
        <section className="product-image">
          <img 
            src={product.image ? `data:image/png;base64,${product.image}` : ''} 
            alt={product.image_name}
          />
        </section>

        <section className="product-info">
          <h2>{product.title}</h2>
          <p className="product-price">S/. {product.price}</p>
          <p className="product-category">{product.category}</p>

          <div className="product-prop">
            <p><b>Marca: </b>{product.brand}</p>
            <p><b>Cantidad: </b>{`${product.quantity} ${product.typeof_quantity}`}</p>
            <div className="product-units">
              <b>Unidades: </b>
              <button 
                onClick={() => {
                  units > 1 ? setUnits(units - 1) : setUnits(1)}}
              >-</button>
              <span>{ units }</span>
              <button
                onClick={() => setUnits(units + 1)}
              >+</button>
            </div>
          </div>
        </section>

        <section className="product-buttons">
          <button>Agregar al Carrito</button>
        </section>
      </article>
    </main>
  )
}
