import { Modal, Button, Form } from 'react-bootstrap'
function UpdateMusicModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateMusic(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Música</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="title">
            <Form.Label>
              Title
            </Form.Label>
            <Form.Control defaultValue={props.music.title} type="text" />
          </Form.Group>

          <Form.Group controlId="artist">
            <Form.Label>
              Artist
            </Form.Label>
            <Form.Control defaultValue={props.music.artist} type="text" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateMusicModal
