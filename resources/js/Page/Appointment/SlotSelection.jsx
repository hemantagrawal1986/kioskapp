import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ArrowRightIcon,ArrowLeftIcon } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

export default function SlotSelection(props)
{
    const interval=60;
    const start=0;
    const end=23;
    const totalhours=end-start;
    const minuteinterval=60/interval;

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    const maxdate = dayjs().add(1, 'month');

    

    const [slots,setSlots] = React.useState({});

    React.useEffect(()=>{
       // console.log(props)
        props.refreshSlots?
        statusSlots()
        :
        <></>;  
    },[props.refreshSlots]); 

    function statusSlots()
    {
       // console.log("refreshing");
        fetch("/appointment/slots/"+props.date.format("YYYY-MM-DD"))
        .then((res)=>res.json())
        .then((json)=>{
           // console.log(json);
           // console.log("firing evnt");
          
            setSlots(json)

            if(props.onRefreshDone)
            {
                props.onRefreshDone(json);
            }
        })
    }

    function tozero(number)
    {
        
        return number<10?""+number+"0":number;
    }
    function selectSlot(e)
    {
        const slot=e.target.getAttribute("data-slot");
        if(props.onSelect)
        {
            props.onSelect(e)
        }
    }

    function renderSlot(start,startindex,minuteindex,interval)
    {
        let slotDate=dayjs(props.date).hour(start+startindex).minute((minuteindex)*interval).second(0).millisecond(0);
        let currentDate=dayjs(new Date).second(0).millisecond(0);
        
        let slottext_attr=(start+startindex)+":"+tozero((minuteindex)*interval)
        let slottext=slottext_attr;
        const slotappend=(Boolean(slots[slottext])?slots[slottext]:"");
        slottext += (slotappend != "")?" ("+slotappend+")":"";
        //console.log(slotappend);
        //console.log(slots);
        

        
        //currentDate.set
        return (
            <Button 
                onClick={selectSlot} 
                variant="outlined"
                sx={{width:"100%",padding:"10px"}} 
                disabled={slotDate<currentDate}
                color={props.slot==slottext_attr?"success":"primary"} 
                data-slot={slottext_attr}>
                    {props.slot==slottext_attr?<CheckIcon></CheckIcon>:<></>}
                    {slottext}
                </Button>
        );
    }


    return(
        <Grid container rowSpacing={4} sx={{flexGrow:1}} columnSpacing={2} style={ props.style } p={5}>
            <Grid container sx={{mb:1}}>
                <Grid item sm>
                    <Typography component="h2" variant="h4" >Select Slot</Typography>
                </Grid>
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker name="date" value={props.date} minDate={props.minDate || today} maxDate={props.maxdate || maxdate} onChange={props.onDateChange} />
                </LocalizationProvider>
                </Grid>
            </Grid>

            {[...Array(props.totalhours || totalhours)].map((data,startindex)=>(
                <React.Fragment key={startindex}>
                {[...Array(props.minuteinterval || minuteinterval)].map((dataminute,minuteindex)=>(
                    <Grid item md={4} key={startindex+"_"+minuteindex} xs={12}>
                        {renderSlot(start,startindex,minuteindex,interval)}
                    </Grid>
                ))}
                </React.Fragment>
            ))}    
        </Grid>
    );
}