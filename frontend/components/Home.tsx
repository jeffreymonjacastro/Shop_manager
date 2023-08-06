import { useState, useEffect } from 'react'
import { getProducts } from '../api/api'
import { Product } from './Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import '../scss/pages/Home.scss'

const Products = (
  {id, title, price, image}: 
  {id: number, title: string, price: number, image: string}
  ) => {
  return (
    <div 
      id={id.toString()}
      className="home-product"
      onClick={() => {
        window.location.href = `/product/${id}`
      }}
    >
      <div className="home-product-image">
        <img 
          src={`data:image/png;base64,${image}`} 
          alt={title} 
        />
        <div className='home-product-icon'>
          <FontAwesomeIcon icon={faPlusSquare} />
        </div>
      </div>
      <b className="home-product-name">{title}</b>
      <div className="home-product-price">S/. {price}</div>
    </div>
  )
}

export const Home = () => { 
  const [products, setProducts] = useState([])

  const callgetProducts = async () => {
    const response = await getProducts()
    setProducts(response || [])
  }

  useEffect(() => {
    callgetProducts()

  }, [])

  return (
    <main className="home">
      <article className="home-container">
        <section className="home-categories">
          <div className="home-category">Ingredientes</div>
          <div className="home-category">Limpieza</div>
          <div className="home-category">Higiene</div>
          <div className="home-category">Otros</div>
        </section>

        <section className="home-products">
          {
            products?.map((product: any) => {
              return (
                <Products 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                />
              )
            })
          }
        </section>
      </article>
    </main>
  )
}
