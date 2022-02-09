import React from "react";
import { Modal, Button } from "react-bootstrap";

function NewModal(props) {
  return (
    <Modal size={props.size} show={props.show}>
      <Modal.Header>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.Close}>
            Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>Save</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default NewModal;