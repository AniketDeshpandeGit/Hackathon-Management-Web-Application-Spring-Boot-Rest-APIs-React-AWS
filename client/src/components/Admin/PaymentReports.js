import React, {Component} from "react";
import 'antd/dist/antd.css';
import {url} from '../Config_url';
import axios from "axios";
import {List, Modal, Button} from 'antd';
import Header from "../Miscellanous/Header";
import AdminHeader from "./AdminHeader";
import Footer from "../Miscellanous/Footer";

export default class PaymentReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            hackathonName: "",
            hackathonDetails: []
        };
    }

    componentDidMount() {

        this.axiosGet(`${url}/hackathons/getAllHackathons`)
            .then(data => {
                this.setState({
                    data: data
                })
            })
    }

    handleSuccess = (response) => {
        return response.data;
    };

    handleError = (error) => {
        if (error.response) {
            return Promise.reject(error.response);
        }
    };

    handleCancel = () => this.setState({visible: false});

    axiosGet = (url) => {
        return axios.get(url)
            .then(this.handleSuccess)
            .catch(this.handleError);
    };

    axiosPost = (url, data) => {
        return axios.post(url, data)
            .then(this.handleSuccess)
            .catch(this.handleError);
    };

    showModal = (hackathonName) => {

        const data = {
            "hackathonName": hackathonName
        };

        this.axiosPost(`${url}/teams/getPaymentDetails`, data)
            .then(data => {
                let hackathonDetails = [];
                for (let property in data) {
                    if (data.hasOwnProperty(property)) {
                        hackathonDetails.push({
                            teamName: property,
                            teamDetails: data[property]
                        })
                    }
                }

                this.setState({
                    visible: true,
                    hackathonName: hackathonName,
                    hackathonDetails: hackathonDetails
                });
            });
    };

    getDescription = (teamDetails) => {
        let det = [];
        det = teamDetails.map(team => {
            return <div key={team.timePaid}>
                <span>{team.teamMemberName}</span>
                <br/>
                <span>{(team.amountPaid === "0.0") ? "Not Paid" : team.amountPaid}</span>
                <br/>
                <span>{team.timePaid}</span>
            </div>
        });
        return det;
    };

    render() {

        let header = null;
        if (localStorage.getItem("isAdmin") == "false") {
            header = <Header/>
        } else {
            header = <AdminHeader/>
        }

        const {data, visible, hackathonName, hackathonDetails} = this.state;

        return (
            <div>
                { header }
                <div className="container-fluid" style={{marginTop: "6%"}}>
                    <div className="row mb-4" style={{display: "flex", justifyContent: "center"}}>
                        <h4>Payment Reports</h4>
                    </div>
                    <div className="row" style={{display: "flex", justifyContent: "center"}}>
                        <List
                            style={{
                                width: "50%",
                                boxShadow: "0 0 20px 0px rgba(0, 0, 0, 0.35)",
                                padding: "2%",
                            }}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" key="back"
                                                onClick={() => this.showModal(item.eventName)}>
                                            View
                                        </Button>]}
                                >
                                    <List.Item.Meta
                                        title={<span>{item.eventName}</span>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <Footer />
                <Modal
                    visible={visible}
                    title={hackathonName}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button type="primary" key="back" onClick={this.handleCancel}>
                            Close
                        </Button>,
                    ]}
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{pageSize: 2}}
                        dataSource={hackathonDetails}
                        renderItem={item => (
                            <List.Item
                                key={item.teamName}
                            >
                                <List.Item.Meta
                                    title={<span>{item.teamName}</span>}
                                    description={this.getDescription(item.teamDetails)}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
            </div>
        );
    }
}
