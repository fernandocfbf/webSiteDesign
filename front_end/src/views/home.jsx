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

        //009302

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
                            <p className="text_header">Get start using our tools. We are providing a ominichannel solution. Hope you enjoy it.</p>
                            <button className="button_header">Get Start</button>
                        </div>
                    </Carousel>
                    <div className="myHeaderPosition">
                        <nav id="menu_home">
                            <ul>
                                <li className="menu_item_home"><a href={url + '/home'}>Home</a></li>
                                <li className="menu_item_home"><a href={url + '/machinelearning'}>Artificial Intelligence</a></li>
                                <li className="menu_item_home"><a>Web Scraping</a></li>
                                <li className="menu_item_home"><a>About</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="session_1_background">
                    <img src={session_1_background} style={contentStyle}></img>

                    <div className="sessao_1">
                        <h3 className="title_sessao_1">
                            Something will apper here
                        </h3>
                        <p className="text_sessao_1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Nisi voluptates fuga, quidem asperiores nulla.
                        </p>


                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card className="card_home" title={
                                        <div>
                                            <img src={vel} className="icon_home" />
                                            <h3 className="subtitle_card">Lorem Ipsum Lodp</h3>
                                        </div>

                                    } bordered={true}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Exercitationem ipsam dicta natus harum possimus magni vel ab,
                                        nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                                        distinctio! Nisi.
                            </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="card_home" title={
                                        <div>
                                            <img src={precision} className="icon_home" />
                                            <h3 className="subtitle_card">Lorem Ipsum Lodp</h3>
                                        </div>
                                    } bordered={true}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Exercitationem ipsam dicta natus harum possimus magni vel ab,
                                        nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                                        distinctio! Nisi.
                            </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="card_home" title={
                                        <div>
                                            <img src={user} className="icon_home" />
                                            <h3 className="subtitle_card">Lorem Ipsum Lodp</h3>
                                        </div>
                                    } bordered={true}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Exercitationem ipsam dicta natus harum possimus magni vel ab,
                                        nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                                        distinctio! Nisi.
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