import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const EditToDo = ({todo}) => {
  const [description, setDescription] = useState(todo.description);
  const [show, setShow] = useState(false);
   
  const handleClose = () => {
    setShow(false)
    setDescription(todo.description);
  };
  const handleShow = () => setShow(true);
  const editText = async() => {
      setShow(false)
      try {
          const body = {description};
          await fetch(`http://localhost:5000/api/todo/${todo.id}`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
          });
          window.location = "/";
      } catch (err) {
          console.error(err.message);
      }
  };
  return (
    <>
        <Button className="btn btn-warning" onClick={handleShow}>
            Edit
        </Button>

        <Modal size="md" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type='text' className='form-control' value={description} onChange={e => setDescription(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
            <Button className="btn btn-secondary" onClick={handleClose}>
                Close
            </Button>
            <Button className="btn btn-warning" onClick={editText}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditToDo