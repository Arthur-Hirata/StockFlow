# 📦 StockFlow

Sistema de gerenciamento de estoque desenvolvido como projeto pessoal para praticar desenvolvimento Full Stack.

O StockFlow permite gerenciar produtos, usuários, movimentações de estoque, vendas e logs, contando também com um dashboard para acompanhamento das informações do sistema.

O projeto foi desenvolvido como uma experiência prática de desenvolvimento Full Stack, permitindo aplicar conhecimentos de React, Python, Flask, SQL, SQLite, APIs REST, autenticação JWT e componentização em uma aplicação completa.

O projeto foi desenvolvido para uso local, com um banco de dados independente para cada instalação.

---

## 🛠️ Tecnologias utilizadas

### Frontend

- **React**
- **JavaScript**
- **React Router**
- **Vite**
- **CSS Modules**

### Backend

- **Python**
- **Flask**
- **Flask-CORS**
- **Flask-JWT-Extended**


### Banco de dados

- **SQLite**
- SQL utilizando diretamente o `sqlite3`, sem ORM.

### Autenticação

- **JWT (JSON Web Token)**
- Hash de senhas utilizando `Werkzeug`

---

## ✨ Principais funcionalidades

- 🔐 Sistema de login e autenticação
- 👥 Gerenciamento de usuários
- 🛡️ Controle de acesso por função (`admin` / `user`)
- 📦 Cadastro e gerenciamento de produtos
- 🔄 Entrada e saída de estoque
- 🛒 Registro de vendas
- ⚠️ Controle de estoque mínimo
- 🔎 Busca de produtos
- 📊 Dashboard com informações de vendas e estoque
- 📝 Sistema de logs
- 📈 Consultas e indicadores utilizando SQL

O backend também realiza as validações importantes das operações. Por exemplo, durante uma venda, o preço dos produtos é consultado novamente no banco de dados para calcular o valor final, evitando confiar em informações enviadas pelo frontend.

---

# 🚀 Instalação

## 1. Clonar o projeto

Clone o repositório:

```bash
git clone https://github.com/Arthur-Hirata/StockFlow

```
---
## Abra um terminal e entre na pasta Back-end

## 2. Entre na pasta do backend: 

```bash
cd Back-end

```
## 3. Crie e ative a venv: 

```bash
python -m venv .venv
source .venv/Scripts/activate
```
## 4. Instale as dependências (bibliotecas) do projeto: 

```bash
pip install -r requirements.txt
```
## 5. Crie o arquivo `.env`

Dentro da pasta `Back-end`, crie um arquivo chamado `.env`:

```text
Back-end/
└── .env
```
## 6. Configure as rotas utilizando a .env: 

```bash
SECRET_KEY=sua_chave_secreta
DATABASE_PATH=caminho/para/stockflow.db
```

## 7. Crie o banco de dados:

```bash
python db/create-db.py
```
O banco será criado com as tabelas necessárias para o funcionamento do sistema.

Um usuário administrador inicial também será criado para permitir o primeiro acesso.

Credenciais iniciais
Email: admin@gmail.com
Senha: admin

Após o primeiro acesso, recomenda-se criar um novo administrador e remover o usuário inicial.

## 8. Execute o back-end:

```bash
python app.py
```
---
## Abra outro terminal e entre na pasta Front-end

## 9. Entre na pasta Front-end:

```bash
cd Front-end
```

## 10. Instale as dependências do Front-end:
```bash
npm install
```

## 11. Execute o Front-end :

```bash
npm run dev
```



