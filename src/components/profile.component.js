import React, { Component } from "react";
import { FaAmilia, FaKey, FaMailBulk, FaUser, FaUserCircle } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container profileContainer">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
        <FaUserCircle style={{color:"green",fontSize:"8rem",margin:"30px"}}/> 
          <h2>
            <FaUser style={{color:'black',fontSize:"30px",marginRight:"10px"}}/> Username:  {currentUser.username}
          </h2>
        <h2>
          <FaMailBulk style={{color:'black',fontSize:"30px",marginRight:"10px"}}/>
          Email:  {currentUser.email}
          
        </h2  >
        </header>
        
      
       
      </div>: null}
      </div>
    );
  }
}
