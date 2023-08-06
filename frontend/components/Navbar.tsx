import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation  } from 'react-router-dom'
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
  const location = useLocation()

  const back = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const home = useRef<HTMLLIElement>(null)
  const add = useRef<HTMLLIElement>(null)
  const car = useRef<HTMLLIElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLDivElement>(null)


  const hideButtons = () => {
    const translateYValue = show ? '-130%' : '0';
    const translateYLogoTitle = show ? '0' : '-150%';
  
    if (home.current) {
      home.current.style.transform = `translateY(${translateYValue})`;
    }
  
    if (add.current) {
      add.current.style.transform = `translateY(${translateYValue})`;
    }
  
    if (car.current) {
      car.current.style.transform = `translateY(${translateYValue})`;
    }
  
    if (logo.current) {
      logo.current.style.transform = `translateY(${translateYLogoTitle})`;
    }
  
    if (title.current) {
      title.current.style.transform = `translateY(${translateYLogoTitle})`;
    }
  };
  

  const showMenu = () => {
    setShow((prevShow) => {      
      hideButtons();

      if (back.current) {
        back.current.style.backdropFilter = prevShow ? 'blur(5px)' : 'blur(0)'
        back.current.style.transform = prevShow ? 'translateX(0)' : 'translateX(100%)'
      }

      if (menu.current) {
        menu.current.style.transform = prevShow ? 'translateX(0)' : 'translateX(100%)'
      }

      return !prevShow;
    })
  }

  useEffect(() => {
    if (location.pathname === '/') {
      if (home.current) {
        home.current.classList.add('active');
      }
    } else if (location.pathname === '/newproduct') {
      if (add.current) {
        add.current.classList.add('active');
      }
    } else if (location.pathname === '/carshop') {
      if (car.current) {
        car.current.classList.add('active');
      }
    }    
  }, [])


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
            <img src={'http://192.168.0.220:5173/frontend/assets/Shop_manager_logo.png'} alt="Logo Shop Manager" />
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
          <div>
            Made by @jeffrey_amc
          </div>
        </div>
      </aside>
    </>
  )
}
