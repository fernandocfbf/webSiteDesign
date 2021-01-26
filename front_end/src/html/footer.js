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

        return (
            <div className="footer">
                <div className="footer_grid">
                    <Text className="aboutUs">About us</Text>

                    <Paragraph className="aboutUs_descricao">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem ipsam dicta natus harum possimus magni vel ab,
                        nihil voluptatem nulla commodi maiores, eligendi aspernatur cumque debitis explicabo rem
                        distinctio! Nisi.
                    </Paragraph>

                    <Text className="contactUs"> Contact Us</Text>
                    <div className="non_media1">
                        <GoogleOutlined />
                        <Paragraph className="text_footer">fincattifernando@gmail.com</Paragraph>
                    </div>
                    <div className="non_media2">
                        <PhoneOutlined />
                        <Paragraph className="text_footer">(11)96036-1402</Paragraph>
                    </div>
                </div>

                <div className="media">
                    <InstagramOutlined />
                    <GithubOutlined />
                    <FacebookOutlined />
                    <LinkedinOutlined />
                </div>


            </div>
        )
    }
}