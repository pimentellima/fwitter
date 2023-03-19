import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { request } from "../utils/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    const loginUser = async ({ username, password }) =>
        request.post('/auth/login', {
            username,
            password
    }).then(res => setCurrentUser(res.data));

    const createUser = async({ username, name, password }) =>
        request.post('/auth/register', {
            username,
            name,
            password
        });

    const logout = async() => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider 
            value={{ 
                currentUser, 
                setCurrentUser, 
                loginUser, 
                createUser,
                logout 
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;