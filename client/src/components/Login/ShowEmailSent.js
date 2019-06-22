import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Miscellanous/Header';
import Footer from '../Miscellanous/Footer';
import OrganizationCard from '../Organization/CardSearchOrganization';
import fire from '../../fire';
import seeFirebaseDetails from './helperFunctions';

export default class ShowEmailSent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        const openhacklogo = require('../Miscellanous/openhack.png');
        var user = fire.auth().currentUser;
       // seeFirebaseDetails(user);
        return (
            <div style={{ backgroundColor: "#f2f2f2" }}>
                {/* {redirectVar} */}
                {/* <Header /> */}
                <div>
                    <div>
                        <div>
                            <div class="hackathon-login-form">
                                <div class="hackathon-main-div">
                                    <div class="hackathon-panel">
                                        <img src={openhacklogo} width="75px" height="75px" /><br/><br/>
                                        <h5>Verification Email Sent!</h5><br />
                                    </div>
                                    <div class="form-group">
                                        <div class="card" >
                                            <div class="card-body">
                                                <p class="card-text">A verification email has been sent to your email address, please log in after you verify the email</p>
                                                <a class="btn btn-primary btn-lg btn-block" href="/login" role="button">Login</a>
                                                {/* <button type="button" class="btn btn-danger btn-lg btn-block"><a href="/login">Login</a></button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}
