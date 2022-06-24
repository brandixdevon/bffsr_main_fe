import React,{useEffect,useState }  from 'react';
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
import Button from '@material-ui/core/Button';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import GetSideView from '../srf/getsrfsideview';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';

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
    const [selectedDateStart, setselectedDateStart] = useState(new Date());
    const [selectedDateEnd, setselectedDateEnd] = useState(new Date());
    const [VAL_TEAM, setVAL_TEAM] = React.useState([]);
    const [VAL_HANDLE, setVAL_HANDLE] = React.useState([]);
    const [VAL_METHOD, setVAL_METHOD] = React.useState([]);
    const [IsFinished, setIsFinished] = React.useState(false);

    const [DSET_TEAMS, setDSET_TEAMS] = React.useState([]);
    const [DSET_HANDLE, setDSET_HANDLE] = React.useState([]);

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
        
        window.location = "/CUTLIST/";
        
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
            text: "Do You Want To Complete This Cutting Operation.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, already completed!'
        }).then((result) => {
            if (result.value) {
   
                fetch(`http://${apiurl}/cutting/cutcompleted/${SRFID}/${Userid}`)
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

    const OnChange_Start = (e) => {
      setselectedDateStart(e);

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

        const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": SRFID,
              "userid": Userid,
              "updatetype": "start",
              "datavalue": e
          })
      };

      fetch(`http://${apiurl}/cutting/updatecutdetails`,sendOptions)
          .then(response => response.json())
          .then(data => 
          {
              if(data.Type === "SUCCESS")
              { 
                  Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

              }

              if(data.Type === "ERROR")
              {
                  setselectedDateStart("");
                  Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
              } 
        
          })
          .catch(error => console.log(error));
    };

    const OnChange_End = (e) => {
      setselectedDateEnd(e);

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

      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "userid": Userid,
            "updatetype": "finished",
            "datavalue": e
        })
    };

    fetch(`http://${apiurl}/cutting/updatecutdetails`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

            }

            if(data.Type === "ERROR")
            {
                setselectedDateEnd("");
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
      
        })
        .catch(error => console.log(error));

    };

    const OnChange_Team = (e) => {
      setVAL_TEAM(e.value);

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

      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "userid": Userid,
            "updatetype": "team",
            "datavalue": e.value
        })
    };

    fetch(`http://${apiurl}/cutting/updatecutdetails`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

            }

            if(data.Type === "ERROR")
            {
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
      
        })
        .catch(error => console.log(error));

    };

    const OnChange_Handle = (e) => {
      setVAL_HANDLE(e.value);

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

      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "userid": Userid,
            "updatetype": "handle",
            "datavalue": e.value
        })
    };

    fetch(`http://${apiurl}/cutting/updatecutdetails`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

            }

            if(data.Type === "ERROR")
            {
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
      
        })
        .catch(error => console.log(error));

    };

    const OnChange_Method = (e) => {
      setVAL_METHOD(e.value);

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

      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "userid": Userid,
            "updatetype": "method",
            "datavalue": e.value
        })
    };

    fetch(`http://${apiurl}/cutting/updatecutdetails`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

            }

            if(data.Type === "ERROR")
            {
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
      
        })
        .catch(error => console.log(error));

    };

    useEffect(() => {
    
          fetch(`http://${apiurl}/cutting/cutdetails/${SRFID}`)
          .then(res => res.json())
          .then(response => 
            { 
              setselectedDateStart(response.cutdetails[0].cut_start); 
              setselectedDateEnd(response.cutdetails[0].cut_end);
              setVAL_TEAM(response.cutdetails[0].cut_team);
              setVAL_HANDLE(response.cutdetails[0].cut_handling);
              setVAL_METHOD(response.cutdetails[0].cut_method);
            })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/master/getcutteams`)
          .then(res => res.json())
          .then(response =>  { setDSET_TEAMS(response.cutteams); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/master/getcuthandle`)
          .then(res => res.json())
          .then(response =>  { setDSET_HANDLE(response.cuthandle); })
          .catch(error => console.log(error));

          if(IsFinished === true)
          {
            const sendOptionsNextStep = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  "srfid": SRFID,
                  "proelmid": '7',
              })
          };

          fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
          .then(resNextStep => resNextStep.json())
          .then(dataNextStep => 
          {
              if(dataNextStep.Type === "SUCCESS")
              { 
                    Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                      window.location = "/CUTLIST/";
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
        <List><Mainmenu /></List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth={false} className={classes.container}>
      
    <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>CUTTING DETAILS UPDATE</Typography>
             
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={12} md={12} style={{marginBottom:"25px;"}}>
                  <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Cut Start Time</Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker style={{width:"100%"}} label="Cutting Start Time (DD-MM-YYYY HH:MM:SS)" maxDate={Date()} value={selectedDateStart} onChange={OnChange_Start} format="dd-MMM-yyyy HH:mm:ss"/>
                  </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={12}>
                  <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Cut Finished Time</Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker style={{width:"100%"}} label="Cutting Finished Time (DD-MM-YYYY HH:MM:SS)" maxDate={Date()} value={selectedDateEnd} onChange={OnChange_End} format="dd-MMM-yyyy HH:mm:ss"/>
                  </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Cutting Team</Typography>
                <Select id="cmbTeam" value={{"value" : VAL_TEAM,"label" : VAL_TEAM}} variant="outlined" onChange={OnChange_Team} options = {DSET_TEAMS} style={{width:"100%"}} size="small"/>
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Handling Requirement</Typography>
                <Select id="cmbHandle" value={{"value" : VAL_HANDLE,"label" : VAL_HANDLE}} variant="outlined" onChange={OnChange_Handle} options = {DSET_HANDLE} style={{width:"100%"}} size="small"/>
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Cutting Method</Typography>
                <Select id="cmbMethod" value={{"value" : VAL_METHOD,"label" : VAL_METHOD}} variant="outlined" onChange={OnChange_Method} options = {[{"value":"Manual","label":"Manual"},{"value":"Machine","label":"Machine"}]}  size="small"/>
            </Grid>

            <Grid item xs={6} md={6}>
            
            <Button variant="contained" color="secondary" style={{padding:10,margin:5}} onClick={ConfirmUpdate}>Update As Completed</Button>
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