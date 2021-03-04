function resumeImport(arrayJson){

    const cloned = JSON.parse(JSON.stringify(arrayJson))

    console.log("O CLONADO: ", cloned)

    //percorre todos os dados
    for(var i=0; i<cloned.length; i++){

        const json_atual = cloned[i] //pega o json atual

        console.log("JSON ATUAL: ", json_atual)

        //corta as informações para nao ocuparem muito espaço
        json_atual['HTML_'] = json_atual['HTML'].slice(0, 25) + " (...)"
        json_atual['Resumo_'] = json_atual['Resumo'].slice(0, 25) + " (...)"
    }

    return cloned
}

export default resumeImport