import { Link, NavLink } from "react-router-dom"
import styles from './Navbar.module.css'
import { useContext, useEffect } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { CartContext } from "../../Context/CartContext"
const Navbar = () => {
  const {token,setToken} = useContext(AuthContext)
  const {getLoggedCart,loggedCart} = useContext(CartContext)
  useEffect(()=>{
    if(token)
      getLoggedCart(token)
  },[token,getLoggedCart])
  return (
    <>
    <div className="bg-slate-100 py-5">
      <div className="container flex gap-5 items-center justify-between">
        <div className="flex">
          <i className="fa-solid fa-cart-shopping text-main text-3xl"></i>
          <Link to={'/'} className="text-2xl font-bold">FreshCart</Link>
        </div>
       {token ? <div className={`flex-grow ${styles['nav-active']} hidden md:flex sm:hidden`}>
          <ul className="flex gap-4 text-slate-500">
            <li> 
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li> 
              <NavLink to={'/products'}>Products</NavLink>
            </li>
            <li> 
              <NavLink to={'/categories'}>Categories</NavLink>
            </li>
            <li> 
              <NavLink to={'/brands'}>Brands</NavLink>
            </li>
            <li> 
              <NavLink to={'/allorders'}>Orders</NavLink>
            </li>
          </ul>
        </div> : null}
        <div className="flex gap-3">
          <i className="fa-brands cursor-pointer text-xl fa-instagram "></i>
          <i className="fa-brands cursor-pointer text-xl fa-facebook"></i>
          <i className="fa-brands cursor-pointer text-xl fa-tiktok"></i>
          <i className="fa-brands cursor-pointer text-xl fa-twitter"></i>
          <i className="fa-brands cursor-pointer text-xl fa-linkedin"></i>
          <i className="fa-brands cursor-pointer text-xl fa-youtube"></i>
        </div>

        <div className="flex gap-2">
       {
        token ? <>
        <div className="relative">
        <Link to={'/Cart'}><i className="fa-solid fa-cart-shopping cursor-pointer  text-2xl"></i></Link>
        {loggedCart && <span className="absolute start-3 -top-2 min-w-[15px] text-sm text-center rounded-full text-white bg-main">{loggedCart.numOfCartItems}</span>}
        </div>
       <div>
       <i className="fa-solid fa-right-from-bracket cursor-pointer text-main text-2xl " onClick={()=>{
          setToken(null)
        }}></i>
       </div>
        </>
        :
       <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
       </>
       }
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar