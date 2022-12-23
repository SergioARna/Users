import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss'
import FormUsers from './components/FormUsers';
import UserCard from './components/UserCard';
import Swal from 'sweetalert2';
const BASE_URL ='https://users-crud.academlo.tech/';
function App() {

  const [users, setUsers] = useState();
  const [userUpdate, setUserUpdate] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const getAllUsers = async() =>{
      const URL = `${BASE_URL}users/`;

      try {
        const petition = await axios.get(URL);
        setUsers(petition.data);
       

      } catch (error) {
        console.error(error);
      }
  }

  const createUser = async( data ) =>{
    const URL = `${BASE_URL}users/`;

    try {
      await axios.post(URL,data);
      getAllUsers();
      Swal.fire({
        position: 'center',
        title: 'Usuario añadido con exito',
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = async(id) =>{

    const URL = `${BASE_URL}users/${id}/`;
    try {
      await axios.delete(URL);
      getAllUsers();
      Swal.fire({
        position: 'center',
        title: 'Usuario eliminado',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error(error);
    }
  }

  const updateUser = async(id,data)=>{
    const URL = `${BASE_URL}users/${id}/`;
    try {
      await axios.patch(URL,data);
      getAllUsers();
      setUserUpdate(!userUpdate);
      Swal.fire({
        position: 'center',
        title: 'Datos actualizados',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeShowModal =()=>{
    setIsShowForm(!isShowForm);
  }

  const handleClickNewUser=()=>{
    handleChangeShowModal();
    setUserUpdate();
  }
  useEffect(()=>{
    getAllUsers();
  },[]);
  
  return (
    <div className="App">
      <div className='header__container'>
        <h1>Formulario de usarios</h1>
        <button onClick={handleClickNewUser}  className='header__btn' > <i className='bx bx-plus-circle'></i> Agregar Usuario </button>
      </div>
      <div className={`container__form ${!isShowForm ? 'disable__form':''}`}>
        <FormUsers 
          createUser={ createUser }
          userUpdate ={ userUpdate }
          updateUser ={ updateUser }
          handleChangeShowModal={ handleChangeShowModal }
        />
      </div>
      <div className="users__container">
        {
          users?.map(user=>(
            <UserCard 
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setUserUpdate= { setUserUpdate }
              handleChangeShowModal={ handleChangeShowModal }
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
