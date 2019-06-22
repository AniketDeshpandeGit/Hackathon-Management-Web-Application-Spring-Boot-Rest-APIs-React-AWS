import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import AdminHeader from "../Admin/AdminHeader";
import Footer from "../Miscellanous/Footer";
import {url} from '../Config_url'

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      businesstitle: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      aboutme: "",
      successFlag: false
    };

    this.businesstitleHandler = this.businesstitleHandler.bind(this);
    this.streetHandler = this.streetHandler.bind(this);
    this.cityHandler = this.cityHandler.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.zipHandler = this.zipHandler.bind(this);
    this.aboutmeHandler = this.aboutmeHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${url}/users/${localStorage.getItem("userId")}`)
      .then(response => {
        console.log(" response from server: ", response.data);
        this.setState({
          userName: response.data.userName,
          email: response.data.email,
          businesstitle: response.data.title,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          aboutme: response.data.about
        });
      });
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  businesstitleHandler = h => {
    this.setState({
      businesstitle: h.target.value
    });
  };

  streetHandler = h => {
    this.setState({
      street: h.target.value
    });
  };

  cityHandler = h => {
    this.setState({
      city: h.target.value
    });
  };
  stateHandler = h => {
    this.setState({
      state: h.target.value
    });
  };
  zipHandler = h => {
    this.setState({
      zip: h.target.value
    });
  };
  aboutmeHandler = h => {
    this.setState({
      aboutme: h.target.value
    });
  };

  submitHandler = h => {
    h.preventDefault();

    const data = {
      portraitUrl: "",
      title: this.state.businesstitle,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      about: this.state.aboutme
    };
    console.log(data);

    axios
      .post(
        `${url}/users/${localStorage.getItem("userId")}`,
        data
      )
      .then(response => {
        console.log(" response : ", response);
        console.log(" response status : ", response.status);
        if (response.status === 200) {
          this.setState({
            successFlag: true
          });
        } else {
          this.props.history.push('/')
        }
      });
  };

  render() {
    // var emailfromprops = this.props.location.state.email;
    // console.log(emailfromprops);
    let header = null;
    if(localStorage.getItem("isAdmin") == "false"){
      header = <Header/>
    }else{
      header = <AdminHeader/>
    }
    let redirectVar = null
    if(this.state.successFlag) {
        redirectVar = <Redirect to="/searchOrganization" />
    }
    return (
      <div style={{ backgroundColor: "#243e8c" }}>
      {redirectVar}
        <div style={{ backgroundColor: "#243e8c" }}>
          {header}
          <div style={{ backgroundColor: "#243e8c" }}>
            <div class="login-form">
              <div class="user-div">
                <b>
                  <h2>Profile</h2>
                </b>
                <hr />
                {/* <div class="row">
                                    <img src="" width="100px" height="100px" />
                                    <div class="col">
                                        <input type="file" class="form-control-file" id="exampleFormControlFile1" /><br />
                                        <button type="button" class="btn btn-outline-primary btn-sm btn-block">Upload</button>
                                        <a href="#" class="toggle">(edit profile)</a>
                                    </div>
                                </div> */}
                <br />

                <form onSubmit={this.submitHandler}>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="staticEmail">Email</label>
                      {/* <div class="col-sm-10">
                                                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={JSON.parse(JSON.stringify(emailfromprops)})/>
                                            </div> */}

                      {/* <input type="email" class="form-control" id="inputEmail4" placeholder="Email" readonly></input>
                      <input
                        type="text"
                        readonly
                        class="form-control"
                        id="staticEmail"
                        value={localStorage.getItem("email")}
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="input">Username</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword4"
                        value={this.state.userName}
                        readOnly
                        placeholder="Username"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="input">Business Title</label>
                      <input
                        type="text"
                        name="businesstitle"
                        class="form-control"
                        id="inputPassword4"
                        placeholder="Business Title"
                        value={this.state.businesstitle}
                        onChange={this.businesstitleHandler}
                      />
                    </div>
                  </div> */}

                                            {/* <input type="email" class="form-control" id="inputEmail4" placeholder="Email" readonly></input> */}
                                            <input type="text" readonly class="form-control" id="staticEmail" value={this.state.email}></input>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="input">Username</label>
                                            <input type="text" class="form-control" id="inputPassword4" value={this.state.userName} readOnly placeholder="Username" />
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="input">Business Title</label>
                                            <input type="text" name="businesstitle" class="form-control" id="inputPassword4" placeholder="Business Title" value={this.state.businesstitle} onChange={this.businesstitleHandler} />
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputstreet">street</label>
                                            <input type="text" name="street" class="form-control" id="inputstreet" placeholder="1234 Main St" value={this.state.street} onChange={this.streetHandler} />
                                        </div>
                                        <div class="form-group col-md-2">
                                            <label for="inputCity">City</label>
                                            <input type="text" name="city" class="form-control" id="inputCity" value={this.state.city} onChange={this.cityHandler} />
                                        </div>
                                        <div class="form-group col-md-2">
                                            <label for="inputCity">State</label>
                                            <input type="text" name="state" class="form-control" id="inputState" value={this.state.state} onChange={this.stateHandler} />
                                        </div>
                                        <div class="form-group col-md-2">
                                            <label for="inputZip">Zip</label>
                                            <input type="text" name="zip" class="form-control" id="inputZip" value={this.state.zip} onChange={this.zipHandler} />
                                        </div>
                                    </div>

                  {/* <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputstreet">street</label>
                      <input
                        type="text"
                        name="street"
                        class="form-control"
                        id="inputstreet"
                        placeholder="1234 Main St"
                        value={this.state.street}
                        onChange={this.streetHandler}
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputCity">City</label>
                      <input
                        type="text"
                        name="city"
                        class="form-control"
                        id="inputCity"
                        value={this.state.city}
                        onChange={this.cityHandler}
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputCity">State</label>
                      <input
                        type="text"
                        name="state"
                        class="form-control"
                        id="inputState"
                        value={this.state.state}
                        onChange={this.stateHandler}
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input
                        type="text"
                        name="zip"
                        class="form-control"
                        id="inputZip"
                        value={this.state.zip}
                        onChange={this.zipHandler}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">About Me</label>
                    <textarea
                      name="aboutme"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      value={this.state.aboutme}
                      onChange={this.aboutmeHandler}
                    />
                  </div> */}
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Update
                  </button>
                  <br />
                </form>
                {/* <button
                    type="submit"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Later
                  </button> */}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
