import React, { Component } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import authService from "../services/auth.service";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeidRecipient = this.onChangeidRecipient.bind(this);
    this.onChangeDocumentName= this.onChangeDocumentName.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      message: "",
      idSender:authService.getCurrentUser().id,
      idRecipient : 2,
      documentName : "nothing",
      comment : "nothing",
      file:null,



      fileInfos: [],
    };
  }

  onChangeidRecipient(e) {
    this.setState({
      idRecipient: e.target.value
    });
  }

  onChangeDocumentName(e) {
    this.setState({
      documentName: e.target.value
    });
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  selectFile(event) {
   /*  this.setState({
      selectedFiles: event.target.files,
    }); */
    console.log(event.target.files);
    console.log(event.target.files[0]);

    let f = event.target.files[0];

    this.setState({
      file : f
    })
  }
  upload() {
    //let currentFile = this.state.selectedFiles[0];
    console.log(this.state, "STATE ---");

    let file = this.state.file;
    let formData = new FormData();

    formData.append("file", file);
    formData.append("idSender", this.state.idSender);
    formData.append("idRecipient", this.state.idRecipient);
    formData.append("docName", this.state.documentName);
    formData.append("comment", this.state.comment);

    console.log(formData.get("idSender"));

    axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-type": "application/json",
      }
    }).post("/sendDocument", formData, {headers : authHeader()});
    window.location.reload();
  }

  render() {
    

    return (
      <div className="uploadForm">

            <div>
              <div class="form-group">
              <label className="">
              DocumentName
            </label>
              <input required  class="form-control" name="docName" type="text"  onChange={(e)=>{
                this.state.documentName = e.target.value;
              }} />
              </div>
              
            <div class="form-group">
            <label className="">
              ID Receiver
            </label>
              <input required class="form-control"  name="idReceiver" type="number" onChange={(e)=>{
                this.state.idRecipient = e.target.value;
              }} />
              </div>

              <div class="form-group">
              <label className="">
              Comment
            </label>
              <input required class="form-control" name="comment" type="text"  onChange={(e)=>{
                this.state.comment = e.target.value;
              }} />
              </div>


            <div class="form-group">
            <label className="btn btn-default">
            </label>
              <input name="file" type="file" onChange={(e)=>this.selectFile(e)} />
              </div>

          <button
            className="btn btn-success"
              id="reload"
            onClick={this.upload}
          >
          Upload
        </button>
            </div>
             
      </div>
    );
  }
}
