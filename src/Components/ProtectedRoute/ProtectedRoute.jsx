import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {token} = useContext(AuthContext)
    if(!token) return <Navigate to={'/login'}/>
    return <>
    {children}
    </>
}

export default ProtectedRoute