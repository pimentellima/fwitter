import { AuthContext } from "../contexts/authContext"
import { useContext } from "react"

const UserImg = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <img src=''/>
    )
}