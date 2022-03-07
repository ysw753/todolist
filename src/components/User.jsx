import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
const UserBox = styled .div`
  display:flex;

`
function User(){
  const {register,handleSubmit }=useForm()
  const onSubmit=(e)=>{

    console.log(e)
  }
 
  return(
    <UserBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('User',{required:"please write your name"})}placeholder="please write your"/>
        <button>login</button>
      </form>
      <Link to="/Create">Create</Link>
    </UserBox>
  )
}

export default User;