import React, { Component } from 'react'
import axios from 'axios'

import Header from '../html/header'
import Footer from '../html/footer'

import '../css/webscraping.css'
import { message, Table, Checkbox, Button } from 'antd';


export default class WebScraping extends Component {
    constructor(props) {
        super(props)

        this.state = {
            social: true,
            instiglio: true,
            golab: false,
            sector: false,
            social_data: [],
            instiglio_data: [],
        }

        this.changeCheckSocial = this.changeCheckSocial.bind(this)
        this.changeCheckInstiglio = this.changeCheckInstiglio.bind(this)
        this.processar = this.processar.bind(this)
    }

    processar() {

        if (this.state.social) {
            axios.get('http://localhost:3000/webScraping_social')
                .then(resp => {
                    if (Math.floor(resp.status / 100) === 2) {
                        if (resp.data != false) {
                            const lista = resp.data.replace(/\s/g, '').replace("[", "").replace("]", "")
                            if (lista.length > 2) {
                                const lista_social = resp.data.replace(/\s/g, '').replace("[", "").replace("]", "").replaceAll("'", "").split(",")
                                this.setState({ social_data: lista_social })
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }

        if (this.state.instiglio) {
            console.log("Faz o get")
            axios.get('http://localhost:3000/webScraping_instiglio')
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

    }

    changeCheckSocial(event) {
        this.setState({ social: event.target.checked })
    }

    changeCheckInstiglio(event) {
        this.setState({ instiglio: event.target.checked })
    }


    render() {

        const { Column, ColumnGroup } = Table;

        const data = []

        console.log(this.state)

        return (
            <div className="pg_webScraping">
                <Header></Header>

                <Table
                    className="table_web"
                    bordered
                    dataSource={data}
                    title={() =>
                        <div className='checkboxes'>
                            <div>
                                <label className="site_title_web">Social Finance</label>
                                <Checkbox defaultChecked onChange={this.changeCheckSocial} />
                            </div>

                            <div>
                                <label className="site_title_web">Instiglio</label>
                                <Checkbox defaultChecked onChange={this.changeCheckInstiglio} />
                            </div>

                            <div>
                                <label className="site_title_web">Go Lab</label>
                                <Checkbox disabled />
                            </div>

                            <div>
                                <label className="site_title_web">Third Sector</label>
                                <Checkbox disabled />
                            </div>
                        </div>
                    }

                    footer={() =>
                        <button
                            className="button_web"
                            onClick={this.processar}>
                            Processar
                            </button>
                    }

                >
                    <ColumnGroup title="Web Site Source">
                        <Column title="Social Finance" dataIndex="firstName" />
                        <Column title="Instiglio" dataIndex="lastName" />
                        <Column title="GoLab" dataIndex="lastName" />
                        <Column title="Third Sector" dataIndex="lastName" />
                    </ColumnGroup>

                </Table>

                <Footer></Footer>

            </div>
        )
    }
}
