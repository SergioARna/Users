import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';

const defaultValues={
  email:'',
  password:'',
  first_name: '',
  last_name:'',
  birthday:''
}
const FormUsers = ( { createUser,userUpdate,updateUser,handleChangeShowModal } ) => {

  const {handleSubmit,register,reset, formState: {errors}} =useForm();  



  const submitForm = (data)=>{
    
    if (data.email==='' || data.password ==='' || data.first_name===''|| data.last_name===''||data.birthday===''){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All the field are obligatory',
      });
    } 

    if (userUpdate) {
      updateUser(userUpdate.id,data);
      handleChangeShowModal();
      
    }else{
      createUser(data);
      handleChangeShowModal();
    }
    reset(defaultValues);
   
  }

  useEffect(()=>{

    if (userUpdate){
      reset(userUpdate);
    }else{
      reset(defaultValues);
    }
    

  },[userUpdate]);


  return (
    <form className='form' onSubmit={ handleSubmit(submitForm) }>
      <i className='form__x bx bx-x' onClick={()=>handleChangeShowModal()}></i>
      <h2 className='form__title'>{ userUpdate ? 'Edit User' : 'Create User'}</h2>
      <div className='form__div'>
        <label className='form__label' htmlFor="">email</label>
        <input className='form__input' type="text" { ...register('email')}/>
        {
          errors.email &&  <p>{errors.email.message}</p>
        }
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="">password</label>
        <input className='form__input' type="password" { ...register('password')}/>
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="">first name</label>
        <input className='form__input' type="text" { ...register('first_name')}/>
      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="">last name</label>
        <input className='form__input' type="text" { ...register('last_name')}/>

      </div>
      <div className='form__div'>
        <label className='form__label' htmlFor="">birthday</label>
        <input className='form__input' type="date" { ...register('birthday')}/>
      </div>

      <button  className='form__btn'>{ userUpdate ?  ' Edit user' : 'Create user' }</button>
    </form>
  )
}

export default FormUsers
