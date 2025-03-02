import {Grid,Typography,Stack,Paper} from '@mui/material';
import {IconButton,Fade,Box,CircularProgress} from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import React from "react";
import dayjs from 'dayjs';
import {FormControlLabel,FormGroup,Switch,Button,Card} from '@mui/material';
import {Alert,Skeleton,Modal} from '@mui/material';
import { AppointmentContext,AppointmentDispatchContext } from '../Reducer/AppointmentContext';
import {Portal} from '@mui/material';
import {TableContainer,TableHead,TableBody,TableCell,TableRow,Table,FormControl,InputLabel,Select,MenuItem} from '@mui/material';

export default function Attendee(props)
{
    const container = React.useRef(null);
    const [options, setOptions] = React.useState([]);

    const [todaysAppointment, setTodaysAppointment] = React.useState({
        loading:false,
        data:[],
        showappointment:null
    });

    const [inputset,setInputSet]=React.useState({
        searchattendee:{
            fullstring:""
        }
    })

    

    const [attendee,setAttendee]=React.useState({
        firstname:Boolean(props.attendee)?.firstname || "",
        lastname:Boolean(props.attendee)?.lastname || "",
        phoneno:Boolean(props.attendee)?.phoneno || "",
        title:Boolean(props.attendee)?.title || "",
        id:Boolean(props.attendee)?.id
    })

    React.useEffect(()=>{
       //console.log(attendee);
        props.onChange && props.onChange(attendee)
        //console.log(attendee)
    },[attendee])

    React.useEffect(()=>{
        selectTodaysAttendee();
    },[])

   

    React.useEffect(()=>{
        if(props.reset)
        {
            
            setInputSet({
                ...inputset,
                searchattendee:{
                    fullstring:""
                }
            })
            setOptions([]);
            setAttendee({
                firstname:"",
                lastname:"",
                phoneno:"",
                title:"",
                id:null
            })
        }
    },[props.reset])

    const [loading,setLoading] = React.useState(false);

    const [editing,setEditing]=React.useState(false);
    
    function searchAutoFromServer(e)
    {
        //console.log(inputset.searchattendee.fullstring + e.target.value);
        setInputSet({
            ...inputset,
            searchattendee:{
                //phoneno:e.currentTarget.value
                fullstring:(e.target.value)
            }
        })

       setLoading(true);

       // ( (controller) && (controller.abort()) );
        
        if( window.controller)
        {
            window.controller.abort()
           // console.log("Download aborted");
        }
            
      

       window.controller = new AbortController();
       const signal = controller.signal;

        fetch("/attendee/search/"+e.target.value,{signal})
        .then((res)=>res.json())
        .then((json)=>{
           
            json.length > 0 ?
            
            setOptions(json)
            
            :
            setOptions([
                {
                    id:"",
                    fullstring:"Create New Attendee with "+inputset.searchattendee.fullstring
                }
            ])

            setLoading(false);
        }).catch(e=>{
            //if(e.name == "AbortError")
          //  {
                
            //}
        })
        
    }

    function selectAttendeeAsActive(e,values)
    {
        //setActiveAttendee(values)

        //setReserve({
        //    ...reserve,
          //  attendee:values
       // });

        //props.onChange && props.onChange(values)
        //console.log(values);

        values?.id ? 
        setAttendee(
          
            values
        )
        :(()=>{
            setAttendee({
                firstname:inputset.searchattendee.fullstring,
                lastname:"",
                phoneno:"",
                title:"",
                id:null
            })
            setInputSet({
                searchattendee:{
                    //phoneno:e.currentTarget.value
                    fullstring:""
                }
            })

            setEditing(true)
        })();
    }

    function newAttendee()
    {
        //setReserve({
         //   ...reserve,
         //   attendee:{
          //      firstname:null,
          //      lastname:null,
           //     title:null,
         //       id:null,
          //      phoneno:null,
          //  }
        //});

        
        setAttendee({
            firstname:"",
            lastname:"",
            phoneno:"",
            title:"",
            id:""
        })
        setEditing(true)
    }


  
    function handleChange(e)
    {
        const key=e.target.name;
        const value=e.target.value;

        setAttendee({
            ...attendee,
            [key]:value
        })
    }

    function selectTodaysAttendee()
    {

        //setLoading(true);
        setTodaysAppointment({
            loading:true,
            data:[]
        })
        fetch("/appointment/todays")
        .then((res)=>res.json())
        .then((json)=>{
           
            //json.length > 0 ?
            //setOptions(json)
            //({})
           // :
            //setOptions([])
           // setTodaysAppointment([]);

           // setLoading(false);

            
           // settodaysAppointment(options)

           setTodaysAppointment({
                loading:false,
                data:json
            })
        })
    }

   

  
    /*
    function checkLatestAppointmentForToday(option)
    {
        let latest_appointment = "";
        (option.latest_appointment) && (
            latest_appointment=dayjs(option.latest_appointment.starts_on).format("hh:mm A")
        )

        return latest_appointment;
    }
    */

    function initiateAppointment(e)
    {
      
       
        setTodaysAppointment({
            ...todaysAppointment,
            showappointment:todaysAppointment.data[e.currentTarget.getAttribute("data-index")]
        })
    }

    function AppointmentInspect(props)
    {
        
        const [open,setOpen]=React.useState(true);
        const [staff,setStaff]=React.useState([]);
        const [services,setServices]=React.useState([]);

       

        React.useEffect(() => {
            //code to pull in appointment active and
            //fetch(""/)
            fetch("/staff/list")
            .then((res)=>res.json())
            .then((json)=>{
                setStaff(json);
                
            });

            fetch("/appointment/services/"+props.appointment.appointment_id)
            .then((res)=>res.json())
            .then((json)=>{
                setServices(json);
            });
        }, []);

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
           
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };
//reason=="backdropClick"??setOpen(!open)
          function handleClose(e,reason)
          {
          
            if(reason=="backdropClick")
            {
                setOpen(!open)
            }
          }


          function handleChange(e)
          {
            services[e.explicitOriginalTarget.getAttribute("data-service")].pivot.staff_id = e.target.value;
            setServices([
                ...services
            ])
          }

          function handleServiceChange(e)
          {
            //fetch("/appointment/serve/"+props.appointment.appointment_id)
            
            const activeservice=services[e.target.getAttribute("data-service")];
            const nextStatus=e.target.getAttribute("data-status");

            
            if(nextStatus == "")
            {
                return;
            }


            fetch("/appointment/serve/"+activeservice.pivot.appointment_id+"/"+activeservice.pivot.service_id+"/"+nextStatus)
            .then((res)=>res.json())
            .then((json)=>{
                
            })
          }

          function AttendButton(props)
          {
            const colormap = {
                "pending":"primary",
                "started":"success",
                "completed":"success"
            }

            const displaystrings={
                "pending":"Start",
                "started":"Finish",
                "completed":"Done",
            }

            const nextStatus={
                "pending":"started",
                "started":"completed",
                "completed":""
            }

            //console.log(props.onClick);

            return (
                <Button variant="contained" data-service={props.sindex} data-status={nextStatus[props.service.pivot.status]??""} color={colormap[props.service.pivot.status]??""} onClick={(e)=>{props.onClick(e)}}>{displaystrings[props.service.pivot.status]}</Button>
            )
          }
        return(
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Service</TableCell>
                                    <TableCell >Staff</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                    {services.map((sdata,sindex)=>(
                                        <TableRow key={"services_"+sdata.id}>
                                            <TableCell>{sdata.name}</TableCell>
                                            <TableCell >
                                                <FormControl fullWidth>
                                                    <InputLabel id={"staffservicelabel_"+sdata.id}>Select</InputLabel>
                                                    <Select
                                                        labelId={"staffservicelabel_"+sdata.id}
                                                        id={"staffservice_"+sdata.id}
                                                        value={sdata.pivot.staff_id??""}
                                                        label="Staff"
                                                        onChange={handleChange}
                                                        
                                                    >
                                                        {staff.map((data,index)=>(
                                                            <MenuItem value={data.id} data-service={sindex} key={"staffserviceitem_"+data.id}>{data.firstname}</MenuItem>
                                                        ))}
                                                        
                                                     
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="right">
                                               <AttendButton service={sdata} sindex={sindex} onClick={handleServiceChange}></AttendButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                   
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        );
    }

    return(
        <Grid container style={props.style} columnSpacing={2}>  
            <Grid item sm={8} >
                <Grid container sx={{mb:2}}>
                    <Grid item sm> 
                        <Typography component="h3">Search Existing Customer</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="Add" onClick={newAttendee}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    
                </Grid>
                <Stack direction="row" spacing={2}>
                    <Autocomplete
                        id="searchattendee"
                        name="searchattendee"
                        value={inputset.searchattendee}
                        freeSolo
                        fullWidth
                        selectOnFocus
                        options={options}
                        groupBy={(option)=>option.starts_on && ("Today @ " + option.starts_on) || ""}
                        handleHomeEndKeys
                      //  isOptionEqualToValue={(option, value) => option.phoneno.localeCompare(value.phoneno)}
                        placeholder="Attendee Phone No "
                        getOptionLabel={(option) =>{
                            
                            //let fullstring=""
                            //fullstring+=(option.firstname || "")
                           // fullstring+=(fullstring.length > 0 ? " ":"")
                           // fullstring+=(option.lastname || "")
                            //fullstring+=(fullstring.length > 0 ? " ":"")
                            //fullstring+=(option.phoneno || "");
                            //fullstring+=(fullstring.length > 0 ? " ":"")
                            //fullstring+=(option.nextappointment || "");
                           // fullstring+=checkLatestAppointmentForToday(option)
                            //inputset.searchattendee.fullstring;
                        
                            
                            return option.fullstring;
                        }}

                        
                        
                        renderInput={(params) => 
                            <TextField 
                                {...params}  
                                label="Users"  
                                onChange={searchAutoFromServer}
                                
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment:(
                                        <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                    )
                                }}
                            />}
                        filterOptions={(x) => x}
                        onChange={selectAttendeeAsActive}
                        loading={loading}
                        //onFocus={selectTodaysAttendee}
                    />
                </Stack>
                {attendee && (
                    <Fade in={Boolean(attendee.id != null)}>
                        <Grid >
                            <Grid item xs={12} sm={12} md={12}>
                                <Box mt={5} p={2} component={Paper}>
                                    {attendee.id > 0 && (
                                        <>
                                        <FormGroup sx={{float:"right"}}>
                                            <FormControlLabel control={<Switch value={editing} onClick={()=>setEditing(!editing)}/>} label="Edit" />
                                        </FormGroup>
                                        <Typography component="div" sx={{ mb: 1.5 }}>Attendee Name / Contact</Typography>    
                                        </>
                                    )}

                                    {!attendee.id > 0 && (
                                        <Typography component="div" sx={{ mb: 1.5 }}>New Attendee Name / Contact</Typography>    
                                    )}

                                    {attendee.id > 0 && (
                                        <Stack direction="column" spacing={2} sx={{display:(!editing?"":"none")}}>
                                            <Typography component="div" variant="h5" sx={{ mb: 0,lineHeight:"3px" }}>{attendee.firstname +" "+ attendee.lastname}</Typography>    
                                            <Typography component="span" color="text.secondary">{attendee.phoneno || ""}</Typography>    
                                        </Stack> 
                                    )}

                                    <Stack direction="row" spacing={2} sx={{mt:4,display:(editing?"":"none")}}>
                                        

                                        <TextField
                                        required
                                        id="firstname"
                                        label="First Name"
                                        
                                        name="firstname"
                                        placeholder="First Name"
                                        sm={6}
                                        fullWidth 
                                        value={attendee.firstname || ""}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}  />
                                        
                                        <TextField
                                        required
                                        id="lastname"
                                        label="Last Name"
                                        
                                        name="lastname"
                                        placeholder="Last Name"
                                        sm={6}
                                        fullWidth 
                                        value={attendee.lastname || ""}
                                        InputLabelProps={{ shrink: true }} 
                                        onChange={handleChange}
                                        
                                        />

                                        <TextField
                                            id="phoneno"
                                            required
                                            label="Phone No"
                                            name="phoneno"
                                            placeholder="Phone Number"
                                            sm={2}
                                            fullWidth
                                            value={attendee.phoneno || ""}
                                            InputLabelProps={{ shrink: true }} 
                                            onChange={handleChange}
                                        />  
                                    </Stack>
                                    { props.onWorkflowChange && 
                                        <Button color="primary" variant="contained" sx={{mt:2}} onClick={props.onWorkflowChange}>Book</Button>
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </Fade>
                )}
            </Grid>       
            <Grid item sm={4} >
                <Box p={2} component={Paper} ref={container}>
                    <Typography component="h3">Todays Appointments</Typography>
                    {
                        todaysAppointment.loading ?    
                        <Typography variant="h5" component="div"> <Skeleton variant="rectangular"/></Typography>
                        :
                        (todaysAppointment.data.map((data,index)=>(
                     
                            <Stack direction="row" key={"todays_"+index}>
                                
                                <Typography>{data.fullstring}</Typography><br/>
                                <Button variant="contained" onClick={initiateAppointment} data-index={index}>Start</Button>
                                
                            </Stack>
                           
                        )))
                    }
                   
                   {todaysAppointment.showappointment ?
                        <Portal container={container.current}>
                            <AppointmentInspect appointment={todaysAppointment.showappointment}></AppointmentInspect>
                        </Portal>
                    :       
                    null}
                </Box>
            </Grid>
        </Grid>
    );
}