import { Link } from "react-router-dom";
import "../../App.css"
import { Button } from "antd";
 
const UserAccess = () =>{  
  return (
    <>
        <div className='skills-main-container'>
            <img src={`${process.env.PUBLIC_URL}/construction.jpg`} className="under-const-image" alt="under-construction-pic" />
            <h1 className='under-const-title'>This page is under construction</h1>
            <Link to="/">
                <Button type="primary" className='back-to-home-btn' >Back to Home</Button>
            </Link>
        </div>
    </>
)
}
 
export default UserAccess;