import { Table, Container, Button } from 'react-bootstrap'
import MusicsApi from './api/MusicsApi'
import { useEffect, useState } from 'react'
import CreateMusicModal from './components/CreateMusicModal'
import UpdateMusicModal from './components/UpdateMusicModal'

function App() {
  const [musics, setMusics] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await MusicsApi().getMusics().then(data => {
        return data.json()
      })
      .then(data => {
        setMusics(data)
      })
    }

    getData()
  }, [])

  async function deleteMusic(musicId) {
    try {
      await MusicsApi().deleteMusic(musicId)

      const formattedMusic = musics.filter(cont => {
        if(cont.id !== musicId){
          return cont
        }
      })

      setMusics(formattedMusic)
    } catch(err) {
      throw err
    }
  }

  async function createMusic(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await MusicsApi().createMusic(
        req.title.value, req.artist.value
      ).then(data => {
        return data.json()
      }).then(res => {
        setMusics([...musics, {
          id: res.musicId,
          title: req.title.value,
          artist: req.artist.value
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateMusic(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await MusicsApi().updateMusic(
        selectedMusic.id, req.title.value, req.artist.value
      )

      const formattedMusics = musics.map(cont => {
        if(cont.id === selectedMusic.id) {
          return {
            id: selectedMusic.id,
            title:  req.title.value,
            artist: req.artist.value
          }
        }

        return cont
      })

      setMusics(formattedMusics)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <>
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Criar Música
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>

        <tbody>
          {musics && musics.map(cont => (
            <tr key={cont.id}>
              <td>{cont.title}</td>
              <td>{cont.artist}</td>
              <td>
                <Button onClick={() => deleteMusic(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedMusic(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateMusicModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createMusic={createMusic} />
    {selectedMusic && (
      <UpdateMusicModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateMusic={updateMusic} music={selectedMusic} />
    )}
    </>
  )
}

export default App
