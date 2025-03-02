import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { router,useForm,usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit(props) {

  const {errors:pageerrors} = usePage().props;
   const { data, setData, post, processing, errors } = useForm({
      type:props.data.type
    })

    function submit(e) 
    {
      e.preventDefault()
      //post(`/appointment_type/save/${props.data.id}`);
      router.post(`/appointment_type/save/${props.data.id}`,{
        ...data,
        "_method":"PUT"
      })
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
        <form method="post" onSubmit={submit}>
          <TextField
            label="Appointment Type"
            sx={{ m: 1, width: '25ch' }}
            id="type"
            value={data.type}
            onChange={handleChange}
            error={Boolean(pageerrors?.type)}
            helperText={pageerrors.type?pageerrors.type:""}
          />
        
          <Button type="submit">Save</Button>
        </form>
    )
}
