import MusicsDAO from "../DAO/MusicsDAO.js"

class musicsController {
  static rotas(app){
    app.get('/musica', musicsController.listar)
    app.post('/musica', musicsController.inserir)
    app.delete('/musica/:id', musicsController.deletar)
    app.put('/musica/:id', musicsController.atualizar)
  }

  static async listar(req, res){
    const musicas = await MusicsDAO.listar()

    res.send(musicas)
  }

  static async inserir(req, res){
    const musica = {
      title: req.body.title,
      artist: req.body.artist
    }

    const result = await MusicsDAO.inserir(musica)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const musica = await MusicsDAO.deletar(req.params.id)

    if(musica.erro){
        res.status(500).send('Erro ao deletar a música')
    }

    res.send({mensagem: 'Música removido com sucesso'})
  }

  static async atualizar(req, res){
    const musica = {
      title: req.body.title,
      artist: req.body.artist
    }

    const result = await MusicsDAO.atualizar(req.params.id, musica)

    if(result.erro){
        res.status(500).send('Erro ao atualizar a música')
    }

    res.send({mensagem: 'Música alterado com sucesso'})
  }
}

export default musicsController