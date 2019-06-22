import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({});
  }

  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
  };

  render() {
    const openhacklogo = require("../Miscellanous/openhack.png");
    return (
      <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img
              src={openhacklogo}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            &nbsp; OpenHack
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              {/* <li class="nav-item active">
                <a class="nav-link" href="/user">
                  Profile <span class="sr-only">(current)</span>
                </a>
              </li> */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hackathons
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/viewHackathon">
                    Join any Hackathon
                  </a>
                  <a class="dropdown-item" href="/myHackathon">
                    View My Hackathon
                  </a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Organizations
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  
                  <a class="dropdown-item" href="/manageOrganization">
                    Manage My Organization
                  </a>

                  <div class="dropdown-divider" />

                  <a class="dropdown-item" href="/searchOrganization">
                    Join any Organization
                  </a>
                  <a class="dropdown-item" href="/createOrganization">
                    Create an Organization
                  </a>
                </div>
              </li>
              
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/profile">
                    Profile
                  </a>
                  <a class="dropdown-item" href="/myOrganization">
                    Organization
                  </a>
                  <a
                    class="dropdown-item"
                    href="/login"
                    onClick={this.logoutHandler}
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
