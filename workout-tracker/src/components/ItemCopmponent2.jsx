import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function ItemComponent2(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    };


    return (
        <>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{maxWidth: '800px', margin: 'auto'}}>
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
                            <b>Type : </b>{props.type}
                        </Typography>
                        <Typography variant='subtitle1'>
                            <b>Difficulty : </b>{props.difficulty}
                        </Typography>
                        <Typography variant='subtitle1'>
                            <b>Muscle : </b>{props.muscle}
                        </Typography>
                        <Typography variant='subtitle1'>
                            <b>Equipment : </b>{props.equipment}
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle1'>
                            <b>instructions : </b>{props.instructions}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br />
        </>
    )
}