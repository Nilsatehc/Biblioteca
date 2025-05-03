Sistema de Gerenciamento de Biblioteca
Objetivo da atividade
Desenvolver um sistema orientado a objetos em JavaScript, inspirado no sistema bancário apresentado no repositório tii09-uc6, utilizando classes, encapsulamento, herança, Local Storage e operações CRUD completas. O sistema terá foco na gestão de autores, livros e clientes de uma biblioteca. Descrição do problema

Uma biblioteca deseja informatizar seu processo de cadastro e gerenciamento de livros, autores e clientes. Para isso, será necessário construir um sistema baseado em objetos que simula as funcionalidades básicas de uma aplicação real.

A estrutura do sistema será composta por três entidades principais:
Pessoa (classe base): representa os dados em comum entre autores e clientes.

Autor: herda de Pessoa e é utilizado para associar autores aos livros.

Cliente: herda de Pessoa e representa os usuários que podem pegar livros emprestados (essa funcionalidade pode ser incluída em etapas futuras).

Livro: representa uma obra literária, que deve obrigatoriamente estar associada a um autor.

Cada entidade deverá ser persistida no Local Storage, com prefixos próprios e IDs únicos gerados automaticamente, seguindo o padrão já utilizado no sistema bancário.
Requisitos obrigatórios
Classe Pessoa (abstrata ou base):

Contém os atributos comuns id, nome, ativo.

Métodos como toString() e atualizarNome().

Classe Autor e Cliente:

Herdam os atributos e métodos da classe Pessoa.

Possuem prefixos distintos para gerar IDs únicos no Local Storage (autor-, cliente-).

Classe Livro:

Contém id, titulo, ano, autor (referência à instância da classe Autor), ativo.

Métodos como toString(), além de operações de criação, listagem, edição e remoção lógica (desativação).

Classe BancoDeDados:

Gerencia o armazenamento e recuperação de objetos no Local Storage.

Possui métodos genéricos para busca por prefixo e métodos específicos para cada entidade.

Interface HTML (mínima):

Páginas para cadastro e listagem de autores, livros e clientes.

Em cada tela de cadastro, deve ser possível associar corretamente um livro a um autor existente.

Regras adicionais
Deve-se seguir o mesmo padrão de encapsulamento com atributos privados (#), uso de getters, métodos de conversão (fromJSONorObject) e separação entre lógica e interface.

Os dados devem ser persistidos corretamente, com a possibilidade de recuperar todos os registros de uma entidade a partir do Local Storage.

O sistema deve permitir a criação de múltiplos livros para um mesmo autor.

A inativação de autores ou clientes deve refletir visualmente nas listagens, semelhante ao modelo de "[INATIVO]".
Critérios de avaliação
Aplicação correta dos conceitos de POO: herança, encapsulamento, reutilização.

Organização do código em arquivos separados para cada classe.

Interface funcional e compatível com as operações de CRUD.

Uso adequado do Local Storage.

Clareza e organização geral da solução.
Entregável:
Faça um clone local desse repositório e crie uma branch com seu nome

Envie um merge request com uma branch em seu nome ao finalizar

(Opcionalmente, faça um fork do repositório e crie uma branch com seu nome. Envie um merge request da sua branch ao finalizar)# Biblioteca
