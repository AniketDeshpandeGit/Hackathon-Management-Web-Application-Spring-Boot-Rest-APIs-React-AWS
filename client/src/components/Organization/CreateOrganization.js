import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import {url} from '../Config_url'

export default class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ownerId: "",
      description: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      isCreated: false,
      successFlag: false
    };

    this.nameHandler = this.nameHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.ownerIdHandler = this.ownerIdHandler.bind(this);
    this.streetHandler = this.streetHandler.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.zipHandler = this.zipHandler.bind(this);
    this.cityHandler = this.cityHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  zipHandler = h => {
    this.setState({
      zip: h.target.value
    });
  };

  cityHandler = h => {
    this.setState({
      city: h.target.value
    });
  };

  nameHandler = h => {
    this.setState({
      name: h.target.value
    });
  };
  descriptionHandler = h => {
    this.setState({
      description: h.target.value
    });
  };
  ownerIdHandler = h => {
    this.setState({
      ownerId: h.target.value
    });
  };
  streetHandler = h => {
    this.setState({
      street: h.target.value
    });
  };
  stateHandler = h => {
    this.setState({
      state: h.target.value
    });
  };

  submitHandler = h => {
    h.preventDefault();

    var headers = {
      Authorization: localStorage.getItem("token")
    };

    console.log("userId: " + localStorage.getItem("token"));
    // alert("userId: " + localStorage.getItem("token"));
    const data = {
      name: this.state.name,
      ownerId: localStorage.getItem("userId"),
      description: this.state.description,
      address: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
    };
    console.log(data);
    // axios.defaults.withCredentials = true
    axios
      .post(`${url}/organizations`, data, { headers })
      .then(response => {
        console.log(response.data.id);
        if (response.status === 200) {
          this.setState({
            successFlag: true,
            isCreated: true
          });
        }
      });
  };

  render() {
    // let redirectVar = null;
    // if (this.state.successFlag) {
    //   redirectVar = (
    //     <Redirect
    //       to={{
    //         pathname: "/user",
    //         state: { id: this.state.passIdToProps }
    //       }}
    //     />
    //   );
    // }

    var page = null;
    if (this.state.isCreated) {
      page = (
        <div class="organization-main-div">
          {/* <img src={openhacklogo} width="75px" height="75px" /> */}
          <h2>
            Congratulations! The Organization has been created successfully!
          </h2>
        </div>
      );
    } else {
      page = (
        <div class="hackathon-main-div">
          <div class="hackathon-panel">
            {/* <img src={openhacklogo} width="75px" height="75px" /> */}
            <h2>Create Organization</h2>
            <br />
          </div>
          <form onSubmit={this.submitHandler}>
            <div class="form-group">
              <input
                name="name"
                class="form-control"
                type="text"
                placeholder="Organization Name"
                onChange={this.nameHandler}
                required
              />
            </div>
            <div class="form-group">
              <input
                name="description"
                class="form-control"
                type="text"
                placeholder=" Description"
                onChange={this.descriptionHandler}
                required
              />
            </div>
            <div class="form-group">
              <input
                name="street"
                class="form-control"
                type="text"
                placeholder="Street Address"
                onChange={this.streetHandler}
                required
              />
            </div>
            <div class="form-group">
              <input
                name="city"
                class="form-control"
                type="text"
                placeholder="City"
                onChange={this.cityHandler}
                required
              />
            </div>
            <div class="form-group">
              <input
                name="state"
                class="form-control"
                type="text"
                placeholder="State"
                onChange={this.stateHandler}
                required
              />
            </div>
            <div class="form-group">
              <input
                name="zip"
                class="form-control"
                type="text"
                placeholder="Zipcode"
                onChange={this.zipHandler}
                required
              />
            </div>
            <br />
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Create
            </button>
            <br />
          </form>
        </div>
      );
    }
    return (
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {/* {redirectVar} */}
        <Header />
        <div>
          <div>
            <div class="hackathon-login-form">{page}</div> />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
