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
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
    var Userid = localStorage.getItem('session_userid');
    const [open, setOpen] = React.useState(true);
    const [VAL_ISSUENOTE, setVAL_ISSUENOTE] = React.useState([]);
    const [VAL_MBFCW, setVAL_MBFCW] = React.useState([]);
    const [VAL_MBFCWUNIT, setVAL_MBFCWUNIT] = React.useState([]);
    const [VAL_FRHOURS, setVAL_FRHOURS] = React.useState([]);
    const [DSET_FABRIC, setDSET_FABRIC] = React.useState([]);
    const [DSET_TRIMS, setDSET_TRIMS] = React.useState([]);
    const [IsFinished, setIsFinished] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    
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

    const Saveasedit = () => {
        
        window.location = "/STLIST/ALL";
        
    };

    const ConfirmUpdate = item => {
    
        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(Userid.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct User.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        Swal.fire({
            title: 'Are you sure?',
            text: "Do You Complete this Stores Process.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, already completed!'
        }).then((result) => {
            if (result.value) {
   
                fetch(`http://${apiurl}/stores/stcompleted/${SRFID}/${Userid}`)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                      setIsFinished(true);
                        
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
                    
                })
                .catch(error => console.log(error));
      
            }
        })
  
    };

    useEffect(() => {
    
      fetch(`http://${apiurl}/srf/SrfDetails/${SRFID}`)
      .then(res => res.json())
      .then(response => {
          setVAL_ISSUENOTE(response.srfdetails[0].issue_note);
          setVAL_MBFCW(response.srfdetails[0].body_fab_cw);
          setVAL_MBFCWUNIT(response.srfdetails[0].body_fab_cw_unit);
          setVAL_FRHOURS(response.srfdetails[0].fab_relax_hours);
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/patternmaking/pmfabricyy/${SRFID}`)
      .then(res => res.json())
      .then(response => { setDSET_FABRIC(response.fabricyy); })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/patternmaking/pmtrimyy/${SRFID}`)
      .then(res => res.json())
      .then(response => { setDSET_TRIMS(response.trimyy); })
      .catch(error => console.log(error));

      if(IsFinished === true)
      {
        const sendOptionsNextStep = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": SRFID,
              "proelmid": '6',
          })
      };

      fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
      .then(resNextStep => resNextStep.json())
      .then(dataNextStep => 
      {
          if(dataNextStep.Type === "SUCCESS")
          { 
                Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                  window.location = "/STLIST/ALL";
              });
          }

          if(dataNextStep.Type === "ERROR")
          {
              Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
          } 
  
      })
      .catch(error => console.log(error));
      }
  
}, [SRFID,apiurl,IsFinished]);

    
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
        <Grid item xs={12} md={6}>
           
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={12} md={12}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>FABRIC YY DETAILS</Typography>
          
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{width:"40%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>FABRIC YY</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"15%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>UNIT</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"15%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>PERIMETER</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"15%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>PCS</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"15%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>PLICE</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_FABRIC.map((row) => (
                <TableRow key={row.fabric_id}>
                    <TableCell size="small" align="left">{row.yy_value}</TableCell>
                    <TableCell size="small" align="left">{row.yy_unit}</TableCell>
                    <TableCell size="small" align="left">{row.perimeter}</TableCell>
                    <TableCell size="small" align="left">{row.pcs}</TableCell>
                    <TableCell size="small" align="left">{row.plice}</TableCell>
                </TableRow>
                    ))}
            </TableBody>
            </Table>

            </Grid>
            <Grid item xs={12} md={12}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>TRIM YY DETAILS</Typography>
          
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{width:"40%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>TRIM YY</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"15%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>UNIT</Typography>
                    </TableCell>
                   
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_TRIMS.map((row) => (
                <TableRow key={row.fabric_id}>
                    <TableCell size="small" align="left">{row.yy_value}</TableCell>
                    <TableCell size="small" align="left">{row.yy_unit}</TableCell>
                </TableRow>
                    ))}
            </TableBody>
            </Table>

            </Grid>
            <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" style={{"font-weight":"bold",color:"purple"}} gutterBottom># Issue Note No / DAN :</Typography><Typography variant="subtitle2" gutterBottom>{VAL_ISSUENOTE}</Typography>
                <Typography variant="subtitle2" style={{"font-weight":"bold",color:"purple"}} gutterBottom># Main Body Fabric CW :</Typography><Typography variant="subtitle2" gutterBottom>{VAL_MBFCW}</Typography>
                <Typography variant="subtitle2" style={{"font-weight":"bold",color:"purple"}} gutterBottom># Main Body Fabric CW Unit :</Typography><Typography variant="subtitle2" gutterBottom>{VAL_MBFCWUNIT}</Typography>
                <Typography variant="subtitle2" style={{"font-weight":"bold",color:"purple"}} gutterBottom># Fabric Relaxing Hours :</Typography><Typography variant="subtitle2" gutterBottom>{VAL_FRHOURS}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
            <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={ConfirmUpdate}>Update As Completed</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={Saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch',margin:5}} >Save as Edit</Button>
            </Grid>
        </Grid>

        </Grid>

        <Grid item xs={12} md={6}>
            
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