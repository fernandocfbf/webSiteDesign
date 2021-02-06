import axios from 'axios'

console.log("O ENVIROMENT: ", process.env.REACT_APP_ENVIRONMENT)

if (process.env.REACT_APP_ENVIRONMENT == "development"){
    var url = "http://localhost:3003/"
} else {
    var url = "https://automation-back-end.herokuapp.com/" 
}

export default axios.create({
    baseURL: url
})