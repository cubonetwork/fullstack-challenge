# { "developer": "fullstack" } ao CUBO \o/

Objetivo deste desafio é avaliarmos o seu domínio em desenvolvimento fullstack, ou seja, sua organização, estilo e boas práticas com o código, criação de APIs Restfull, conhecimento dos frameworks e tecnologias utilizadas.


## FullStack Challenge Backend
* https://github.com/vitorsilvalima/fullstack-challenge-backend



## Regras

1. Todo o seu código deve ser disponibilizado num repositório público em seu github ou bitbucket pessoal. Envie o link para dev@cubo.network ou faça um pull-request deste repositório;  
2. Desenvolver o projeto utilizando: 
    - HTML e CSS (ou algum pré-processador); 
    - Algum framework SPA (Single Page Application). Sugestão: **Angular 2**;
    - APIs em **Node.js**;
3. Submeter o link do seu repositório com o código do desafio **até 10 dias** após a sua aplicação na [vaga pelo site](https://cubo.network/jobs/d69815f0-4aca-11e7-bfed-2930c9251a9d)

## O Desafio

Este é o layout que deverá ser produzido:
![layout](layout-onepage.png)

Aqui vai o layout em PSD:
[Download do arquivo](layout-onepage.psd)

### APIs

Percebam que no layout acima temos um formulário, uma tabela com informações de percentual de participação de cada pessoa e um grafico de pizza que representa esta distribuição, ou seja, precisamos de API que envie e receba essas infos pro server.

#### POST /employees

Você deve desenvolver esta API que espera por este recurso "employee" (funcionário) para cadastro.

_Não se preocupe com métodos de autênticação, validação, token para esta API, mas ficaremos felizes se você desenvolver testes pra ela_ =)

#### GET /employees

Você deve desenvolver esta API que retorna o JSON com a lista de "employees" (funcionários) com suas devidas participações.


### Algumas dicas e observações
> Obs 1.: Fique a vontade para utilizar qualquer 3rd party, seja para gráficos, testes, etc;
 
> Obs 2.: Considere que todos os campos são de preenchimento obrigatório no formulário.

> Obs 3.: Considere validar os campos também na API e em caso de inconsistência retornar erro num JSON estruturado com código HTTP 500


## Dicas Angular 2

Deixamos pronto aqui neste repositório um projeto "blueprint blank" em Angular 2 pra você não sair do zero ;)

### install angular-cli
1. Para instalar o angular-cli você deve ter instalado antes o [Node.js](https://nodejs.org/) v4 ou superior junto com o NPM 3 ou superior.

2. Instalando o angular-cli 
    ```sh
    $ npm install -g @angular/cli
    ```

3. Faça clone deste repositório e suba o projeto

    Clone: 
    ```sh
    $ git clone https://github.com/cubonetwork/fullstack-challenge.git
    ```
    Instalando as dependências:
    ```sh
    $ npm install
    ```
    Iniciando o projeto:
    ```sh
    $ npm start
    ```
    Acesse http://localhost:4200/ para visualizar o projeto base

    Rodando testes end-to-end com [Protractor](http://www.protractortest.org/):
    ```sh
    $ npm run e2e
    ```

## Dúvidas
Envie suas dúvidas diretamente para dev@cubo.network ou abrindo uma issue
