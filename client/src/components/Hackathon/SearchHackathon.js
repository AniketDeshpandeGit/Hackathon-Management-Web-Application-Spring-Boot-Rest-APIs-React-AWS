import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import HackathonCard from "../Hackathon/CardSearchHackathon";
import {url} from '../Config_url'

export default class SearchHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathon_list: [],
      successFlag: false,
      requestThrough: false,
      routeCreateOrg: false,
      search: false,
      searchKey: "",
      join: false,
      alice: false
    };

    // this.eventNameHandler = this.eventNameHandler.bind(this);
    // this.descriptionHandler = this.descriptionHandler.bind(this);
    // this.feeHandler = this.feeHandler.bind(this);
    // this.minTeamSizeHandler = this.minTeamSizeHandler.bind(this);
    // this.maxTeamSizeHandler = this.maxTeamSizeHandler.bind(this);
    // this.requestFunc = this.requestFunc.bind(this);
    // this.routeChange = this.routeChange.bind(this);
    // this.searchKeyChange = this.searchKeyChange.bind(this);
  }

  searchKeyChange(event) {
    this.setState({ searchKey: event.target.searchKey });
  }

  componentDidMount() {
    console.log(localStorage.getItem("userId"));
    // alert(localStorage.getItem("userId"));
    // if (localStorage.getItem("userId") === 19) {
    //   console.log("alice");
    //   // alert("alice");

    //   this.setState({
    //     alice: true
    //   });

    //   this.state.alice = true;

    //   console.log("alice" + this.state.alice);
    //   // alert("alice" + this.state.alice);
    // }

    var self = this;
    // var headers = {
    //   Authorization:
    //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyNUBnbWFpbC5jb20iLCJleHAiOjE1NTgxNjQ2OTd9.HBZDR9CURIkZ-7IkRLA5_-k0_XcceFo83q99wkTcjFK0B9XzK8PRFub23DmXQnZ-CVbPUcFfus73qg0fSvTTTQ"
    // };

    var headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(`${url}/hackathons/getAllHackathons`, {
        headers
      })
      .then(response => {
        console.log('the hackathons : ' + JSON.stringify(response.data))
        //resp = JSON.stringify(response);

        self.setState({
          hackathon_list: response.data
        });

        // alert("response " + response.data);

       // this.state.org_list = this.state.property_list.concat(response.data);
        //console.log("hi" + resp);
      })
      .catch(function(error) {
        // handle error
        console.log("error: " + error);
      });

    console.log("out resp " + JSON.stringify(this.state.hackathon_list));
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

  routeChange() {
    this.setState({
      routeCreateOrg: true
    });
  }

  requestFunc = item => {
    //h.preventDefault();

    console.log("button: ");
    // alert("button: ");
    // var self = this;
    // var data = {
    //   user_id: item.user_id,
    //   organization_id: item.organization_id
    // };

    // this.setState({
    //   join: true
    // });

    // var headers = {
    //   Authorization: localStorage.getItem("token")
    // };
    // // var headers = {
    // //   Authorization:
    // //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyNUBnbWFpbC5jb20iLCJleHAiOjE1NTgxNjQ2OTd9.HBZDR9CURIkZ-7IkRLA5_-k0_XcceFo83q99wkTcjFK0B9XzK8PRFub23DmXQnZ-CVbPUcFfus73qg0fSvTTTQ"
    // // };
    // axios
    //   .post("http://localhost:8080/joinrequest/send", data, {
    //     headers
    //   })
    //   .then(response => {
    //     //resp = JSON.stringify(response);

    //     self.setState({
    //       requestThrough: true
    //     });

    //     //alert("response " + response.data);

    //     this.state.requestThrough = true;
    //     //console.log("hi" + resp);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log("error: " + error);
    //   });
  };

  render() {
    console.log("this.state.requestThrough: " + this.state.requestThrough);
    let redirectVar = null;
    if (this.state.successFlag) {
      console.log("Inside");
      redirectVar = <Redirect to="/" />;
    }

    let temp = null;
    if (this.state.join) {
      console.log("joining");
      // alert("joining");
      temp = <Redirect to="/registerForHackathon" />;
    }

    let tem = null;
    if (this.state.alice) {
      console.log("alice");
      // alert("alice");
      temp = <h3>Alice here</h3>;
    }

    let CreateOrg = null;
    if (this.state.routeCreateOrg) {
      console.log("Inside 1");
      CreateOrg = <Redirect to="/createOrganization" />;
    }

    console.log("rend: " + this.state.hackathon_list);
    var arr3 = Object.values(this.state.hackathon_list);
    console.log(arr3);
    // console.log(this.state.property_list.length)
    var elements = [];
    for (var i = 0; i < this.state.hackathon_list.length; i++) {
      var name = arr3[i].name;
      // if (name.includes(this.state.searchKey)) {
      elements.push(
        <HackathonCard key={i} props={arr3[i]} func={this.requestFunc} />
      );
      // }
    }

    var page = null;

    if (this.state.requestThrough) {
      page = (
        <div class="organization-main-div">
          {/* <img src={openhacklogo} width="75px" height="75px" /> */}
          <h2>Thank you! The request is sent to the Hackathon!</h2>
        </div>
      );
    } else {
      page = (
        <div class="organization-main-div">
          {CreateOrg}
          {temp}
          <div class="organization-panel">
            {/* <img src={openhacklogo} width="75px" height="75px" /> */}
            <h2>Search an Hackathon to Join {tem}</h2>

            <br />
            <div class="form-group">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Organization Name"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={this.state.searchKey}
                  onChange={this.searchKeyChange}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                    onClick={this.search}
                  >
                    Search
                  </button>
                  <span class="tabmini" />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={this.routeChange}
                    style={{
                      display:
                        localStorage.getItem("userId") === 19 ? "none" : "block"
                    }}
                  >
                    + Open
                  </button>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={this.submitHandler} style={{ marginTop: "110px" }}>
            {elements}
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
            <div class="organization-login-form">{page}</div> />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
