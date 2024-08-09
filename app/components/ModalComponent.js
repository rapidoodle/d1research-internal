import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ButtonSpinner from './ButtonSpinner';
import ReactToPrint from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

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
    handleBeforePrint,
    handleAfterPrint,
    rightTitle,
    buttonText='Save changes', 
    bodyColor='none',
    componentRef,
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
        <ReactToPrint
          pageStyle="@page { size: 10.5in 14in }"
          trigger={() => <button className='btn btn-primary w-100'> <FontAwesomeIcon icon={faPrint} className='me-2' />Print</button>}
          content={() => componentRef.current}
          onBeforeGetContent={handleBeforePrint}
          onAfterPrint={handleAfterPrint}
      />
        }
        </div>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
