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
      cardNumber: "",
      name: "",
      validThru: "",
      cvc: "",
      successFlag: false
    };
    this.cardNumberHandler = this.cardNumberHandler.bind(this);
    this.nameHandler = this.nameHandler.bind(this);
    this.validThruHandler = this.validThruHandler.bind(this);
    this.cvcHandler = this.cvcHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  cardNumberHandler = h => {
    this.setState({
      eventName: h.target.value
    });
  };
  nameHandler = h => {
    this.setState({
      description: h.target.value
    });
  };
  validThruHandler = h => {
    this.setState({
      fee: h.target.value
    });
  };

  cvcHandler = h => {
    this.setState({
      fee: h.target.value
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
                  <h2>Secure Payment</h2>
                  <br />
                </div>
                <form onSubmit={this.submitHandler}>
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        name="cardNumber"
                        class="form-control"
                        type="text"
                        placeholder="Card Number"
                        onChange={this.cardNumberHandler}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        name="name"
                        class="form-control"
                        type="text"
                        placeholder="Name"
                        onChange={this.nameHandler}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      name="validThru"
                      class="form-control"
                      type="text"
                      placeholder="Valid Through mm/yy"
                      onChange={this.validThruHandler}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      name="CVC"
                      class="form-control"
                      type="text"
                      placeholder="CVC"
                      onChange={this.cvcHandler}
                      required
                    />
                  </div>
                  <br />

                  <button
                    type="submit"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Pay
                  </button>
                  <br />
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
