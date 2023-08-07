import { useState, useEffect } from 'react'
import { getProducts } from '../api/api'
import { ProductHome } from '../components/ProductHome'
import '../scss/pages/Home.scss'



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
                <ProductHome 
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
