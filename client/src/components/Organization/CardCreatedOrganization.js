import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";

export default class CardCreatedOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",
      orgDescription: "",
      orgID: "",
      successFlag: false,
      done: false
    };
    this.acceptHandler = this.acceptHandler.bind(this);
    this.rejectHandler = this.rejectHandler.bind(this);
  }

  acceptHandler = h => {
    //h.preventDefault();

    console.log(" prop out");

    const item = {
      accept: true,
      user_id: this.props.props.id,
      organization_id: this.props.k
    };

    console.log(' item before seding : ' + item)

    this.props.acceptFunc(item);
    this.state.done = true;
    window.location.reload();
  };

  rejectHandler = h => {
    //h.preventDefault();

    console.log(" prop out");

    var item = {
      accept: false,
      user_id: this.props.props.id,
      organization_id: this.props.k
    };

    this.props.acceptFunc(item);
    this.state.done = true;
    window.location.reload();
  };

  componentDidMount() {
    //alert("key" + this.props.key + " ***** " + this.props.props);
    console.log(
      "key" + this.props.k + " ***** " + JSON.stringify(this.props.props)
    );
    // alert("local: " + localStorage.getItem("email"));
    //this.state.orgID:
  }

  render() {
    console.log("Key : ", this.props.key);
    return (
      <div>
        <div class="form-group">
          <div
            class="card"
            style={{
              display: this.state.done === true ? "none" : "block"
            }}
          >
            <div class="card-body">
              <h6 class="card-title">
                {" "}
                Requested By:
                {" " + this.props.props.userName}
                <span class="tab" />
                <br />
                <h6 class="card-subtitle mb-2 text-muted">
                  {" "}
                  <br />
                  For Organization: {this.props.k}
                  <br />{" "}
                </h6>
                <h6 class="card-subtitle mb-2 text-muted"> </h6>
                <br />
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  onClick={this.acceptHandler}
                  //id={this.props.props.id}
                >
                  Accept
                </button>
                {"  "}
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  onClick={this.rejectHandler}
                  //id={this.props.props.id}
                >
                  Reject
                </button>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
