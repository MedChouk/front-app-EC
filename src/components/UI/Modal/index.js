import React from "react";
import { Modal, Button } from "react-bootstrap";


function NewModal(props) {

  return (
    <Modal size={props.size} show={props.show} onHide={props.onHide}>

      <Modal.Header>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button key={index} variant={btn.color} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            {...props}
            variant="primary"
            onClick={props.onSubmit}

          >
            Save
          </Button>
        )}
        {/* <Button variant="primary" onClick={props.handleClose}>Save</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;