import React, { Component } from 'react'
import Header from '../html/header'
import Footer from '../html/footer'

import { message, Divider, Table, Typography, Steps, Button, DatePicker, Carousel } from 'antd';


export default class About extends Component{
    constructor(props){
        super(props)
    
        this.state = {}
    }

    render(){
        return(
            <div className="about_pg">
                <Header></Header>

                <Divider orientation="left" plain>
                    Download de informações
                </Divider>
                <Footer></Footer>
            </div>
        )
    }
}