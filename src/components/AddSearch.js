import React from "react";
import { TextField, AddTaskIcon, Box } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
function addSearch(){
    return(
        <Box>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
            <AddTaskIcon />;
        </Box>
    )

}

export default addSearch;