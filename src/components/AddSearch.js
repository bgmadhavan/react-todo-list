import React from "react";
import { useState, useEffect, useRef } from 'react';
import { TextField, Box, Button, Container } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {styled} from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

function AddSearch({inputTerm, afterAdd, onSearch, onAdd}){

    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputTerm]);

    const handleAdd = ()=>{
        setLoading(true);
        setTimeout(() => {
            onAdd(inputTerm);
            afterAdd('');
            setLoading(false);
          }, 2000);

    }


    const CenteredContainer = styled(Container)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
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
        <CenteredContainer>
            <TextField  
            sx={style} 
            id="outlined-basic" 
            InputLabelProps={{
                sx: {
                  color: 'black',
                }}}
            label="Task" 
            variant="outlined" 
            value={inputTerm} 
            inputRef={inputRef}  
            onChange={e => onSearch(e.target.value)}/>
            <LoadingButton onClick={handleAdd} loading={loading}> {!loading && <AddTaskIcon fontSize="large" style={{color:"black"}}/>}</LoadingButton>
        </CenteredContainer>
    )

}

export default AddSearch;