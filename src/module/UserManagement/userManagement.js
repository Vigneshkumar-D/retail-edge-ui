import { useRoutes } from "react-router-dom";
import User from "./user";
import Role from "./role";
import UserAccess from "./userAccess";
import EmailAndSmsConfiguration from "./emailAndSmsConfiguration";

const UserManagement =()=>{
    const render = useRoutes([
        {path:"user",element:<User/>},
        {path:"role",element:<Role/>},
        {path:"user-access",element:<UserAccess/>},
        {path:"email-and-sms-configuration",element:<EmailAndSmsConfiguration/>},

    ])
    return<>{render}</>
}
export default UserManagement;