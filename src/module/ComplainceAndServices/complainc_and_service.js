import { useRoutes } from "react-router-dom"
import GST from "./gst/gst";
import ServiceManagement from "./serviceManagement/serviceManagement";

const ComplalinceAndService =()=>{
    const render = useRoutes([
        {path:"gst/*",element:<GST/>},
        {path:"service-management/*",element:<ServiceManagement/>}
    ])
    return<>{render}</>
}

export default ComplalinceAndService;