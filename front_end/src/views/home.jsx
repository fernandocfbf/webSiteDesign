import React, { Component } from 'react'
import axios from 'axios'
import { Carousel, Divider, Card, Col, Row, Typography, Button } from 'antd';
import { SettingFilled, DotChartOutlined, SmileOutlined } from '@ant-design/icons'


import '../css/home.css'
import 'antd/dist/antd.css';

import Header from '../html/header'
import Footer from '../html/footer'

import step2 from '../img/step2.jpeg'
import step3 from '../img/step3.jpg'

import ai from '../img/ai.png'
import web from '../img/web.png'

import vel from '../img/vel.png'
import precision from '../img/precision.png'
import user from '../img/user.png'

import tools from '../img/tools.png'

export default class Home extends Component {
    constructor(props) {

        super(props)

        this.state = {

        }
    }

    render() {

        const { Title, Paragraph, Text, Link } = Typography;

        const contentStyle = {
            width: "100%",
            height: "590px",
            color: 'white',
            objectFit: "cover",
            objectPosition: "50% 50%",
            lineHeight: '160px',
            textAlign: 'center',
            background: 'black',
        }

        return (
            <div className="pg_home" >
                <Header></Header>
                <Carousel autoplay>
                    <div className='counter_home'>

                        <img src={step3} style={contentStyle}></img>
                        <h1 className="text_step1">
                            
                        </h1>
                    </div>
                    <div>
                    <img src={step2} style={contentStyle}></img>
                    </div>
                    <div>
                    <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>

                <Divider plain
                    style={{
                        fontSize: '20px',
                        marginTop: '40px'
                    }}>
                    About
                </Divider>

                <Paragraph style={{
                    color: 'black',
                    marginBottom: "40px"
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem ipsam dicta natus harum possimus magni vel ab,
                    nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                    distinctio! Nisi.
                </Paragraph>

                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card className="card_home" title={<img src={vel} className="icon_home" />} bordered={false}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Exercitationem ipsam dicta natus harum possimus magni vel ab,
                                nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                                distinctio! Nisi.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="card_home" title={<img src={precision} className="icon_home" />} bordered={false}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Exercitationem ipsam dicta natus harum possimus magni vel ab,
                                nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                                distinctio! Nisi.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="card_home" title={<img src={user} className="icon_home" />} bordered={false}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Exercitationem ipsam dicta natus harum possimus magni vel ab,
                                nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                                distinctio! Nisi.
                            </Card>
                        </Col>
                    </Row>
                </div>

                <Divider plain
                    style={{
                        fontSize: '20px',
                        marginTop: '20px'
                    }}>
                    Tools
                    </Divider>

                <div className="tools_home">
                    <a>
                        <div className="web">
                            <img className="tools_image_home" src={web} />
                            <Text className="text_block1_title">WEB SCRAPING</Text>
                            <Paragraph class="text_block1_text">
                                ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur.
                        </Paragraph>
                        </div>
                    </a>

                    <a>
                        <div className="ai">
                            <img className="tools_image_home" src={ai} />
                            <Text className="text_block2_title">MACHINE LEARNING</Text>
                            <Paragraph className="text_block2_text">
                                ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur.
                        </Paragraph>
                        </div>
                    </a>
                </div>



                <Footer></Footer>
            </div >
        )
    }
}