import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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

import axios from 'axios';
import Cookies from "universal-cookie";
import _ from "lodash";
const cookies = new Cookies();


const drawerWidth = 240;

export default function WorkoutLogs() {
  const [date, setDate] = React.useState('');
  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    const currentDate = new Date().toJSON().slice(0, 10);
    setDate(currentDate);
    // console.log(currentDate);
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "post",
        url: "http://localhost:8000/getlog",
        data: {date: currentDate},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
        .then((result) => {
          // console.log(result.data);
          setWorkouts(result.data);
        })
        .catch((error) => {
          // error = new Error();
          console.log(error);
        });
        
  }, []);

  function handleChange(eve) {

    const sel_date = dayjs(eve.$d).format('YYYY-MM-DD');
    setDate(sel_date);
    // console.log(sel_date);
    
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "post",
        url: "http://localhost:8000/getlog",
        data: {date: sel_date},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
        .then((result) => {
          // console.log(result.data);
          setWorkouts(result.data);
        })
        .catch((error) => {
          // error = new Error();
          console.log(error);
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
          Logs
        </Typography>
        <br />
        <Grid container spacing={2} maxWidth={screen.width}>

          <Grid item xs={12} sm={12} md={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DateCalendar
               views={['day']}
               onChange={handleChange}
              />
           </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={7}>
          {workouts?.length ?
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
            ></Bar> :<><h4>select some other date;</h4> <img alt='no data available for this date' src="../src/images/not-found.png"></img> </>}
            
          </Grid>

        </Grid>
        <br></br>
        <Typography variant='h6' style={{margin: 'auto'}}>
          Date : { date }
        </Typography>
        <br></br>
        {workouts?.length ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Achieved</TableCell>
                <TableCell align="right">Target</TableCell>
                <TableCell align="right">Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts?.map((workout) => (
                <TableRow
                  key={workout.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {workout.name}
                  </TableCell>
                  <TableCell align="right">{workout.category}</TableCell>
                  <TableCell align="right">{workout.done}</TableCell>
                  <TableCell align="right">{workout.target}</TableCell>
                  <TableCell align="right">{workout.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : <Typography variant='h4' color='secondary'>No data to show</Typography>}

        
      </Box>
    </Box>
  );
}
