import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function ItemComponent(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    };

    function handleClick() {
        const token = cookies.get('TOKEN');
        const configuration = {
            method: "patch",
            url: "http://localhost:3000/removeworkout",
            data: {_id: props._id},
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`
            }
        };
        axios(configuration).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
        // setFlag((prev) => {return (!prev)});
        // console.log(flag);
    }


    return (
        <>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{maxWidth: '500px', margin: 'auto'}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography variant='h6' sx={{ width: '50%', flexShrink: 0 }}>
                        <b>{ props.name }</b>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography variant='subtitle1'>
                        <Grid container component="main">
                            <Grid item md={9} sm={9} xs={7}>Target : { props.target } { props.unit }</Grid>
                            <Grid item md={3} sm={3} xs={5}><Button variant="contained" color='secondary' onClick={handleClick} startIcon={<DeleteIcon />}>Delete</Button></Grid>
                        </Grid>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <br />
        </>
    )
}