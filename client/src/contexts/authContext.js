import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
        );

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const login = async (username, password) => {
        const res = await axios.post('//localhost:5000/auth/login', {
            username,
            password
        });
        setUser(res.data);
    }

    const logout = async() => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;