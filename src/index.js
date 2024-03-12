import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthContext from './context/auth-context';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import Login from './context/components/Login';
import ListUsers from './context/components/ListUsers';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/list-users', element: <ListUsers />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext.Provider value={{ token: null }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
