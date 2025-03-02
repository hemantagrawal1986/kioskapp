import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { router,useForm,usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Add(props) {

  const {errors:pageerrors} = usePage().props;
   const { data, setData, post, processing, errors } = useForm({
      type:''
    })

    function submit(e) 
    {
      e.preventDefault()
      post("/appointment_type/store");
    }

    function handleChange(e)
    {
      const key = e.target.id;
      const value = e.target.value;
      setData({
        ...data,
        [key]:value
      })
      
    }

    return (
        <form onSubmit={submit}>
          <TextField
            label="Appointment Type"
            sx={{ m: 1, width: '25ch' }}
            id="type"
            value={data.title}
            onChange={handleChange}
            
           
          />
          {pageerrors.type && <div>{pageerrors.type}</div>}
          <Button type="submit">Save</Button>
        </form>
    )
}
