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
      organization: "",
      hasOrganization: false,
      successFlag: false,
      orgId: ""
    };

    this.eventNameHandler = this.eventNameHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.feeHandler = this.feeHandler.bind(this);
    this.minTeamSizeHandler = this.minTeamSizeHandler.bind(this);
    this.maxTeamSizeHandler = this.maxTeamSizeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    // axios
    //   .get(`${url}/userOrganization/${this.state.email}`)
    //   .then(response => {
    //     console.log(response.data);
    //     if (response.status === 200) {
    //       this.setState({
    //         organization: response.data,
    //         hasOrganization: true
    //       });
    //     }
    //   });

    console.log("did" + localStorage.getItem("userId"));

    var self = this;

    var data = {
      id: 12
    };

    var headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(
        `${url}/organizations/getMyOrganisation/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers
        }
      )
      .then(response => {
        //resp = JSON.stringify(response);
        console.log("hi");
        //alert("hi");

        self.setState({
          organization: response.data.name,
          hasOrganization: true
        });

        //alert("response " + response.data);

        this.state.organization = response.data.name;
        this.state.hasOrganization = true;

        //console.log("hi" + resp);
      })
      .catch(function(error) {
        // handle error
        self.setState({
          hasOrganization: false
        });
        console.log("error: " + error);
        // alert("error: " + error);
      });
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
    //h.preventDefault();

    //alert("hi");

    var headers = {
      Authorization: localStorage.getItem("token")
    };

    axios.defaults.withCredentials = true;
    axios
      .post(
        `${url}/organizations/leaveOrganisation/${localStorage.getItem(
          "userId"
        )}`
      )
      .then(response => {
        console.log(response.data.id);
        if (response.status === 200) {
          this.setState({
            successFlag: true
          });

          this.state.successFlag = true;

          window.location.reload();

          // alert("Left");
          console.log("Left");
        }
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.successFlag) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/user"
          }}
        />
      );
    }

    let orgUI;
    if (this.state.hasOrganization === "") {
      orgUI = (
        <div>
          <h3 class="card-title">
            Organization Name: {this.state.organization}
            <span class="tab" />
          </h3>
          {/* <h6 class="card-subtitle mb-2 text-muted"> Subtitle</h6>
          <p class="card-text">something</p> */}
          <form onSubmit={this.submitHandler}>
            <button
              type="button"
              class="btn btn-danger btn-lg btn-block"
              onclick={this.leaveHandler}
            >
              Leave
            </button>
          </form>
        </div>
      );
    } else {
      orgUI = (
        <div>
          <h4 class="card-title">
            You are not a part of any organization currently
            <span class="tab" />
          </h4>
          {/* <h6 class="card-subtitle mb-2 text-muted"> Subtitle</h6>
        <p class="card-text">something</p> */}
          {/* <button type="button" class="btn btn-danger btn-lg btn-block">
            Leave
          </button> */}
        </div>
      );
    }
    return (
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {redirectVar}
        <Header />
        <div>
          <div>
            <form onSubmit={this.submitHandler}>
              <div class="hackathon-login-form">
                <div class="hackathon-main-div">
                  <div class="hackathon-panel">
                    {/* <img src={openhacklogo} width="75px" height="75px" /> */}
                    <h2>My Organization</h2>

                    <br />
                  </div>
                  <div class="form-group">
                    <div class="card">
                      <div class="card-body">
                        <div>
                          <h5 class="card-title">
                            Organization Name: <br />
                            <br />
                            {this.state.organization === ""
                              ? "You are currently not enrolled in a Organization"
                              : this.state.organization}
                            <span class="tab" />
                          </h5>
                          {/* <h6 class="card-subtitle mb-2 text-muted"> Subtitle</h6>
          <p class="card-text">something</p> */}

                          <button
                            type="submit"
                            class="btn btn-danger btn-lg btn-block"
                            style={{
                              display:
                                this.state.organization === ""
                                  ? "none"
                                  : "block"
                            }}
                          >
                            Leave
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
