# 🌵 MyGardenAPI

Bem-vindo à **MyGardenAPI**, uma aplicação que serve como catálogo e gerenciador de suculentas e cactos! Ideal para quem quer monitorar as espécies que cultiva no próprio jardim, seja no navegador ou futuramente via aplicativo mobile.

---

## 🧩 Funcionalidades

- Cadastro de novas suculentas
- Visualização de todos os itens com imagem e detalhes
- Edição e remoção de plantas
- Visualização de informações completas por ID
- Backend com Node.js + Express
- Frontend com React e React Router
- Pronto para ser integrado com app mobile futuramente

---

## 🚀 Como rodar localmente

1. Clone o projeto:
    git clone https://github.com/seuusuario/MyGardenAPI.git
    cd MyGardenAPI


2. Inicie o backend:
    cd backend
    npm install
    node index.js
    # O servidor iniciará em http://localhost:3001

3. Inicie o frontend:
    cd frontend
    npm install
    npm start
    # A interface abrirá em http://localhost:3000




Método	Rota	Função
GET	/item	Lista todas as plantas
GET	/item/:id	Retorna uma planta por ID
POST	/item	Cadastra nova planta
PUT	/item/:id	Atualiza planta existente
DELETE	/item/:id	Remove uma planta do catálogo


Futuro aplicativo
Este projeto também servirá como base para um app mobile onde usuários poderão:

* Adicionar apenas as suculentas que possuem

* Acompanhar cuidados semanais (exposição, rega, propagação)

* Escanear QR Code nos vasos e ver detalhes pelo app




Sinta-se à vontade para abrir issues ou enviar PRs com melhorias! 