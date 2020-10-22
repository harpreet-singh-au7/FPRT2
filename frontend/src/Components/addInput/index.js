import { Collapse, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import "./input.css"
import InputTodo from './inputTodo'

function AddInput({listId , type}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="addInput">
            <Collapse in={open} >
                <InputTodo setOpen={setOpen} listId={listId} type={type}/>
            </Collapse>
            <Collapse in={!open}>
            <Paper className="addInput_button" onClick={()=>setOpen(!open)} elevation={0}>
                <Typography className="addInput_text">
                   {type === "todo"? "Add Todo" :"Add another list"}
                </Typography>
                </Paper>
                </Collapse>
        </div>
    )
}

export default AddInput
