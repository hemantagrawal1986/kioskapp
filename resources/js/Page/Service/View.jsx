import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import {Link,router,useForm} from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';


export default function View(props)
{
    
    const {data}=props;
    let counter=0;

    function handleSuspended(e)
    {
        const id = e.target.name.split("_")[1];
        
        router.post("/service/toggle/"+id,{
            _method:"PATCH",
            suspend:e.target.checked,
        })
    }

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell >
                            <Link href={"/service/create"}>+</Link>
                        </TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Minutes</TableCell>
                        <TableCell>Suspended</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((rowitem)=>(
                        <TableRow key={rowitem.id}>
                            <TableCell><Link href={"/service/edit/"+rowitem.id}>{++counter}</Link></TableCell>
                            <TableCell>{rowitem.name}</TableCell>
                            <TableCell>{rowitem.amount}</TableCell>
                            <TableCell>{rowitem.minute}</TableCell>
                            <TableCell>
                                <Switch 
                                    name={"suspend_"+rowitem.id} 
                                    color="warning"
                                    checked={!Boolean(rowitem.status.toLowerCase()=="active")}
                                    onChange={handleSuspended}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}