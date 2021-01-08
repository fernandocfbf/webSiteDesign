import { Component, React } from 'react'
import axios from 'axios'
import '../css/header.css'

export default class Header extends Component{
    constructor(props){
        super(props)

        this.state={

        }
    }

    render(){
        return(
            <div className="header">
                <a>Home</a>
                <a>Articial Intelligence</a>
                <a>Web Scraping</a>
                <a>Get Start</a>
            </div>
        )
    }
}