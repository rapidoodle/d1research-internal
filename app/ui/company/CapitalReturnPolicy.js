import ModalComponent from '@/app/components/ModalComponent';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function CapitalReturnPolicy({uniqueURLKey, companyID}) {
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = () => {
        console.log(uniqueURLKey, companyID)
        const data = { comment: comment, unique_url_key: uniqueURLKey, company_id: companyID};

        fetch('/api/capital-return-policy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);    
            console.log('Saved!');
            // setShowModal(false);
            setComment('');            
        })
        .catch(err => {
            console.log(err);
        });;
    };
  
    return (
        <>
        <div className='card flex-fill'>
            <h4>Capital return policy</h4>
            <hr />
            <Button variant="success" onClick={handleShow}> Add comment </Button>
         </div>

         <ModalComponent
            show={showModal}
            handleClose={handleClose}
            handleSave={handleSave}
            size="lg"
            title="Add new comment"
        >
            <Editor 
                name="comment"
                id="comment"
                value={comment}
                onEditorChange={(content) => setComment(content)}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: 'lists checklist',
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                              alignleft aligncenter alignright alignjustify | \
                              bullist numlist outdent indent | removeformat | checklist',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
            </ModalComponent>
         </>
    )
}