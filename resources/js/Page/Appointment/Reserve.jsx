import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useState} from 'react';
import Box from '@mui/material/Box';
import React from 'react';
import {router} from '@inertiajs/react';
import dayjs from 'dayjs';
//import { ArrowRightIcon,ArrowLeftIcon } from '@mui/x-date-pickers';


//Application Related Components
import Service from './Service';
import SlotSelection from './SlotSelection';
import Attendee from './Attendee';
import StatusCrumb from './StatusCrumb';
import { Stack } from '@mui/material';
import {useReducer,useContext,setState} from 'react';
import { AppointmentContext,AppointmentDispatchContext } from '../Reducer/AppointmentContext';
import reserveReducer from '../Reducer/ReserveReducer';

const appointmentReserveInitial = {
    date:dayjs(new Date()),
    attendee:{},
    services:[],
};




export default function Reserve()
{
    
    const [appointmentReserve, dispatch] = useReducer(reserveReducer, appointmentReserveInitial);


    const interval=60; //
    const start=0; //
    const end=23; //
   

    const [attendee,setAttendee]=useState({
        firstname:"",
        lastname:"",
        phoneno:"",
        title:"",
        id:null
    })

    const [services,setServices]=React.useState({
        data:[],
    });

    const [refreshService,setRefreshService]=React.useState(true)

    const [reset,setReset]=useState(false);

    function onRefreshService()
    {
        setRefreshService(false)
    }

    //auto complete
    const [open, setOpen] = React.useState(false);
    
    const [step,setStep]=React.useState({
        name:"service",
        number:1
    });


    React.useEffect(()=>{
        if(reset)
        {
            setStep({
                name:"service",
                number:1
            })

            setReserve({
                mode:"service",
                date:dayjs(new Date()),
                attendee:{},
                services:[]
            })

            setAttendee({
                firstname:"",
                lastname:"",
                phoneno:"",
                title:"",
                id:null
            });
            
            setRefreshService(true); //refresh service
            
            setReset(!reset)

            setWorkflow(false);
        }
    },[reset])

    


    const [inputset,setInputSet]=useState({
        searchattendee:{
            phoneno:""
        }
    })


    const [options, setOptions] = React.useState([]);

    const [refreshSlots,setRefreshSlots]=React.useState(false);

    const [caption,setCaption]=React.useState([]);

    const [reserve,setReserve]=useState({
        mode:"service",
        date:dayjs(new Date()),
        attendee:{},
        services:[]

    })

    React.useEffect(()=>{
        refreshStepCaption();
    },[reserve])
    

    React.useEffect(()=>{
        if(step.number == 2)
        {
            setRefreshSlots(true);            
        }
        
    },[step.number,reserve.date]); 

  
    const [workflow,setWorkflow]=useState(false);//booking workflow
    

    function selectSlot(e)
    {
        const slot=e.currentTarget.getAttribute("data-slot");
       
       // console.log(slot);
        setReserve({
            ...reserve,
            mode:"form",
            slot:slot
        })   
       // console.log(reserve);
    }

    

    

    function createAppointment()
    {
        const  reserve_save = {
            ...reserve,
            "date":reserve.date.format("YYYY-MM-DD")
        }

    

        router.post(
                "/appointment/create/"+(reserve_save.attendee.id || "") ,
                reserve_save,
                {
                    onSuccess:()=>{
                        setReset(true);
                    },
                    onError:(errors)=>{
                        alert(errors.create)
                    }
                }) 
    }

    
    function handleDateChange(newValue)
    {
        //console.log(newValue);
        setReserve({
            ...reserve,
            slot:null,
            date:newValue
        })

        setRefreshSlots(true); 
    }

    function handleServiceSelect(newservices)
    {
        setServices({
            data:newservices.data
        })
    }
    
     
    function performStep(e)
    {
        let number_perform = step.number;
        //validate step and show message
        let r_services=[];
        let validated=true;
        switch(number_perform)
        {
            case 2:
                let count=0;
                //console.log(services.data)
                for(const service in services.data)
                {
                    
                    if(services.data[service].selected)
                    {
                        r_services.push(services.data[service])
                        count++;
                    }
                }

                setReserve({
                    ...reserve,
                    services:r_services
                })

                break;
         // case 2:
               // if(!reserve.slot)
                //{
               //     alert("Please select slot");
              //      validated=false;
              //  }
               // break;
        }

        if(e.currentTarget.getAttribute("data-step-mode") == "next")
        {
            if(!validated)
            {
                return;
            }
        }

        (e.currentTarget.getAttribute("data-step-mode") == "next")?number_perform++:number_perform--;
        setStep({
            ...step,
            number:number_perform 
        })
    }

    function onRefreshDone()
    {
        setRefreshSlots(false)
    }

    function handleAttendeeChange(attendee)
    {
        setReserve({
            ...reserve,
            attendee:attendee
        })

        dispatch({
            type:"attendee.selected",
            attendee:attendee
        })

        //console.log(reserve.attendee);
    }

    function handleStepChange(step_n)
    {
        //console.log(step_n);

        step_n && 
        setStep(
            step_n
        )
    }

    function renderActionButton()
    {
        let buttonText="Next";
        
        if(step.number == 3)
        {
            buttonText="Create Appointment"
        }

        
        return (
            step.number==3 ? (
                <Button onClick={createAppointment} color="success" variant="contained">{buttonText}</Button>
            ):
            ( (step.number==2) && 
                <Button onClick={performStep} variant="contained" data-step-mode="next">{buttonText}</Button>
            )
        );
    }

    function handleWorkflow(workflow)
    {
        setStep({
            ...step,
            number:2 
        })
        setWorkflow(workflow)
    }

    function getStepCaption(step_number)
    {
       // console.log(reserve)

        let caption_step = "";

        if(reserve.attendee)
        {
            switch(step_number)
            {
                case 1:
                    if(reserve.attendee.firstname != "" && reserve.attendee.lastname != "")
                    {
                        caption_step = reserve.attendee.firstname + " " + reserve.attendee.lastname
                    }
                    else
                    {
                        caption_step = "Missing Details"
                    }
                    
                break;

                case 2:
                    
                    caption_step = "("+reserve.services.length+")"

                    let total=0;
                    for(let rs in reserve.services)
                    {
                        total+=reserve.services[rs].amount;
                        console.log(reserve.services[rs]);
                    }
                    
                    caption_step+=" INR " + total;

                    //total
                break;

                case 3:
                    caption_step = reserve.slot ? "("+reserve.slot+")" : "";
                break;
            }
        }

        return caption_step;
    }

    function refreshStepCaption()
    {
        let caption_set = [];
        let step = 0;
        for(step=1;step<=3;step++)
        {
            caption_set.push(getStepCaption(step))
           
        } 

        //console.log(caption_set);
        setCaption(caption_set);
    }

    return (
       
        <Box>
            <AppointmentContext.Provider value={appointmentReserve}>
                <AppointmentDispatchContext.Provider value={dispatch}>
                    <Grid container justifyContent={"center"} sx={{display:workflow?"":"none"}}>
                        <Grid item md={5} mb={5}>
                            <Box>
                                <StatusCrumb onChange={handleStepChange} step={step} caption={caption}/>
                            </Box>
                        </Grid>
                        
                    </Grid>
                    <Grid container sx={{flexGrow:1 }} columnSpacing={2} direction={{sm:"column-reverse",md:"row"}}  >
                        
                        <Grid item md={12}>
                            <Service  onSelect={handleServiceSelect} onRefreshService={onRefreshService} refreshService={refreshService} reset={reset} style={{ display:(step.number==2?"":"none") }}></Service>            
                            <SlotSelection onSelect={selectSlot} date={reserve.date} refreshSlots={refreshSlots} onRefreshDone={onRefreshDone} reset={reset} slot={reserve.slot} onDateChange={handleDateChange} style={{ display:(step.number==3?"":"none") }} ></SlotSelection>
                            <Attendee style={{ display:(step.number==1?"":"none") }} onChange={handleAttendeeChange} attendee={attendee} reset={reset} onWorkflowChange={handleWorkflow} ></Attendee>
                        
                            <Stack mt={5}>
                                {renderActionButton()}
                            </Stack>
                        </Grid>
                        {/*<Grid item md={3} >
                            <StatusCrumb onChange={handleStepChange} step={step}/>
                        </Grid>
                        */}
                    </Grid>
                </AppointmentDispatchContext.Provider>
            </AppointmentContext.Provider>
            
            { /*
            <Grid container sx={{flexGrow:1}} mt={5}  columnSpacing={2} columns={{md:12,sm:12,lg:12,xs:12}} >
                <Grid item >
                
                    <Button variant="contained" data-step-mode="prev" onClick={performStep} disabled={step.number==1?true:false}>
                        Prev
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </Button>
                </Grid>
                <Grid item sm >
                    <Button fullWidth variant="contained"  style={{ display:(step.number==3?"":"none") }} disabled={!Boolean(reserve.attendee)} onClick={createAppointment}>Save & Proceed</Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" data-step-mode="next"  onClick={performStep} disabled={step.number==3?true:false}>
                        Next
                        <ArrowRightIcon></ArrowRightIcon>
                    </Button>
                </Grid>
    </Grid> */ }
        </Box>
         
    )
}