import { InputBase, Typography } from '@material-ui/core'
import React,{useContext, useState} from 'react'
import {TodoEdit} from '../../../StyledComponents/index'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import "./title.css"
import storeAPI from '../../../Store/storeAPI';

function Title({title,listId}) {
    const [open, setOpen] = useState(false)
    const [ltitle, setlTitle] = useState(title)
    const {updateTitle} =useContext(storeAPI)

    const changeHandler =(e) =>{
        setlTitle(e.target.value)

    }

    const blurHandler =()=>{
        updateTitle(ltitle,listId)
        setOpen(false)
        
    }
    return (
        <div>
            {open ? <div><InputBase
                value={ltitle}
                autoFocus
                onChange={changeHandler}
                inputProps={{
                className: "input"
            }}
                fullWidth
                onBlur={blurHandler} /></div> :
                <div className="Container"> <TodoEdit className="Container-box" onClick={() => setOpen(!open)}>{title}</TodoEdit><MoreHorizIcon /></div>
            }
    
            

            
        </div>
    )
}

export default Title
