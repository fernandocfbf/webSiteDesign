import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Carousel, Divider, Card, Col, Row, Typography, Button } from 'antd';
import '../css/home.css'

import background from '../img/background.jpg'
import vel from '../img/vel.png'
import precision from '../img/precision.png'
import user from '../img/user.png'
import session_1_background from "../img/background_session_1.jpg";

import Header from '../html/header'
import Footer from '../html/footer'

export default class Home extends Component {
    constructor(props) {

        super(props)

        this.state = {
            path: ''
        }

        this.redirect = this.redirect.bind(this)

    }

    redirect(path) {
        this.setState({ path: path })
    }

    render() {

        if (this.state.path != '') {
            return (
                <Redirect to={{
                    pathname: this.state.path,
                }} />
            )
        }

        const url = window.location.origin

        const contentStyle = {
            width: "100%",
            height: "65vh",
            color: 'white',
            objectFit: "cover",
            objectPosition: "50% 50%",
            lineHeight: '160px',
            textAlign: 'center',
            background: 'black',
        }

        return (
            <div className="pagina_home">
                <div className="container">
                    <Carousel autoplay>
                        <div>
                            <img src={background} style={contentStyle}></img>
                            <h1 className="title_header">Hi. This is Automation</h1>
                            <p className="text_header">We are providing automation through the most trend tech in the market. Hope you enjoy it.</p>
                            <button className="button_header">Get Start</button>
                        </div>
                    </Carousel>
                    <Header></Header>
                </div>
                <div className="session_1_background">
                    <img src={session_1_background} style={contentStyle}></img>

                    <div className="sessao_1">
                        <h3 className="title_sessao_1">
                            About the automation tools
                        </h3>
                        <p className="text_sessao_1">
                            Bellow you will find a snippet of some of the main features of this web site
                        </p>


                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card className="card_home" title={
                                        <div>
                                            <img src={vel} className="icon_home" />
                                            <h3 className="subtitle_card">Processing speed</h3>
                                        </div>

                                    } bordered={true}>
                                        This aplicattion was built using Node.js technology. One of the most trend 
                                        architectures in the market, providing velocity through a asynchronous 
                                        programming language. 

                            </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="card_home" title={
                                        <div>
                                            <img src={precision} className="icon_home" />
                                            <h3 className="subtitle_card">High Precision Algorithm</h3>
                                        </div>
                                    } bordered={true}>
                                        The artificial intelligence is based on the Support Vector Machine algorithm (SVM), 
                                        and its architecture provides 97% accuracy.
                            </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="card_home" title={
                                        <div>
                                            <img src={user} className="icon_home" />
                                            <h3 className="subtitle_card">User-friendly</h3>
                                        </div>
                                    } bordered={true}>
                                        The website provides a ominichannel solution, designed for people who code or not. 
                                        If you aren't familiar with the technologies used here,
                                        don't worry, you can click in the "get start" button. 
                            </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}