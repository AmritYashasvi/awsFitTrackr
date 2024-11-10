import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale, //y
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale, //y
  Tooltip,
  Legend
)

import Cookies from "universal-cookie";
import axios from 'axios';
const cookies = new Cookies();


const drawerWidth = 240;

export default function Dashboard() {
  
  const [workouts, setWorkouts] = React.useState([]);
  const [flag, setFlag] = React.useState(false);

  function ItemComponent(props) {
    function handleChange(eve) {
      setWorkouts((prev) => {
        prev[props.index].done = eve.target.value;
        return prev;
      })
    }



    return(
        <>
            <Paper elevation={3} style={{padding: '5px 20px 0px 20px', margin: '5px'}}>
                <Typography variant='h6'>{props.name}</Typography>
                <Slider
                    aria-label="Small steps"
                    valueLabelDisplay="auto"
                    step={props.unit == 'km' ? 0.1 : 1}
                    min={0}
                    max={props.target}
                    defaultValue={props.done}
                    onChange={handleChange}
                />
            </Paper>
        </>
        )
  }


  React.useEffect(() => {
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "get",
        url: "http://localhost:3000/gettodaylog",
        headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
        .then((result) => {
          setWorkouts(result.data[0].arr);
          
        })
        .catch((error) => {
          // error = new Error();
          console.log(error);
        });
        
  }, [flag]);

  function handleClick() {
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "patch",
        url: "http://localhost:3000/addlog",
        data: {arr: workouts},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration).then((res) => {
      console.log('success');
    }).catch((e) => {
      console.log('faliure');
    });
    setFlag((prev) => {
      return !prev;
    })
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
          Dashboard
        </Typography>
        <br />

        <Grid container spacing={2} maxWidth={screen.width}>

          <Grid item xs={12} sm={8} md={8} sx={{textAlign: 'center'}}>
            <Bar
              data = {{
                labels: workouts?.map((workout) => workout.name + ' (' + workout.unit + ')'),
                datasets: [
                  {
                    label: "Your's",
                    data: workouts?.map((workout) => workout.done),
                    backgroundColor: '#f50057',
                    borderColor: 'black',
                    BorderWidth: 1,
                  },
                  {
                    label: 'Target',
                    data: workouts?.map((workout) => workout.target),
                    backgroundColor: 'grey',
                    borderColor: 'black',
                    BorderWidth: 1,
                  }
                ]
              }}
            ></Bar>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            
            <div style={{backgroundColor: 'black', padding: '10px', textAlign: 'center', borderRadius: '10px'}}>
            <Typography variant='h6'>
              Update today's workouts
            </Typography>
            {workouts?.length ? workouts?.map((workout, index) => (
              <ItemComponent
              key={index}
              index={index}
              _id={workout._id}
              name={workout.name}
              target={workout.target}
              unit={workout.unit}
              done={workout.done}
            />
            )) : <Typography variant='subtitle1'>No workouts to show. Please add from edit workouts!</Typography>}
            
            <br />
            <Button variant="contained" color="secondary" fullWidth onClick={handleClick}>
              Update
            </Button>
                        <Grid container>
                            <Grid item>
                            <Link href="/edit-workouts" variant="body2" style={{color: 'white'}}>
                                {"<-- Click to edit your workouts"}
                            </Link>
                            </Grid>
                        </Grid>
            </div>
          </Grid>

        </Grid>

      </Box>
    </Box>
  );
}
