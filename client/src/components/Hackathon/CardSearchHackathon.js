import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Miscellanous/Header';
import Footer from '../Miscellanous/Footer';
import {url} from '../Config_url'

export default class SearchOrganization extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    submitHandler = (h) => {
        h.preventDefault()
        const data = {

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

        return (
            <div>
                <div class="form-group">
                    <div class="card" >
                        <div class="card-body">
                            <h6 class="card-title"> Organization Name<span class="tab"/><button type="button" class="btn btn-outline-success btn-sm">Request to Join</button></h6>
                            <h6 class="card-subtitle mb-2 text-muted"> Subtitle</h6>
                            <p class="card-text">something</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
