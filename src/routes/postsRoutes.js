// Importa o módulo express para criar a aplicação web
import express from "express";

// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras do arquivo postsController.js
// Essas funções provavelmente lidam com a lógica de negócio relacionada aos posts
import { listarPosts, postarNovoPost, uploadImagem, atulizarNovoPost } from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}

// Configura o armazenamento para o Multer (necessário para Windows)
// Define a pasta de destino para arquivos enviados ('uploads/')
// e define o nome do arquivo salvo (mantém o nome original)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer utilizando a configuração de armazenamento
// (storage) e a pasta de destino para uploads (./uploads)
const upload = multer({ dest: "./uploads", storage });

// (Comentário para Linux/Mac: omitir storage se desejar apenas salvar na pasta)
// const upload = multer({ dest: "./uploads" })

// Função routes que recebe a instância do Express (app) como argumento
// e define as rotas da API
const routes = (app) => {
  // Habilita o middleware express.json para interpretar requisições com corpo JSON
  app.use(express.json());

  app.use(cors(corsOptions));

  // Rota GET para "/posts" - Chama a função listarPosts para recuperar posts
  app.get("/posts", listarPosts);

  // Rota POST para "/posts" - Chama a função postarNovoPost para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para "/upload" - 
  // Utiliza o middleware upload.single("imagem") para processar o upload do arquivo
  // com o campo "imagem" na requisição. Em seguida, chama a função uploadImagem
  // para lidar com a imagem enviada.
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atulizarNovoPost);
};

// Exporta a função routes como o módulo padrão deste arquivo
export default routes;