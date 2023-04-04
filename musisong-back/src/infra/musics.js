/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import db from "./db.js";

//==== Conteúdos
const MUSICS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "musicas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" text,
    "artist" text
  );`;

function createTableMusics() {
    db.run(MUSICS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de música");
    });
}

db.serialize( ()=> {
    createTableMusics();
});