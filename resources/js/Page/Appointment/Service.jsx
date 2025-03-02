import Grid from "@mui/material/Grid";
import {Card,CardContent} from "@mui/material";
import {Typography,Skeleton} from "@mui/material";
import {Alert} from "@mui/material";
import React from 'react';
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import {Stack,Box} from "@mui/material";

export default function Service(props)
{

    React.useEffect(()=>{
        if(props.refreshService)
        {
            initservice();
        }
    },[props.refreshService]); 

    

    const [services,setServices]=React.useState({
        loading:true,
        data:[],
    });

    const handleServiceSelect = (e)=>{
        /*setReserve({
            ...reserve,
            service:services.data[e.target.value],
            mode:"slot"
        })*/

        
        var key=e.currentTarget.getAttribute("value");
        var checked=e.currentTarget.getAttribute("data-checked");

        

        services.data[key].selected=!(checked=="true");
        
        
        //console.log(services.data[key].selected);
        
        setServices({
            ...services,
            data:[
                ...services.data
            ]
        })

        
        if(props.onSelect)
        {
            props.onSelect(services)
        }
    }


    function initservice()
    {
        setServices({
            ...services,
            loading:true,
            data:[]
        });
        fetch("/service/list")
        .then((res)=>res.json())
        .then((json)=>{
           
            setServices({
                ...services,
                loading:false,
                data:json
            })

            if(props.onRefreshService)
            {
                props.onRefreshService(json)
            }
        })
    }
    

    return (
        <Grid container  rowSpacing={4} sx={{flexGrow:1}} columnSpacing={2} style={ props.style }>
    { (services.loading) ?
    <>
    <Grid item xs={12} md={12} lg={12} sm={12} >
        <Card >
            <CardContent>
                <Typography variant="h4" component="h4" color="primary" style={{marginBottom:"5px"}}><Skeleton variant="rectangular" animation="wave"></Skeleton></Typography>
                <Typography variant="h5" component="h5" style={{marginBottom:"5px"}}><Skeleton variant="rectangular" animation="wave"></Skeleton></Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} md={12} lg={12} sm={12}>
        <Card >
            <CardContent>
                <Typography variant="h4" component="h4" color="primary" style={{marginBottom:"5px"}}><Skeleton variant="rectangular" animation="wave"></Skeleton></Typography>
                <Typography variant="h5" component="h5" style={{marginBottom:"5px"}}><Skeleton variant="rectangular" animation="wave"></Skeleton></Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} md={12} lg={12} sm={12}>
        <Card >
            <CardContent>
                <Typography variant="h4" component="h4" color="primary" style={{marginBottom:"5px"}}><Skeleton variant="rectangular" animation="wave"></Skeleton></Typography>
                <Typography variant="h5" component="h5" style={{marginBottom:"5px"}}><Skeleton variant="rectangular" animation="wave"></Skeleton></Typography>
            </CardContent>
        </Card>
    </Grid>
    </>
    :
    (services.data.length>0?
        (services.data.map((service,index)=>(
        <Grid item key={"service_item_"+service.id} xs={12} md={12} lg={12} sm={12}>
            <Card>
                <CardContent>
                    <Grid container direction="row" columnSpacing={1} rowSpacing={1}>
                        <Grid item xs={12} sm={10} md={10} lg={10} >
                            <Typography variant="h5" component="div" mb={1}  sx={{float:"right"}}>{service.amount}</Typography>
                            <Typography variant="h4" component="div" mb={1} color="text.muted">{service.name}</Typography>
                            
                            
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2}>
                            <Box sx={{borderLeft:"1px solid #999999",height:"100%"}} pl={1}>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    value={index} 
                                    onClick={handleServiceSelect} 
                                    color={service.selected?"success":"primary"}
                                    data-checked={service.selected?"true":"false"}>
                                        {service.selected?<><CheckIcon></CheckIcon><span>Selected</span></>:<span>Select</span>}
                                        
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    
                </CardContent>
            </Card>
        </Grid>   
    ))):
    (
        <Alert severity="error">No Services Found</Alert>
    
    ))}
    </Grid>
    );
}