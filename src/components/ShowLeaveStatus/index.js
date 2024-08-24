
import { Component } from "react";

import "./index.css"
import LeftNav from "../Navbar";

class ShowLeaveStatus extends Component{
    state = {UserDetails:[]}

    componentDidMount(){
        this.fetchLeaveStatus()
    }

    fetchLeaveStatus = async() =>{
        const token = localStorage.getItem("token");
    
        const url = "http://localhost:3000/user/leaves";
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
        };
    
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data.leaves)
          this.setState({UserDetails:data.leaves});
        } catch (error) {
          console.error("Error fetching user details", error);
        }
    }
    render(){
        const {UserDetails} = this.state
        console.log(UserDetails)
        const list = [{link:"intern-profile",value:"Home"},{link:"intern-leave",value:"Leave Status"},{link:"intern-view",value:"Schedules"},{link:"apply-leave",value:"Apply Leave"},{link:"apply-request",value:"Leave Request"},{link:"/",value:"Logout"}]

        return(
          <div style={{display:"flex",justifyContent:"center"}}>
          <LeftNav options = {list}/>
            <div className="leave-status">
            <h1>Leave Status</h1>
                <ul className="list-of-leaves">
                   {UserDetails.map(each =>(
                    <li className="each-leave">
                        <p>Reason:{each.reason}</p>
                        <p>Start Date:{each.startDate}</p>
                        <p>Start Date:{each.endDate}</p>
                        <p>Nominee Name:{each.nominatedIntern}</p>
                        <p>Nominee Status:{each.internStatus}</p>
                        <p>Admin Status:{each.adminStatus}</p>
                    </li>
                   ))}
                </ul>
            </div>
            </div>
        )
    }
}

export default ShowLeaveStatus