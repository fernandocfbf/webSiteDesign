import React, { Component } from 'react'
import axios from 'axios'

import { message, Divider, Table, Typography, Steps, Button, DatePicker } from 'antd';
import { LoadingOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DownloadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../css/machinelearning.css'

import Header from '../html/header'
import Footer from '../html/footer'
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";

var functionresumeImport = require("../functions/resumeImport")
var functionprocessDate = require("../functions/processDate")
var functiontoDate = require("../functions/toDate")

export default class MachineLearning extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            data_filter: [],
            file_name: '',
            data_classificados: [],
            loading: false,
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
            await this.setState({ file_name: file.name, loading: true })

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
                        this.setState({ loading: "crash" })
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

                    this.setState({ loading: "crash", data: [], data_filter: [] })
                    message.error("Conteúdo inválido!")

                } else {

                    var d_filtered = functionresumeImport(d)

                    this.setState({ data: d, data_filter: d_filtered, loading: "done", step1: "finish" })
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

        this.setState({ loading: true })

        var data_to_send = []

        for (var i = 0; i < this.state.data_filter.length; i++) {
            data_to_send.push({ "HTML": this.state.data_filter[i]["HTML"] })
        }

        var inicio = 0
        var fim = 40

        for (var i = 0; i < data_to_send.length / 40; i++) {

            console.log("rodada: ", i, " || ", data_to_send.length / 40)

            await this.setState({ loading: true })

            await axios.post('http://localhost:3000/machineLearning', { manchetes: data_to_send.slice(inicio, fim) })
                .then(resp => {
                    if (Math.floor(resp.status / 100) === 2) {
                        console.log("DATA: ", typeof resp.data, resp.data)
                        console.log(eval('(' + resp.data + ')'))

                        if (resp.data != false) {
                            var new_data = this.state.data_classificados.concat(eval('(' + resp.data + ')'))
                            this.setState({ loading: false, data_classificados: new_data })
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })

            inicio += 40
            fim += 40
        }

        if (this.state.data_classificados.length == 0) {
            message.info("Nenhuma manchete relevante encontrada!")
            this.setState({ step2: "finish", step3: "finish", loading: false})
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

        if (this.state.data_classificados.length == 0) {
            var disabled = true
        } else { disabled = false }

        console.log(this.state)


        var col = [
            {
                title: "Data",
                dataIndex: "Data"
            },
            {
                title: "Remetente",
                dataIndex: "De"
            },
            {
                title: "HTML",
                dataIndex: "HTML_"
            },
            {
                title: "Resumo",
                dataIndex: "Resumo_"
            },
        ]

        //cria o ícone do arquivo de acordo com o status
        if (this.state.loading == true) {
            var file_status = (
                <LoadingOutlined className="icon_input" />
            )
        } else if (this.state.loading == "done") {

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
            <div>
                <Header></Header>

                <div className="status_machine">
                    <Steps>

                        <Step status={this.state.step1} title="Importar arquivo" />
                        <Step status={this.state.step2} title="Processamento de dados" />
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
                                <label for="file">Carregar</label>

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
                    }>

                </Table>

                <Divider orientation="left" plain>
                    Processamento
                </Divider>

                <div className="process_text_machine">
                    <Paragraph >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi voluptatem libero aut molestias beatae iste.
                        Maxime enim sequi, laborum, fugiat veritatis libero, inventore amet necessitatibus aliquid
                        velit natus vero aut!
                    </Paragraph>
                </div>

                <Button
                    type="primary"
                    className="button_machine"
                    onClick={this.processar}>
                    Processar
                </Button>

                <Button
                    type="primary"
                    className='download_button'
                    style={{marginLeft: "30px"}}
                    icon={<DownloadOutlined />}
                    disabled={disabled}
                    onClick={this.download}>
                    <CSVLink
                        className='download_button'
                        filename={"manchetes_classificadas.csv"}
                        data={this.state.data_classificados}>
                        Download
                    </CSVLink>
                </Button>

                <Footer></Footer>
            </div>
        )
    }
}