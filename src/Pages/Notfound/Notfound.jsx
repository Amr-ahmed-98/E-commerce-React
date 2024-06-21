import notFound from "../../assets/images/error.svg"
import { Helmet } from "react-helmet"
const Notfound = () => {
  return (
   <>
   <Helmet>
    <title>Page Not Found</title>
   </Helmet>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <img src={notFound} alt="not found" />
    </div>
   </>
  )
}

export default Notfound