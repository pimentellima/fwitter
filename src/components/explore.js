import TabHeader from "./tabHeader";
import { Link } from "react-router-dom";

const Explore = () => {
    return(
        <TabHeader>
            <Link to ='/explore'>Explorar</Link>
        </TabHeader>
    )
}

export default Explore;