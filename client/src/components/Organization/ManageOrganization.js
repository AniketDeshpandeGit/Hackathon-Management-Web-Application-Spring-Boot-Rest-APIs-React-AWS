import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import OrganizationCard from "./CardCreatedOrganization";
import {url} from '../Config_url'

export default class ManageOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org_list: {},
      successFlag: false,
      requestThrough: false,
      routeCreateOrg: false,
      search: false,
      searchKey: "",
      orgIDState: ""
    };

    this.eventNameHandler = this.eventNameHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.feeHandler = this.feeHandler.bind(this);
    this.minTeamSizeHandler = this.minTeamSizeHandler.bind(this);
    this.maxTeamSizeHandler = this.maxTeamSizeHandler.bind(this);
    this.requestFunc = this.requestFunc.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.searchKeyChange = this.searchKeyChange.bind(this);
  }

  searchKeyChange(event) {
    this.setState({ searchKey: event.target.searchKey });
  }

  componentDidMount() {
    var self = this;
    // var headers = {
    //   Authorization:
    //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyNUBnbWFpbC5jb20iLCJleHAiOjE1NTgxNjQ2OTd9.HBZDR9CURIkZ-7IkRLA5_-k0_XcceFo83q99wkTcjFK0B9XzK8PRFub23DmXQnZ-CVbPUcFfus73qg0fSvTTTQ"
    // };

    // var headers = {
    //   Authorization: localStorage.getItem("token")
    // };

    // axiox.get(`${url}/organizations/getCreatedOrganistions`, { headers },
    // )

    axios
      .get(
        `${url}/organizations/getOrganisationRequests/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )

      .then(response => {
        //resp = JSON.stringify(response);

        self.setState({
          org_list: response.data
        });

        //lert("response " + response.data);
        console.log("response : ", response.data);

        for (let k in response.data) {
          console.log("Value : ", response.data[k][0]);
        }
        //this.state.org_list = this.state.property_list.concat(response.data);

        this.state.org_list = response.data;
        console.log("map " + this.state.org_list[13]);
      })
      .catch(function(error) {
        // handle error
        console.log("error: " + error);
      });

    console.log("out resp " + JSON.stringify(this.state.org_list));
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

  acceptFunc = item => {
    console.log("acceptFunc: ");
    var self = this;
    let orgIDNew;

    //get id from org name first
    var body = {
      orgName: item.organization_id
    };
    var headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(`${url}/organizations/name/${item.organization_id}`, {
        headers
      })
      .then(response => {
        console.log("Name response " + response.data.id);
        orgIDNew = response.data.id;
        self.state.orgIDState = response.data.id;
        var data = {
          user_id: item.user_id,
          organization_id: self.state.orgIDState
        };

        console.log(' data before sending : ' + data)

        // var headers = {
        //   Authorization: localStorage.getItem("token")
        // };

        if (!item.accept) {
          // alert("in reject " + !item.accept);
          // alert("date reject " + JSON.stringify(data));
          axios
            .post('${url}/denyrequest/deny', data, {
              headers
            })
            .then(response => {
              //resp = JSON.stringify(response);

              // self.setState({
              //   requestThrough: true
              // });

              alert("Accept response " + response.data);

              //this.state.requestThrough = true;
              //console.log("response " + response.data);
            })
            .catch(function(error) {
              // handle error
              alert("error: " + error);
            });
        } else {
          axios
            .post(`${url}/joinrequest/accept`, data, {
              headers
            })
            .then(response => {
              //resp = JSON.stringify(response);

              // self.setState({
              //   requestThrough: true
              // });

              alert("Accept response " + response.data);

              //this.state.requestThrough = true;
              //console.log("response " + response.data);
            })
            .catch(function(error) {
              // handle error
              console.log("error: " + error);
            });
        }
      })
      .catch(function(error) {
        // handle error
        console.log("error: " + error);
      });

    // now post accept
  };

  denyFunc = item => {
    console.log("acceptFunc: ");
    var self = this;
    var orgIDNew;

    //get id from org name first
    var data1 = {
      orgName: item.organization_id
    };
    var headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(`${url}/organizations/name`, data1, {
        headers
      })
      .then(response => {
        //resp = JSON.stringify(response);

        // self.setState({
        //   requestThrough: true
        // });

        alert("Name response " + response.data.id);
        orgIDNew = response.data.id;

        //this.state.requestThrough = true;
        //console.log("response " + response.data);
      })
      .catch(function(error) {
        // handle error
        console.log("error: " + error);
      });

    // now post accept
    var data = {
      user_id: item.user_id,
      organization_id: orgIDNew
    };

    // var headers = {
    //   Authorization: localStorage.getItem("token")
    // };
  };

  requestFunc = item => {
    //h.preventDefault();

    console.log("submit: ");
    // var self = this;
    // var data = {
    //   user_id: item.user_id,
    //   organization_id: item.organization_id
    // };

    // var headers = {
    //   Authorization: localStorage.getItem("token")
    // };
    // // var headers = {
    // //   Authorization:
    // //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyNUBnbWFpbC5jb20iLCJleHAiOjE1NTgxNjQ2OTd9.HBZDR9CURIkZ-7IkRLA5_-k0_XcceFo83q99wkTcjFK0B9XzK8PRFub23DmXQnZ-CVbPUcFfus73qg0fSvTTTQ"
    // // };
    // axios
    //   .post(`${url}/joinrequest/send`, data, {
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

    let CreateOrg = null;
    if (this.state.routeCreateOrg) {
      console.log("Inside 1");
      CreateOrg = <Redirect to="/createOrganization" />;
    }

    console.log("rend: " + this.state.org_list);
    var arr3 = Object.values(this.state.org_list);
    console.log(JSON.stringify(arr3));
    // console.log(this.state.property_list.length)
    var elements = [];
    // for (var i = 0; i < this.state.org_list.length; i++) {
    //   //var name = arr3[i].name;
    //   // if (name.includes(this.state.searchKey)) {

    //   // for (var j = 0; j < this.state.org_list[i].length; i++) {
    //   //   elements.push(
    //   //     <OrganizationCard
    //   //       key={j}
    //   //       props={arr3[i][j]}
    //   //       func={this.requestFunc}
    //   //     />
    //   //   );
    //   // }
    //   elements.push(
    //     <OrganizationCard key={i} props={arr3[i]} func={this.requestFunc} />
    //   );
    // }

    //response.data[k][0]
    for (let k in this.state.org_list) {
      for (var j = 0; j < this.state.org_list[k].length; j++) {
        elements.push(
          <OrganizationCard
            k={k}
            props={this.state.org_list[k][j]}
            acceptFunc={this.acceptFunc}
          />
        );
      }
    }

    var page = null;

    if (this.state.requestThrough) {
      page = (
        <div class="organization-main-div">
          {/* <img src={openhacklogo} width="75px" height="75px" /> */}
          <h2>Thank you! The request is sent to the Organization!</h2>
        </div>
      );
    } else {
      page = (
        <div class="organization-main-div">{elements}</div>

        // <div class="organization-main-div">
        //   {CreateOrg}
        //   <div class="organization-panel">
        //     <h2>Search an Organization to Join</h2>
        //     <br />
        //     <div class="form-group">
        //       <div class="input-group mb-3">
        //         <input
        //           type="text"
        //           class="form-control"
        //           placeholder="Organization Name"
        //           aria-label="Recipient's username"
        //           aria-describedby="button-addon2"
        //           value={this.state.searchKey}
        //           onChange={this.searchKeyChange}
        //         />
        //         <div class="input-group-append">
        //           <button
        //             class="btn btn-outline-primary"
        //             type="button"
        //             id="button-addon2"
        //             onClick={this.search}
        //           >
        //             Search
        //           </button>
        //           <span class="tabmini" />
        //           <button
        //             type="button"
        //             class="btn btn-outline-danger"
        //             onClick={this.routeChange}
        //           >
        //             + Create
        //           </button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        //   <form onSubmit={this.submitHandler} style={{ marginTop: "110px" }}>
        //     {elements}
        //   </form>
        // </div>
      );
    }

    return (
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {/* {redirectVar} */}
        <Header />
        <div>
          <div>
            <h1> Created Organization </h1>
          </div>
          <div>
            <div class="organization-login-form">{page}</div> />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
