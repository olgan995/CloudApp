import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteTask = ({ showModal, handleClose, handleDeleteTask }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this task?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteTask}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteTask;