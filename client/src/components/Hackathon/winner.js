import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Admin/AdminHeader";
import {Link} from "react-router-dom";
import {url} from '../Config_url'

class Winner extends Component{
    constructor(props) {
        super(props);
        this.state = {
            others : [],
            winners : []
        }
    }

    componentWillMount() {
        var data = {
            "eventName" : this.props.match.params.id
        }

        console.log("Data : ", data);
        var headers = {
             Authorization: localStorage.getItem("token")
        };
        axios.post(`${url}/hackathons/finaliseHackathon`, data)
        .then((response)=>{
            console.log("Hacks : ", response.data);
            this.setState({
                others : this.state.others.concat(response.data["Others"]),
                winners : this.state.winners.concat(response.data["Winners"])
            })
        })
    }
    render(){
        let winners = null;
        let others = null;
        console.log("Others : ", this.state.others);
        console.log("Winners : ", this.state.winners);
        
        winners = this.state.winners.map((w,index) => {
            let members = null;
            members  = w.teamMembers.map((m) => {
                return(
                    m.userName + ", "
                )
            })
            
            return(
                <tr class="alert alert-success">
                    <th style= {{paddingTop : "10px", paddingBottom : "10px", marginTop : "10px", marginBottom : "10px"}} scope="row">{index + 1}</th>
                    <td>{w.teamName}</td>
                    <td>{members}</td>
                    <td>{w.teamScore}</td>
                </tr>
            )
            
           
        });

        others = this.state.others.map((w,index) => {
            let members = null;
            members  = w.teamMembers.map((m) => {
                return(
                    m.userName + ", "
                )
            })
            
            return(
                <tr class="alert alert-info">
                    <th style= {{paddingTop : "10px", paddingBottom : "10px", marginTop : "10px", marginBottom : "10px"}} scope="row">{index + 1}</th>
                    <td>{w.teamName}</td>
                    <td>{members}</td>
                    <td>{w.teamScore}</td>
                </tr>
            )
            
           
        });

        return(
            <div>
                <Header />
                <br/><br/>
                <br/><br/>
                <h3 style={{alignContent:"center", marginLeft : "35%"}}>Hackathon Name : {this.props.match.params.id}</h3>
                <table class="table" style = {{borderCollapse:"separate", borderSpacing:"0 15px" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Team Name</th>
                            <th scope="col">Members</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners}
                        {others}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Winner;

