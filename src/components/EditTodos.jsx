import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap/';

export default function EditTodos({ todoItem, handleSaveEdit }) {
    const [showModal, setShowModal] = useState(false);
    const [editTodo, setEditTodo] = useState(todoItem.title);
    const [editPriority, setEditPriority] = useState(todoItem.priority)

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSave = () => {
        handleSaveEdit(todoItem.id, editTodo, editPriority); 
        handleClose(); 
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
                        <div className='my-2 d-flex gap-4 align-items-baseline'>
                            <p className='text-muted'>Redigét prioritet:</p>
                            <Form.Select
                                className='my-3'
                                onChange={(e) => setEditPriority(e.target.value)}
                                value={editPriority} 
                                style={{ flex: "1" }} 
                                >
                                <option value="low">Lav</option>
                                <option value="medium">Mellem</option>
                                <option value="high">Høj</option>
                            </Form.Select>
                        </div>
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
