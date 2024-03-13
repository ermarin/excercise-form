import React, { useContext, useState } from 'react';
import axios from 'axios';

import { AuthData } from '../../context/auth-context';

const ModalUser = (props) => {
  const { token } = useContext(AuthData);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [success, setSuccess] = useState(props.success);
  const [form, setForm] = useState({
    name: '',
    apellidoP: '',
    apellidoM: '',
    email: '',
    telefono: '',
    user: '',
    pass: '',
    passConfirm: '',
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      Tenant: null,
      UserName: form.user,
      Password: form.pass,
      Name: form.name,
      FatherLastName: form.apellidoM,
      MotherLastName: form.apellidoP,
      Email: form.email,
      PhoneNumber: form.telefono,
      Metadata: null,
      Roles: [{ Id: 2, Name: 'Usuario Tradicional' }]
    };

    axios.post(
      'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole',
      {
        Body: data
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
    ).then((res) => {
      if (!res?.data?.IsOK) {
        setMessage(res.data.Messages);
        setShowMessage(true);
        setSuccess(false);
      } else {
        setMessage(null);
        setShowMessage(false);
        setForm({
          name: '',
          apellidoP: '',
          apellidoM: '',
          email: '',
          telefono: '',
          user: '',
          pass: '',
          passConfirm: '',
        });
        setSuccess(true);
      }
    }).catch((err) => {
      setMessage(err.message);
      setShowMessage(true);
    });
  }

  const closeModal = () => {
    setMessage(null);
    setShowMessage(false);
    setSuccess(false);
  }

  return (
    <div
      className='modal fade'
      id={props.id}
      tabIndex='-1'
      aria-labelledby={props.id}
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        {!success ? (
          <div className='modal-content'>
            <div className='modal-header'>
              <h1
                className='modal-title fs-5'
                id='formModalLabel'
              >
                  Nuevo Usuario
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={closeModal}
                ></button>
            </div>
            <div className='modal-body'>
              {showMessage && (
                <div className='alert alert-warning' role='alert'>
                  {message}
                </div>
              )}
            </div>
            <div className='modal-body'>
              <form noValidate onSubmit={onSubmit}>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Nombre:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      value={form.name}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Apellido P:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='apellidoP'
                      className='form-control'
                      value={form.apellidoP}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Apellido M:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='apellidoM'
                      className='form-control'
                      value={form.apellidoM}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Email:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='email'
                      className='form-control'
                      value={form.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Telefono:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='telefono'
                      className='form-control'
                      value={form.telefono}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Usuario:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='user'
                      className='form-control'
                      value={form.user}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label
                    className='col-sm-3 col-form-label'
                  >
                    Password:
                  </label>
                  <div className='col-sm-9'>
                    <input
                      type='text'
                      name='pass'
                      className='form-control'
                      value={form.pass}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                onClick={onSubmit}
                className='btn btn-primary'
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div className='modal-content'>
            <div className='modal-header'>
              <h1
                className='modal-title fs-5'
                id='formModalLabel'
              >
                Usuario registrado
              </h1>
            </div>
            <div className='modal-body'>
              <h2>El usuario se registro con éxito.</h2>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                data-bs-dismiss='modal'
                className='btn btn-primary'
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalUser;