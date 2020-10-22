import{Paper} from "@material-ui/core"
import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import "./card.css"

function Card({card , index}) {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided)=>(
                <div className="Card" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                <Paper className="card_container">{card.title}</Paper>
                
                </div>
            )}
       
        </Draggable>
    )
}

export default Card
