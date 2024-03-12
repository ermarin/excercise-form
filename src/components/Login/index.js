import React, { useState, useContext } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { AuthData } from '../../context/auth-context';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthData);

  const [user, setUser] = useState({
    name: '',
    pass: '',
  });
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    const data = {
      Username: user.name,
      Password: user.pass,
    };

    axios
      .post('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          Body: data
        }
      )
      .then((res) => {
        if (!res.data.IsOK) {
          setShow(true)
        }
        else {
          setToken(res?.data?.Body?.Token);
          navigate('/list-users');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container text-center'>
      <h1>Inicio de Sesión</h1>
      <div className='row'>
        <div className='col-md-12 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label className='form-label'>Usuario</label>
              <input
                type='text'
                placeholder='Escribe tu usuario'
                name='name'
                className='form-control'
                value={user.name}
                onChange={onChange}
              />
            </div>
            <br />
            <div className='from-group'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                placeholder='Escribe tu contraseña'
                name='pass'
                className='form-control'
                value={user.pass}
                onChange={onChange}
              />
            </div>
            <button
              type='submit'
              className='btn btn-outline-primary btn-block mt-4 mb-4 w-100'
            >
                OK
              </button>
          </form>
          {show && (
            <div className='alert alert-warning' role='alert'>
              Sus datos son incorrectos, verifique su información e intente nuevamente
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login;