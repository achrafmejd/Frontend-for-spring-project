import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { FaAddressBook, FaArrowDown, FaBook, FaCloudShowersHeavy, FaDigitalOcean, FaIdBadge, FaIdCard, FaInfinity, FaKey, FaMailBulk, FaMailchimp, FaRobot, FaSortNumericDown, FaTrash } from "react-icons/fa";
import authService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";

export default class AllEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      employees : [],
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  remove(id){
    console.log("its in")
    axios.delete(`http://localhost:8080/employee/${id}`).then(r=>console.log(r));
  //  window.location.reload();
 }
  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      console.log(user.roles);
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    UserService.getAllEmployees().
    then(r => {
      this.setState({ content : "All Employees", employees : r.data});
    });
  }

  render() {
    const {content,document, currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content} <FaInfinity style={{ fontSize: '40px',marginLeft:'5px'}}/></h3>

          
            {showAdminBoard && (
                       <div className="employeesList">
                       <div className="documentTagR">
                             <li><FaIdBadge style={{color: 'green', fontSize: '20px',margin:'.5rem'}}/> FirstName</li>
                             <li><FaIdBadge style={{color: 'green', fontSize: '20px',margin:'.5rem'}}/>LastName</li>
                             <li><FaMailBulk style={{color: 'green', fontSize: '20px',margin:'.5rem'}}/>Email</li>
                             <li><FaKey style={{color: 'green', fontSize: '20px',margin:'.5rem'}}/>ID</li>
                             <li><FaRobot style={{color: 'green', fontSize: '20px',margin:'.5rem'}}/>Role</li>
                           </div>
                       {this.state.employees != [] ? 
                         this.state.employees.map((emp)=>(
                           <div className="documentTagR">
                             <li>{emp.firstName} </li>
                             <li>{emp.lastName}</li>
                             <li>{emp.email}</li>
                             <li>{emp.idEmp}<FaAddressBook style={{color: 'gray', fontSize: '15px',marginLeft:"1rem"}}/></li>
                             <li><FaKey style={{color: 'lighgray', fontSize: '20px'}}/>{emp.roles[0].name}</li>
                             <li onClick={(e)=>{this.remove(emp.idEmp)}} ><FaTrash className="removeDoc" style={{ fontSize: '20px'}}/></li>
                           </div>
                 ))
                       
                       : "Walo"}
                         </div>
            )}
            {!showAdminBoard&&
              <h2 className="danger">You are not an admin<FaCloudShowersHeavy style={{color:'red',fontSize:'80px',marginLeft:'4rem'}}/></h2>
            }
        </header>
      </div>
    );
  }
}