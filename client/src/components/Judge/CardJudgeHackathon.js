import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Miscellanous/Header';
import Footer from '../Miscellanous/Footer';
import {url} from '../Config_url'

export default class CardJudgeHackathon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hackathonId : this.props.id,
            fetchFlag : false,
            grade : "",
            teams : []
        }
        this.gradingHandler = this.gradingHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    componentDidMount() {
        
        // axios.defaults.withCredentials = true
        axios.get(`${url}/teams/evaluation/${this.state.hackathonId}`)
            .then(response => {

                console.log(JSON.stringify(response.data))
                if (response.status === 200) {
                    this.setState({
                        fetchFlag : true,
                    //    teams : this.state.teams.concat(JSON.stringify(response.data))
                            teams : JSON.parse(JSON.stringify(response.data))
                    })
                }
            })
    }

    gradingHandler = (s) => {
        this.setState({
            grade : s.target.value
        })
    }
    // submitHandler = (s) => {
    //     console.log(this.state.grade)
    //     console.log(s.target.id)

    // }

    submitHandler = (s) =>  {
        var headers = {
          Authorization: localStorage.getItem("token")
        }; 

        // const data = {
        //     grade : parseFloat(this.state.grade)
        // }
        axios.post(`${url}/teams/assignGrade/${s.target.id}/${this.state.grade}`, {
          headers
        }).then(response => {
          console.log(' the resposne :' + JSON.stringify(response.data))
          if(response.status === 200){
                console.log("done")
            } else {
                console.log(response)
            }
        });
      }

    render() {
        let viewTeam = null
        if(this.state.fetchFlag) {
            viewTeam = this.state.teams.map(t => {

                return(
                    
                    <div>
                    <div class="form-group">
                        <div class="card" >
                            <div class="card-body">
                        
                                <h6 class="card-title">Team Name {t.teamName}</h6>
                                <p class="card-text">URL: {t.submissionLink} </p>
                                
                                <input type="number" min="0" max="10" step="0.5" value={t.grade} name="grade" onChange={this.gradingHandler} class="hackathonscore-form-control" id="colFormLabelSm" placeholder="Grade" />
                                <span class="judge-tab" /> 
                                <button type="button" onClick={this.submitHandler} id={t.id} class="btn btn-outline-warning btn-sm">Submit Score</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                )
            })
        }
        return (
            <div>
                {Header}
                {viewTeam}
                
            </div>
        )
    }
}


