# { "developer": "fullstack" } ao CUBO \o/

O objetivo desse projeto é resolver o desafio proposto pela empresa CUBO aos candidatos ao cargo de Fullstack Developer.
A especificação do desafio pode ser encontrada no github da empresa CUBO, mais especificamente na url https://github.com/cubonetwork/fullstack-challenge.

## Solução Proposta

Para solucionar o desafio foram desenvolvidas 2 aplicações, sendo uma API REST (Node.js) e uma aplicação web SPA (Angular 2), que serão melhor detalhadas no decorrer do documento. 

O diretório raiz desse repositório é composto, dentre outros arquivos, por duas pastas:

```
|- /api
|- /web
```

O diretório [api](/api) contêm o projeto API REST, enquanto, o diretório [web](/web) contêm a aplicação web SPA.

Caso queira pular os detalhes de cada aplicação e executá-las rapidamente, no final desse documento há uma sequência de comandos para instalar e inicializar as aplicações, bem como, executar os testes em cada uma delas.

## API REST (Node.js)

O projeto API REST foi desenvolvido utilizando Node.js e possui a seguinte estrutura organizacional:

```
|- /app
|--- /config
|--- /infra
|--- /middlewares
|--- /models
|--- /routes
|--- /utils
|- /tests
|- app.js
|- package.json
```

### Inicialização

No arquivo [package.json](/api/package.json) encontram-se as dependências para execução da aplicação, ou seja, todos as libraries utilizadas na construção da API. Antes de executarmos o comando para inicializar o servidor da aplicação, é necessário baixar essas dependências. Esse procedimento pode ser realizado executando o comando a seguir, a partir do diretório [/api](/api):

```bash
sudo npm install
```

O arquivo [app.js](/api/app.js) é o arquivo inicial da aplicação, responsável pela inicialização do server e, consequentemente, disponibilizar os endpoints implementados no projeto da API.

As configurações de level de log, bem como, dados de conexão ao banco de dados devem se encontrar em um arquivo chamado `app.yml` que deve ser criado no diretório [/api/app/config](/api/app/config). Nesse mesmo diretório encontra-se um [arquivo de configuração exemplo](/api/app/config/app.yml.sample).

Essa prática é comum para se evitar compartilhamento de informações sigilosas, como, dados de conexão ao banco de dados do ambiente de produção.

Para facilitar essa configuração basta executar o comando de setup abaixo definido: 

```bash
npm run setup
```
Esse script cria o arquivo de configuração `app.yml` no diretório correto. 

Após realizado o setup, para inicializar a aplicação, utilize o seguinte comando:

```bash
npm start
```

Por padrão o servidor é inicilizado na porta `:3000`, portanto, após a execução do comando `npm start` a API REST ficará disponível através da url http://localhost:3000.

### Dependências

A aplicação API REST foi desenvolvida utilizando, principalmente, os seguintes frameworks:

