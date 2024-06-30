//create new Toast component

import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function ToastComponent({ show, setShow, message }) {
    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
            />
            <ToastContainer />
    </>
    )
}