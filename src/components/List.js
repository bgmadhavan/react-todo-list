import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import { List,ListItem,ListItemText, TextField } from "@mui/material";
import { Delete,Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/system';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function ListArea({todos, onDelete, onEdit, markCompleted}){
    const [editText, setEditText] = useState('');
    const [editId, setEditId] = useState(null);

    const handleDeleteClick = (id)=>{
        onDelete(id);
        // e.preventDefault();
        console.log(id);
    }

    const handleEditClick = (id,value)=> {
        setEditId(id);
        setEditText(value);
    }

    const handleChange=(e)=>{
        setEditText(e.target.value);
    }

    const handleSave = (todo)=>{
        onEdit(todo.id,editText);
        setEditId(null);
    }

    const handleComplete = (todo)=>{
        markCompleted(todo.id);
    }

    const StyledList = styled(List)({
        width: '100%',
    })

    const StyledListItem = styled(ListItem)({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: '0.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      });

      const style = {
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "black",
            color:"black"
          },
        },
        '& label.Mui-focused': {
          color: 'black', 
        },
      };

    return(
        <StyledList>
            {
                todos.length ? (todos.map(todo=>
                    <StyledListItem 
                        key={todo.id}
                        onClick={() => handleComplete(todo)}
                        secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(todo.id,todo.task)}>
                            <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(todo.id)}>
                            <RemoveCircleOutlineIcon style={{color:'#d50000'}}/>
                            </IconButton>
                        </>
                        }
                    >
                    {
                        editId === todo.id ? (
                            <TextField
                                value={editText}
                                onChange={e => handleChange(e)}
                                onBlur={() => handleSave(todo)}
                                autoFocus
                                sx={style}
                            />
                        ) : <ListItemText 
                                primary={todo.task}
                                sx={{
                                    textDecoration: todo.completed ? "line-through" : "none",
                                    color: todo.completed ? "grey" : "inherit"
                                }}
                      
                            />
                    }
                    
                  </StyledListItem>
                )): 
                (<p>Add a task...</p>)
            }
        </StyledList>
    )
}

export default ListArea;