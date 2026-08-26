# API de Carros

Este projeto é uma API feita com Node.js e Express. Ela permite cadastrar, consultar, atualizar e excluir carros em um banco de dados MySQL.

Também existe uma página simples que mostra a lista de carros.

## O que é necessário

Antes de começar, instale:

- Node.js
- MySQL

## Como instalar

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Crie um banco de dados chamado `db_carros` no MySQL.
4. Crie uma tabela `carro` com, no mínimo, estas colunas:

```sql
CREATE DATABASE db_carros;

USE db_carros;

CREATE TABLE carro (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nome VARCHAR(100) NOT NULL,
		tipo VARCHAR(100),
		foto VARCHAR(255),
		url_foto VARCHAR(255)
);
```

O projeto espera que o MySQL esteja rodando em `localhost`, com o usuário `root` e o banco `db_carros`. Essas informações estão no arquivo `model/CarroDB.js`.

## Como iniciar

Para iniciar o servidor, execute:

```bash
node app.js
```

Depois, acesse:

- Página com a lista de carros: `http://localhost:3000`
- API: `http://localhost:3000/api/carros`

O servidor usa a porta `3000`.

## Rotas da API

### Listar todos os carros

```http
GET /api/carros
```

### Buscar um carro pelo ID

```http
GET /api/carros/1
```

### Buscar carros pelo tipo

```http
GET /api/carros/SUV
```

### Cadastrar um carro

```http
POST /api/carros
Content-Type: application/json
```

Exemplo de conteúdo enviado:

```json
{
	"nome": "Civic",
	"tipo": "Sedan"
}
```

### Atualizar um carro

```http
PUT /api/carros
Content-Type: application/json
```

Exemplo de conteúdo enviado:

```json
{
	"id": 1,
	"nome": "Civic atualizado",
	"tipo": "Sedan"
}
```

### Excluir um carro

```http
DELETE /api/carros/1
```

## Pasta de imagens

Os arquivos colocados na pasta `uploads` podem ser acessados pela URL:

```text
http://localhost:3000/uploads/nome-do-arquivo.jpg
```

O arquivo `view/upload.html` é uma página para envio de fotos, mas a rota de upload precisa estar implementada em `routes/carros.js` para funcionar.

## Dependências principais

- `express`: cria o servidor e as rotas.
- `mysql2`: conecta a aplicação ao MySQL.
- `body-parser`: lê dados enviados nas requisições.
- `multer`: prepara o projeto para receber arquivos.

