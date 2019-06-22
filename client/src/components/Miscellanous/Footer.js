import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

export default class Footer extends Component {

    render() {

        return (
            <div>
                <nav class="navbar fixed-bottom navbar-light bg-light">
                   OpenHack 2019. All rights reserved.
                </nav>
            </div>

        )
    }
}
