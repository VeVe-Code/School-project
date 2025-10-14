import { createContext }  from  "react";

let AuthContext =createContext()

let AuthContextProvider = ({children}) =>{
    let user ={
        name : "Kaung Zin Thu"
    }
    return (
        <AuthContext value={user}>{children}</AuthContext>
    )
}

export {AuthContext, AuthContextProvider}