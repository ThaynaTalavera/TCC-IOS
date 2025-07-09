// Importações modernas do Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"

  // Configuração Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDgiVxEr2eRS2PmVziqgwaUUTRjkPBRHww",
    authDomain: "caminhos-do-saber-c55dc.firebaseapp.com",
    projectId: "caminhos-do-saber-c55dc",
    storageBucket: "caminhos-do-saber-c55dc.appspot.com",
    messagingSenderId: "329237494439",
    appId: "1:329237494439:web:d6c4fb0fdff07ed1ee3982",
    measurementId: "G-EHM4TJY8W8"
  }

  // Inicializar app e banco
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
 
  // Função para buscar e exibir escolas
  async function carregarEscolas() {
    const lista = document.getElementById("lista-Escolas")
    const querySnapshot = await getDocs(collection(db, "escolas"))

    lista.innerHTML = ""

    querySnapshot.forEach((doc) => {
      const dados = doc.data()
      const card = document.createElement("div")
      card.className = "card"
      card.innerHTML = `
        <h2>${dados.nome}</h2>
        <p><strong>Endereço: </strong> ${dados.municipio}, ${dados.rua}, ${dados.bairro} - ${dados.numero}</p>
        <strong>Modalidade de ensino: </strong>${dados.modalidade} <br> <br>
        <strong>Materiais:</strong> <br>
          ${dados.materiais.map((material) => ` <li>${material}</li>`).join("")}
        
        <div class="btn-doar">
          <a href="quero-ajudar.html?escola=${encodeURIComponent(dados.nome)}">
          <button class="doar">Doar agora</button>
        </a>
      </div>
      `
      lista.appendChild(card)
    })    
  }

  carregarEscolas()

  const html = document.documentElement;
// CORREÇÃO: Altera o ID para 'checkbox' para corresponder ao HTML
const toggleSwitch = document.getElementById('checkbox'); // Assumindo que este é o seu checkbox de alternância de tema

function atualizarBotao(tema) {
    // Atualiza o estado do checkbox (marcado/desmarcado)
    if (toggleSwitch) {
        toggleSwitch.checked = (tema === 'dark');
    }
}

function alternarTema() {
    // Pega o tema atual baseado no estado do checkbox
    const novoTema = toggleSwitch.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', novoTema);
    localStorage.setItem('tema', novoTema); // Salva a preferência no localStorage
    // Não é necessário chamar atualizarBotao aqui, pois o estado do checkbox já reflete o novo tema.
}

document.addEventListener('DOMContentLoaded', () => {
    // Pega o tema salvo no localStorage
    const temaSalvo = localStorage.getItem('tema');

    // Aplica o tema salvo ou padroniza para 'light'
    if (temaSalvo === 'dark') {
        html.setAttribute('data-theme', 'dark');
        atualizarBotao('dark'); // Atualiza o estado visual do checkbox
    } else {
        // Se não houver tema salvo ou for 'light', define como 'light'
        html.setAttribute('data-theme', 'light');
        atualizarBotao('light'); // Atualiza o estado visual do checkbox
    }

    // Adiciona o event listener ao checkbox de alternância de tema
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', alternarTema);
    }
});

// Responsividade 
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });