import React from 'react'

const UserCard = ( {user,deleteUser,setUserUpdate,handleChangeShowModal} ) => {

  const editClick =()=>{
    setUserUpdate(user);
    handleChangeShowModal();
  }

  return (

    <article className='card'>
      <h2 className='card__title'>{ `${user.first_name} ${user.last_name}` }</h2>
      <ul className='card__list'>
        <li className='card__item'><span>Email:</span> { user.email } </li>
        <li className='card__item'><span>Fecha de nacimiento:</span> {user.birthday} </li>
      </ul>  
      <div className="btn__container">

        <button className='button' onClick={ ()=> deleteUser(user.id) }>
          <i className='bx bx-trash'></i>
        </button>
        <button className='button' onClick={()=>editClick()}>
          <i className='bx bx-edit'></i>
        </button>
      </div>
      
      
    </article>
  )
}

export default UserCard
