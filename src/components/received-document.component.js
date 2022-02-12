import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { FaArrowDown, FaBook, FaDownload, FaGenderless, FaIdBadge, FaIdCard, FaSistrix, FaTag, FaTextHeight, FaTicketAlt, FaTrash, FaTypo3 } from "react-icons/fa";
import { findAllByTitle } from "@testing-library/react";
import axios from "axios";
import authHeader from "../services/auth-header";
import authService from "../services/auth.service";

export default class DocumentReceived extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      documents : [],
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  remove(url){
    axios.delete("http://localhost:8080/document/"+url.split('/')[4],{headers:authHeader()}).then(r=>console.log(r));
    
    window.location.reload();
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
    UserService.getDocumentsReceived(JSON.parse(localStorage.getItem("user")).id).then(r=> this.setState({ content : "Documents Received", documents : r.data}));
  }

  render() {
    const {content,document, currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content} <FaDownload style={{ fontSize: '30px',marginLeft:'5px'}}></FaDownload></h3>

          <div className="documentsListAll">
          <div className="documentTag">
                <li><FaTag style={{color: 'green', fontSize: '20px',margin:'5px'}}/>Title</li>
                <li><FaArrowDown style={{color: 'green', fontSize: '20px',margin:'5px'}}/>DownloadLink</li>
                <li><FaSistrix style={{color: 'green', fontSize: '20px',margin:'5px'}}/>Size</li>
                <li><FaTag style={{color: 'green', fontSize: '20px',margin:'5px'}}/>Type</li>
                <li><FaIdBadge style={{color: 'green', fontSize: '20px',margin:'5px'}}/>SenderName</li>
                <li><FaIdBadge style={{color: 'green', fontSize: '20px',margin:'5px'}}/>ReceiverName</li>
              </div>
          {this.state.documents != [] ? 
            this.state.documents.map((doc)=>(
              <div className="documentTag">
                <li>{doc.docName}</li>
                <li><a href={doc.url}>Download</a><FaArrowDown style={{color: 'green', fontSize: '20px',marginLeft:'5px'}}/></li>
                <li>{doc.size} Ko</li>
                <li><FaBook style={{color: 'gray', fontSize: '30px'}}/><br/>{(doc.type).split('/')[1]}</li>
                <li>{doc.senderLastName} {doc.senderFirstName}</li>
                <li>{doc.receiverFirstName} {doc.receiverLastName}</li>
                {showAdminBoard&&
                <li onClick={(e)=>{this.remove(doc.url)}}><FaTrash className="removeDoc" style={{ fontSize: '20px'}}/></li>
                }
                {!showAdminBoard&&

              <li><FaTrash  style={{ fontSize: '20px',color:"gray"}}/></li>   
                }
              </div>
    ))
          
          : "Walo"}
            </div>
        </header>
      </div>
    );
  }
}