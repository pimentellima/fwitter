import TabHeader from "./tabHeader";
import { Link } from "react-router-dom";

const Settings = () => {
    return(
        <TabHeader>
            <Link to ='/settings'>Configurações</Link>
        </TabHeader>
    )
}

export default Settings;