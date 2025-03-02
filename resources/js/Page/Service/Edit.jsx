import TextField from '@mui/material/TextField';
import {useForm,usePage,router} from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Add(props) {
    
    const {errors:pageerrors} = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name:props.data.name,
        amount:props.data.amount,
        minute:props.data.minute,
    })

    function handleChange(e)
    {
      const key = e.target.id;
      const value = e.target.value;
      setData({
        ...data,
        [key]:value
      })
      
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        
        router.post(`/service/save/${props.data.id}`,{
            ...data,
            "_method":"PUT"
        })
        
    }
    return (
        <Box component="form" onSubmit={handleSubmit}  sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '& .MuiTextField-root:first-of-type': { ml: 0, width: '25ch' }
          }}
          
          noValidate
      autoComplete="off"

          >
       
            <TextField
            id="name"
            value={data.name}
             margin="normal"
             label="Service Name"
             error={Boolean(pageerrors?.name)}
             helperText={pageerrors.name}
             onChange={handleChange}
             />

             <TextField
            id="amount"
            value={data.amount}
             required
             type="number"
             margin="normal"
             label="Service Amount"
             error={Boolean(pageerrors?.amount)}
             helperText={pageerrors.type}
             onChange={handleChange}
             />

            <TextField
            id="minute"
            value={data.minute}
             required
             type="number"
             margin="normal"
             label="Service Minute"
             error={Boolean(pageerrors?.minute)}
             helperText={pageerrors.minute}
             onChange={handleChange}
             />

          
            <div sx={{m:1}}>
            <Button variant="contained" type="submit">Save</Button>
            </div>
        </Box>
    )
}