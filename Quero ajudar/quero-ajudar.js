import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDgiVxEr2eRS2PmVziqgwaUUTRjkPBRHww",
    authDomain: "caminhos-do-saber-c55dc.firebaseapp.com",
    projectId: "caminhos-do-saber-c55dc",
    storageBucket: "caminhos-do-saber-c55dc.appspot.com",
    messagingSenderId: "329237494439",
    appId: "1:329237494439:web:d6c4fb0fdff07ed1ee3982",
    measurementId: "G-EHM4TJY8W8"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const selectEscola = document.getElementById("escolaSelecionada");
  const materiaisDiv = document.getElementById("materiaisDisponiveis");
  const mapaEscolas = {};

  // Preencher o select com as escolas
  const params = new URLSearchParams(window.location.search);
  const escolaSelecionada = params.get("escola");

  async function carregarEscolas() {
    const querySnapshot = await getDocs(collection(db, "escolas"));
    selectEscola.innerHTML = `<option disabled selected>Selecione uma escola</option>`;

    querySnapshot.forEach((doc) => {
      const dados = doc.data();
      const option = document.createElement("option");
      option.value = dados.nome;
      option.textContent = dados.nome;

      if (dados.nome === escolaSelecionada) {
        option.selected = true;
      }

      mapaEscolas[dados.nome] = dados;
      selectEscola.appendChild(option);
    });

    // Mostrar materiais se a escola já foi passada via URL
    if (escolaSelecionada && mapaEscolas[escolaSelecionada]) {
      mostrarMateriais(mapaEscolas[escolaSelecionada]);
    }
  }

  function mostrarMateriais(escola) {
    materiaisDiv.innerHTML = `<h1>MATERIAIS NECESSÁRIOS</h1>`;
    if (escola.materiais && escola.materiais.length > 0) {
      escola.materiais.forEach(material => {
        const id = material.toLowerCase().replace(/\s/g, "-");
        materiaisDiv.innerHTML += `
          <label for="${id}">
            <input type="checkbox" name="materiaisParaDoar" class="checkbox-materiais" id="${id}" value="${material}">
            ${material}
          </label><br>
        `;
      });
    } else {
      materiaisDiv.innerHTML += "<p>Essa escola ainda não marcou materiais necessários.</p>";
    }
  }

  selectEscola.addEventListener("change", function () {
    const escola = mapaEscolas[this.value];
    mostrarMateriais(escola);
  });

  document.getElementById("tipoEntrega").addEventListener("change", function () {
    const container = document.getElementById("enderecoContainer");
    const isRetirada = this.value === "retirada";

    if (isRetirada) {
        container.classList.add("visivel");
    } else {
        container.classList.remove("visivel");
    }
});

  document.getElementById("enviar doação").addEventListener("submit", (e) => {
    e.preventDefault(); // prevenir recarregamento da página
    alert("Doação realizada com sucesso!");
    e.target.reset();
  });

  carregarEscolas();

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

    function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('munincipio').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('munincipio').value=(conteudo.localidade);
      
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('munincipio').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };