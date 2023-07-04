# Talker Manager API - Node.js, Express, Docker

## Descrição do Projeto

O Talker Manager é uma aplicação desenvolvida como parte do meu aprendizado em desenvolvimento web full stack. Trata-se de um projeto individual que tem como objetivo construir uma API para um sistema de cadastro de palestrantes (talkers). A aplicação permite realizar operações de criação, leitura, atualização e exclusão de informações sobre os palestrantes, seguindo o conceito de um sistema CRUD (Create, Read, Update, Delete).

O projeto foi desenvolvido utilizando tecnologias como Node.js, Express e JavaScript, que são amplamente utilizadas em aplicações back-end. A utilização do Docker foi adotada para facilitar o gerenciamento de dependências e garantir a portabilidade e consistência do ambiente de desenvolvimento.

## Principais Funcionalidades

- Cadastrar novos palestrantes;
- Visualizar informações dos palestrantes cadastrados;
- Pesquisar palestrantes com base em critérios específicos;
- Editar informações de palestrantes existentes;
- Excluir palestrantes do sistema.

## Tecnologias Utilizadas

- Node.js: plataforma de desenvolvimento de aplicações back-end JavaScript;
- Express: framework web para Node.js, facilitando a criação de APIs;
- Docker: plataforma de conteinerização que permite empacotar a aplicação com suas dependências;
- Git e GitHub: ferramentas de controle de versão e colaboração em equipe.

## Habilidades Aprendidas

Durante o desenvolvimento do Talker Manager, adquiri habilidades importantes para o mercado da programação, incluindo:

- Desenvolvimento de APIs utilizando Node.js e Express;
- Manipulação de arquivos utilizando o módulo `fs` do Node.js;
- Utilização do Docker para gerenciar as dependências e garantir a consistência do ambiente de desenvolvimento;
- Familiarização com comandos do Docker para iniciar os containers, executar comandos no terminal do container e realizar testes;
- Prática do uso de boas práticas de desenvolvimento, como organização de código, utilização de linter para manter a qualidade do código, e execução de testes automatizados.

## Como Utilizar

Para utilizar o Talker Manager, siga as instruções abaixo:

1. Clone o repositório e acesse o diretório do projeto:
   ```bash
   git clone https://github.com/yourusername/talker-manager.git
   cd talker-manager 
   
2. Inicie os containers utilizando o Docker:
` docker-compose up -d `

  - Certifique-se de ter o Docker instalado em sua máquina.

3. Acesse a aplicação em seu navegador:
` http://localhost:3001 `

  - A aplicação estará rodando na porta 3001.
  - O Banco de dados estará rodando na porta 3006.

4. Realize as operações de cadastro, visualização, pesquisa, edição e exclusão de palestrantes utilizando a interface da aplicação.

  - Observação: Os testes automatizados foram fornecidos pela Trybe para avaliação do projeto.

## Contato

- [LinkedIn](https://www.linkedin.com/in/alissontassi/)
- [GitHub](https://github.com/AlissonSeraphim)
