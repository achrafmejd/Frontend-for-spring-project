import React, { Component } from "react";
import { FaArrowDown,FaBook, FaHammer, FaIdBadge, FaIdCard, FaInbox, FaReceipt, FaRemoveFormat, FaSeedling, FaTag, FaTextHeight, FaTrash, FaUpload } from "react-icons/fa";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";

export default class DocumentSent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      documents : []
    };
  }
  remove(url){
    axios.delete("http://localhost:8080/document/"+url.split('/')[4],{headers:authHeader()}).then(r=>console.log(r));
    
    window.location.reload();
 }
  componentDidMount() {
    UserService.getDocumentsSent(JSON.parse(localStorage.getItem("user")).id).then(r=> {
      this.setState({ content : "Documents Sent", documents : r.data});
      console.log(r.data);
    });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}  <FaUpload style={{ fontSize: '30px',marginLeft:'5px'}}/></h3>

          <div className="documentsListAll">
          <div className="documentTag">
          <li><FaTag style={{color: 'green', fontSize: '20px',margin:'5px'}}/>Title</li>
                <li><FaArrowDown style={{color: 'green', fontSize: '20px',margin:'5px'}}/>DownloadLink</li>
                <li><FaHammer style={{color: 'green', fontSize: '20px',margin:'5px'}}/>Size</li>
                <li><FaTextHeight style={{color: 'green', fontSize: '20px',margin:'5px'}}/>Type</li>
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
                <li onClick={(e)=>{this.remove(doc.url)}}><FaTrash className="removeDoc" style={{ fontSize: '20px'}}/></li>
              </div>
    ))
          
          : "Walo"}
            </div>
        </header>
      </div>
    );
  }
}