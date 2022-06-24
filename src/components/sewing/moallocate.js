import React, { useEffect }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import GetSideView from '../srf/getsrfsideview';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

export default function Editsrf() {
    const classes = useStyles();
    var apiurl = localStorage.getItem('session_apiurl');
    const [open, setOpen] = React.useState(true);
    var Userid = localStorage.getItem('session_userid');
    const [SCANVALUE, setSCANVALUE] = React.useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [SEWID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[1]);

    const [DSET_SEWMOLIST, setDSET_SEWOLIST] = React.useState([]);
    const [DSET_MODETAILS, setDSET_MODETAILS] = React.useState([]);
      
    const renderRedirect = () => {
        var myRegxp = /^([0-9]){10}$/;
        if(myRegxp.test(SRFID) === false)
        {
            Swal.fire({  title: 'Error!',  text: 'Invalid SRF ID',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/LOGIN/"} />
            }
    
    };

    const loginValidation = () => {
        //Swal.fire({  title: 'Error!',  text: 'Please Log In',  icon: 'error',  confirmButtonText: 'OK'});
        var Var_Islogin = localStorage.getItem('session_islogin');
        var Var_UserId = localStorage.getItem('session_userid');
        var Var_UserName = localStorage.getItem('session_username');

        if(Var_Islogin === null)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Log In Again',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/login/"} />
        }

        if(Var_UserId === "")
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/login/"} />
        }

        if(Var_UserName === "")
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/login/"} />
        }
    
    };

    const addtolist = item =>
    {

        if(item === "")
        {
            Swal.fire({  title: 'Error!',  text: "Can not Identify MO",  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(SEWID === "")
        {
            Swal.fire({  title: 'Error!',  text: "Can not Identify Sewing Stage",  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }


        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Userid":Userid,
                "sewid": SEWID,
                "moid": item,
            })
        };

        fetch(`http://${apiurl}/sewing/addmotolist`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                    setSCANVALUE("");
                    setDSET_SEWOLIST([]); 
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
            fetch(`http://${apiurl}/sewing/getmolistbysrf/${SRFID}/${SEWID}`)
            .then(res => res.json())
            .then(response => { setDSET_SEWOLIST(response.molist); })
            .catch(error => console.log(error));

          
            })
            .catch(error => console.log(error));
    };

    const updateasfinished = item =>
    {
        
        if(item === "")
        {
            Swal.fire({  title: 'Error!',  text: "Can not Identify MO Entry",  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
 
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Userid":Userid,
                "smoid": item
            })
        };

        fetch(`http://${apiurl}/sewing/closedmoentry`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                    setSCANVALUE("");
                    setDSET_SEWOLIST([]); 
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
            fetch(`http://${apiurl}/sewing/getmolistbysrf/${SRFID}/${SEWID}`)
            .then(res => res.json())
            .then(response => { setDSET_SEWOLIST(response.molist); })
            .catch(error => console.log(error));

          
            })
            .catch(error => console.log(error));
    };

    const getmodetails = () => {
        
        if(SCANVALUE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Invalid USER ID',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
        else
        {
            fetch(`http://${apiurl}/sewing/getmodetails/${SCANVALUE}`)
            .then(res => res.json())
            .then(response => { setDSET_MODETAILS(response.modetail); })
            .catch(error => console.log(error));
        }
    
    };


    const TextFieldChange = (e) => 
    {
        setSCANVALUE(e.target.value);
            
    }
    useEffect(() => {
    
      fetch(`http://${apiurl}/sewing/getmolistbysrf/${SRFID}/${SEWID}`)
      .then(res => res.json())
      .then(response => { setDSET_SEWOLIST(response.molist); })
      .catch(error => console.log(error));

      
  }, [SRFID,SEWID,apiurl]);

    return (
        <div className={classes.root}>
        {loginValidation()}
        {renderRedirect()}
        <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Sample Room Management System
          </Typography>
          <MainHeader />
        </Toolbar>
      </AppBar>
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><Mainmenu/></List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth={false} className={classes.container}>
      
    <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
        <Grid item xs={12} md={3} lg={3}>
          <Button component={ Link } to={"/SEWIN/"} variant="contained" style={{padding:5,margin:5,backgroundColor:"#455433",color:"white"}} >Go Back</Button>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Button component={ Link } to={"/sewinqtyupdate/" + SRFID + "/" + SEWID} variant="contained" style={{padding:5,margin:5,backgroundColor:"#28AB9C",color:"white"}} >Qty In</Button>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Button component={ Link } to={"/sewoutqtyupdate/" + SRFID + "/" + SEWID} variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#28AB9C",color:"white"}} >Qty Out</Button>
        </Grid>
        <Grid item xs={12}> 
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>MO ALLOCATION FOR SEWING</Typography>
   
            <Tooltip title="Scan Your Employee Barcode">
                <TextField id="outlined-basic" size="large" label="Scan Your Employee Barcode" variant="outlined" style={{width:"100%"}} autoFocus value={SCANVALUE} onChange={TextFieldChange} />
            </Tooltip> 
            <Button variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#BD3A8D",color:"white"}} onClick={getmodetails} >Search</Button>
               <hr/>  
            {DSET_MODETAILS.map((row) => (
                <Box border={1} p={2} m={2} >
                    <Typography variant="subtitle2" gutterBottom><b>MO Code : </b> {row.mo_code}</Typography>
                    <Typography variant="subtitle2" gutterBottom><b>MO Name : </b> {row.mo_name}</Typography>
                    <Typography variant="subtitle2" gutterBottom><b>MO Type : </b> {row.mo_type}</Typography>
                    <br/>
                    <Button variant="contained"  style={{padding:5,margin:5,backgroundColor:"#2471A3",color:"white"}} onClick={() => addtolist(row.mo_id)}>Add To List</Button>
              
                </Box>
              ))}

        </Grid>

        <Grid item xs={12} md={12}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"25%"}} align="left">
                <Typography variant="subtitle2" gutterBottom><b>MO Name</b></Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%"}} align="left">
                <Typography variant="subtitle2" gutterBottom><b>Start Time</b></Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%"}} align="left">
                <Typography variant="subtitle2" gutterBottom><b>End Time</b></Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left">
                <Typography variant="subtitle2" gutterBottom><b>Status</b></Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="left">
                <Typography variant="subtitle2" gutterBottom><b>Update</b></Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_SEWMOLIST.map((row) => (
              <TableRow key={row.smo_id}>
                <TableCell size="small" align="left">{row.mo_name}</TableCell>
                <TableCell size="small" align="left">{JSON.stringify(row.start_time).length > 8 ? (Moment(row.start_time).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</TableCell>
                <TableCell size="small" align="left">{JSON.stringify(row.end_time).length > 8 ? (Moment(row.end_time).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</TableCell>
                <TableCell size="small" align="left">{row.smo_status}</TableCell>
                <TableCell size="small" align="left">
                   { row.smo_status === "Start" ?
                    <Button variant="contained" style={{backgroundColor:"#C5814F",color:'#fff',padding:10}} onClick={() => updateasfinished(row.smo_id)} >END</Button>
                   :
                    <></>
                   }
                </TableCell>
              </TableRow>
                    ))}
        </TableBody>
        </Table>

          
        </Grid>

        <Grid item xs={12} md={12}>
            
           <GetSideView srfid={SRFID} />
            
        </Grid>
    </Grid>
   
    
  
  </Container>
  <Box bgcolor="text.disabled" color="text.primary" pt={2} pb={2}>
      <Copyright />
    </Box>
  </main>
  </div>
    );

}