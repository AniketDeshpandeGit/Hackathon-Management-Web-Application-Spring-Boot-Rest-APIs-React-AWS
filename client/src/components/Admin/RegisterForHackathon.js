import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import { Form, Select } from 'antd';
import {url} from '../Config_url'

const listOfUsers = [''];
const dict = {}

export default class RegisterForHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathonId: this.props.match.params.id,
      teamName: "",
      fetchedUsers : [],
      teamMembers: [],
      successFlag : false
    };

    this.teamNameHandler = this.teamNameHandler.bind(this);
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

    axios
      .get(`${url}/users/getAllUsers`, {
        headers
      })
      .then(response => {
        console.log(" response " + JSON.stringify(response.data))
        this.setState({
          fetchedUsers : response.data
        })
        
        for(var i = 0; i < this.state.fetchedUsers.length; i++) {
            listOfUsers.push(this.state.fetchedUsers[i].email);
            dict[this.state.fetchedUsers[i].email] = this.state.fetchedUsers[i].id;
        }
      })
      .catch(function(error) {
        console.log("error: " + error);
      });

  }

  teamNameHandler = h => {
    this.setState({
      teamName: h.target.value
    });
  };

  handleOptionChange = teamMembers => {
    this.setState({ teamMembers });
  };

  submitHandler = h => {
    h.preventDefault();

    var members = []
    for(var i = 0; i < this.state.teamMembers.length; i++) {
      members.push({
        userId : dict[this.state.teamMembers[i]],
        hackathonId : this.state.hackathonId
      })
    }
    const data = {
      hackathonId: this.state.hackathonId,
      teamName: this.state.teamName,
      teamSize: this.state.teamMembers.length,
      userId: localStorage.getItem('userId'),
      teamMembers: members
    };

    console.log(" data " + JSON.stringify(data) )
    axios.post(`${url}/teams`, data).then(response => {
      console.log(" response from server : ", response.data);
      if (response.status === 200) {
        this.setState({
          successFlag: true
        });
      }
    });
  };

  render() {
    console.log(listOfUsers)
    const { teamMembers} = this.state
    const filteredOptions = listOfUsers;
    let redirectVar = null;
    if (this.state.successFlag) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/myHackathon"
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
                  <h2>Register Team for Hackathon</h2>
                  <br />
                </div>
                <form onSubmit={this.submitHandler}>
                  <div class="form-group">
                    <input
                      name="teamName"
                      class="form-control"
                      type="text"
                      placeholder="Enter the Team Name"
                      onChange={this.teamNameHandler}
                      required
                    />
                  </div>
                  
                  <div className="App">
                <div className="box effect1">
                    <div className="contentClass">
                        <Form.Item
                            style={{ width: '100%' }}>
                            <Select
                                mode="multiple"
                                placeholder="Choose team member(s)"
                                value={teamMembers}
                                onChange={this.handleOptionChange}
                                style={{ width: '100%' }}>
                                {filteredOptions.map(item => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </div >

                  <br />

                  <button
                    type="submit"
                    class="btn btn-secondary btn-lg btn-block"
                  >
                    Register
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
