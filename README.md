# Do it

Do it é uma aplicação de sistema de tickets desenvolvida para gerenciar demandas de serviços de maneira organizada e eficiente. Este documento fornece instruções sobre como configurar e utilizar a aplicação.

<h1 align="center">
  <img alt="DesktopView" title="Aplicação em funcionamento no Desktop" src="https://github.com/Nazareth98/Do-it/blob/master/images/image%201.png" height="425" />
</h1>

## Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Inicialização do Backend](#inicialização-do-backend)
5. [Inicialização do Frontend](#inicialização-do-frontend)
6. [Utilização](#utilização)
7. [Contribuição](#contribuição)
8. [Licença](#licença)
9. [Agradecimentos](#agradecimentos)

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)

## Instalação

Clone o repositório do GitHub para sua máquina local:

```bash
git clone https://github.com/Nazareth98/Do-it.git

cd Do-it
```

## Configuração do Banco de Dados

### 1. Criar o Banco de dados:

Primeiro, crie um baco de dados

```sql
CREATE DATABASE db_doit;
```

### 2. Importar o Dump do Banco de Dados:

Em seguida, importe o arquivo dump para popular o banco de dados:

```bash
mysql -u seu-usuario -p db_doit < path/para/o/arquivo/dump-doit.sql
```

## Inicialização do Backend

### 1. Instalar Dependências:

```bash
cd backend

npm install
```

### 2. Configurar Variáveis de Ambiente:

Crie um arquivo .env no diretório backend e adicione as seguintes variáveis de ambiente:

```bash
DB_HOST="localhost"
DB_USER="seu-usuario"
DB_PASSWORD="SUA-SENHA"
DB_SCHEMA="db_doit"

SECRET="seu-secret"

PORT=3999
```

### 3. Inicializar o Servidor:

Inicie o servidor Node.js:

```bash
npm run dev
```

O backend deve estar rodando em `http://localhost:3999`.

## Inicialização do Frontend

### 1. Instalar Dependências:

Navegue até o diretório frontend e instale as dependências:

```bash
cd ../frontend

npm install
```

### 2. Inicializar o Frontend:

Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev
```

O frontend deve estar rodando em `http://localhost:5173`.

## Utilização

Para começar a utilizar o TicketSys, siga os passos abaixo:

### 1. Criar um Cadastro de Administrador:

Acesse a rota `/api/admin` utilizando um aplicativo como o Postman. Envie uma requisição POST com o seguinte corpo (body):

```json
{
  "name": "Nome do Administrador",
  "password": "Senha",
  "confirmPassword": "Confirme a Senha",
  "username": "Nome de Usuário"
}
```

Substitua os campos "Nome do Administrador", "Senha", "Confirme a Senha" e "Nome de Usuário" com as informações desejadas para criar o cadastro do administrador.

Exemplo de requisição usando cURL:

```bash
curl -X POST http://localhost:3000/api/admin \
-H "Content-Type: application/json" \
-d '{
    "name": "Nome do Administrador",
    "password": "Senha",
    "confirmPassword": "Confirme a Senha",
    "username": "Nome de Usuário"
}'
```

### 2. Acessar a Aplicação:

Após criar o cadastro de administrador, você pode acessar a aplicação TicketSys através do frontend. Abra seu navegador e vá para `http://localhost:5173`.

### 3. Gerenciamento de Tickets:

- Uma vez logado como administrador, utilize as funcionalidades para gerenciar membros, clientes e tickets conforme necessário.
- Membros podem criar tickets categorizados por cliente.
- Adicione comentários e anexos aos tickets conforme necessário.

### 4. Desenvolvimento e Testes:

Durante o desenvolvimento, utilize ferramentas como Postman para testar e validar as funcionalidades da API.

### Observação

Essa medida provisória para criar o cadastro de administrador via API será ajustada para uma solução mais segura e integrada no futuro.

## Contribuição

Se você deseja contribuir para o projeto, siga estas etapas:

1. Fork o repositório.
2. Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
3. Commit suas mudanças (git commit -am 'Adiciona nova funcionalidade').
4. Push para a branch (git push origin feature/nova-funcionalidade).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Agradecimentos

Agradecimento especial ao meu amigo que tinha um problema e confiou na minha soulução.

Deixa uma ⭐ se curtiu, seu apoio é inestimável!
