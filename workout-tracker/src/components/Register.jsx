import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function Register() {

    const [regData, setRegData] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(eve) {
        const name = eve.target.name;
        const value = eve.target.value;
        setRegData((prev) => {
            return {...prev, [name]: value};
        });
    }



    function handleSubmit(event) {
        event.preventDefault();
        // console.log(regData);

        const configuration = {
            method: "post",
            url: "http://localhost:3000/register",
            data: regData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        axios(configuration).then((result) => {
            // console.log(result);
            alert("registered");
            window.location.href = "/login";

        }).catch((err) => {
        console.log(err);
            if(err.response.data.message === "User already exists") {
                alert("User already exists");
            }
            else
                alert("Failed to Submit")
            });
    }

    return (
        <div>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }} style={{padding: '5vh 5vh 5vh 5vh', borderRadius: '25px'}}>
                <Grid
                
                item
                xs={false}
                sm={false}
                md={7}
                sx={{
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                style={{borderRadius: '25px', textAlign: 'center', paddingTop: '40px'}}
                >
                    <img src='../src/images/run.png' alt='run image'></img>
                </Grid>

                <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square style={{borderRadius: '25px'}}>
                
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Grid container>
                            <Grid item>
                            <Link href="/" variant="body2">
                                {"<-- Click to go back"}
                            </Link>
                            </Grid>
                        </Grid>
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={regData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={regData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={regData.password}
                            onChange={handleChange}
                        />
                        <Button
                            color='secondary'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item>
                            <Link href="/Login" variant="body2">
                                {"Already have an account? Sign in"}
                            </Link>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
};