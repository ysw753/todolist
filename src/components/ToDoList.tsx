import React, { useEffect, useState } from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./Todo";
import styled from "styled-components";




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
const WriteBox=styled.div`

display: flex;
justify-content:space-between;
align-items:center;
width:500px;
margin:0 auto;
padding:20px;
select{
  height:50px;
}
input{
  width:300px;
  height:50px;
}
button{
  
  height:50px;
}

`
const Outer =styled.div`
display:flex;
flex-direction :column;
`
const Wrapper = styled.div`
  display: flex;
  width: 400px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  width:400px;
  min-height: 200px;
  height:600px;
  overflow:scroll;
  h1{
    text-align:center;
    padding:10px
  }
`;
const Box = styled.div`
  display:flex;
  justify-content:center;
  
`
function ToDoList(){
  //selector 도 atom도 다 useRecoil로 연결한다
  //useRecoilValue = 값만
  //useRecoilState = 값이랑,변경함수
  const toDos=useRecoilValue(toDoSelector);
  const [todo,doing,done]=[...toDos];
  const [category, setCategory]=useRecoilState<Categories>(categoryState);
  const onInput=(event:React.FormEvent<HTMLSelectElement>)=>{
    setCategory(event.currentTarget.value as any);
    
  }

  return(
    <Outer>
      <WriteBox>
        <div>
        <select value={category}  onInput={onInput}>
          <option value={Categories.TO_DO}>TO_DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </select>
        </div>
        <CreateToDo/>
      </WriteBox>
        <Box>
          <Wrapper>
            <Board>
            <h1>TODO</h1>
              {todo?.map((todo)=>(
                   todo?.category===Categories.TO_DO?(
                    <Card>
                    <ToDo key={todo.id} {...todo}/>
                    </Card>
                  ):'empty'
              ))}
            </Board>
          </Wrapper>
          <Wrapper>
            <Board>
            <h1>DOING</h1>
              {doing?.map((todo)=>(
                  todo?.category===Categories.DOING?(
                    <Card>
                    <ToDo key={todo.id} {...todo}/>
                    </Card>
                  ):'empty'
              ))}
            </Board>
          </Wrapper>
          <Wrapper>
            <Board>
            <h1>DONE</h1>
              {done?.map((todo)=>(
                  todo?.category===Categories.DONE?(
                    <Card>
                    <ToDo key={todo.id} {...todo}/>
                    </Card>
                  ):'empty'
              ))}
            </Board>
          </Wrapper>
      </Box>
    </Outer>
    
  )
}
export default ToDoList;