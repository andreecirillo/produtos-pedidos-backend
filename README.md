## 📦 Produtos & Pedidos API

API RESTful para gerenciamento de produtos e pedidos, desenvolvida em **NestJS**, utilizando **PostgreSQL**, **Prisma ORM**, **Docker** e **Swagger** para documentação.

---

## 🚀 Tecnologias

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Jest
- Swagger (OpenAPI)

---

## 🔧 Como rodar o projeto

### 1. Subir o banco de dados

    npm run docker:up

Esse comando sobe um container PostgreSQL local conforme definido no arquivo `docker-compose.yml`.

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

    DATABASE_URL=postgresql://dev:dev@localhost:5432/produtos

Essa variável define a conexão com o banco PostgreSQL que é iniciado via Docker.

> ⚠️ O arquivo `.env` não é versionado no repositório.
> Em produção, as variáveis de ambiente devem ser configuradas diretamente na plataforma de deploy.


### 3. Instalar as dependências

    npm install

### 4. Executar as migrations do banco

    npm run prisma:migrate

As tabelas serão criadas automaticamente a partir do `schema.prisma`.

### 5. Subir a aplicação

    npm run start:dev

A aplicação ficará disponível em:

- http://localhost:3000

---

## 📘 Documentação da API (Swagger)

Após subir a aplicação, acesse:

- http://localhost:3000/api

No Swagger é possível:

- Visualizar todos os endpoints disponíveis  
- Ver exemplos de payloads  
- Testar requisições diretamente pelo navegador  

---

## 🧪 Testes

O projeto possui testes unitários focados nas principais regras de negócio (serviços de Produtos e Pedidos).

Para executar os testes:

    npm test

---

## 📌 Funcionalidades e Regras de Negócio

### Produtos

Operações:

- Criar produto  
- Listar produtos  
- Atualizar produto  
- Remover produto  
- Controle de quantidade em estoque  

Campos do produto:

- `id` (autogerado)
- `nome`
- `categoria`
- `descricao`
- `preco`
- `quantidadeEstoque`

### Pedidos

Operações:

- Criar pedido  
- Listar pedidos  

Regras:

- Cada pedido possui uma lista de produtos com quantidade  
- Cálculo automático do total do pedido  
- Validação de estoque ao criar pedidos  
- Atualização do estoque quando o pedido é concluído  

Campos do pedido:

- `id` (autogerado)
- `produtos` (lista de produtos e quantidades)
- `total`
- `status` (`PENDENTE`, `CONCLUIDO`, `CANCELADO`)

---

## 🔎 Observação sobre nomenclatura de campos

Os campos da aplicação utilizam **camelCase** tanto na API quanto no banco de dados, seguindo o padrão adotado no ecossistema **Node.js / NestJS**.
