import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ButtonSpinner from './ButtonSpinner';

const ModalComponent = ({ show, handleClose, handleSave, title, children, size, loading, isPrintable, handlePrint }) => {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size={size}
      backdrop={loading ? 'static' : true}>
      <Modal.Header closeButton={loading ? false : true}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={loading} onClick={handleClose}>
          Close
        </Button>
        
        {!isPrintable ? 
        <Button variant="primary" disabled={loading} onClick={handleSave}>
          { loading && <ButtonSpinner /> } Save Changes
        </Button>
        :
        <Button variant="primary"  onClick={handlePrint}>
           Print
        </Button>
        }

      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
