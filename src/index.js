import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from "./routes"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} /> 
  </React.StrictMode>
);
