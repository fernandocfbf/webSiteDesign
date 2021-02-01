import { Component, React } from 'react'
import axios from 'axios'

import {
    InstagramOutlined, GithubOutlined, FacebookOutlined,
    LinkedinOutlined, GoogleOutlined, PhoneOutlined
} from '@ant-design/icons'

import { Typography } from 'antd';



import '../css/footer.css'

export default class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        const { Title, Paragraph, Text, Link } = Typography;
        const url = window.location.origin

        return (
            <div>

            </div>
        )
    }
}