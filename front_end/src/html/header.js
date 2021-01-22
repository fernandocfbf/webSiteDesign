import { Component, React } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
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

    redirect(path){
        this.setState({path: path})
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
                <a href={url + "/home"}>Home</a>
                <a href={url + "/machinelearning"}>Articial Intelligence</a>
                <a>Web Scraping</a>
                <a>Get Start</a>
            </div>
        )
    }
}