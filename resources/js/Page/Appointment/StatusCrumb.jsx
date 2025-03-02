import { Typography,Card,CardContent } from '@mui/material';
import React from 'react';
import {Button} from '@mui/material';
import {Stack} from '@mui/material';
import {useContext} from 'react';


import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import {Stepper,Step,StepLabel,StepContent} from '@mui/material';
import { AppointmentContext,AppointmentDispatchContext } from '../Reducer/AppointmentContext';
 
export default function StatusCrumb(props)
{
   const appointmentReserve=useContext(AppointmentContext);

    const [steps,setSteps]=React.useState([
        {number:1,name:"Customer"},
        {number:2,name:"Service"},
        {number:3,name:"Slot"},
       // {number:4,name:"Review"},
    ])

    const [activestep,setActiveStep]=React.useState(props.step || steps[0]);

    React.useEffect(()=>{
        setActiveStep(props.step)
    },[props.step])

    React.useEffect(()=>{
     
    },[appointmentReserve])

    
    function handleStep(e)
    {
        //console.log("i am here");
        (props.onChange && (
            props.onChange(steps[e.currentTarget.getAttribute("data-step")])
        ))
    }
    return (
     
        <>
           {/*
        <Card sx={{width:"100%"}}>
            <CardContent>
                {
                    <Stack direction={{sm:"row",xs:"row",md:"column",lg:"column"}}>
                        {(steps.map((data,index)=>(
                            
                            <Typography component="h3" key={"step_"+(index+1)} > 
                                <Button onClick={handleStep} data-step={index}>
                                
                                    <FlagRoundedIcon sx={{color:((activestep.number) === data.number)?"green":"grey" }}></FlagRoundedIcon>&nbsp;&nbsp;

                                    
                                    {data.name}
                                    
                                    
                                
                                    
                                </Button>
                            
                                
                            
                            </Typography>
                            
                        )))}
                    </Stack>
                }       
                
            </CardContent>
        </Card>
        */}
        <Stepper orientation="horizontal" activeStep={activestep.number-1}>
             {
                steps.map(
                    (data,index)=>(
                        <Step key={data.name}>
                        
                            <StepLabel
                                optional={
                                    props.caption?.[index] ? 
                                    <Typography variant="caption">{props.caption[index]}</Typography>
                                    :null
                                }
                                data-step={index}
                                onClick={handleStep}
                                
                                >
                                {data.name}

                                
                            </StepLabel>
                        </Step>
                    )
                )
            }
        </Stepper>
        </>
    );
}

function attendeeReducer(attendeeActive,action)
{
    switch (action.type) {
        case 'added': {
            return [
              ...attendeeActive,
              {
                ...action
              },
            ];
          }
    }
}