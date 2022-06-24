import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Copyright from '../mainlayout/copyright';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
 
export default function SignIn() {
  const classes = useStyles();
  //Api Url Setup
  localStorage.setItem('session_apiurl','bff-sr-01:8080');
  //localStorage.setItem('session_apiurl','localhost:3600');
  var apiurl = localStorage.getItem('session_apiurl');
  const [open, setOpen] = React.useState(false);
  const [VALUE_USERNAME, setVALUE_USERNAME] = React.useState([]);
  const [VALUE_PASSWORD, setVALUE_PASSWORD] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  const OnChange_username = (e) => {
    setVALUE_USERNAME(e.target.value);
  };

  const OnChange_password = (e) => {
    setVALUE_PASSWORD(e.target.value);
  };

  const handleClick = () => {

    if(VALUE_USERNAME.includes("@"))
    {
      const sendOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username" : VALUE_USERNAME , "password" : VALUE_PASSWORD})
      };
  
        fetch(`http://${apiurl}/login/Adauth`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            {
              localStorage.setItem('session_islogin',data.Useractive);
              localStorage.setItem('session_userid',data.Userid);
              localStorage.setItem('session_username',data.Username);
              localStorage.setItem('session_expire',Moment().add(24,'hours'));
              setRedirect(true);
            }
  
            if(data.Type === "ERROR")
            {
                localStorage.clear();
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            }
  
        })
        .catch(error => console.log(error));
    }
    else
    {
      const sendOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username" : VALUE_USERNAME , "password" : VALUE_PASSWORD})
      };
  
        fetch(`http://${apiurl}/login/Oauth`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            {
              localStorage.setItem('session_islogin',data.Useractive);
              localStorage.setItem('session_userid',data.Userid);
              localStorage.setItem('session_username',data.Username);
              localStorage.setItem('session_expire',Moment().add(24,'hours'));
              setRedirect(true);
            }
  
            if(data.Type === "ERROR")
            {
                localStorage.clear();
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            }
  
        })
        .catch(error => console.log(error));
    }

    

  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  const renderRedirect = () => {
    if (redirect) 
    {
      return <Redirect to={"/APP/"} />
    }
    else
    {
      localStorage.clear();
      return <Redirect to={"/LOGIN/"} />
    }

}
  
  
  return (
    <Container component="main" maxWidth="xs">
    {renderRedirect()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      </Snackbar>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your Email in Brandix"
            name="email"
            autoComplete=""
            autoFocus
            onChange={OnChange_username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={OnChange_password}
            onKeyDown={_handleKeyDown}
          />
          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className="btn"
            size="large"
            onClick={handleClick}
          >
            Sign In 
          </Button>
          
        </form>
      </div>
      
      <Box mt={2}>
        <p style={{color:"blueviolet",fontWeight:600}}>Sample Room Management System .(Ver 22.6.7)</p>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

