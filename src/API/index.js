import axios from 'axios'

console.log("O ENVIROMENT: ", process.env.REACT_APP_BACK)

export default axios.create({
    baseURL: process.env.REACT_APP_BACK
})