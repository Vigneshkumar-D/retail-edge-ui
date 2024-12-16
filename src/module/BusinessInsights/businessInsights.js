import { useRoutes } from "react-router-dom";
import Analytics from "./analytics";
import Reports from "./reports";

const BusinessInsight =()=>{
    const render = useRoutes([
        {path:"reports" , element:<Reports />},
        {path:"analytics" , element:<Analytics />},
    ])
    return<>{render}</>
}
export default BusinessInsight;