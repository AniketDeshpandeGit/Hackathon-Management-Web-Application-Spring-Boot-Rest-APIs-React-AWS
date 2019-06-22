import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Miscellanous/Header';
import Footer from '../Miscellanous/Footer';
import {Link} from 'react-router-dom'
import {url} from '../Config_url'

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: "",
            description: "",
            fee: "",
            minTeamSize: "",
            maxTeamSize: "",
            passIdToProps: "",
            successFlag: false
        }

        this.eventNameHandler = this.eventNameHandler.bind(this)
        this.descriptionHandler = this.descriptionHandler.bind(this)
        this.feeHandler = this.feeHandler.bind(this)
        this.minTeamSizeHandler = this.minTeamSizeHandler.bind(this)
        this.maxTeamSizeHandler = this.maxTeamSizeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentWillMount() {
        this.setState({
            successFlag: false
        })
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
        axios.post(`${url}/hackathons`, data)
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
        const openhacklogo = require('../Miscellanous/oh.png');
        return (
            <div style={{ backgroundColor: "#000000"}}>
                {/* <Header /> */}
                <div style={{ backgroundColor: "#000000"}}>
                    <div style={{ backgroundColor: "#000000"}} class="container">
                        <div class="col-md-12">
                            <img class="img-responsive" src={openhacklogo} alt="" />
                            <Link class="btnl btn-danger btn-lg" to="/signup">Register</Link>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}
