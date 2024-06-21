import axios from "axios"
import Loader from "../Loader/Loader"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import { AuthContext } from "../../Context/AuthContext"

const Products = ({query}) => {
  const {AddToCart} = useContext(CartContext)
  const {token} = useContext(AuthContext)
    const {data,isPending} = useQuery({
      queryKey:['Products'],
      queryFn:async()=>{
        return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      },
      staleTime:60 * 1000,
      gcTime:30*1000,
    })

     if(isPending) {
        return <Loader />
    }
    const searchedData = data.data.data.filter((product)=>{
      if(query === undefined){
        return data
      }else if(product.title.toLowerCase().includes(query)){
        return product
      }
    })

  return (
      searchedData.map((sProduct)=>{
        return (
         <div key={sProduct._id} className="relative cursor-pointer group">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-20 bg-black layer hidden group-hover:block cursor-default ">
            <div className="flex gap-3 justify-center items-center h-full">
              <i className="fa-solid fa-heart bg-main text-white p-2 rounded-full cursor-pointer hover:scale-105"></i>
              <i className="fa-solid fa-cart-shopping bg-main text-white p-2 rounded-full cursor-pointer hover:scale-105" onClick={()=>{AddToCart(token,sProduct.id)}}></i>
              <Link to={`/${sProduct._id}`}><i className="fa-solid fa-eye bg-main text-white p-2 rounded-full cursor-pointer hover:scale-105"></i></Link>
            </div>
          </div>
           <div  className="" >
            <img src={sProduct.imageCover} className="w-full" alt="product image" />
            <p className="text-xs text-main">{sProduct.category.name}</p>
            <p className="text-xs line-clamp-1 font-bold">{sProduct.title}</p>
            <div className="mt-3 flex justify-between">
              <p className="text-[15px]">{sProduct.price} EGP</p>
              <p className="text-[15px]"><i className="fa-solid fa-star text-rateing"></i> {sProduct.ratingsAverage}</p>
            </div>
          </div>
         </div>
        )
      })
  )
}

export default Products