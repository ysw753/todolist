import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

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
      return[
        ...oldTodos.slice(0,targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex+1),
      ];
    });   
  };
  return (
    <li>
    <span>{text}</span>
    
      {category!==Categories.DONE && (<button name={Categories.DONE }/*enum이 사실 숫자라+""*/  onClick={onClick}>DONE</button>)}
      {category!==Categories.DOING && (<button name={Categories.DOING } onClick={onClick}>DOING</button>)}
      {category!==Categories.TO_DO && (<button name={Categories.TO_DO } onClick={onClick}>TO_DO</button>)}

    </li>

  )
}
export default ToDo;