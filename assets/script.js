const textoSelect = document.getElementById("texto-select")
const unidadeRadio = document.getElementsByName("unidade-input")
const horaInput = document.getElementById("hora-input")
const gerarTextoBtn = document.getElementById("gerar-texto-btn")
const textoContainer = document.getElementById("texto-container")
const checkboxAnalise = document.getElementById("checkbox-analise")
const checkboxConsulta = document.getElementById("checkbox-consulta")
let nomePacienteInput = document.getElementById("nome-input")


function textoInicial() {
    textoContainer.classList.add('texto-display', 'texto-display-vazio')
}


function completaHora() {
    if (horaInput.value.length == 2) {
        horaInput.value += ':'
    }
}


function semConsulta() {
    if (checkboxConsulta.checked) {
        return "\n\n*Neste dia, os exames de mamografia serão realizados normalmente pelas técnicas, porém não teremos consulta com uma médica após a realização.*"
    }
    else {
        return ""
    }
}


function analise() {
    if (checkboxAnalise.checked) {
        return "\n\n*O status atual do(s) seu(s) exame(s) é: EM ANÁLISE, caso não esteja(m) autorizado(s) pelo convênio até o horário de realização, o(a) senhor(a) poderá realizar, mediante assinatura de uma guia provisória, que será desconsiderada após o convênio autorizar. Caso não queira realizar a assinatura da guia provisória, nos informe com antecedência, para realizar a remarcação do(s) exame(s).*"
    }
    else {
        return ""
    }
}


function desmarcaAnalise() {
    checkboxAnalise.checked = false
}


textoInicial()


function validaData() {
    const dia = document.querySelector('#dia-input').value
    const mes = document.querySelector('#mes-input').value
    const ano = document.querySelector('#ano-input').value
    const data = new Date(`${mes}/${dia}/${ano}`)
    let dataFormatada

    function formataData() {
        let dia = data.getDate()
        let mes = data.getMonth()
        let ano = data.getFullYear()
        let diaSemana = data.toLocaleString('pt-BR', { weekday: 'long' })

        if (dia <= 9 || mes + 1 <= 9) {
            if (dia <= 9 && mes + 1 <= 9) {
                dataFormatada = `0${dia}/0${mes + 1}/${ano} (${diaSemana})`
            }
            else if (dia <= 9 && !mes + 1 <= 9) {
                dataFormatada = `0${dia}/${mes + 1}/${ano} (${diaSemana})`
            }
            else if (!dia <= 9 && mes + 1 <= 9) {
                dataFormatada = `${dia}/0${mes + 1}/${ano} (${diaSemana})`
            }
        } else {
            dataFormatada = `${dia}/${mes + 1}/${ano} (${diaSemana})`
        }
    }

    formataData()
    return dataFormatada
}


function validaNome() {
    if (nomePacienteInput.value.length <= 10 || !nomePacienteInput.value.includes(' ')) {
        alert('Informe o nome completo!')
        nomePacienteInput.focus()
        return false
    }
    return true
}


function tipoExame() {
    if (textoSelect.value <= 16) {
        return 'o(s) exame(s) agendado(s)'
    }
    else if (textoSelect.value >= 17) {
        return 'o horário para realização da sua avaliação nutricional para o'
    }
}


function selecionaUnidade() {
    let asa = document.querySelector('#radio-asa')
    let lago = document.querySelector('#radio-lago')
    if (textoSelect.value >= 17) {
        if (!asa.checked) {
            asa.checked = true
            alert('Somente Asa Sul!')
        }
    }
    if (!asa.checked && !lago.checked) {
        return
    }
}


// Funções que geram os textos para cada preparo específico
function chegarComAntecedencia(minutos) {
    return `É necessário chegar com ${minutos} minutos de antecedência`
}

function jejum(horas) {
    return `Realizar jejum de no mínimo ${horas} horas (sólidos e líquidos), podendo beber somente água`
}

function jejumTotal(horas) {
    return `Realizar jejum absoluto (sólidos e líquidos), de no mínimo ${horas} horas`
}

