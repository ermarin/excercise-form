import React, { useContext, useState } from 'react';
import axios from 'axios';

import ModalUser from '../Modals';

import { AuthData } from '../../context/auth-context';

const ListUsers = () => {
  const { token } = useContext(AuthData);
  const [list, setList] = useState(true);
  const [search, setSearch] = useState('');
  const [messageError, setMessageError] = useState(null);

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      SearchText: search,
    };

    axios
      .post(
        'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers',
        {
          Body: data
        },
        {
          headers : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setList(res?.data?.Body);
      })
      .catch((err) => {
        setMessageError(err.message);
      });
  }

  return (
    <div className='container p-5'>
      <ModalUser id='formModal' />
      <div className='row mb-5 align-items-center'>
        <div className='col-md-6'>
          <form className='row' noValidate onSubmit={onSubmit}>
            <div className='col-md-6'>
              <input
                type='text'
                placeholder='Buscar'
                name='search'
                className='form-control'
                value={search}
                onChange={onChange}
              />
            </div>
            <div className='col-md-6'>
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
        <div className='col-md-2'>
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
      {list.length > 0 ? (
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
            {list?.map((list, key) => {
              return (
                <tr key={key}>
                  <th scope='row'>{list.Id}</th>
                  <td>{list.Name}</td>
                  <td>{list.FatherLastName}</td>
                  <td>{list.MotherLastName}</td>
                  <td>{list.CreationDate}</td>
                  <td>{list.Email}</td>
                  <td>{list.PhoneNumber}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div className='col-md-12 alert alert-secondary'>
          Realiza una busqueda por nombre
        </div>
      )}
      {messageError && (
        <div className='alert alert-danger'>
          {messageError}
        </div>
      )}
    </div>
  )
}

export default ListUsers;