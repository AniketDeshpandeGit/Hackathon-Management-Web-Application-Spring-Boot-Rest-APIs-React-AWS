import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Miscellanous/Header';
import Footer from '../Miscellanous/Footer';
import CardJudgeHackathon from '../Judge/CardJudgeHackathon';
import {url} from '../Config_url'

export default class JudgeHackathon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            HackathonId : this.props.match.params.id,
            eventName: "",
            description: "",
            passIdToProps: "",
            startDate : "",
            endDate : "",
            successFlag: false
        }

        this.eventNameHandler = this.eventNameHandler.bind(this)
        this.descriptionHandler = this.descriptionHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentWillMount() {
        this.setState({
            successFlag: false
        })
    }

    componentDidMount() {
        var headers = {
          Authorization: localStorage.getItem("token")
        }; 
        axios.get(`${url}/hackathons/${this.state.HackathonId}`, {
          headers
        }).then(response => {
          console.log(' the resposne :' + JSON.stringify(response.data))
          if(response.status === 200){
            this.setState({
                successFlag : true,
                eventName : response.data.eventName,
                description : response.data.description,
                startDate : response.data.startTime,
                endDate : response.data.endTime
            })
          } else{
            this.setState({
                successFlag : false
            })
          }
        });
      }


    eventNameHandler = (h) => {
        this.setState({
            eventName: h.target.value
        })
    }
    descriptionHandler = (h) => {
        this.setState({
            description: h.target.value
        })
    }
    feeHandler = (h) => {
        this.setState({
            fee: h.target.value
        })
    }
    minTeamSizeHandler = (h) => {
        this.setState({
            minTeamSize: h.target.value
        })
    }
    maxTeamSizeHandler = (h) => {
        this.setState({
            maxTeamSize: h.target.value
        })
    }

    submitHandler = (h) => {
        h.preventDefault()
        const data = {
            eventName: this.state.eventName,
            description: this.state.description,
            fee: this.state.fee,
            minTeamSize: this.state.minTeamSize,
            maxTeamSize: this.state.maxTeamSize
        }
        // axios.defaults.withCredentials = true
        axios.post('${url}/hackathons', data)
            .then(response => {

                console.log(response.data.id)
                if (response.status === 200) {
                    this.setState({
                        successFlag: true
                    })
                }
            })
    }

    render() {
        // let redirectVar = null
        // if (this.state.successFlag) {
        //     redirectVar = <Redirect to={{
        //         pathname: '/hackathonDetails',
        //         state: { id: this.state.passIdToProps }
        //     }} />
        // }
        return (
            <div style={{ backgroundColor: "#f2f2f2" }}>
                {/* {redirectVar} */}
                <Header />
                <div>


                    <div>
                        <div class="organization-login-form">
                            <div class="organization-main-div">
                                <div class="organization-panel">
                                    {/* <img src={openhacklogo} width="75px" height="75px" /> */}
                                    <h5>Judge Hackathon</h5><br />
                                    Hackathon Name: {this.state.eventName}<br/>
                                    Hackathon Description: {this.state.description} <br/>
                                    Start Date : {this.state.startDate} , End Date : {this.state.endDate} <br/>
                                    
                                    {/* <div class="form-group">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Organization Name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-primary" type="button" id="button-addon2">Search</button><span class="tabmini"/><button type="button" class="btn btn-outline-danger">+ Create</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <form onSubmit={this.submitHandler} style={{marginTop: '110px'}} >
                                <CardJudgeHackathon id={this.state.HackathonId}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
