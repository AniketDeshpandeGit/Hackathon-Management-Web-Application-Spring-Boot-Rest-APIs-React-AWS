import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";

export default class SearchOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",
      orgDescription: "",
      ordID: "",
      userID: "",
      successFlag: false,
      sent: false
    };
  }

  buttonHandler = h => {
    //h.preventDefault();

    var item = {
      user_id: localStorage.getItem("userId"),
      organization_id: this.props.props.id
    };
    this.props.func(item);
    this.state.sent = true;
  };

  componentDidMount() {
    // alert(this.props.props.id);
    // alert("local: " + localStorage.getItem("userId"));
    //this.state.orgID:
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <div
            class="card"
            style={{
              display: this.state.sent === true ? "none" : "block"
            }}
          >
            <div class="card-body">
              <h6 class="card-title">
                {" "}
                {this.props.props.name}
                <span class="tab" />
                <h6 class="card-subtitle mb-2 text-muted">
                  {" "}
                  {this.props.props.description}
                </h6>
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  onClick={this.buttonHandler}
                >
                  Request to Join
                </button>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