function luftal(periodo) {
    texto = `Tomar 1 comprimido ou 40 gotas de Luftal `
    let final
    if (periodo == 'noite') {
        final = `na véspera, após a última refeição noturna`
    }
    else {
        final = `após o café da manhã`
    }
    return `${texto} ${final}`
}

function luftalDias(intervalo, periodo) {
    return `Tomar 1 comprimido ou 40 gotas de Luftal (${intervalo}/${intervalo} horas) durante ${periodo} dias antecedendo a data do(s) exame(s)`
}

function bexigaCheia() {
    return `Quando chegar na clínica o paciente irá tomar água para encher a bexiga, para realizar o(s) exame(s) com a bexiga cheia`
}

function suspenderCalcio() {
    return `Caso faça uso de algum medicamento ou vitamina que contenha CÁLCIO na composição, deverá suspender no dia do(s) exame(s)`
}

function suspenderAtivFisica() {
    return `Suspender atividades físicas no dia do(s) exame(s)`
}

function naoContraste(dias) {
    return `Certifique-se também de não ter realizado exames COM CONTRASTE até ${dias} dias antes`
}

function equipamentoDensi() {
    return `O equipamento tem restrição de peso:\nUnidade Asa Sul (suporta até 200Kg).\nUnidade Lago Sul (suporta até 150Kg).`
}
// Fim das funções que geram os textos para cada preparo específico

// Textos padrões utilizados nas mensagens
const preTexto = 'Clínica Janice Lamas informa:\nPrezado(a): {nomePaciente}{consulta}{analise}\n\nEstamos confirmando {tipoExame} dia {data} às {hora}h na unidade {unidade}.'
const posTexto = 'Trazer os PEDIDOS MÉDICOS ORIGINAIS com validade de 30 dias, CARTEIRA DO CONVÊNIO E DOCUMENTO DE IDENTIFICAÇÃO.\n\nTrazer exames anteriores para comparação caso tenham sido realizados em outro local.\n\n*O uso de máscara não é obrigatório, conforme decreto n° 43.072 de 10/03/2022.*\n*Usar máscara em ambiente hospitalar é facultativo, porém é recomendado pela Diretoria de Vigilância Sanitária.*\n*Sugerimos que continuem fazendo o uso de máscara (SEM PARTES DE METAL) durante a realização dos exames.*\n\nTempo de permanência na clínica: *50 minutos para cada exame agendado*.\n\n*Pedimos a gentileza de, se possível, não trazer acompanhante, para evitar aglomerações e manter a sua segurança e dos demais pacientes. Caso seja menor de idade, comparecer com apenas 1 acompanhante e chegar no horário marcado.*\n\nQualquer dúvida, entrar em contato com nossa Central de Atendimento 61 3213-5161 (ligação ou Whatsapp).\n\nAgradecemos a confiança em nossos serviços.\nAtenciosamente, Clínica Janice Lamas Radiologia.'


