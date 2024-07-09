import ModalComponent from '@/app/components/ModalComponent';
import PageSpinner from '@/app/components/PageSpinner';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';

export default function CapitalReturnPolicy({companyID, session}) {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [commentID, setCommentID] = useState(null);
    const [showModalAll, setShowModalAll] = useState(false);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [someComments, setSomeComments] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const commentLimit = 3;

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleShowAll = () => {
        fetchCRPComments(companyID, true);
        setShowModalAll(true);
    }

    const handleCloseAll = () => setShowModalAll(false);
    
    const handleSave = () => {
        setLoading(true);

        const url = '/api/capital-return-policy';
        const method = isEdit ? 'PATCH' : 'POST';
        const data = isEdit ? 
            { comment: comment, id: commentID} : 
            { comment: comment, company_id: companyID };
      
        const fetchData = async () => {
          try {
            const response = await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            console.log(isEdit ? 'Updated!' : 'Saved!');
            setShowModal(false);
            setComment('');
            fetchCRPComments(companyID);
            setCommentID(null);
            setLoading(false);


          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
    };

    const fetchCRPComments = async (companyID, showAll = false) => {
        setLoading(true);

        if(showAll) {
            setAllComments([]);
        }else{
            setSomeComments([]);
        }        

        fetch(`/api/capital-return-policy/?company_id=${companyID}&limit=${commentLimit}&showAll=${showAll}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if(showAll) {
                setAllComments(data.data);
            }else{
                setSomeComments(data.data);
            }                

            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }

    const handleEdit = (comment) => {
        setIsEdit(true);
        setShowModal(true);
        setComment(comment.comment);
        setCommentID(comment.id);
    }

    const handleDelete = (comment) => {
        alert(comment.id);
        setLoading(true);
        try {
            fetch(`/api/capital-return-policy/?comment_id=${comment.id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetchCRPComments(companyID);
                setLoading(false);
            })
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchCRPComments(companyID);
    }, [companyID]);
  
    return (
        <>
        <div className='card flex-fill'>
            <div className='d-flex align-items-center'>
                <h4 className='flex-grow-1 mb-0'>Capital return policy</h4>
                { session && (session.user.access_level === 'Admin' || session.user.access_level === 'Analyst') && 
                    <a className='page-link me-2' onClick={handleShow}>New</a>
                }

                { someComments.length > 0 && <a className='page-link' onClick={handleShowAll}>View all</a> }
            </div>
            <hr />
            <div className='comment-container d-flex flex-column'>
                <div className='flex-grow-1'>
                    <div className='mb-3'>
                    {loading ? (
                        <PageSpinner />
                    ) : (
                        someComments.length === 0 && !loading ? (
                            <div className='text-center'>No available comments</div>
                        ) : (
                            someComments.map((comment, index) => (
                                <div
                                    className={`d-flex align-items-center justify-content-between ${index !== someComments.length - 1 ? 'border-bottom' : ''}`}
                                    key={index}
                                >
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
                                    </div>
                                    {session && (session.user.access_level === 'Admin' || session.user.access_level === 'Analyst') &&
                                        <div className='d-flex align-items-center'>
                                            <a className='page-link' onClick={() => handleEdit(comment)}>Edit</a>
                                            <a className='page-link ms-2 text-danger' onClick={() => handleDelete(comment)}>Delete</a>
                                        </div>
                                    }
                                </div>
                            ))
                        )
                    )}
                    </div>
                </div>
            </div>
         </div>

         <ModalComponent
            show={showModal}
            handleClose={handleClose}
            handleSave={handleSave}
            loading={loading}
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

         <ModalComponent
            show={showModalAll}
            handleClose={handleCloseAll}
            loading={loading}
            isPrintable={true}
            size="lg"
            title="All comments"
            >
                <div className='comment-container d-flex flex-column'>
                    <div className='flex-grow-1'>
                        <div className='mb-3'>
                        {loading ? (
                                <PageSpinner />
                        ) : (
                            allComments.map((comment, index) => (
                            <div className='d-flex align-items-center justify-content-between' key={index}>
                                <div>
                                    <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
                                </div>
                            </div>
                            ))
                        )}
                        </div>
                    </div>
                </div>
            </ModalComponent>
         </>
    )
}