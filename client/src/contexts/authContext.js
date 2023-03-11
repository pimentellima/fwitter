import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    const login = async (username, password) => {
        const res = await axios.post('//localhost:5000/auth/login', {
            username,
            password
        });
        setCurrentUser(res.data);
    }

    const logout = async() => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;