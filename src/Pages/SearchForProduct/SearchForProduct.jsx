import { useState } from "react"
import Products from "../../Components/Products/Products"
import {Helmet} from "react-helmet";

const SearchForProduct = () => {
  const [searchInput,setSearchInput] = useState('')
  const searchHandler = (e)=>{
    setSearchInput(e.target.value)
    
  }
  return (
 <>
  <Helmet>
    <title>Search for Product</title>
    <meta name="description" content="Search for products on our e-commerce website" />
  </Helmet>
  <div className="container">
      <div className="flex flex-col justify-center items-center">
        <div>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input 
                type="text"
                onChange={searchHandler}
                value={searchInput}
                className="w-[500px] rounded-md my-8 px-2 shadow-md border border-main" placeholder='Search for product' />
            </form>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6  gap-5">
            <Products query={searchInput}/>
        </div>
    </div>
  </div>
 </>
  )
}

export default SearchForProduct