import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import { Form, Select } from 'antd';
import {url} from '../Config_url'

const listOfUsers = [''];
const dict = {}

export default class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathonId: this.props.match.params.id,
      submission_link: "",
      team_id : "",
      successFlag : false
    };

    this.subissionHandler = this.subissionHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  componentDidMount() {
    var headers = {
      Authorization: localStorage.getItem("token")
    };

    const data = {
        hackathonId : this.state.hackathonId,
        userId : localStorage.getItem('userId')
    }
      axios
      .post(
        `${url}/teams/getTeamId`,
        data
      )
      .then(response => {
        console.log(response.data.status.string)
        console.log(" response teamId : ", response.data.team_id.string);
        if (response.status === 200) {
          this.setState({
                team_id : response.data.team_id.string,
                hackStatus : response.data.status.string
          });
        }
      });

  }

  subissionHandler = h => {
    this.setState({
      submission_link: h.target.value
    });
  };

  

  submitHandler = h => {
    h.preventDefault();

    const data = {
      submission_link : this.state.submission_link
    };

    console.log(" data " + JSON.stringify(data) )
    axios.post(`${url}/teams/submission/${this.state.hackathonId}`, data).then(response => {
      console.log(" response from server : ", response.data);
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
        <Redirect to='/myHackathon' />
    )}
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
                  <h2>Enter Github link for Submission</h2>
                  <br />
                </div>
                <form onSubmit={this.submitHandler}>
                  <div class="form-group">
                    <input
                      name="teamName"
                      class="form-control"
                      type="text"
                      placeholder="Github Link"
                      onChange={this.subissionHandler}
                      required
                    />
                  </div>
                  
                  <br />

                  <button
                    type="submit"
                    class="btn btn-secondary btn-lg btn-block"
                  >
                    Submit
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
