import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

import {  Link, useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
const Cart = () => {
  const {getLoggedCart,loggedCart,AddToCart,RemoveFromCart,minusProduct,clearCart,clear,setCartEmpty} = useContext(CartContext);
  const {token} = useContext(AuthContext)


  const navigate = useNavigate()
  
  useEffect(()=>{
    if(token){
      getLoggedCart(token)
    }
  },[getLoggedCart,token,clear])

 useEffect(()=>{
  if(loggedCart && loggedCart.data.totalCartPrice > 0){
    setCartEmpty(false)
  }
 },[loggedCart])


 const handlePayCash = ()=>{
  if(loggedCart && loggedCart.data.totalCartPrice > 0){
    navigate('/PayCash')
 }else{
  alert("Your cart is empty. Please add items to your cart before proceeding.");
 }
 }  
  return (
    <>
    <Helmet>
      <title>FreshCart - Shopping Cart</title>
    </Helmet>
      {loggedCart  ?  (
        <div className="container bg-slate-300 min-h-screen w-full">
          <div className="px-10">
            <h2 className="text-2xl">Shop Cart:</h2>
            <span className="text-sm text-main">Total Cart Price: {loggedCart.data.totalCartPrice}</span>
            {loggedCart.data.totalCartPrice === 0 || !loggedCart ?  (
              <p>There are no items here. Add more!</p>
            ) : (
              loggedCart.data.products.map((product) => (
               <div key={product._id}>
             <div 
                  className="flex items-center gap-5 my-5 border border-main rounded-md"
                >
                  <div className="w-[100px]">
                    <img
                      src={`${product.product.imageCover}`}
                      alt="product image"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3>{product.product.title}</h3>
                    <span className="text-main my-3">
                      Price: {product.count * product.price} EGP
                    </span>
                    <span className="cursor-pointer" onClick={() => RemoveFromCart(product.product.id, token)}>
                      <i className="fa-solid fa-trash text-main"></i> Remove
                    </span>
                  </div>
                  <div className="mx-5 flex items-center">
                    <i
                      className="fa-solid fa-plus p-1 btn"
                      onClick={() => AddToCart(token, product.product.id)}
                    ></i>
                    <span className="mx-2">{product.count}</span>
                    <i
                      className="fa-solid fa-minus p-1 btn"
                      onClick={() => minusProduct(product.product.id, product.count, token)}
                    ></i>
                  </div>
                </div>
                </div>
              ))
            )}
          </div>
          {loggedCart.data.totalCartPrice != 0 && <div className="container">
            <div className="flex justify-between mx-5">
                <button className="btn p-1 mx-2 " onClick={()=>{clearCart(token)}}>Clear Cart</button>
               <div className="flex gap-5">
                <button className="btn p-1 mx2" onClick={()=>{handlePayCash()}}>Pay Cash</button>
                <Link to="/PayOnline"><button className="btn p-1 mx2">Pay Online</button></Link>
               </div>
          </div>
          </div> }
        </div>
      ) : <> 
           <p className="text-2xl my-5">There are no items here. Add more!</p>
      </> }
    </>
  );
};

export default Cart;