// Preparos para exames
const densi2 = `${suspenderCalcio()}.\n${naoContraste(3)}.\n\n${equipamentoDensi()}`
const densiCorpoInteiro = `${jejumTotal(2)}. ${suspenderAtivFisica()}. ${suspenderCalcio()}. ${naoContraste(3)}.\n\n${equipamentoDensi()}`
const densiCorpoInteiroSemJejum = `${suspenderAtivFisica(12)}. ${suspenderCalcio()}. ${naoContraste(3)}.\n\n${equipamentoDensi()}`
const densi2Dxa = `${densiCorpoInteiro}`
const abdTotalM = `${jejum(6)}. ${luftal('noite')}. ${bexigaCheia()}.`
const abdTotalT = `${jejum(6)}. ${luftal('manha')}. ${bexigaCheia()}.`
const abdTotalParaKitM = `${jejumTotal(6)}. ${luftal('noite')}. ${bexigaCheia()}.`
const abdTotalParaKitT = `${jejumTotal(6)}. ${luftal('manha')}. ${bexigaCheia()}.`
const abdSuperiorParaKitM = `${jejumTotal(6)}. ${luftal('noite')}.`
const abdSuperiorParaKitT = `${jejumTotal(6)}. ${luftal('manha')}.`
const abdSuperiorM = `${jejum(6)}. ${luftal('noite')}.`
const abdSuperiorT = `${jejum(6)}. ${luftal('manha')}.`
const kitManha = `${abdTotalM}\n\n${densi2}.`
const kitTarde = `${abdTotalT}\n\n${densi2}.`
const kitDxaManha = `${abdTotalParaKitM}\n\n${densiCorpoInteiroSemJejum}.`
const kitDxaTarde = `${abdTotalParaKitT}\n\n${densiCorpoInteiroSemJejum}.`
const kitSupM = `${abdSuperiorM}\n\n${densi2}.`
const kitSupT = `${abdSuperiorT}\n\n${densi2}.`
const kitSupDxaManha = `${abdSuperiorParaKitM}\n\n${densiCorpoInteiroSemJejum}.`
const kitSupDxaTarde = `${abdSuperiorParaKitT}\n\n${densiCorpoInteiroSemJejum}.`
const pelvicaAbd = `${bexigaCheia()}.`
const pelvicaAbdKit = `${bexigaCheia()}.\n${densi2}.`
const pelvicaAbdKitDxa = `${bexigaCheia()}.\n${densiCorpoInteiro}.`
const mamografia = `Solicitamos não passar nada oleoso ou cremoso nas mamas e axilas (recomendamos utilizar desodorante em aerosol).`
const rotina = ``
const nutricaoOnline = `Para atendimento online será necessário ter instalado o aplicativo WhatsApp e ter se pesado antes da avaliação.\n\nApós a consulta, encaminhar o formulário de atendimento preenchido e anexar foto do identidade e carteirinha do convênio para o e-mail unidadeasasul@janicelamas.com.br.`
const nutricaoPresencial = `O exame de bioimpedância é totalmente indolor e rápido, mas assim como outros exames biológicos, requer alguns preparos antes de se submeter ao teste. Siga as instruções abaixo:\n\n• Faça jejum de alimentos e bebidas nas 4 horas que antecedem o horário do exame.\n• Suspender atividade física 24h antes da avaliação e utilizar roupas leves preferencialmente as usadas em academias.\n• Não consuma bebidas alcoólicas um dia antes do exame.\n• Evite o consumo excessivo de alimentos ricos em cafeína (chocolates, chás escuros e café) nos dois dias que antecedem o exame.\n\nNO DIA ANTERIOR:\n• Não realizar atividades físicas intensas.\n• (MULHERES) Não estar em período menstrual.\n• Urine pelo menos 30 minutos antes da realização do exame.\n\nNA HORA DO EXAME:\n• Objetos metálicos devem ser removidos (anéis, cordões, pulseiras, relógios metálicos, etc).\n\n*QUEM NÃO PODE REALIZAR O EXAME E NÃO PRECISA DE JEJUM: *\n• Pessoas com marca-passo, ou outro aparelho eletrônico interno ao corpo.\n• Mulheres grávidas ou com suspeita de gravidez.\n• Idosos acima de 70 anos.`
const alexander = `${luftalDias(6, 2)}. ${jejumTotal(6)}.`
const alexanderKit = `${alexander}. ${densi2}.`
const alexanderDexa = `${alexander}. ${densiCorpoInteiroSemJejum}.`
// Fim dos preparos para exames


/* As duas listas abaixo são uma forma de
organizar os preparos de acordo com o horário
que foi selecionado pelo usuário, pois alguns
preparos são diferentes de acordo com o período
do dia em que o exame está agendado */
const textos_manha = [
    abdTotalM,
    abdSuperiorM,
    kitManha,
    kitDxaManha,
    kitSupM,
    kitSupDxaManha,
    densi2,
    densiCorpoInteiro,
    densi2Dxa,
    pelvicaAbd,
    pelvicaAbdKit,
    pelvicaAbdKitDxa,
    mamografia,
    rotina,
    alexander,
    alexanderKit,
    alexanderDexa
]

