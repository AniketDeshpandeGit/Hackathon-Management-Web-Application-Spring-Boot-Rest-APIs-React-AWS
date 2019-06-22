import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import {url} from '../Config_url'

export default class MyOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      successFlag: false
    };
    this.emailHandler = this.emailHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  emailHandler = h => {
    this.setState({
      eventName: h.target.value
    });
  };

  submitHandler = h => {
    h.preventDefault();
    // const data = {
    //   eventName: this.state.eventName,
    //   description: this.state.description,
    //   fee: this.state.fee,
    //   minTeamSize: this.state.minTeamSize,
    //   maxTeamSize: this.state.maxTeamSize
    // };
    // // axios.defaults.withCredentials = true
    // axios.post(`${url}/hackathons`, data).then(response => {
    //   console.log(response.data.id);
    //   if (response.status === 200) {
    //     this.setState({
    //       successFlag: true
    //     });
    //   }
    // });
    alert("Thank you!");
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
            <div class="hackathon-login-form">
              <div class="hackathon-main-div">
                <div class="hackathon-panel">
                  {/* <img src={openhacklogo} width="75px" height="75px" /> */}
                  <h1>OpenHack</h1>
                  <br />
                </div>
                <form onSubmit={this.submitHandler}>
                  <h5>
                    Please check your inbox and confirm your email to continue..
                  </h5>
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
