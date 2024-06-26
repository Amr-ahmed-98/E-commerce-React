import { createContext, useEffect, useState } from "react";


export let AuthContext = createContext(null);



export default  function AuthContextProvider({children}) {
    const [token, setToken] = useState(()=>localStorage.getItem('token'))
    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token)
        }else{
            localStorage.removeItem('token')
        }
    },[token])
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}
