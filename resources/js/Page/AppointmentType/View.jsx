import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';

//import Link from '@mui/material/Link';
import { Link,usePage } from '@inertiajs/react';
export default function View(props) {
   
   let counter=0;

   const {flash} = usePage().props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link href={"/appointment_type/create"}>+</Link>
                        </TableCell>
                        <TableCell>Appointment Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row)=>(
                        <TableRow key={row.type}>
                            <TableCell>
                                <Link href={"/appointment_type/edit/"+row.id}>{++counter}</Link>
                            </TableCell>
                            <TableCell>{row.type}</TableCell> 
                        </TableRow>   
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}