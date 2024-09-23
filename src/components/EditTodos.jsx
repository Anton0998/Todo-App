import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap/';

export default function EditTodos({ todoItem, handleSaveEdit }) {
    const [showModal, setShowModal] = useState(false);
    const [editTodo, setEditTodo] = useState(todoItem.title); // Start med den nuværende titel

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSave = () => {
        handleSaveEdit(todoItem.id, editTodo); // Kald handleSaveEdit med todoItem's id og den nye titel
        handleClose(); // Luk modalet
    };

    return (
      <div className='ms-auto'>
        <Button variant='outline-secondary' size='sm' onClick={(e) => {
            e.stopPropagation();
            handleShow();
            }
        }>
            Redigér
        </Button>
        <Modal onClick={(e) => e.stopPropagation()} show={showModal} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Redigér todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-muted'>Tilføj ændringer:</Form.Label>
                        <Form.Control 
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        onSubmit={handleSave}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}
