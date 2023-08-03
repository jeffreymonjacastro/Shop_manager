import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import { Menu } from './components/Menu'
import { Product } from './components/Product'
import { NewProduct } from './components/NewProduct'
import { Carshop } from './components/Carshop'
import { Calendar } from './components/Calendar'
import { Meals } from './components/Meals'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/carshop" element={<Carshop />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meals" element={<Meals />} />
          <Route path='*' element={<h1> Page not found :C </h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
