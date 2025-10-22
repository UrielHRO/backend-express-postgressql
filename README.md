
# MiniProjeto I - API com Node.js, Express e Postgres


Este é um projeto de API backend desenvolvido com Node.js (TypeScript), Express e MongoDB. Ele inclui funcionalidades de autenticação de usuários com JWT, seguindo uma arquitetura de camadas e utilizando Docker para o ambiente de banco de dados local e mongoDB atlas para ambiente em produção.

## Funcionalidades Principais

  * **POST /api/register**: Cria um novo usuário.
  * **POST /api/login**: Autentica um usuário e gera um token JWT.
  * **GET /api/protected**: Rota protegida por token JWT válido.
  * **GET /**: Rota de boas-vindas.

## Como Rodar Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina:

1.  **Pré-requisitos:**

      * Node.js e npm instalados.
      * Docker Desktop instalado e em execução.

2.  **Variáveis de Ambiente:**

      * Crie um arquivo `.env` na raiz do projeto.
      * Configure as seguintes variáveis
      

3.  **Instalar Dependências:**

    ```bash
    npm install
    ```

4.  **Iniciar o Banco de Dados Local (Docker):**

    ```bash
    docker-compose up -d
    ```

    Isso iniciará um contêiner MongoDB e outro para o Mongo Express (interface de administração). O Mongo Express estará disponível em `http://localhost:[PORTA]` e com os usuário e senha setados pela imagem do mongoDB no docker-compose.yml .

5.  **Iniciar a Aplicação:**

    ```bash
    npm run dev
    ```

    A API estará disponível em `http://localhost:[PORTA]`.

6.  **Testar a API:**

      * Use o Postman (o arquivo de coleção está na pasta `requests/`) para testar os endpoints:
          * `http://localhost:[PORTA]/` (para a rota de boas-vindas)
          * `http://localhost:[PORTA]/api/register`
          * `http://localhost:[PORTA]/api/login`
          * `http://localhost:[PORTA]/api/protected`

## Vídeo Explicativo

Assista ao vídeo para uma demonstração geral do projeto e suas funcionalidades:

[https://youtu.be/1CeWAzOk6lc](https://youtu.be/1CeWAzOk6lc)
