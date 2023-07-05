import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useAddItemForm} from "./hooks/useAddItemForm";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const {
        title,
        error,
        onKeyPressHandler,
        onChangeHandler,
        addItem
    } = useAddItemForm(props.addItem)

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
});