- [express](https://expressjs.com/) - framework web
- [sequelize](http://docs.sequelizejs.com/) - ORM (Foi utilizado o SGBD Sqlite para persistência dos dados)
- [winston](https://www.npmjs.com/package/winston) - logs
- [mocha](https://mochajs.org/) e [chai](http://chaijs.com/) - para testes 

### Testes

Os testes implementados para a API encontram-se no diretório [/api/tests](/api/tests) e podem ser executados utilizando o seguinte comando:

```bash
npm test
```

### Organização do código

Em suma toda a codificação da API se encontra no diretório [/api/app](/api/app):

```
|- /app
|--- /config
|----- app.yml
|----- express.js
|--- /infra
|----- database.js
|--- /middlewares
|----- cors.middleware.js
|--- /models
|----- employee.js
|--- /routes
|----- employees.js
|--- /utils
|----- logger.js
```

- `/config/express.js` é onde se encontram as configurações do framework express.
- `/infra/database.js` é onde se encontram as configurações do ORM sequelize que fará o mapeamento do schema da base de dados de acordo com os modelos definidos do diretório `/models`.
- `/middlewares/cors.middleware.js` uma vez que a API será consumida por uma aplicação com domínio diferente, é necessário utilizar um mecanismo de controle de acesso conhecido como `CORS (Cross-Origin Resource Sharing)`. Esse middleware adiciona alguns Headers no Response, permitindo que uma origem de domínio diferente possa consumir a API. A implementação está permitindo qualquer origem, mas, em ambiente de produção é necessário políticas de controle mais restritas.
- `/models/employee.js` mapeamento do objeto employee que será utilizado pelo sequelize na construção do schema da tabela que armazenará os employees cadastrados.
- `/routes/employees.js` arquivos onde as rotas `GET /employees` e `POST /employees` estão implementadas.
- `/utils/logger.js` é onde se encontram as configurações do framework winston para geração de logs.

## Web SPA (Angular 2)

Para o desenvolvimento do projeto web foi utilizado como base o projeto "blueprint blank" sugerido no [enunciado do desafio](https://github.com/cubonetwork/fullstack-challenge/blob/master/README.md#dicas-angular-2).

### Inicialização

De modo análogo ao projeto API REST, o gerenciador de dependências utilizado para o projeto web também é o `npm`. Dessa forma, é possível notar a presença do arquivo [package.json](/web/package.json) na raiz do diretório `/web`, contendo a referência de todas as libraries e frameworks dos quais a aplicação é dependente. 

A partir do diretório `/web` execute o seguinte comando para baixar as dependências do projeto:

```bash
sudo npm install
```

E para inicializar a aplicação web execute:
```bash
npm start
```

A aplicação estará disponível na url http://localhost:4200.

`IMPORTANTE:` Certifique-se de que a API REST foi inicializada, antes de inicializar a aplicação web.

### Dependências

Além, obviamente, da dependência do framework Angular 2, podemos destacar as seguintes dependências:

- [protractor](http://www.protractortest.org/#/) framework de testes end-2-end.
- [angular2-nvd3](https://www.npmjs.com/package/angular2-nvd3) library utilizada para implementação do gráfico.

### Testes

A codificação dos testes utilizando protractor se encontra no diretório [/web/e2e](/web/e2e). Para executá-los rode o seguinte comando:

```bash
npm run e2e
```

`IMPORTANTE:` Os testes implementados realizam cadastros de employee e, portanto, a API REST precisa estar disponível no endereço http://localhost:3000. Para não poluir a base de dados da aplicação com os dados de teste, é necessário inicilizar a api através do comando:

```bash
npm run e2e
```
Esse comando quando executado no projeto API, inicializa a aplicação em modo test e faz uso de uma base de dados em memória que é descartada com o encerramento da API.

### Organização do código

Para descrever a lógica organizacional utilizada no desenvolvimento da aplicação web, vamos detalhar a organização do diretório `/web/src/app`:

```
|- /app
|--- /employees
|----- /employee-form
|------- employee-form.component.css
|------- employee-form.component.html
|------- employee-form.component.ts
|----- /employee-list
|------- employee-list.component.css
|------- employee-list.component.html
|------- employee-list.component.ts
|----- /employee-piechart
|------- employee-piechart.component.css
|------- employee-piechart.component.html
|------- employee-piechart.component.ts
|----- /shared
|------- employee.model.ts
|------- employee.service.ts
|--- app.component.css
|--- app.component.html
|--- app.component.ts
|--- app.module.ts
```

Em resumo a página que compõe a aplicação foi implementada através de 4 components:

- [app.component.ts](/web/app/app.component.ts) component principal da aplicação (referência os components necessários para criação da página)
- [/app/employees/employee-form/employee-form.component.ts](/web/app/employees/employee-form/employee-form.component.ts) component criado para representação do formulário de cadastro dos employees.
- [/app/employees/employee-list/employee-list.component.ts](/web/app/employees/employee-list/employee-list.component.ts) component criado para representação da listagem de employees cadastrados.
- [/app/employees/employee-piechart/employee-piechart.component.ts](/web/app/employees/employee-piechart/employee-piechart.component.ts) component criado para representação do gráfico de participação dos employees cadastrados.

Para integração com os endpoints da API foi implementada a classe `EmployeeService`, cuja codificação pode ser encontrada no arquivo [/app/employees/shared/employee.service.ts](/web/app/employees/shared/employee.service.ts).

- [/app/employees/shared/employee.model.ts](/web/app/employees/shared/employee.model.ts) possui a implementação da classe `Employee` modelo utilizado na comunicação entre os components e a API REST.

## Comandos rápidos para inicialização e execução dos testes end-to-end

### Inicialização

- API
```bash
sudo npm install
npm run setup
npm start
```

- WEB
```bash
sudo npm install
npm start
```

### Testes end-to-end

- API e WEB
```bash
npm run e2e
```

### Testes unitários e de integração

- API
```bash
npm test
```

## Autor

- Murilo Amêndola (muriloamendola@gmail.com)