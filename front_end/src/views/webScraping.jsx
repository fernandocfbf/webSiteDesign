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
            social: false,
            instiglio: false,
            golab: false,
            sector: false

        }
    }

    

    processar() {

        axios.get('http://localhost:3000/webScraping_social')
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) {
                    if (resp.data != false) {
                        console.log("rodou: ", resp.data)
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {

        const { Column, ColumnGroup } = Table;

        const data = []


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
                                <Checkbox defaultChecked />
                            </div>

                            <div>
                                <label className="site_title_web">Instiglio</label>
                                <Checkbox defaultChecked />
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
