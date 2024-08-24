import { Component } from "react";
import { Link } from "react-router-dom";


import "./index.css"

class Home extends Component{
    render(){
        return(
            <div className="HomePageContainer">
                <ul className="NavContainer">
                    <Link to = "admin-login" className="homeNavItem">
                    <li >Admin</li>
                    </Link>
                    <Link to = "/registration" className="homeNavItem">
                    <li >Intern</li>
                    </Link>
                       
                </ul>
                <h1 className="HomePageData">
                    Get Better Care For your Health
                </h1>
            </div>
        )
    }
}
export default Home