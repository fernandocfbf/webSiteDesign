import { Component, React } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import sideBar from '../components/sideBar'
import '../css/header.css'

import { Table, Typography, Button } from 'antd';
import 'antd/dist/antd.css';

export default class Header extends Component {
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

        const url = window.location.origin

        //caso tenha para onde redirecionar...
        if (this.state.path != "") {
            return (
                <Redirect to={{
                    pathname: this.state.path,
                }} />
            )
        }

        return (
            <div className="header">
                <nav id="menu">
                    <ul>
                        <li className="menu_item"><a href={url + '/home'} className="header_button">Home</a></li>
                        <li className="menu_item"><a href={url + '/machinelearning'} className="header_button">Artificial Intelligence</a></li>
                        <li className="menu_item"><a href={url + '/webscraping'} className="header_button">Web Scraping</a></li>
                        <li className="menu_item"><a className="header_button">About</a></li>
                    </ul>
                </nav>
            </div>
        )

    }
}