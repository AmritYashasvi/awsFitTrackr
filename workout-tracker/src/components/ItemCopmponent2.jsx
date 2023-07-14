import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { CssBaseline, Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function ItemComponent2(props) {
    return (
        <>
            <Paper elevation={3} style={{padding: '5px 20px 0px 20px'}}>
                <Typography variant='h6'>{props.name}</Typography>
                <Slider
                    aria-label="Small steps"
                    defaultValue={0}
                    step={1}
                    marks
                    min={0}
                    max={30}
                    valueLabelDisplay="auto"
                />
            </Paper>
            <br></br>
        </>
    )
}