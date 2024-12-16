import { useRoutes } from "react-router-dom";
import StoreDetails from "./StoreDetails/storeDetails";

const StoreSetup =()=>{
    const render = useRoutes([
        {path:"store-details" , element:<StoreDetails/>},
    ])
    return<>{render}</>
}
export default StoreSetup;