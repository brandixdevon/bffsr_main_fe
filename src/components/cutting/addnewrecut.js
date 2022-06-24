import React,{useEffect }  from 'react';
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
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import GetSideView from '../srf/getsrfsideview';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'moment';

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
    const [VAL_TEAM, setVAL_TEAM] = React.useState([]);
    const [VAL_HANDLE, setVAL_HANDLE] = React.useState([]);
    const [VAL_METHOD, setVAL_METHOD] = React.useState([]);

    const [DSET_TEAMS, setDSET_TEAMS] = React.useState([]);
    const [DSET_HANDLE, setDSET_HANDLE] = React.useState([]);
    const [DSET_PENDINGLIST, setDSET_PENDINGLIST] = React.useState([]);

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


    const AddtoList = () =>{


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

      if(VAL_TEAM.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct Team.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }

      if(VAL_HANDLE.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Handling Requirement.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }

      if(VAL_METHOD.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Method.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }

      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "userid": Userid,
            "team": VAL_TEAM,
            "handle": VAL_HANDLE,
            "method": VAL_METHOD
        })
    };

    fetch(`http://${apiurl}/cutting/addrecutentry`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
              fetch(`http://${apiurl}/cutting/recutpendinglist/${SRFID}`)
              .then(res => res.json())
              .then(response =>  { setDSET_PENDINGLIST(response.recut); })
              .catch(error => console.log(error));

                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

            }

            if(data.Type === "ERROR")
            {
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
      
        })
        .catch(error => console.log(error));

    };


    const OnChange_Team = (e) => {
      setVAL_TEAM(e.value);
    };

    const OnChange_Handle = (e) => {
      setVAL_HANDLE(e.value);
    };

    const OnChange_Method = (e) => {
      setVAL_METHOD(e.value);


    };

    useEffect(() => {
    
         

          fetch(`http://${apiurl}/master/getcutteams`)
          .then(res => res.json())
          .then(response =>  { setDSET_TEAMS(response.cutteams); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/master/getcuthandle`)
          .then(res => res.json())
          .then(response =>  { setDSET_HANDLE(response.cuthandle); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/cutting/recutpendinglist/${SRFID}`)
          .then(res => res.json())
          .then(response =>  { setDSET_PENDINGLIST(response.recut); })
          .catch(error => console.log(error));

          
      
  }, [SRFID,apiurl]);

    
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
        <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>ADD NEW RE-CUTTING ENTRY</Typography>
             
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            
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

            <Grid item xs={12} md={12}>
              <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={AddtoList}>Add To List</Button>
            </Grid>
        </Grid>

        </Grid>

        <Grid item xs={12} md={9}>

        <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>RE-CUT LIST</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left"><b>TEAM</b></TableCell>
                    <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left"><b>HANDLING</b></TableCell>
                    <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left"><b>METHOD</b></TableCell>
                    <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="left"><b>STATUS</b></TableCell>
                    <TableCell size="small" style={{"font-weight":800,width:"20%"}} align="left"><b>START</b></TableCell>
                    <TableCell size="small" style={{"font-weight":800,width:"20%"}} align="left"><b>END</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_PENDINGLIST.map((row) => (
                <TableRow key={row.recut_id}>
                    <TableCell size="small" align="left">{row.recut_team}</TableCell>
                    <TableCell size="small" align="left">{row.recut_handling}</TableCell>
                    <TableCell size="small" align="left">{row.recut_method}</TableCell>
                    <TableCell size="small" align="left">{row.recut_status}</TableCell>
                    <TableCell size="small" align="left">{Moment(row.recut_start).format("YYYY-MMM-DD HH:mm:ss")}</TableCell>
                    <TableCell align="left">{JSON.stringify(row.recut_end).length > 8 ? (Moment(row.recut_end).format("YYYY-MMM-DD HH:mm:ss")):("Not Updated") }</TableCell>
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