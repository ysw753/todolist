import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./Todo";
import User from "./User";




/* function ToDoList(){

  const [toDo , setToDo] = useState('');

  const onChange =(event:React.FormEvent<HTMLInputElement>)=>{
    const {
      currentTarget:{value},
    }=event;
    setToDo(value);
  }
  const onSubmit =(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log(toDo);
  }
  return(
    <div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={toDo} placeholder="Write a to do" />
      <button>Add</button>
    </form>
  </div>

  )

}
 */

function ToDoList(){
  //selector 도 atom도 다 useRecoil로 연결한다
  //useRecoilValue = 값만
  //useRecoilState = 값이랑,변경함수
  const toDos=useRecoilValue(toDoSelector);
  const [category, setCategory]=useRecoilState<Categories>(categoryState);
  const onInput=(event:React.FormEvent<HTMLSelectElement>)=>{
    setCategory(event.currentTarget.value as any);
    
  }
  return(
    <div>
      <User/>
      <div>
      <select value={category}  onInput={onInput}>
        <option value={Categories.TO_DO}>TO_DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateToDo/>
      {toDos?.map((todo)=><ToDo key={todo.id} {...todo}/>)}
      </div>
    </div>
  )
}
export default ToDoList;