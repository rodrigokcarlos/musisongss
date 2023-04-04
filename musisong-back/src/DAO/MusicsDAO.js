import db from '../infra/db.js'

class MusicsDAO {
    static listar() {
        const query = 'SELECT * FROM musicas';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(musica) {
        const query = 'INSERT INTO musicas (title, artist) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [musica.title, musica.artist], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir a música',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'Música criada com sucesso',
                    musicId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM musicas WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar a música',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Música deletado com sucesso' })
          });
      });
    }

    static atualizar(id, musica) {
      const query = 'UPDATE musicas SET title = ?, artist = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [musica.title, musica.artist, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar a música',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Música atualizado com sucesso' })
          });
      });
    }
}

export default MusicsDAO;