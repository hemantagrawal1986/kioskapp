import TextField from '@mui/material/TextField';
import {useForm,usePage,router} from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Add(props) {
    
    const {errors:pageerrors} = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name:"",
        amount:0,
        minute:0,
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
        router.post("/service/store",{
            ...data,
        })
        e.preventDefault();
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

             fullWidth
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
             label="Service Minutes"
             error={Boolean(pageerrors?.minute)}
             helperText={pageerrors.type}
             onChange={handleChange}
             />

          
            <div sx={{m:1}}>
            <Button variant="contained" type="submit">Save</Button>
            </div>
        </Box>
    )
}