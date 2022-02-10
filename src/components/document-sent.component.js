import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class DocumentSent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      documents : []
    };
  }

  componentDidMount() {
    UserService.getDocumentsSent(JSON.parse(localStorage.getItem("user")).id).then(r=> this.setState({ content : "Documents Sent", documents : r.data}));
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>

          <p>{this.state.documents != [] ? this.state.documents.length : "Walo"}</p>
        </header>
      </div>
    );
  }
}