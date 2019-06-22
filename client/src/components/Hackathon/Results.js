import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Admin/AdminHeader";
import {Link} from "react-router-dom";
import {url} from '../Config_url'

class Result extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hackathons: []
        }
    }

    componentWillMount() {
        var headers = {
            Authorization: localStorage.getItem("token")
        };
        axios.get(`${url}/hackathons/getfinalisedHackathons`, {
        })
        .then((response)=>{
            console.log("Hacks : ", response.data);
            this.setState({
                hackathons: response.data
            })
        })
    }
    
    render(){
        let hacks = null;
        hacks = this.state.hackathons.map((m,index) => {
            return(
                <tr key={m.eventName}  >
                    <th scope="row">{index + 1}</th>
                    <td>{m}</td>
                    <Link to= {`/showWinner/${m}`} class="btn btn-primary">View</Link>
                </tr>
            )
        });
        return(
            <div>
                <Header />
                <br/><br/>
                <br/><br/>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Hackathon Name</th>
                            <th scope="col">Winner Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hacks}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Result;

