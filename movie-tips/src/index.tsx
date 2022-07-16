import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './components/app.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);