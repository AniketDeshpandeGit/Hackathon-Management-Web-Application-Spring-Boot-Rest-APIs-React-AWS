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
      successFlag: false
    };
  }

  buttonHandler = h => {
    //h.preventDefault();

    var item = {
      user_id: 5,
      organization_id: 1
    };
    this.props.func(item);
  };

  componentDidMount() {
    // alert(this.props.props.id);
    // alert("local: " + localStorage.getItem("email"));
    //this.state.orgID:
    if (localStorage.getItem("userId") === 19) {
      console.log("alice");
      alert("alice");
    }
  }

  render() {
    var page = null;
    console.log(localStorage.getItem("userId") === 19);
    alert(localStorage.getItem("userId") === 19);
    if (localStorage.getItem("userId") === 19) {
      console.log("alice");
      alert("alice");
      page = <p>hi</p>;
    }
    return (
      <div>
        <div class="form-group">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">
                {" "}
                {this.props.props.name}
                <span class="tab" />
                <h6 class="card-subtitle mb-2 text-muted">
                  {" "}
                  {this.props.props.description}
                </h6>
                {page}
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  onClick={this.buttonHandler}
                >
                  Request to Join
                </button>
              </h6>
              {page}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
