let engine = {
  cores: [
    "green",
    "purple",
    "pink",
    "red",
    "yellow",
    "orange",
    "grey",
    "black",
  ],
  hexadecimais: {
    green: "#41E137",
    purple: "#790093",
    pink: "#F02A7E",
    red: "#E90808",
    yellow: "#E7D703",
    black: "#141414",
    orange: "#F16529",
    grey: "#808080",
  },
  moedas: 0,
}

const audioMoeda = new Audio("../moeda.mp3")
const audioErrou = new Audio("../errou.mp3")

function sortearCor() {
  let indexCorSorteada = Math.floor(
    Math.floor(Math.random() * engine.cores.length)
  )
  const corNaCaixa = document.getElementById("cor-na-caixa")
  let nomeCorSorteada = engine.cores[indexCorSorteada]

  corNaCaixa.innerText = nomeCorSorteada.toUpperCase()

  return engine.hexadecimais[nomeCorSorteada]
}

function aplicarCorNaCaixa(nomeDaCor) {
  const coresDaCaixa = document.getElementById("cor-atual")
  coresDaCaixa.style.backgroundColor = nomeDaCor

  coresDaCaixa.style.backgroundImage = "url('./img/caixa-fechada.png')"
  coresDaCaixa.style.backgroundSize = "100%"
}

function atualizaPontuacao(valor) {
  let pontuacao = document.getElementById("pontuacao-atual")

  engine.moedas += valor

  if (valor < 0) {
    audioErrou.play()
  } else {
    audioMoeda.play()
  }

  pontuacao.innerText = engine.moedas
}

aplicarCorNaCaixa(sortearCor())

//API DE RECONHECIMENTO DE VOZ

const btn = document.getElementById("btn-responder")
let transcricaoAudio = ""
let gravador
let respostaCorreta = ""

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  const speechAPI = window.SpeechRecognition || window.webkitSpeechRecognition
  gravador = new speechAPI()

  gravador.continuos = false
  gravador.lang = "eng-US"

  gravador.onstart = function () {
    btn.innerText = "Estou ouvindo"
    btn.style.backgroundColor = "white"
    btn.style.color = "black"
  }

  gravador.onend = function () {
    btn.innerText = "Responder"
    btn.style.backgroundColor = "transparent"
    btn.style.color = "white"
  }

  gravador.onresult = function (event) {
    transcricaoAudio = event.results[0][0].transcript.toUpperCase()
    respostaCorreta = document
      .getElementById("cor-na-caixa")
      .innerText.toUpperCase()

    if (transcricaoAudio === respostaCorreta) {
      atualizaPontuacao(1)
    } else {
      atualizaPontuacao(-1)
    }

    console.log(transcricaoAudio)
    console.log(respostaCorreta)

    aplicarCorNaCaixa(sortearCor())
  }
} else {
  alert("Navegador não tem suporte pra reconhecimento de voz")
}

btn.addEventListener("click", function (e) {
  gravador.start()
})
