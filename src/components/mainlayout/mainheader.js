import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { Redirect } from 'react-router-dom';
import Moment from 'moment';

export default function MainHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  var Username = localStorage.getItem('session_username');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginValidation = () => {
    
    var Var_Islogin = localStorage.getItem('session_islogin');
    var Var_UserId = localStorage.getItem('session_userid');
    var Var_UserName = localStorage.getItem('session_username');
    var Var_SessionExpire = localStorage.getItem('session_expire');

    if(Var_Islogin === null)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user. Please Log In Again',  icon: 'error',  confirmButtonText: 'OK'});
        return <Redirect to={"/login/"} />
    }

    if(Var_UserId === "")
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user. Please Sign in Again.',  icon: 'error',  confirmButtonText: 'OK'});
        return <Redirect to={"/login/"} />
    }

    if(Var_UserName === "")
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user. Please Sign in Again.',  icon: 'error',  confirmButtonText: 'OK'});
        return <Redirect to={"/login/"} />
    }

    if(Var_SessionExpire === "")
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user. Please Sign in Again.',  icon: 'error',  confirmButtonText: 'OK'});
        return <Redirect to={"/login/"} />
    }
    
    if(Moment().toDate() > Moment(Var_SessionExpire).toDate())
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry, Your Session Expire at '+Moment().toDate()+ '. Please Sign in Again.',  icon: 'error',  confirmButtonText: 'OK'});
        return <Redirect to={"/login/"} />
    }

};

  return (
    <div>
    {loginValidation()}
          <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
             <PermContactCalendarIcon /> <Typography variant="subtitle2" align="center" color="inherit">{Username}</Typography>
          </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleClose}><Typography variant="subtitle2" align="center" color="primary">BFF : {Username}</Typography></MenuItem>
       
      </Menu>
    </div>
  );
}