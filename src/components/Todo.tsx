import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";
import styled from "styled-components";
const List = styled.li`
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const Btn=styled.div`

height:20px;
display:flex;
button{
  border:none;
  margin:1px;
}
`
function ToDo({text,category,id}:IToDo){
  const setToDos = useSetRecoilState(toDoState);
  
  const onClick =(event:React.MouseEvent<HTMLButtonElement>)=>{
    const {
      currentTarget:{name},
    }=event
    setToDos((oldTodos)=>{
      const targetIndex = oldTodos.findIndex((todo)=>todo.id===id);
      //as any 날 믿고 타입을 검사하지마! 이런방식은 안좋음 그래서 밑에 onClick={()=>onClick('DOING')} 이런식이 나을듯..
      const newTodo = {text,id,category:name as any}
      const updateItem =[
        ...oldTodos.slice(0,targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex+1),
      ]
      window.localStorage.setItem('todo',JSON.stringify(updateItem))
      return updateItem;
    });   
  };

  const onDelClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
    const {
      currentTarget:{name},
    }=event
    setToDos((oldTodos)=>{
      const targetIndex = oldTodos.findIndex((todo)=>todo.id===id);
      const updateItem =[
        ...oldTodos.slice(0,targetIndex),
        ...oldTodos.slice(targetIndex+1),
      ]
      window.localStorage.setItem('todo',JSON.stringify(updateItem))
      return updateItem
    })
  }

  return (
    <List>
    <div>{text}</div> 
    <Btn>
      {category!==Categories.TO_DO && (<button name={Categories.TO_DO }/*enum이 사실 숫자라+""*/ onClick={onClick}>TO_DO</button>)}
      {category!==Categories.DOING && (<button name={Categories.DOING } onClick={onClick}>DOING</button>)}
      {category!==Categories.DONE && (<button name={Categories.DONE }  onClick={onClick}>DONE</button>) }
      
      
      <button onClick={onDelClick}>del</button>
    </Btn>
    </List>

  )
}
export default ToDo;