import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import CardAdminHackthon from "./CardAdminHackthon";
import {url} from '../Config_url'

export default class SearchHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      fee: "",
      minTeamSize: "",
      maxTeamSize: "",
      passIdToProps: "",
      successFlag: false
    };

    this.eventNameHandler = this.eventNameHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.feeHandler = this.feeHandler.bind(this);
    this.minTeamSizeHandler = this.minTeamSizeHandler.bind(this);
    this.maxTeamSizeHandler = this.maxTeamSizeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  eventNameHandler = h => {
    this.setState({
      eventName: h.target.value
    });
  };
  descriptionHandler = h => {
    this.setState({
      description: h.target.value
    });
  };
  feeHandler = h => {
    this.setState({
      fee: h.target.value
    });
  };
  minTeamSizeHandler = h => {
    this.setState({
      minTeamSize: h.target.value
    });
  };
  maxTeamSizeHandler = h => {
    this.setState({
      maxTeamSize: h.target.value
    });
  };

  submitHandler = h => {
    h.preventDefault();
    const data = {
      eventName: this.state.eventName,
      description: this.state.description,
      fee: this.state.fee,
      minTeamSize: this.state.minTeamSize,
      maxTeamSize: this.state.maxTeamSize
    };
    // axios.defaults.withCredentials = true
    axios.post(`${url}/hackathons`, data).then(response => {
      console.log(response.data.id);
      if (response.status === 200) {
        this.setState({
          successFlag: true
        });
      }
    });
  };

  render() {
    let redirectVar = null;
    if (this.state.successFlag) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/hackathonDetails",
            state: { id: this.state.passIdToProps }
          }}
        />
      );
    }
    return (
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {redirectVar}
        <Header />
        <div>
          <div>
            <div class="organization-login-form">
              <div class="organization-main-div">
                <div class="organization-panel">
                  {/* <img src={openhacklogo} width="75px" height="75px" /> */}
                  <h2>Ongoing Hackathons</h2>
                  <br />
                  <div class="form-group">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Hackathon Name"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-primary"
                          type="button"
                          id="button-addon2"
                        >
                          Search
                        </button>
                        <span class="tabmini" />
                        <button type="button" class="btn btn-outline-danger">
                          + Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={this.submitHandler}
                  style={{ marginTop: "110px" }}
                >
                  <CardAdminHackthon />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
