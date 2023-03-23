import { createContext, useEffect, useState } from "react";
import { request } from "../utils/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])


    const logout = async() => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider 
            value={{ 
                currentUser, 
                setCurrentUser, 
                logout 
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;