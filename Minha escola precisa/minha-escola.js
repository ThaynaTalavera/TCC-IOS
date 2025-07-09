const firebaseConfig = {
    apiKey: "AIzaSyDgiVxEr2eRS2PmVziqgwaUUTRjkPBRHww",
    authDomain: "caminhos-do-saber-c55dc.firebaseapp.com",
    projectId: "caminhos-do-saber-c55dc",
    storageBucket: "caminhos-do-saber-c55dc.firebasestorage.app",
    messagingSenderId: "329237494439",
    appId: "1:329237494439:web:d6c4fb0fdff07ed1ee3982",
    measurementId: "G-EHM4TJY8W8"
  };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    document.getElementById('Registrar').addEventListener('submit', function (e) {
      e.preventDefault();

      const materiaisSelecionados = Array.from(document.querySelectorAll('.checkbox-materiais'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      let escola = {
        nome: document.getElementById('nome').value,
        modalidade: document.getElementById('modalidade').value,
        porte: document.getElementById('porte').value,
        codigoINEP: document.getElementById('codigoINEP').value,
        municipio: document.getElementById('municipio').value,
        cep: document.getElementById('CEP').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        materiais: materiaisSelecionados
      };

      

      db.collection('escolas').add(escola).then(() => {
      //  alert('Escola registrada com sucesso!');
        document.getElementById('Registrar').reset();
      });
    });
//  Banco de dados
//------------------------------------------------------------------------------------------------------

// Modo claro e escuro
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