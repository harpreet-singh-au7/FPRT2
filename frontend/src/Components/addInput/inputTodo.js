import { InputBase, Button, IconButton, Paper} from '@material-ui/core'
import React,{useState,useContext} from 'react'
import "./inputTodo.css"
import ClearIcon from '@material-ui/icons/Clear';
import storeAPI from '../../Store/storeAPI';

function InputTodo({ setOpen=()=>false, listId, type}) {
    const [ctitle, setCtitle] = useState('')
    const {addTodo,addTodoList} = useContext(storeAPI)
    
    
    const changeHandeler =(e) =>{
     setCtitle(e.target.value)
    }
    const submitHandeler=async()=>{
    if(type=='todo'){
     addTodo(ctitle,listId)
     await setOpen(false)
     setCtitle('')
    }
    else{
        addTodoList(ctitle)
        await setOpen(false)
        setCtitle('')
    }
}
    const opener=async()=>{
        await setOpen(false)
       
    }

   
    return (
        <div className="inputtodo">
            <div  >
            <Paper className="inputTodo_card" >
             <InputBase
                multiline 
                fullWidth
                value={ctitle}
                onBlur={async()=>await setOpen(false)}
                onChange={changeHandeler}
                inputProps={{
                    className:"inputp"
                        }}
                        autoFocus
                 placeholder={type== 'todo'?"Enter your text here":"Enter list title here"}
            />
                </Paper>
            </div>
            <div className="addButton_div">
                <Button className="addButton" onClick={submitHandeler}> {type=="todo"?"+ ADD" : "Add new list"}</Button>
                <IconButton onClick={opener}><ClearIcon /></IconButton>
            </div>
            
        </div>
    )
}

export default InputTodo
