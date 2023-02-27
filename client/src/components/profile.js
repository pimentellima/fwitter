import TabHeader from "./tabHeader"
import { Link } from "react-router-dom"

const Profile = () => {
    return( 
        <TabHeader>
            <Link to='/profile'>Perfil</Link>
        </TabHeader>
    )
}


export default Profile;