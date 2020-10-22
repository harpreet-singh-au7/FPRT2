import React from 'react'
import {CssBaseline,  Paper,  Typography} from "@material-ui/core"

import Title from './Title'
import "./lists.css"
import Card from "../Card"
import AddInput from '../addInput'
import { Droppable, Draggable } from 'react-beautiful-dnd';




function Lists({list , index}) {
    return (
        <Draggable draggableId={list.id} index={index}>
       {(provided)=>(
            <div  {...provided.draggableProps} ref={provided.innerRef}>
            <Paper className="list_background" {...provided.dragHandleProps}>
                <CssBaseline />
                <Title  title={list.title} listId={list.id}/>
                <Droppable droppableId={list.id}>
                    {(provided)=>(
                    <div ref={provided.innerRef}{...provided.droppableProps} >
                        {list.cards.map((card,index)=>(
                   <Card key={card.id} card={card} index={index} className="drop_card"/>
               ))}
               {provided.placeholder}
               </div>
               )}
               
               </Droppable>
               {list.title=="Todo" ?<>
                <AddInput listId={list.id} type="todo"/></>:""}
                <div className="card_blank"></div>
            </Paper>
            
        </div>
       )}
        </Draggable>
    )
}

export default Lists
