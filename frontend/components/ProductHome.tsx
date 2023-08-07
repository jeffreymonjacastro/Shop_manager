import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import '../scss/pages/ProductHome.scss'

export const ProductHome = (
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