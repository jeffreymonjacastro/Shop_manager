import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHouse,
  faPlusCircle,
  faCartShopping,
  faBars,
  faCalendar,
  faBook,
  faX } from '@fortawesome/free-solid-svg-icons'
import '../scss/pages/Navbar.scss'

export const Navbar = () => {
  const [show, setShow] = useState<boolean>(true)

  const back = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const home = useRef<HTMLLIElement>(null)
  const add = useRef<HTMLLIElement>(null)
  const car = useRef<HTMLLIElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLDivElement>(null)
  
  const hideButtons = () => {
    if (show) {
      if (home.current) {
        home.current.style.transform = 'translateY(-100%)'
      }

      if (add.current) {
        add.current.style.transform = 'translateY(-100%)'
      }

      if (car.current) {
        car.current.style.transform = 'translateY(-100%)'
      }

      if (logo.current) {
        logo.current.style.transform = 'translateY(0)'
      }

      if (title.current) {
        title.current.style.transform = 'translateY(0)'
      }
    } else {
      if (home.current) {
        home.current.style.transform = 'translateY(0)'
      }

      if (add.current) {
        add.current.style.transform = 'translateY(0)'
      }

      if (car.current) {
        car.current.style.transform = 'translateY(0)'
      }

      if (logo.current) {
        logo.current.style.transform = 'translateY(-150%)'
      }

      if (title.current) {
        title.current.style.transform = 'translateY(-150%)'
      }
    }
  }
  
  const showMenu = () => {
    if (show) {
      setShow(false)
      hideButtons()

      if (back.current) {
        back.current.style.backdropFilter = 'blur(5px)'
      }

      if (menu.current) {
        menu.current.style.transform = 'translateX(0)'
      }
    } else {
      setShow(true)
      hideButtons()

      if (back.current) {
        back.current.style.backdropFilter = 'blur(0)'
      }

      if (menu.current) {
        menu.current.style.transform = 'translateX(100%)'
      }
    }
  }

  return (
    <>
      <nav className="nav">
        <ul>
          <li ref={home}>
            <a href="/">
              <FontAwesomeIcon icon={faHouse} />
            </a>
          </li>
          <div ref={logo} className='nav-logo'>

          </div>
          <p ref={title} className='nav-title'>
            Shop Manager
          </p>
          <li ref={add}>
            <a href="/newproduct">
              <FontAwesomeIcon icon={faPlusCircle} />
            </a>
          </li>
          <li ref={car}>
            <a href="/carshop">
              <FontAwesomeIcon icon={faCartShopping} />
            </a>
          </li>
          { 
            show ?
              <li onClick={ showMenu }>
                <FontAwesomeIcon icon={faBars} />
              </li>
            :
              <li onClick={ showMenu }>
                <FontAwesomeIcon icon={faX} />
              </li>
          }
        </ul>
      </nav>
      <aside className="nav-menu" ref={back}>
        <div className="nav-menu__buttons" ref={menu}>
          <a href="/">
            <FontAwesomeIcon icon={faHouse} />
            <p>Inicio</p>
          </a>
          <a href="/newproduct">
            <FontAwesomeIcon icon={faPlusCircle} />
            <p>Añadir Producto</p>
          </a>
          <a href="/carshop">
            <FontAwesomeIcon icon={faCartShopping} />
            <p>Carrito</p>
          </a>
          <a href="/calendar">
            <FontAwesomeIcon icon={faCalendar} />
            <p>Calendario</p>
          </a>
          <a href="/meals">
            <FontAwesomeIcon icon={faBook} />
            <p>Menús</p>
          </a>
        </div>
      </aside>
    </>
  )
}
