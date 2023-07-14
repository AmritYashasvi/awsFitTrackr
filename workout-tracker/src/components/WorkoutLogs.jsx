import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import { Grid } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
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
  
  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    const currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate);
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "post",
        url: "http://localhost:3000/getlog",
        data: {date: currentDate},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
        .then((result) => {
          console.log(result.data);
          setWorkouts(result.data);
        })
        .catch((error) => {
          // error = new Error();
          console.log(error);
        });
        
  }, []);

  function handleChange(eve) {
    const sel_date = dayjs(eve.$d).format('YYYY-MM-DD');
    console.log(sel_date);
    
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "post",
        url: "http://localhost:3000/getlog",
        data: {date: sel_date},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
        .then((result) => {
          console.log(result.data);
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

          <Grid item xs={12} sm={6} md={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DateCalendar
               views={['day']}
               onChange={handleChange}
              />
           </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={7} style={{textAlign: 'center'}}>
          {workouts.length ?
          <Bar
              data = {{
                labels: workouts.map((workout) => workout.name + ' (' + workout.unit + ')'),
                datasets: [
                  {
                    label: "Your's",
                    data: workouts.map((workout) => workout.done),
                    backgroundColor: 'grey',
                    borderColor: 'black',
                    BorderWidth: 1,
                  },
                  {
                    label: 'Target',
                    data: workouts.map((workout) => workout.target),
                    backgroundColor: 'aqua',
                    borderColor: 'black',
                    BorderWidth: 1,
                  }
                ]
              }}
            ></Bar> :<><h4>select some other date;</h4> <img alt='no data available for this date' src="https://www.archanaprojects.com/Frontend/images/not-found.png"></img> </>}
            
          </Grid>

        </Grid>
        <div>
          
        </div>
      </Box>
    </Box>
  );
}
