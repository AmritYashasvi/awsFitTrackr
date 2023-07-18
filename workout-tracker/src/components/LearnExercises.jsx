import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import _ from "lodash";
import ItemComponent2 from './ItemCopmponent2';
import Sidebar from './Sidebar';
import axios from 'axios';


const drawerWidth = 240;


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const type = [
    'cardio',
    'olympic_weightlifting',
    'plyometrics',
    'powerlifting',
    'strength',
    'stretching',
    'strongman'
]

const muscle = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
]

export default function LearnExercises() {

  const [data, setData] = React.useState('');
  const [dataset, setDataset] = React.useState(type);

  function handleChangeData(eve) {
    // console.log(eve.target.value);
    setData(eve.target.value);
  };


    const [radioValue, setRadioValue] = React.useState('Name');
    function handleChangeRadio(eve) {
        setRadioValue(eve.target.value);
        eve.target.value === 'type' ? setDataset(type) : setDataset(muscle);
        setData('');
    }

    const [results, setResults] = React.useState([]);

    function handleClick() {
      // console.log("https://api.api-ninjas.com/v1/exercises?" + radioValue + "=" + data);

      const configuration = {
        method: "get",
        url: "https://api.api-ninjas.com/v1/exercises?" + radioValue + "=" + data,
        headers: {
            'X-Api-Key': 'ESkVHU5lZKW2fp55yegT2g==3EhFNu7JuTbnRQhy'
        },
      };

      axios(configuration).then((result) => {
        // console.log(result);
        setResults(result.data);
        if(result.data.length === 0) {
          alert('No results! Please try someting else.');
        }
      }).catch((err) => {
        console.log(err);
      });
    } 

    

  

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant='h4' style={{textAlign: 'center'}}>
          Learn Exercises
        </Typography>
        <br />
        <Grid container spacing={2} maxWidth={screen.width}>
            <Grid item xs={12} sm={5} md={6} style={{textAlign: 'center'}}>
                <FormControl>
                    <Typography variant='h6' style={{textAlign: 'center'}}>
                    Get exercises by -
                    </Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Name"
                        name="radio-buttons-group"
                        onChange={handleChangeRadio}
                    >
                        <FormControlLabel value="Name" control={<Radio color='secondary' />} label="Name" />
                        <FormControlLabel value="type" control={<Radio color='secondary' />} label="Type" />
                        <FormControlLabel value="muscle" control={<Radio color='secondary' />} label="Muscle" />
                        
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid style={{textAlign:'center'}} item xs={12} sm={7} md={6}>
                <FormControl sx={{ m: 1, width: 300 }} color='secondary'>
                    {radioValue === 'Name' ? 
                    <TextField
                      maxWidth={screen.width}
                      label="Name"
                      value={data}
                      color='secondary'
                      onChange={handleChangeData}
                    >

                    </TextField> : <>
                    <InputLabel id="demo-multiple-name-label">{ radioValue }</InputLabel>
                    <Select
                    labelId="demo-simple-name-label"
                    id="demo-simple-name"
                    value={data}
                    onChange={handleChangeData}
                    input={<OutlinedInput label={ radioValue } />}
                    MenuProps={MenuProps}
                    >
                    {dataset.map((d, ind) => (
                        <MenuItem
                            key={ind}
                            value={d}
                        >
                        {d}
                        </MenuItem>
                    ))}
                    </Select> </>
                    }
                    <br></br>
                    <Button variant="contained" color='secondary' onClick={handleClick}>Get exercises</Button>
                </FormControl>
            </Grid>
        </Grid>
        <br></br>
        {results.map((result, ind) => (
        <ItemComponent2
            key={ind}
            name={result.name}
            difficulty={result.difficulty}
            type={result.type}
            muscle={result.muscle}
            equipment={result.equipment}
            instructions={result.instructions}
        />
      ))}
      </Box>
      
    </Box>
  );
}




