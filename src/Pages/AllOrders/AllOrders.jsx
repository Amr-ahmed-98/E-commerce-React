import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import { AuthContext } from "../../Context/AuthContext"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

const AllOrders = () => {
    const {cartState,clearCart,loggedCart,setCartEmpty} = useContext(CartContext)
    const {token} = useContext(AuthContext)
    const [order,setOrder] = useState(null)
    const date = new Date()
    const getUserOrders = async()=>{
        const {id} = jwtDecode(token)
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        setOrder(data)
        console.log(order)
        
    }
    
    useEffect(()=>{
        if( loggedCart && loggedCart.data.totalCartPrice > 0){
          setCartEmpty(true)
          clearCart(token)
        }
       },[loggedCart,cartState,clearCart,token,setCartEmpty])
   useEffect(()=>{
    if(token){
        getUserOrders()
    }
   },[getUserOrders])
  return (
   <>
   <div className="container">
    {order && order.map((order)=>(
        <div key={order.id} className="grid grid-12 border-4 border-main shadow-sm rounded-md my-4">
           <div className="col-span-6 flex  text-center">
            {order.cartItems.map((item)=>(
                <div key={item.id} className="bg-main  rounded-md text-white m-2 p-2">
                    <div>
                    <img src={item.product.imageCover} alt="" className="w-full h-32 rounded-md"/>
                    </div>
                    <div>
                        <h3>{item.product.title.split(" ").slice(0,2).join(" ")}</h3>
                    </div>
                    <div>
                        <h3>{item.count}</h3>
                    </div>
                    <div>
                        <h3>{item.price} EGP</h3>
                    </div>
                </div>
            ))}
           </div>
           <div className="col-span-6 ">
            <div className="bg-main  rounded-md text-white m-2 p-2"> <span>Order ID</span> #{order.id} </div>
            <div className="bg-main  rounded-md text-white m-2 p-2">{order.paymentMethodType}</div>
            <div className="bg-main  rounded-md text-white m-2 p-2">{order.isDelivered ? "Delivered" : "Not Delivered Yet"}</div>
            <div className="bg-main  rounded-md text-white m-2 p-2">total Price : {order.totalOrderPrice} EGP</div>
           </div>
        </div>
    ))}
   </div>
   </>
  )
}

export default AllOrders