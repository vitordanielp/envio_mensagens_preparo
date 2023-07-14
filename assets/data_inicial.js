const diaInput = document.querySelector('#dia-input')
const mesInput = document.querySelector('#mes-input')
const anoInput = document.querySelector('#ano-input')
const hoje = new Date();
let soma = 1  // Valor a ser incrementado para acrescentar datas

// Lista de feriados
const FERIADOS = [
    '01/01/2023', '21/02/2023', '07/04/2023', '21/04/2023', '01/05/2023', '07/09/2023', '12/10/2023', '02/11/2023', '15/11/2023', '25/12/2023',
    '01/01/2024', '13/02/2024', '29/03/2024', '21/04/2024', '01/05/2024', '07/09/2024', '12/10/2024', '02/11/2024', '15/11/2024', '25/12/2024',
]


// Definir string do próximo dia
function proximaData() {
    let milissegundos = hoje.getTime()
    milissegundos += (24 * soma) * 60 * 60 * 1000
    let proximoDia = new Date(milissegundos)
    let ano = proximoDia.getFullYear()
    const opcoes = { day: '2-digit', month: '2-digit' }
    let dataFormatada = proximoDia.toLocaleString('pt-BR', opcoes)
    return `${dataFormatada}/${ano}`
}


let data = new Date(`${proximaData().slice(3, 5)}/${proximaData().slice(0, 2)}/${proximaData().slice(6)}`)


function atualizaData() {
    proximaData()
    data = new Date(`${proximaData().slice(3, 5)}/${proximaData().slice(0, 2)}/${proximaData().slice(6)}`)
    modificaData()
}


function eFeriado() {
    for (let feriado of FERIADOS) {
        if (proximaData() === feriado) {
            return true
        }
    }
    return false
}


function eSabado() {
    if (data.getDay() === 6) {
        return true
    }
    else {
        return false
    }
}


function eDomingo() {
    if (data.getDay() === 7) {
        return true
    }
    else {
        return false
    }
}


function modificaData() {
    // Verifica qual unidade foi selecionada
    const unidade = Array.from(unidadeRadio).find((r) => r.checked).value

    if (!diaInput.value || unidade === 'asa sul') {

        if (eSabado() && unidade === 'asa sul') {
            soma += 2
            atualizaData()
        }

        if (eDomingo()) {
            soma++
            atualizaData()
        }

        if (eFeriado()) {
            soma++
            atualizaData()
        }

        diaInput.value = proximaData().slice(0, 2)
        mesInput.value = proximaData().slice(3, 5)
        anoInput.value = proximaData().slice(6)
    }
}
