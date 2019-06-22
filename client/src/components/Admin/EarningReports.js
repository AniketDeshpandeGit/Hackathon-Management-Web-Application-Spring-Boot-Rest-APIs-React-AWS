import React, {Component} from "react";
import 'antd/dist/antd.css';
import {url} from '../Config_url';
import axios from "axios";
import {List, Modal, Button, Empty} from 'antd';
import Header from "../Miscellanous/Header";
import AdminHeader from "./AdminHeader";
import Footer from "../Miscellanous/Footer";

export default class EarningReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            hackathonName: "",
            earningDetails: null
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
            "eventName": hackathonName
        };


        this.axiosPost(`${url}/hackathons/getEarningReport`, data)
            .then(data => {
                this.setState({
                    visible: true,
                    hackathonName: hackathonName,
                    earningDetails: data
                });
            }).catch(error => {
            this.setState({
                visible: true,
                hackathonName: hackathonName,
                earningDetails: null
            });
        });
    };

    getDescription = (earningDetails) => {
        return <div>
            <strong>Total Revenue from paid registration fee: </strong>{earningDetails.profit}
            <br/>
            <strong>Total Revenue from unpaid registration fee: </strong>{earningDetails.unpaid}
            <br/>
            <strong>Total Revenue from sponsors: </strong>{earningDetails.revnueFromSponsorers}
            <br/>
            <strong>Total Expenses: </strong>{earningDetails.totalExpenses}
            <br/>
        </div>
    };

    render() {

        let header = null;
        if (localStorage.getItem("isAdmin") == "false") {
            header = <Header/>
        } else {
            header = <AdminHeader/>
        }

        const {data, visible, hackathonName, earningDetails} = this.state;

        return (
            <div>
                {header}
                <div className="container-fluid" style={{marginTop: "6%"}}>
                    <div className="row mb-4" style={{display: "flex", justifyContent: "center"}}>
                        <h4>Earnings Reports</h4>
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
                <Footer/>
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
                    {earningDetails !== null && this.getDescription(earningDetails)}
                    {earningDetails === null && <Empty/>}
                </Modal>
            </div>
        );
    }
}
