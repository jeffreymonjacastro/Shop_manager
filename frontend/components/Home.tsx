import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import '../scss/pages/Home.scss'

const Product = () => {
  return (
    <div 
      id='1' 
      className="home-product"
      onClick={() => console.log('click')}
    >
      <div className="home-product-image">
        <img src="https://picsum.photos/300/300" alt="Producto 1" />
        <div className='home-product-icon'>
          <FontAwesomeIcon icon={faPlusSquare} />
        </div>
      </div>
      <b className="home-product-name">Producto 1</b>
      <div className="home-product-price">$ 100</div>
    </div>
  )
}

export const Home = () => { 
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
          <Product />
          <Product />
          <Product />
        </section>
      </article>
    </main>
  )
}
