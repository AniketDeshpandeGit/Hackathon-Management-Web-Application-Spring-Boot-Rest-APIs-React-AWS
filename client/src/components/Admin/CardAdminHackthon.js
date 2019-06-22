import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import AdminHeader from "../Admin/AdminHeader";
import {url} from '../Config_url'

export default class CardAdminHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathons : [],
      successFlag : false
    }
    this.changeHackathonHandler = this.changeHackathonHandler.bind(this) 
  }
  
  componentWillMount() {
    this.setState({
      successFlag : false
    })
  }

  componentDidMount() {
    var headers = {
      Authorization: localStorage.getItem("token")
    }; 
    axios.get(`${url}/hackathons/getAllHackathons`, {
      headers
    }).then(response => {
      console.log(' the resposne :' + JSON.stringify(response.data))
      if(response.status === 200){
        this.setState({
            successFlag : true,
            hackathons : this.state.hackathons.concat(response.data)
        })
      } else{
        this.setState({
            successFlag : false
        })
      }
    });
  }

    changeHackathonHandler = (h) => {
      var id = h.target.id
      
      axios.put(`${url}/hackathons/updateStatus/${id}`).then(response => {
      console.log(" final response " + JSON.stringify(response));
      
      if (response.status === 200) {
      //   this.props.history.push({
      //     pathname:'/cardAdminHackathon'
      // }) 

      var hackathon_name = response.data.eventName;
      var hackathon_status = response.data.status;

      console.log("hackathon name",hackathon_name);
      console.log("hackathon stauts", hackathon_status);

      const data = {
        eventName : hackathon_name
      };

      // axios.post(`${url}/hackathons/sendEmailAfterHackFinalised`, data)
      // .then((response) => {
      //   console.log(" called this now! ");
      // });

      if(hackathon_status == "finalized"){
        console.log("this hackathon is finalized");

        const data = {
          eventName : hackathon_name
        };

        axios.post(`${url}/hackathons/sendEmailAfterHackFinalised`, data)
        .then((response) => {
          console.log(" response " + JSON.stringify(response.data));
        });

      }

        window.location.replace("http://localhost:3000/cardAdminHackathon");
      }
    });



    }

  render() {
    let header = null;
    if(localStorage.getItem("isAdmin") == "false"){
      header = <Header/>
    }else{
      header = <AdminHeader/>
    }
    // let hackathon = null
    console.log("Hack : ", this.state.hackathons)
    let hackathon = null;
    if(this.state.successFlag){
      hackathon = this.state.hackathons.map(h =>{
        return(
            <div>
              <div class="form-group" style={{margin:60}} >
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">
                      {" "}
                      {h.eventName}
                      <s   pan class="tab" />
                      {/* <button type="button" class="btn btn-outline-success btn-sm">
                        Manage
                      </button> */}
                    </h6>
                    <h6 class="card-subtitle mb-2 text-muted"> {h.startTime}</h6>
                    <p class="card-text">{h.endTime}</p>
                    <button type="submit" value={h.status} onClick={this.changeHackathonHandler}
                      id={h.id}>
                    
                      {h.status}
                     
                    </button>

                  </div>
                </div>
              </div>

              {/* <div class="container">
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="stepper">
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active">
                        <a class="persistant-disabled" href="#stepper-step-1" data-toggle="tab" aria-controls="stepper-step-1" role="tab" title="Step 1">
                          <span class="round-tab">created</span>
                        </a>
                      </li>
                      <li role="presentation" class="disabled">
                        <a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2">
                          <span class="round-tab">open</span>
                        </a>
                      </li>
                      <li role="presentation" class="disabled">
                        <a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3">
                          <span class="round-tab">close</span>
                        </a>
                      </li>
                      <li role="presentation" class="disabled">
                        <a class="persistant-disabled" href="#stepper-step-4" data-toggle="tab" aria-controls="stepper-step-4" role="tab" title="Complete">
                          <span class="round-tab">finalized</span>
                        </a>
                      </li>
                    </ul>
                    <form role="form">
                      <div class="tab-content">
                        <div class="tab-pane fade in active" role="tabpanel" id="stepper-step-1">
                          <h3 class="h2">1. Select Payment Type</h3>
                          <p>This is step 1</p>
                          <ul class="list-inline pull-right">
                            <li>
                              <a class="btn btn-primary next-step">Next</a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
                          <h3 class="h2">2. Enter Payment Information</h3>
                          <p>This is step 2</p>
                          <ul class="list-inline pull-right">
                            <li>
                              <a class="btn btn-default prev-step">Back</a>
                            </li>
                            <li>
                              <a class="btn btn-primary next-step">Next</a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
                          <h3 class="hs">3. Review and Submit Payment</h3>
                          <p>This is step 3</p>
                          <ul class="list-inline pull-right">
                            <li>
                              <a class="btn btn-default prev-step">Back</a>
                            </li>
                            <li>
                              <a class="btn btn-default cancel-stepper">Cancel Payment</a>
                            </li>
                            <li>
                              <a class="btn btn-primary next-step">Submit Payment</a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-pane fade" role="tabpanel" id="stepper-step-4">
                          <h3>4. All done!</h3>
                          <p>You have successfully completed all steps.</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

             */}
          
          </div>
        )
      })
    }
    return(
      <div>
        {header}
      {hackathon}
      </div>
    )
    // if(this.state.successFlag) {
    //   hackathon = this.props.hackathons.map(h => {
    //     console.log("H : ", h);
    //     return (
    //       <div>
    //         <div class="form-group" style={{margin:60}} >
    //           <div class="card">
    //             <div class="card-body">
    //               <h6 class="card-title">
    //                 {" "}
    //                 {h.eventName}
    //                 <s   pan class="tab" />
    //                 {/* <button type="button" class="btn btn-outline-success btn-sm">
    //                   Manage
    //                 </button> */}
    //               </h6>
    //               <h6 class="card-subtitle mb-2 text-muted"> {h.startTime}</h6>
    //               <p class="card-text"> {h.endTime}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )
    // })
    } 
    // else {
    //       return(
    //         <div>
    //             <AdminHeader />
    //             <h1> No Hackathons </h1>
    //        </div> 
    //     )    
    // }
    // if(this.state.hackathons) {
    //   return( 
    //     <div>
    //        <AdminHeader />
    //        {this.state.hackathons}
    //         <h1> No Hackathons </h1>
    //     </div>
    //   )
    // } else {
    //     return(
    //       <div>
    //           <AdminHeader />
    //           <h1> No Hackathons </h1>
    //       </div> 
    //     )
    // }
  
}
