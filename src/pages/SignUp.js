import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import PropTypes from 'prop-types'

const axios = require('axios')


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  response: {
    marginTop: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [user, setUser] = useState({username: ''})
  const [password, setPassword] = useState({password: ''})
  const [responseStatus, setStatus] = useState({status: ''})

  const classes = useStyles();

  const handleChange = (e) => {
    if(e.target.name === 'username') setUser({username: e.target.value})
    if(e.target.name === 'password') setPassword({password: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
    username: user.username,
    password: password.password
    }

    const config = {
      'Content-Type' : 'application/json'
    }

    axios.post('http://localhost:5000/api/register', data, config)
    .then(res => {
      setStatus({status: res.data})
    })
    .catch(err => {
      setStatus({status: 'Username is either not long enough or already exists'})
    })
  }

  return (
    <div>
    <Navbar bg="dark" variant='dark'>
        <Navbar.Brand href="/">Quacker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mr-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.response}>
          <p>
            {responseStatus.status}
          </p>
        </div>
        <form className={classes.form} method='post' onSubmit={handleSubmit.bind(this)} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                id="username"
                label="Username (3 chars. min)"
                name="username"
                autoComplete="username"
                onChange={handleChange.bind(this)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange.bind(this)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated : state.isAuthenticated,
  error: state.error
})

const connect({
  mapStateToProps
}) (SignUp)