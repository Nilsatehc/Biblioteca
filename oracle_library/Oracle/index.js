class Pessoa {
  #id;
  #nome;
  #ativo;

  constructor(nome, prefixo) {
    this.#id = Pessoa.gerarId(prefixo);
    this.#nome = nome;
    this.#ativo = true;
  }

  static gerarId(prefixo) {
    return `${prefixo}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  atualizarNome(novoNome) {
    this.#nome = novoNome;
  }

  desativar() {
    this.#ativo = false;
  }

  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  get ativo() {
    return this.#ativo;
  }

  toString() {
    return `${this.#ativo ? "" : "[INATIVO] "}${this.#nome}`;
  }
}

class Autor extends Pessoa {
  constructor(nome) {
    super(nome, "autor");
  }
}

class Cliente extends Pessoa {
  constructor(nome) {
    super(nome, "cliente");
  }
}

class Livro {
  #id;
  #titulo;
  #ano;
  #autor;
  #ativo;

  constructor(titulo, ano, autor) {
    if (!(autor instanceof Autor)) {
      throw new Error("O autor deve ser uma instância válida de Autor.");
    }
    this.#id = Pessoa.gerarId("livro");
    this.#titulo = titulo;
    this.#ano = ano;
    this.#autor = autor;
    this.#ativo = true;
  }

  desativar() {
    this.#ativo = false;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get ano() {
    return this.#ano;
  }

  get autor() {
    return this.#autor;
  }

  get ativo() {
    return this.#ativo;
  }

  toString() {
    return `${this.#ativo ? "" : "[INATIVO] "}${this.#titulo} (${this.#ano}) - Autor: ${this.#autor.toString()}`;
  }
}

class BancoDeDados {
  static salvar(prefixo, objeto) {
    const dados = JSON.parse(localStorage.getItem(prefixo)) || [];
    dados.push(objeto);
    localStorage.setItem(prefixo, JSON.stringify(dados));
  }

  static carregar(prefixo) {
    return JSON.parse(localStorage.getItem(prefixo)) || [];
  }

  static atualizar(prefixo, id, novoObjeto) {
    let dados = JSON.parse(localStorage.getItem(prefixo)) || [];
    dados = dados.map(obj => obj.id === id ? novoObjeto : obj);
    localStorage.setItem(prefixo, JSON.stringify(dados));
  }

  static remover(prefixo, id) {
    let dados = JSON.parse(localStorage.getItem(prefixo)) || [];
    dados = dados.filter(obj => obj.id !== id);
    localStorage.setItem(prefixo, JSON.stringify(dados));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Sistema de Biblioteca carregado!");

  const campoBusca = document.querySelector("#campoBusca");
  const botaoBusca = document.querySelector("#botaoBusca");
  const resultados = document.querySelector("#resultados");

  if (!campoBusca || !botaoBusca || !resultados) {
    console.error("Erro: Elementos não encontrados no DOM.");
    return;
  }

  botaoBusca.addEventListener("click", () => {
    console.log("Botão de busca clicado!");

    const termo = campoBusca.value.toLowerCase().trim();
    resultados.innerHTML = "";

    if (!termo) {
      resultados.innerHTML = "<p>Digite um termo de busca.</p>";
      return;
    }

    const livros = BancoDeDados.carregar("livro");
    const filtrados = livros.filter(
      livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.nome.toLowerCase().includes(termo)
    );

    if (!filtrados.length) {
      resultados.innerHTML = "<p>Nenhum livro encontrado.</p>";
      return;
    }

    filtrados.forEach(livro => {
      const div = document.createElement("div");
      div.classList.add("resultado");
      div.innerHTML = `
        <p><strong>${livro.titulo}</strong> - ${livro.autor.nome}</p>
        <button onclick="emprestarLivro('${livro.id}')">Empréstimo</button>
      `;
      resultados.appendChild(div);
    });
  });
});

function emprestarLivro(id) {
  const nomeUsuario = prompt("Digite seu nome para o empréstimo:");
  if (!nomeUsuario) {
    alert("Nome obrigatório para empréstimo.");
    return;
  }

  const livros = BancoDeDados.carregar("livro");
  const livro = livros.find(l => l.id === id);
  if (!livro) {
    alert("Livro não encontrado.");
    return;
  }

  const dataEmprestimo = new Date();
  const dataDevolucao = new Date(dataEmprestimo);
  dataDevolucao.setDate(dataEmprestimo.getDate() + 15);

  const emprestimo = {
    nomeUsuario,
    tituloLivro: livro.titulo,
    autorLivro: livro.autor.nome,
    dataEmprestimo: dataEmprestimo.toLocaleDateString(),
    dataDevolucao: dataDevolucao.toLocaleDateString()
  };

  BancoDeDados.salvar("emprestimos", emprestimo);
  alert(`Empréstimo confirmado para ${nomeUsuario}. Devolução até ${emprestimo.dataDevolucao}.`);
}


  