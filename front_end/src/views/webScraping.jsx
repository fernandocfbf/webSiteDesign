import React, { Component } from 'react'

import Header from '../html/header'
import Footer from '../html/footer'

export default class WebScraping extends Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return(
            <div className="pg_webScraping">
                <Header></Header>
                <Footer></Footer>
                
            </div>
        )
    }
}
