import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../../Components/Loader/Loader"
import {Helmet} from "react-helmet";
const Categories = () => {
    const {data,isLoading,error} = useQuery({
        queryKey:['categories'],
        queryFn: async()=>{
            return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        },
        staleTime:60 * 1000,
        gcTime:30*1000,
    })
    if(isLoading){
        return <Loader/>
    }
    if(error){
        throw new Error(error)
    }

    return (
     <>
      <Helmet>
        <title>Categories | E-Commerce App</title>
      </Helmet>
       <div className="container">
         <div className="grid grid-cols-3 gap-5 overflow-hidden" >
         {data.data.data.map((category)=>(
                <div key={category._id} className="flex flex-col items-center shadow-md  max-w-[400px] h-full cursor-pointer hover:scale-105 hover:transition-transform">
                    <img src={category.image} className="w-[300px] h-full" alt="" />
                    <h1>{category.name}</h1>
                </div>
            ))}
        </div>
       </div>
     </>
    )
}

export default Categories