import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUserState } from "./atoms";
const UserBox = styled .div`
  display:flex;

`
interface IUser{
  User:string,
}
function User(){
  const {register,handleSubmit }=useForm<IUser>()
  const [isLogin,setIsLogin]= useState(false);
  const onSubmit=({User}:IUser)=>{
    const localUser= window.localStorage.getItem('user')
    let savedUser
    if(localUser){
      savedUser=JSON.parse(localUser)
    }
    savedUser.map((e:IUserState)=>{
      if(e.createUser===User)
        setIsLogin((prev)=>!prev);
    })
  }
 
  return(
    <>
    {isLogin?'login':
    (<UserBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('User',{required:"please write your name"})}placeholder="please write your"/>
        <button>login</button>
      </form>
      <Link to="/Create">Create</Link>
    </UserBox>)}
    </>
  )
}

export default User;