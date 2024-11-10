import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from "universal-cookie";
import Button from '@mui/material/Button';
import {  TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import _ from "lodash";
import ItemComponent from './ItemComponent';
import Sidebar from './Sidebar';
import axios from 'axios';
const cookies = new Cookies();


const drawerWidth = 240;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditWorkouts() {

  const [addWorkout, setAddWorkout] = React.useState({
    category: '',
    name: '',
    target: 0,
    unit: ''
  });

  function handleChangeSetAddWorkout(eve) {
    // console.log(eve.target.value);
    const name = eve.target.name;
    const value = eve.target.value;
    setAddWorkout((prev) => {
      return (
        {
          ...prev, 
          [name]: value
        }
      )
    })
  }

  function handleSubmit() {
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "patch",
        url: "http://localhost:8000/addworkout",
        data: addWorkout,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      },
    };
    axios(configuration);


    setOpen(false);
  }








  //for popup start
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //end

  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "get",
        url: "http://localhost:8000/getworkout",
        headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
        .then((result) => {
          setWorkouts(result.data.result);
          // console.log(result.data.result);
        })
        .catch((error) => {
          // error = new Error();
          console.log(error);
        });
  });




  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant='h4' style={{textAlign: 'center'}}>
          My Workouts
        </Typography>
        <br />

        {/* //popup start */}
        <div>
          <div style={{textAlign: 'center'}}>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
              Add workout
            </Button>
          </div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Add Workout</DialogTitle>
            <DialogContent>




            <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        label="Category"
                        value={addWorkout.category}
                        onChange={handleChangeSetAddWorkout}
                    >
                        <MenuItem value="Cardio">Cardio</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Weight Training">Weight Training</MenuItem>
                        <MenuItem value="Stretching">Stretching</MenuItem>
                        <MenuItem value="Yoga">Yoga</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Workout Name"
                            name="name"
                            value={addWorkout.name}
                            onChange={handleChangeSetAddWorkout}
                        />
                    <TextField
                            
                            margin="normal"
                            required
                            fullWidth
                            type='number'
                            id="target"
                            label="Target"
                            name="target"
                            value={addWorkout.target}
                            onChange={handleChangeSetAddWorkout}
                        />

                    <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="unit"
                        label="Unit"
                        value={addWorkout.unit}
                        onChange={handleChangeSetAddWorkout}
                    >
                        <MenuItem value="km">km</MenuItem>
                        <MenuItem value="min">min</MenuItem>
                        <MenuItem value="reps">reps</MenuItem>
                    </Select>
                    </FormControl>
                    <Button
                      color='secondary'
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
            </DialogContent>
          </Dialog>
        </div>
        <br />
        {/* //popup end */}

        {workouts?.map((workout) => (
          <ItemComponent
          key={workout._id}
          _id={workout._id}
          category={workout.category}
          name={workout.name}
          target={workout.target}
          unit={workout.unit}
         />
        ))}
      </Box>
    </Box>
  );
}
