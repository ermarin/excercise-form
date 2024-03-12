import React, { useContext, useState } from 'react';
import axios from 'axios';

import AuthContext from '../../auth-context';

const ModalUser = (props) => {
  const { token } = useContext(AuthContext);
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
      Password: form.passConfirm,
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
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <div
      className='modal fade'
      id={props.id}
      tabIndex={-1}
      aria-labelledby='formModal'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
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
              ></button>
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
                    name='password'
                    className='form-control'
                    value={form.pass}
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
                    name='passConfirm'
                    className='form-control'
                    value={form.passConfirm}
                    onChange={onChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary'>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUser;