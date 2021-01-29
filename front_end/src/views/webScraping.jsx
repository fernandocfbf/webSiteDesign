import React, { Component } from 'react'
import axios from 'axios'

import Header from '../html/header'
import Footer from '../html/footer'

import background_web from '../img/background_web.jpg'
import social from '../img/social_finance.png'
import instiglio from '../img/instiglio.jpeg'
import sector from '../img/sector.png'
import golab from '../img/golab.jpg'

import { CSVLink } from "react-csv";


import '../css/webscraping.css'
import { message, Table, Card, Col, Row, Carousel, Typography, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';



export default class WebScraping extends Component {
    constructor(props) {
        super(props)

        this.state = {
            social: "selected",
            instiglio: "selected",
            golab: false,
            sector: false,
            social_data: [],
            instiglio_data: [],
            loading: false,
            download_data: []
        }

        this.changeCheckSocial = this.changeCheckSocial.bind(this)
        this.changeCheckInstiglio = this.changeCheckInstiglio.bind(this)
        this.processar = this.processar.bind(this)
    }

    async processar() {

        this.setState({ loading: true })

        var data_to_download = []

        if (this.state.social == "selected") {
            await axios.get('http://localhost:3000/webScraping_social')
                .then(resp => {
                    if (Math.floor(resp.status / 100) === 2) {
                        this.setState({ loading_social: false })
                        if (resp.data != false) {
                            const lista = resp.data.replace(/\s/g, '').replace("[", "").replace("]", "")
                            if (lista.length > 2) {
                                const lista_social = resp.data.replace(/\s/g, '').replace("[", "").replace("]", "").replaceAll("'", "").split(",")
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }

        if (this.state.instiglio == "selected") {
            await axios.get('http://localhost:3000/webScraping_instiglio')
                .then(resp => {
                    if (Math.floor(resp.status / 100) === 2) {
                        if (resp.data != false) {
                            const lista = resp.data.replace(/\s/g, '').replace("[", "").replace("]", "")
                            if (lista.length > 2) {
                                const lista_social = resp.data.replace(/\s/g, '').replace("[", "").replace("]", "").replaceAll("'", "").split(",")
                                this.setState({ instiglio_data: lista_social })
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }

        if(this.state.social_data.length > 0){
            for(var i = 0; i<this.state.social_data.length; i++){
                var json = {
                    "source": "Social Finance",
                    "link": this.state.social_data[i]
                }

                data_to_download.push(json)
            }
        }

        if(this.state.instiglio_data.length > 0){
            for(var i = 0; i<this.state.instiglio_data.length; i++){
                var json = {
                    "source": "Instiglio",
                    "link": this.state.instiglio_data[i]
                }

                data_to_download.push(json)
            }
        }

        this.setState({loading: false, download_data: data_to_download})

    }

    changeCheckSocial() {
        if (this.state.social == "select") {
            this.setState({ social: "selected" })
        } else {
            this.setState({ social: "select" })
        }
    }

    changeCheckInstiglio(event) {
        if (this.state.instiglio == "select") {
            this.setState({ instiglio: "selected" })
        } else {
            this.setState({ instiglio: "select" })
        }
    }

    render() {

        console.log(this.state)

        if (this.state.social == "selected") { var social_class = "selected_class" }
        else { social_class = "select_web" }

        if (this.state.instiglio == "selected") { var instiglio_class = "selected_class" }
        else { instiglio_class = "select_web" }

        if (this.state.instiglio == "select" && this.state.social == "select") {
            var search = true
            var search_class = "unavailable_search_web"
        } else {
            search = false
            var search_class = "available_search_web"

        }

        const { Title, Paragraph, Text, Link } = Typography;

        if (this.state.download_data.length != 0) {
            var style_download = { backgroundColor: "#30369f", color: "white", border: "none"}
            var download_disabled = false
        } else {
            style_download = { color: "gray", border: "none"}
            download_disabled = true
        }

        var col = [
            {
                title: "Source",
                dataIndex: "source"
            },
            {
                title: "Link",
                dataIndex: "link"
            }
        ]

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
            <div className="pg_webScraping">
                <div className="container_web">
                    <Carousel autoplay>
                        <div>
                            <img src={background_web} style={contentStyle}></img>
                            <h1 className="title_header_web">Searching deep in web </h1>
                            <h3 className="text_header_web">Automation tool to find new data in the main sites of Outcomes Based Contracts</h3>
                        </div>
                    </Carousel>
                    <Header></Header>
                </div>

                <div className="site-card-wrapper_web">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card className="card_web" title={
                                <div>
                                    <img src={social} className="icon_web" />
                                </div>

                            } bordered={true}>
                                "We combine social and financial insight to help our
                                partners make a difference to enduring problms - where
                                the outcomes are poor and costs of failure are high"
                            </Card>
                            <button disabled={this.state.loading} onClick={this.changeCheckSocial} className={social_class}>{this.state.social}</button>
                        </Col>
                        <Col span={6}>
                            <Card className="card_web" title={
                                <div>
                                    <img src={instiglio} className="icon_web" />
                                </div>
                            } bordered={true}>
                                "Ensure that every cent spent to
                                alleviate poverty has the greatest possible impact on the
                                lives of the 2.4 billion men, women, and children afflicted
                                by it."
                            </Card>
                            <button disabled={this.state.loading} onClick={this.changeCheckInstiglio} className={instiglio_class}>{this.state.instiglio}</button>
                        </Col>
                        <Col span={6}>
                            <Card className="card_web" title={
                                <div>
                                    <img src={sector} className="icon_web" />
                                </div>
                            } bordered={true}>
                                "Our mission is to accelerate the transition
                                to a performance-driven social sector."
                            </Card>
                            <button disabled={true} className="select_unavailable_web">unavailable</button>
                        </Col>
                        <Col span={6}>
                            <Card className="card_web" title={
                                <div>
                                    <img src={golab} className="icon_web" />
                                </div>
                            } bordered={true}>
                                "We host the global knowledge hub for those considering,
                                designing and delivering new approaches to improve social
                                outcomes."
                            </Card>
                            <button disabled={true} className="select_unavailable_web">unavailable</button>
                        </Col>
                    </Row>
                </div>

                <Table
                    className="table_web"
                    columns={col}
                    bordered
                    loading={this.state.loading}
                    dataSource={this.state.download_data}


                    title={() =>
                        <div className="title_web_table">
                            <button
                                onClick={this.processar}
                                className={search_class}
                                disabled={search}>
                                search</button>

                        </div>

                    }

                    footer={() =>
                        <div className="footer_table_web">
                            <Button
                                style={style_download}
                                type="primary"
                                icon={<DownloadOutlined />}
                                disabled={download_disabled}>
                                <CSVLink
                                    style={style_download}
                                    filename={"webScraping.csv"}
                                    data={this.state.download_data}>
                                    Download
                            </CSVLink>
                            </Button>
                        </div>
                    }
                >
                </Table>

                <Footer></Footer>

            </div>
        )
    }
}