const textos_tarde = [
    abdTotalT,
    abdSuperiorT,
    kitTarde,
    kitDxaTarde,
    kitSupT,
    kitSupDxaTarde,
    densi2,
    densiCorpoInteiro,
    densi2Dxa,
    pelvicaAbd,
    pelvicaAbdKit,
    pelvicaAbdKitDxa,
    mamografia,
    rotina,
    alexander,
    alexanderKit,
    alexanderDexa
]
// Fim das listas


function copiarTexto(texto) {
    /* Insere o texto na área de transferência */
    navigator.clipboard.writeText(texto)
    setTimeout(() => {
        alert('Texto copiado!');
    }, 350);
}


function gerarTexto() {
    /* Função principal da página, onde todos os elementos são avaliados
    para gerar o texto de preparo que o paciente deve receber */

    const nomePaciente = nomePacienteInput.value
    const index = textoSelect.value
    let unidade = Array.from(unidadeRadio).find((r) => r.checked)
    const tempo = 15
    let hora = horaInput.value.replace(";", ":")
    let textoSelecionado

    if (textoSelect.value == 17) {
        textoSelecionado = `${preTexto.slice(0, 120)} (online).\n\n${nutricaoOnline}\n\n${posTexto.slice(-197)}`
    }

    if (textoSelect.value == 18) {
        textoSelecionado = `${preTexto}\n\n${chegarComAntecedencia(tempo)}. ${nutricaoPresencial}\n\n${posTexto}`
    }

    if (unidade == undefined) {
        alert('Selecione a unidade!')
        console.log('Erro: unidade não selecionada.')
        return
    }
    else {
        unidade = unidade.value;
        if (!horaInput.value) {
            alert('Informe um horário!')
            console.log('Erro: horaInput.value = undefined.')
            return
        }
    }

    if (hora.length == 1 || hora.length == 2 || hora.length == 3) {
        if (hora.length == 1) {
            hora = `0${hora}:00`
        }
        else if (hora.length == 2) {
            hora = `${hora}:00`
        }
        else if (hora.length == 3) {
            hora = `${hora}00`
        }
    }

    if (textoSelect.value <= 16) {
        if (Number(hora.slice(0, 2)) < 13) {
            textoSelecionado = `${preTexto}\n\n${chegarComAntecedencia(tempo)}. ${textos_manha[index]}\n\n${posTexto}`
        }
        else {
            textoSelecionado = `${preTexto}\n\n${chegarComAntecedencia(tempo)}. ${textos_tarde[index]}\n\n${posTexto}`
        }
    }

    if (!validaNome()) {
        return
    }

    const textoFinal = textoSelecionado.replace("{consulta}", semConsulta()).replace(
        "{analise}", analise()).replace("{tipoExame}", tipoExame()).replace(
            "{nomePaciente}", nomePaciente.toUpperCase()).replace(
                "{unidade}",
                unidade.toUpperCase()).replace(
                    "{hora}",
                    hora).replace(
                        "{data}",
                        validaData())
    textoContainer.innerText = textoFinal

    textoContainer.classList.remove('texto-display-vazio')
    copiarTexto(textoFinal);
    nomePacienteInput.value = ''
    horaInput.value = ''
    desmarcaAnalise()
}
// Fim da função gerarTexto


// Event listeners
document.addEventListener("keypress", (e) => {
    if (e.key == 'Enter' && document.activeElement != gerarTextoBtn) {
        gerarTexto();
    }
})

document.addEventListener("click", (e) => {
    selecionaUnidade()
})

horaInput.addEventListener("keyup", (e) => {
    if (e.key == ':' || e.key == ';') {
        if (horaInput.value.length != 3) {
            horaInput.value = horaInput.value.slice(0, -1)
        }
    }
    if (e.code.includes('Digit') || e.code.includes('Numpad')) {
        completaHora()
    }
    if (horaInput.value.length == 4 && !horaInput.value.includes(':')) {
        horaInput.value = `${horaInput.value.slice(0, 2)}:${horaInput.value.slice(2, 4)}`
    }
})
