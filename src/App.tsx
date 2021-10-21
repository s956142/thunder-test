import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import MainRoute from './routers/MainRoute';
import '~/assets/scss/App.scss';
import 'react-toastify/dist/ReactToastify.css';


/** 根節點 */
const App = () => {
    return (
        <>
            <HashRouter>
                <MainRoute />
            </HashRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                draggable
                pauseOnHover
                transition={Flip}
            />
        </>
    )
}

export default App;