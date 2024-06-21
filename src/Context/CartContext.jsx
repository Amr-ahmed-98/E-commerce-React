import axios from "axios";
import { createContext, useState } from "react";




export let CartContext = createContext(null)

 const CartContextProvider = ({children})=>{
    const [cart,setCart] = useState(null)
    const [loggedCart,setLoggedCart] = useState(null)
    const [removeCart,setRemoveCart] = useState(null)
    const[minusFromCart,setMinusFromCart] = useState(null)
    const [cartEmpty,setCartEmpty] = useState(false)
    const [clear,setClear] = useState(null)
    const [cartState,setCartState] = useState(false)
    
    const AddToCart = async (token,productId)=>{
      try{
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
            headers:{
                token
            }
        })
        setCart(data)
      }catch(error){
        console.log(error)
      }
    }
    const RemoveFromCart = async(productId,token)=>{
      try{
        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:{
            token
        }})
        setRemoveCart(data)
      }catch(error){
        console.log(error)
      }
    }

    const getLoggedCart = async(token)=>{
      try{
        if(token){
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{
                token
            }
        })
        setLoggedCart(data)
     }else{
        setLoggedCart(null)
     }
      }catch(error){
        if(error.response && error.response.status === 404){
          console.log("Cart not found.");
          setLoggedCart(null);
      }else{
        console.log("An error occurred:", error.message);
      }
    }
  }
    const minusProduct = async(productId,count,token)=>{
        if(count === 1){
            await RemoveFromCart(productId,token)
        }else{
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count-1},{
                headers:{
                    token
                }
            })
        setMinusFromCart(data)
        }
    }

    const clearCart = async(token)=>{
      try{
        if(token){
          const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers:{
                    token
                }
            }
        )
        setClear(response.data.message)
        setCartEmpty(true)
        setLoggedCart(null)
        }
      }catch(error){
        console.log(error)
      }
    }
    

    return(
        <CartContext.Provider value={{cart,setCart,AddToCart,getLoggedCart,loggedCart,RemoveFromCart,removeCart,minusProduct,clearCart,clear,setCartEmpty,cartState,setCartState}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider