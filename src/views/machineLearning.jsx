import React, { Component } from 'react'
import axios from '../API/index'

import { message, Divider, Table, Typography, Steps, Button, DatePicker, Carousel } from 'antd';
import { LoadingOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DownloadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../css/machinelearning.css'

import Header from '../html/header'
import Footer from '../html/footer'
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";

import ProgressBar from "../components/progress-bar.component";
import background_machine from '../img/teste_machine.jpg'

import functionresumeImport from "../functions/resumeImport"
import functionprocessDate from "../functions/processDate"
import functiontoDate from "../functions/toDate"

export default class MachineLearning extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            data_filter: [],
            file_name: '',
            data_classificados: [],
            loading: false,
            loading_icon: false,
            complete: "0",
            step1: "wait",
            step2: "wait",
            step3: "wait",
        }

        this.readExcel = this.readExcel.bind(this)
        this.filtroData = this.filtroData.bind(this)
        this.processar = this.processar.bind(this)
        this.download = this.download.bind(this)
    }

    //função resposável por ler o arquivo excel
    async readExcel(file) {

        try {
            await this.setState({ file_name: file.name, loading: true, loading_icon: true })

            const promise = new Promise((resolve, reject) => {

                //o arquvio é lido pelo fileReader
                const fileReader = new FileReader()
                fileReader.readAsArrayBuffer(file)

                //quando estiver pronto...
                fileReader.onload = (e) => {

                    try {
                        const bufferArray = e.target.result

                        const wb = XLSX.read(bufferArray, { type: 'buffer' })

                        //pega o nome do primeiro workSheet(planilha)
                        const wsname = wb.SheetNames[0]

                        const ws = wb.Sheets[wsname]

                        //converte os dados para json
                        const data = XLSX.utils.sheet_to_json(ws)

                        resolve(data)
                    } catch {
                        this.setState({ loading: "crash", loading_icon: "crash" })
                        message.error("Extensão inválida!")
                    }

                    //caso tenha algum erro no arquivo...
                    fileReader.onerror = ((error) => {
                        reject(error)
                    })
                }
            })

            promise.then((d) => {
                if (d[0]['Data'] == undefined && d[0]["HTML"] == undefined) {

                    this.setState({ loading: "crash", loading_icon: "crash", data: [], data_filter: [] })
                    message.error("Conteúdo inválido!")

                } else {

                    var d_filtered = functionresumeImport(d)

                    this.setState({ data: d, data_filter: d_filtered, loading: "done", loading_icon: "done", step1: "finish" })
                    message.success("Arquivo importado com sucesso!")
                }

            })
        } catch (err) {
            console.log(err)
        }
    }

    //função responsável por filtrar os dados
    async filtroData(datas) {

        console.log(datas)

        //apenas para que enquanto o back não responda,
        //a tabela entre em estado de loading
        await this.setState({ loading: true })

        //caso o valor do filtro seja nulo, o usuário removeu os filtros de data
        if (datas == null || datas == undefined) {

            //as informações são iguais
            var new_data = this.state.data

        } else {

            var data1 = functionprocessDate(datas[0])   //pega a data de início
            var data2 = functionprocessDate(datas[1])  //pega a data de fim

            var data = this.state.data //pega as info atuais
            var new_data = [] //variavel que amarzenará as info filtradas

            for (var i = 0; i < data.length; i++) {

                var valor_data = functiontoDate(data[i].Data) //valor da data

                //se a informação estiver entre as datas desejadas...
                if (valor_data.getTime() >= data1.getTime() && valor_data.getTime() <= data2.getTime()) {
                    new_data.push(data[i])
                }
            }
        }

        new_data = functionresumeImport(new_data)

        this.setState({ loading: false, data_filter: new_data })
    }

    //função resposável por executar o algorítimo de machine learning
    async processar() {

        this.setState({ loading_icon: true })

        var data_to_send = []

        for (var i = 0; i < this.state.data_filter.length; i++) {
            data_to_send.push({ "HTML": this.state.data_filter[i]["HTML"] })
        }

        var inicio = 0
        var fim = 40

        for (var i = 0; i < data_to_send.length / 40; i++) {

            await this.setState({ loading_icon: true })

            this.setState({ complete: parseFloat((i) / (data_to_send.length / 40)) * 100 })

            await axios.post('machineLearning', { manchetes: data_to_send.slice(inicio, fim) })
                .then(resp => {
                    if (Math.floor(resp.status / 100) === 2) {
                        if (resp.data != false) {
                            var new_data = this.state.data_classificados.concat(eval('(' + resp.data + ')'))
                            this.setState({ loading_icon: false, data_classificados: new_data })
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })

            inicio += 40
            fim += 40
        }

        this.setState({ complete: parseFloat(100), loading_icon: false })

        if (this.state.data_classificados.length == 0) {
            message.info("Nenhuma manchete relevante encontrada!")
            this.setState({ step2: "finish", step3: "finish", loading_icon: false })
        } else {
            this.setState({ step2: "finish" })
        }

    }

    //função reponsável pelo download
    download() {
        this.setState({ step3: "finish" })
    }

    render() {

        const { Title, Paragraph, Text, Link } = Typography;
        const { RangePicker } = DatePicker;
        const { Step } = Steps;

        if (this.state.data.length == 0) {
            var disabled_process = true
        } else { disabled_process = false }


        if (parseFloat(this.state.complete) < 100) {
            var disabled = true
        } else { disabled = false }

        if (disabled != true) {
            var style_download = { backgroundColor: "#30369f", color: "white", border: "none", marginBottom: "30px" }
        } else {
            style_download = { color: "gray", border: "none", marginBottom: "30px" }
        }

        const progress = { bgcolor: "#30369f", completed: parseFloat(this.state.complete).toFixed(2) }


        var col = [
            {
                title: "Date",
                dataIndex: "Data"
            },
            {
                title: "Sender",
                dataIndex: "De"
            },
            {
                title: "HTML",
                dataIndex: "HTML_"
            },
            {
                title: "Resume",
                dataIndex: "Resumo_"
            },
        ]

        const contentStyle = {
            width: "100%",
            height: "65vh",
            color: 'white',
            objectFit: "cover",
            objectPosition: "50% 50%",
            lineHeight: '160px',
            textAlign: 'center',
            background: 'black',
        }

        //cria o ícone do arquivo de acordo com o status
        if (this.state.loading_icon == true) {
            var file_status = (
                <LoadingOutlined className="icon_input" />
            )
        } else if (this.state.loading_icon == "done") {

            var file_status = (
                <CheckCircleTwoTone className="icon_input" twoToneColor="#52c41a" />
            )
        } else if (this.state.loading == "crash") {
            var file_status = (
                <CloseCircleTwoTone className="icon_input" twoToneColor="#ff0000" />
            )
        }

        //se não tem dados, não habilita o rangePicker
        if (this.state.data.length == 0) {
            var range = true
        } else { range = false }

        return (
            <div className="pg_machine">
                <div className="container_machine">
                    <Carousel autoplay>
                        <div>
                            <img src={background_machine} style={contentStyle}></img>
                            <h1 className="title_header_machine">Machine Learning through SVM</h1>
                            <div className="manchetes_segundo_machine">
                                <h1 className="title_manchetes_segundo_machine">1.45</h1>
                                <p className="text_manchetes_segundo_machine">headlines per second</p>
                            </div>
                            <div className="manchetes_precision_machine">
                                <h1 className="title_manchetes_precision_machine">97.98%</h1>
                                <p className="text_manchetes_precision_machine">algorithm precision</p>
                            </div>

                        </div>
                    </Carousel>
                    <Header></Header>
                </div>

                <div className="status_machine">
                    <Steps>
                        <Step status={this.state.step1} title="Import file" />
                        <Step status={this.state.step2} title="Data processing" />
                        <Step status={this.state.step3} title="Download" />
                    </Steps>
                </div>

                <Table
                    className="table_machine"
                    columns={col}
                    dataSource={this.state.data_filter}
                    pagination={false}
                    loading={this.state.loading}
                    scroll={{
                        y: 300
                    }}

                    title={() =>
                        <div className="title_machine">
                            <div className="load_file_input">
                                <input type='file' name="file" accept='.xlsx' id="file" className="inputfile" onChange={(e) => {
                                    const file = e.target.files[0]
                                    this.readExcel(file)
                                }} />
                                <label for="file">Upload</label>

                                <div className="file_name_input">
                                    <Text className="text_input"> {this.state.file_name} </Text>
                                    {file_status}
                                </div>
                            </div>

                            <RangePicker
                                disabled={range}
                                className="range_machine"
                                format={"DD/MM/YYYY"}
                                onChange={this.filtroData}
                            />
                        </div>
                    }

                    footer={() =>
                        <div className="machine_footer_table">
                            <button
                                className="button_machine"
                                onClick={this.processar}
                                disabled={disabled_process}>
                                Process
                            </button>

                            <ProgressBar
                                className="progressBar"
                                bgcolor={progress.bgcolor} completed={progress.completed} />
                        </div>
                    }>

                </Table >

                <Divider orientation="left" plain>
                    Download de informações
                </Divider>

                <div className="process_text_machine">
                    <Paragraph >
                        Before import file and click in the process button, the data will be read by
                        an algorithm an classified, you should just wait for the operation to end and then
                        right click in the button bellow to export as a CSV file.
                    </Paragraph>
                </div>

                <Button
                    type="primary"
                    style={style_download}
                    icon={<DownloadOutlined />}
                    disabled={disabled}
                    onClick={this.download}>
                    <CSVLink
                        style={style_download}
                        filename={"manchetes_classificadas.csv"}
                        data={this.state.data_classificados}>
                        Download
                    </CSVLink>
                </Button>

                <Footer></Footer>
            </div >
        )
    }
}