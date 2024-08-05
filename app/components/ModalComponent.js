import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ButtonSpinner from './ButtonSpinner';

const ModalComponent = ({ 
    show, 
    handleClose, 
    handleSave, 
    title, 
    children, 
    size, 
    loading, 
    isPrintable, 
    isSavable,
    handlePrint,
    rightTitle,
    buttonText='Save changes', 
    bodyColor='none',
    buttonLoadingText='' }
  ) => {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size={size}
      backdrop={loading ? 'static' : true}>
      <Modal.Header closeButton={loading ? false : true}> 
        <Modal.Title className='w-100'>
          <div className='d-flex align-items-center justify-content-between'>
            <div>{title}</div>
            {rightTitle && <div className='modal-right-title'>{rightTitle}</div>}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor : bodyColor}}>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={loading} onClick={handleClose}>
          Close
        </Button>
        {isSavable && 

        <div>
        {!isPrintable ? 
        <Button variant="primary" disabled={loading} onClick={handleSave}>
          { loading ? <><ButtonSpinner /> {buttonLoadingText}</> : buttonText }
        </Button>
        :
        <Button variant="primary"  onClick={handlePrint}>
           Print
        </Button>
        }
        </div>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
