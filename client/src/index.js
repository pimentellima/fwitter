import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/app/app';
import './output.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
