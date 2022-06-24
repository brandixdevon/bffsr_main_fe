import React, { useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
  
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

export default function Allpendingemb() {
  const classes = useStyles();
  const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
  const [open, setOpen] = React.useState(true);
  const [SCANVALUE, setSCANVALUE] = React.useState("");
  var apiurl = localStorage.getItem('session_apiurl');
  var Userid = localStorage.getItem('session_userid');
  const [DATASET, setDATASET] = React.useState([]);
  
  const [IsLoading, setIsLoading] = React.useState(true);
  const [IsFinished, setIsFinished] = React.useState(false);
  const [IsRefresh, setIsRefresh] = React.useState(false);

  const [srf_id, setsrf_id] = React.useState("");
  const [proelm_id, setproelm_id] = React.useState("");

   
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const TextFieldChange = (e) => 
  {
    setSCANVALUE(e.target.value);
    if(e.target.value.length > 15 )
    {
      
      Swal.fire({  title: 'Error!',  text: 'Sorry! Incorrect SRF Document ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
    }

    if(e.target.value.length === 15)
    {
      window.location = '/SEWIN/' + e.target.value;
      return;
    }
 
    
  }

  const AddToSewing = (var_srfid,var_proelmid,var_sewid) => {

    const sendOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          "srfid": var_srfid,
          "userid": Userid,
          "proelmid": var_proelmid,
          "sewid": var_sewid
          
      })
  };

  fetch(`http://${apiurl}/sewing/startsewing`,sendOptions)
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
          setIsRefresh(true);
    
      })
      .catch(error => console.log(error));

  };

  const saveascomplete = (srfid,proelmid) => {

    setsrf_id(srfid);
    setproelm_id(proelmid);
    fetch(`http://${apiurl}/sewing/sewingcompleted/${srfid}/${proelmid}/${Userid}`)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setIsRefresh(false);
                    setIsFinished(true); 
                }

                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                } 
      
            })
            .catch(error => console.log(error));
}

useEffect(() => 
  {
    if(SRFID.length === 15 && IsLoading === true)
    {
        setSCANVALUE(SRFID);
        setIsLoading(false);
        setIsRefresh(true);
    }

    if(IsRefresh === true)
    {
      if(SCANVALUE.length === 15)
      {
        fetch(`http://${apiurl}/sewing/getsewbysrf/${SCANVALUE}`)
        .then(res => res.json())
        .then(response => {
          setDATASET(response.sewlist);
          setIsRefresh(false);
        })
        .catch(error => console.log(error));
      } 
    }

    if(IsFinished === true)
    {
      setIsFinished(false);
      setIsRefresh(false);
      const sendOptionsNextStep = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": srf_id,
            "proelmid": proelm_id,
        })
        };

        fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
        .then(resNextStep => resNextStep.json())
        .then(dataNextStep => 
        {
            if(dataNextStep.Type === "SUCCESS")
            {  
                Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                    window.location = "/SEWIN/";
                });
                
            }

            if(dataNextStep.Type === "ERROR")
            {
                Swal.fire({  title: 'Error1!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 

        })
        .catch(error => console.log(error));
    }

  },[SCANVALUE,SRFID,apiurl,IsFinished,IsLoading,srf_id,proelm_id,IsRefresh]);
  
  return (
    <div className={classes.root}>
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
          <Grid container spacing={1}>
            
            <Grid item xs={12}>
            
                <Tooltip title="Scan Your Barcode">
                    <TextField id="outlined-basic" size="large" label="Scan Your SRF Barcode" variant="outlined" style={{width:"100%"}} autoFocus value={SCANVALUE} onChange={TextFieldChange} />
                </Tooltip> 
            
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>Active Sewing List</Typography>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow TableRow>
                        <TableCell size="small" style={{"font-weight":"bold",width:"15%",fontSize:"12px",color:"#daaa11"}} align="left">
                        SRF ID
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"15%",fontSize:"12px",color:"#daaa11"}} align="left">
                        Customer
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"10%",fontSize:"12px",color:"#daaa11"}} align="left">
                        Style
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"10%",fontSize:"12px",color:"#daaa11"}} align="left">
                        Sewing Stage
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"10%",fontSize:"12px",color:"#daaa11"}} align="left">
                        Sew Status
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"40%",fontSize:"12px",color:"#daaa11"}} align="left">
                        #
                        </TableCell>
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                {DATASET.map((row) => (
                    <TableRow key={row.sew_id}>
                        <TableCell size="small" align="left">{row.sid_cluster}{row.sid_date}{row.sid_seq}</TableCell>
                        <TableCell size="small" align="left">{row.cus_name}</TableCell>
                        <TableCell size="small" align="left">{row.srf_style}</TableCell>
                        <TableCell size="small" align="left">{row.proelmname}</TableCell>
                        <TableCell size="small" align="left">{row.sew_status}</TableCell>
                        <TableCell size="small" align="left">
                            {
                                row.sew_status === "Pending" || row.sew_status === "Hold" ?
                                <Button onClick={() => AddToSewing(row.srf_id,row.proelmid,row.sew_id)} variant="contained" color="primary" style={{padding:5,margin:5}} >Sewing In</Button>
                                : row.sew_status === "Sewing In" ?
                                <>
                                <Button component={ Link } to={"/sewinqtyupdate/" + row.srf_id + "/" + row.sew_id} variant="contained" style={{padding:5,margin:5,backgroundColor:"#28AB9C",color:"white"}} >Qty In</Button>
                                <Button component={ Link } to={"/sewoutqtyupdate/" + row.srf_id + "/" + row.sew_id} variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#28AB9C",color:"white"}} >Qty Out</Button>
                                <Button component={ Link } to={"/SEWMOALLOCATE/" + row.srf_id + "/" + row.sew_id}  variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#8E1FBA",color:"white"}} >MO List</Button>
                                <Button onClick={() => saveascomplete(row.srf_id,row.proelmid)} variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#3A77BD",color:"white"}} >Job Done</Button>
                                </>
                                : row.sew_status === "Sewing Hold" ?
                                <Button variant="contained" color="primary" style={{padding:10,margin:5}} >Sewing Start Again</Button>
                                : <p>N/A</p>

                            }
                        </TableCell> 
                    </TableRow>
                            ))}
            </TableBody>
            </Table>
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