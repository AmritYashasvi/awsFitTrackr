import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    });

    function handleChange(eve) {
        const name = eve.target.name;
        const value = eve.target.value;
        setLoginData((prev) => {
            return {...prev, [name]: value};
        });
    }



    function handleSubmit(event) {
        event.preventDefault();
  
        const configuration = {
            method: "post",
            url: "http://localhost:3000/login",
            data: loginData,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        axios(configuration).then((result) => {
            cookies.set("TOKEN", result.data.token, {
            path: "/",
            });
            cookies.set("NAME", result.data.name, {
            path: "/",
            });
            window.location.href = "/dashboard";
            }).catch((e) => {
                console.log(e);
                if(e.response.data.message === 'Username not found') {
                    alert('Email and password does not match! Please check');
                }
                else {
                    alert('error');
                }
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
                        Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginData.email}
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
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <Button
                            color='secondary'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                            <Link href="/Register" variant="body2">
                                {"Don't have an account? Sign up"}
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