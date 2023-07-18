import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Zoom, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const drawerWidth = 240;
const navItems = ['Login', 'Register'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography color='#F50057' variant="h6" sx={{ my: 2 }}>
        <img src='../src/images/run.png' style={{height:'30px', width:'30px'}}></img>
        <b> FitTrackr</b>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton href={item} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color='#F50057'
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src='../src/images/run.png' style={{height:'30px', width:'30px'}}></img>
            <b> FitTrackr</b>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button href={item} variant="contained" color='secondary' key={item} sx={{ color: '#fff', marginLeft: '10px' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Box 
          sx={{
            borderRadius:'20px',
            backgroundColor:'#1C1B1B',
            textAlign:'center'
          }}
          padding={5}
        >
          <Zoom in={true}>
            <Typography variant='h4' color='#F50057'>
              <img src='../src/images/run.png' style={{height:'50px', width:'50px'}}></img>
              <b> FitTrackr</b>
            </Typography>
          </Zoom>
          <br></br>
          <Zoom in={true} style={{ transitionDelay: '500ms'}}>
            <Typography variant='h5'>
            Track, analyze, and crush your fitness goals with our comprehensive workout tracker. Whether you're a seasoned athlete or just starting your fitness journey, our platform is designed to help you stay motivated, organized, and on track.
            </Typography>
          </Zoom>
          <Zoom in={true} style={{ transitionDelay: '1000ms'}}>
            <Button href='/Register' variant="contained" color='secondary' sx={{ color: '#fff', marginTop: '40px', marginBottom: '80px' }}>
                Register Now
            </Button>
          </Zoom>
          <Box sx={{
            borderRadius:'20px',
            backgroundColor:'black',
            textAlign:'center'
          }}
          padding={5} >
            <Typography color='#F50057' variant='h4' mb={10}>
              <b>Features</b>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center'}}>
                <Card sx={{ maxWidth: 345 }}>
                  <img src='../src/images/custom.png' alt='image' style={{height: '200px'}}></img>
                  <CardContent>
                    <Typography color='secondary' gutterBottom variant="h5" component="div">
                      Personalized Workout Plans
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tailor your fitness routine to your specific goals and preferences. Create your own custom plans to fit your unique needs.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center'}}>
                <Card sx={{ maxWidth: 345 }}>
                  <img src='../src/images/library.png' alt='image' style={{height: '200px'}}></img>
                  <CardContent>
                    <Typography color='secondary' gutterBottom variant="h5" component="div">
                      Exercise Library
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Access an extensive exercise library with detailed instructions. Whether you're looking to target specific muscle groups or try new workout variations, our library has you covered.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center'}}>
                <Card sx={{ maxWidth: 345 }}>
                  <img src='../src/images/logs.png' alt='image' style={{height: '200px'}}></img>
                  <CardContent>
                    <Typography color='secondary' gutterBottom variant="h5" component="div">
                      Workout Logging
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Log your workouts in real-time, ensuring that you never miss a beat. Record the exercises, sets, reps, and weights for each session. Our intuitive interface makes it quick and convenient to document your workouts, helping you stay consistent and accountable.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center', margin: 'auto'}}>
                <Card sx={{ maxWidth: 345 }}>
                  <img src='../src/images/analytics.png' alt='image' style={{height: '200px'}}></img>
                  <CardContent>
                    <Typography color='secondary' gutterBottom variant="h5" component="div">
                      Progress Tracking
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monitor your progress over time and visualize your results with easy-to-read graphs and charts. Track key metrics such as weight, body measurements, sets, reps, and more. Stay motivated by seeing how far you've come and celebrate your achievements along the way.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>


          </Box>
        </Box>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;