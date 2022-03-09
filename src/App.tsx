import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { createGlobalStyle } from "styled-components";


import ToDoList from './components/ToDoList';


function App() {

 
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<ToDoList/>}/>
        </Routes>
        
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
