# MiniProjeto II - API de Anotações com Node.js, Express e PostgreSQL

Este repositório contém a segunda versão de uma API RESTful completa, construída com Node.js, Express e TypeScript. A aplicação foi migrada de MongoDB para PostgreSQL, utilizando o Prisma como ORM, e agora inclui uma funcionalidade completa de CRUD para anotações pessoais, protegida por autenticação via JWT.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-darkgreen?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## ✨ Funcionalidades

* **Autenticação de Usuários:** Sistema completo de registro e login com senhas criptografadas.
* **Autorização com JWT:** Rotas protegidas que exigem um JSON Web Token válido.
* **CRUD de Anotações:** Funcionalidade completa para Criar, Ler, Atualizar e Deletar anotações pessoais.
* **Segurança:** Um usuário só pode acessar, modificar ou deletar as suas próprias anotações.
* **Estrutura Organizada:** O código é dividido em camadas (rotas, controladores, serviços) para melhor manutenção.
* **Ambiente de Desenvolvimento com Docker:** Utiliza Docker e Docker Compose para rodar um banco de dados PostgreSQL e a interface Adminer localmente.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Autenticação:** JSON Web Token (JWT), bcrypt
* **Containerização:** Docker, Docker Compose
* **Deploy:** Vercel

## 🚀 Como Executar Localmente

Siga os passos abaixo para configurar e rodar o projeto no seu ambiente de desenvolvimento.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/UrielHRO/backend-express-postgressql.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto.
    * Copie o conteúdo do arquivo `.env.example` (se houver).


4.  **Inicie o Ambiente Docker:**
    * Certifique-se de que o Docker Desktop está em execução.
    * Execute o comando abaixo para iniciar o contêiner do PostgreSQL e do Adminer:
    ```bash
    docker-compose up -d
    ```

5.  **Prepare o Banco de Dados com Prisma:**
    * Execute a migração para criar as tabelas `User` e `Note` no banco de dados.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie a Aplicação:**
    ```bash
    npm run dev
    ```
    * A API estará disponível em `http://localhost:3000`.
    * A interface Adminer para visualizar o banco estará em `http://localhost:8080`.

## 📖 Endpoints da API

A URL base para a API é `/api`.

### Autenticação (`/api/auth`)

| Método | Rota               | Descrição              | Autenticação |
| :----- | :----------------- | :--------------------- | :----------- |
| `POST` | `/register`        | Registra um novo usuário. | Nenhuma      |
| `POST` | `/login`           | Autentica um usuário e retorna um token JWT. | Nenhuma      |

### Anotações (`/api/notes`)

| Método   | Rota           | Descrição                                 | Autenticação |
| :------- | :------------- | :---------------------------------------- | :----------- |
| `POST`   | `/`            | Cria uma nova anotação.                   | **Requerida** |
| `GET`    | `/`            | Lista todas as anotações do usuário autenticado. | **Requerida** |
| `GET`    | `/:id`         | Retorna os detalhes de uma anotação específica. | **Requerida** |
| `PUT`    | `/:id`         | Atualiza todos os dados de uma anotação.   | **Requerida** |
| `PATCH`  | `/:id`         | Atualiza parcialmente os dados de uma anotação. | **Requerida** |
| `DELETE` | `/:id`         | Remove uma anotação.                      | **Requerida** |

## 🏗️ Estrutura do Projeto

```
.
├── prisma/               # Schema e migrações do Prisma
│   └── schema.prisma
├── src/
│   ├── controllers/      # Controla o fluxo das requisições
│   ├── database/         # Configuração do cliente Prisma
│   ├── middlewares/      # Middlewares (autenticação, erros)
│   ├── routes/           # Definição das rotas da API
│   ├── services/         # Lógica de negócio e acesso ao banco
│   └── server.ts         # Ponto de entrada da aplicação
├── .env                  # Variáveis de ambiente (local)
├── docker-compose.yml    # Configuração do ambiente Docker
└── package.json          # Dependências e scripts do projeto
```

## ☁️ Deploy

A aplicação está configurada para deploy contínuo na [Vercel](https://backend-express-postgressql.vercel.app/) O script de build (`"build": "npx prisma migrate deploy && tsc"`) garante que as migrações do banco de dados de produção sejam aplicadas automaticamente a cada novo deploy.
