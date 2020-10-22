import React,{useState,useEffect} from 'react';
import Lists from "./Components/Lists"
import storeData from "./Store"
import StoreAPI from "./Store/storeAPI"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './App.css';
import InputTodo from './Components/addInput/inputTodo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Createuser from "./Components/Login/createUser"
import Login from "./Components/Login"
import { useStateValue } from './Redux/StateProvider';
import Header from './Components/Header';


function App() {

const [{user,token},dispatch] = useStateValue()  
const [data, setData] = useState(storeData)
const addTodo = (title,listId) => {
  const newTodoId =Math.random()*1009
  const newTodo= {
    id:newTodoId,
    title,
  }
  const list =data.lists[listId]
  list.cards=[...list.cards,newTodo]

  const newState ={
    ...data,
    lists:{
      ...data.lists,
      [listId]:list
    }
  }
  setData(newState)
}

useEffect(() => {
  const unsubscribe = (() => {
    if (token) {
      // the user is logged in
      dispatch({
        type: "SET_USER",
        user: user,
      });
    } else {
      //user is logged out
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  });
  // console.log("USER IS>>", user);

  return () => {
    //cleanup once logout
    unsubscribe();
  };
}, [token]);

const addTodoList = (title) =>{
  const newTodoListID=Math.random()*807
  const newList={
    cards:[],
    id:newTodoListID,
    title,
  }
  const newState={
    Ids:[...data.Ids,newTodoListID],
    lists:{
       ...data.lists,
       [newTodoListID]:newList
    }
  }
  setData(newState)
}

const updateTitle = (title,listId) =>{
  const list =data.lists[listId]
  list.title = title;

  const newState = {
    ...data,
    lists:{
      ...data.lists,
      [listId]:list
    }
  }
  setData(newState)
}

const onDrag=(result)=>{
  const { destination, source, draggableId, type } = result;
  console.log('destination', destination, 'source', source, draggableId);

  if (!destination) {
    return;
  }
  if (type === 'list') {
    const newIds = data.Ids;
    newIds.splice(source.index, 1);
    newIds.splice(destination.index, 0, draggableId);
    return;
  }

  const sourceList = data.lists[source.droppableId];
  const destinationList = data.lists[destination.droppableId];
  const draggingCard = sourceList.cards.filter(
    (card) => card.id === draggableId
  )[0];

  if (source.droppableId === destination.droppableId) {
    sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, draggingCard);
    const newSate = {
      ...data,
      lists: {
        ...data.lists,
        [sourceList.id]: destinationList,
      },
    };
    setData(newSate);
  } else {
    sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, draggingCard);

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [sourceList.id]: sourceList,
        [destinationList.id]: destinationList,
      },
    };
    setData(newState);
  }
};
  return (
    
    <div className="app">
      <Router>
       <Switch>
         <>
            <Route  path="/createuser">
              <Createuser />
            </Route>

            <Route  path="/login">
              <Login />
            </Route>
            </>
          </Switch> 
          </Router>
          
          <div className="header_present">
          <Router>
          <Switch >
            <Route exact path="/">
          <Header />
    <StoreAPI.Provider value={{addTodo, addTodoList,updateTitle}}>
      <DragDropContext onDragEnd={onDrag}>
        <Droppable droppableId="main" type="list" direction="horizontal">
          {(provided)=>(
            <div className="App_todo" ref={provided.innerRef} {...provided.droppableProps}>
            {data.Ids.map((id,index)=>{
              const l = data.lists[id];
              return <Lists list={l} key={id} index={index}/>
            })}
            <InputTodo type="list"/>
            {provided.placeholder}
       
          </div>
          )}
    
    </Droppable>
    </DragDropContext>
    </StoreAPI.Provider>
    </Route>
    </Switch>
    </Router>
    </div>
    </div>
   
  );
}

export default App;
