import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import fire from "../../fire";
import { Link } from "react-router";
import seeFirebaseDetails from "./helperFunctions";
import UserProfile from "../User/UserProfile";
import {url} from '../Config_url'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      successFlag: "",
      isAdmin : false
    };

    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  // componentDidMount(){

  //     seeFirebaseDetails();
  // }

  emailHandler = h => {
    this.setState({
      email: h.target.value
    });
  };

  passwordHandler = h => {
    this.setState({
      password: h.target.value
    });
  };

  submitHandler = h => {
    h.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(" The input email " + this.state.email);
    // alert(" state email " + this.state.email);

    // axios.defaults.withCredentials = true
    axios.post(`${url}/users/login`, data).then(response => {
      console.log(" response " + JSON.stringify(response));
      console.log(" response status " + response.data.status);
      console.log(" response data " + response.data);
      //alert(" final response " + response.data);

      // console.log(' response for admin ', response.data.admin)
      // console.log(' response status :' , response.data.status)

      if (response.data.status === 200) {
        console.log(" response after login: " + response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("isAdmin", response.data.admin)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("isAdmin", response.data.admin);
        localStorage.setItem("username", response.data.username);

        this.setState({
          successFlag: true,
          isAdmin : response.data.admin
        });
      } else {
        this.setState({
          successFlag : false
        }) 
      }
    });

    // var email = this.state.email;
    // var password = this.state.password;
    // console.log(email, password);
    // fire.auth().signInWithEmailAndPassword(email, password)
    //     .then((user) => {
    //         var check = fire.auth().currentUser.emailVerified;
    //         console.log("check", check);
    //         console.log("in login", user.user.email);
    //         console.log("in login", user.user.emailVerified);
    //         if (user.user.emailVerified == true) {
    //             this.props.history.push('/user');
    //             // this.props.history.push(this.data, () => {
    //             //     this.props.history.push("/user");
    //             // });
    //             // <a href="/signup"/>
    //         } else {
    //             window.alert("Email not verified yet!")
    //             console.log("email not verified yet");
    //         }
    //     })
    //     .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // ...
    //         console.log("error" + errorMessage);
    //     });

    // console.log("here");
    // var user = fire.auth().currentUser;
    // console.log("in login",user);

    // console.log("in login",user.email);
    // console.log("in login",user.emailVerified);
  };

  render() {
    let redirectVar = null;
    if (this.state.successFlag && !this.state.isAdmin) {
      redirectVar = <Redirect to='/searchOrganization' />;
      redirectVar = <Redirect to="/searchOrganization" />;
    } else if (this.state.successFlag && this.state.isAdmin) {
      redirectVar = <Redirect to="/createHackathon" />;
    }
    const openhacklogo = require("../Miscellanous/openhack.png");
    return (
      <div style={{ backgroundColor: "#243e8c" }}>
        {redirectVar}
        <div style={{ backgroundColor: "#243e8c" }}>
          {/* <Header /> */}
          <div style={{ backgroundColor: "#243e8c" }}>
            <div class="login-form">
              <div class="main-div">
                <div class="panel">
                  <img src={openhacklogo} width="75px" height="75px" />
                  <h2>OpenHack</h2>
                  <br />
                  <br />
                </div>
                <form onSubmit={this.submitHandler}>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      onChange={this.emailHandler}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.passwordHandler}
                      required
                    />
                  </div>
                  <br />
                  {/* <Route render={({ history }) => (
                                        <button type="submit" class="btn btn-secondary btn-lg btn-block"
                                            onClick={() => {
                                                history.push({
                                                    pathname: "/user",
                                                    state: {
                                                        email: this.state.email,
                                                        password: this.state.password
                                                    }
                                                });
                                            }}>
                                            Login</button> 
                                    )} /> */}
                  <br />
                  <button
                    type="submit"
                    class="btn btn-secondary btn-lg btn-block"
                  >
                    Login
                  </button>
                  <br />
                  <div class="alert alert-info" role="alert">
                    Create an account <a href="/signup">Sign up here</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}