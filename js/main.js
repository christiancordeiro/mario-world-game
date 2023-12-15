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
    green: "#02F00",
    purple: "#790093",
    pink: "#F02A7E",
    red: "#E90808",
    yellow: "#E7D703",
    black: "#141414",
    orange: "#F16529",
    grey: "#EBEBEB",
  },
  moedas: 0,
}

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


