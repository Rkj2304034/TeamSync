import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const authContext = createContext();

export  function AuthContextProvider ({children})  {

    const [ user, setUser ] = useState(null);

    const getUser = async(req,res) => {

        try{

            const res =  await api.get("/api/auth/me");
            if(res.data.success){
                setUser(res.data.user)
            }

        }
        catch(error){
            console.log(error?.response?.data?.message)
        }

    }

    


    useEffect(() => {

        getUser()

    },[])


    const value = {
        user,
        setUser,
        
    }

    return (

        <authContext.Provider value={value} >
            {children}
        </authContext.Provider>

    )

}
