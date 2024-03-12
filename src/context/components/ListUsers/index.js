import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import ModalUser from '../Modals';

import AuthContext from '../../auth-context';

const ListUsers = () => {
  const { token } = useContext(AuthContext);
  const [list, setList] = useState(true);
  console.log(token);
  const [search, setSearch] = useState('');

  /* useEffect(() => {
    axios
      .post('https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers', {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }); */

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <ModalUser id='formModal' />
      <div className='row mb-5 align-items-center'>
        <div className='col-md-6 justify-content-md-end'>
          <form className='row' noValidate onSubmit={onSubmit}>
            <div className='col-auto'>
              <input
                type='text'
                placeholder='Buscar'
                name='search'
                className='form-control'
                value={search}
                onChange={onChange}
              />
            </div>
            <div className='col-auto'>
              <button
                type='submit'
                className='btn btn-outline-info'
              >
                Ok
              </button>
            </div>
          </form>
        </div>
        <div className='col-md-4'></div>
        <div className='col-auto'>
          <button
            type='button'
            className='btn btn-outline-secondary'
            data-bs-toggle='modal'
            data-bs-target='#formModal'
          >
            Nuevo
          </button>
        </div>
      </div>
      {list && (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Name</th>
              <th scope='col'>FatherLastName</th>
              <th scope='col'>CreationDate</th>
              <th scope='col'>Email</th>
              <th scope='col'>PhoneNumber</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>usuario1</th>
              <td>Juan</td>
              <td>Hernandez</td>
              <td>01/02/2021</td>
              <td>user@user.com</td>
              <td>5555555555</td>
            </tr>
            <tr>
              <th scope='row'>usuario1</th>
              <td>Juan</td>
              <td>Hernandez</td>
              <td>01/02/2021</td>
              <td>user@user.com</td>
              <td>5555555555</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  )
}

export default ListUsers;