import React,{useEffect}  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
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
import { DropzoneArea } from 'material-ui-dropzone';
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [VAL_REFERENCE, setVAL_REFERENCE] = React.useState([""]);
    const [VAL_CUTTERMUST, setVAL_CUTTERMUST] = React.useState([]);
    const [VAL_EPB, setVAL_EPB] = React.useState([]);
    const [DSET_SRFEMB, setDSET_SRFEMB] = React.useState([]);
    const [DSET_SRFDW, setDSET_SRFDW] = React.useState([]);
    
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
        
        window.location = "/PBLIST/";
        
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
            text: "Do You Complete this Placement Board Processing.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, already completed!'
        }).then((result) => {
            if (result.value) {
   
                fetch(`http://${apiurl}/placementboard/pbcompleted/${SRFID}/${Userid}`)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                            window.location = "/PBLIST/";
                        });
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

    const onDrop = (files) => {
      // POST to a test endpoint for demo purposes
      files.forEach(file => {
    
          const formData = new FormData();

          
          formData.append('uploadFile', file);
          formData.append('srfid', SRFID);

          const sendOptions = {
              method: 'POST',
              body: formData
          };

          fetch(`http://${apiurl}/placementboard/uploadpb`,sendOptions)
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

              fetch(`http://${apiurl}/placementboard/pbdetails/${SRFID}`)
              .then(res => res.json())
              .then(response => {
                  setVAL_EPB(response.placementboard[0].e_pb);
                })
              .catch(error => console.log(error));
      
          })
          .catch(error => console.log(error));

      })

      

  };

    useEffect(() => {
      fetch(`http://${apiurl}/patternmaking/pmdetails/${SRFID}`)
        .then(res => res.json())
        .then(response => {
            setVAL_CUTTERMUST(response.patternmake[0].cutter_must);
            setVAL_REFERENCE(response.patternmake[0].pattern_ref);
          })
        .catch(error => console.log(error));

        fetch(`http://${apiurl}/placementboard/pbdetails/${SRFID}`)
        .then(res => res.json())
        .then(response => {
            setVAL_EPB(response.placementboard[0].e_pb);
          })
        .catch(error => console.log(error));

        fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/EMB`)
            .then(res => res.json())
            .then(response => {setDSET_SRFEMB(response.srfplants);})
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/DW`)
            .then(res => res.json())
            .then(response => {setDSET_SRFDW(response.srfplants);})
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});


    },[SRFID,apiurl]);

    
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
              <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom># PATTERN REFERENCE : </Typography>
              <Typography variant="subtitle1" style={{color:"black"}} gutterBottom>{VAL_REFERENCE}</Typography>

        </Grid>
        <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom># CUTTER MUST FILE : </Typography>
              { VAL_CUTTERMUST.length !== 0 ?
            (
                <Button component={ Link } target="_blank" to={`//${apiurl}/patternmaking/downloadcm/` + VAL_CUTTERMUST} variant="contained" style={{padding:10,margin:5}}>Download File</Button>
            ) :
            (
                <p style={{"color":"red"}}>Sorry. File Not Found</p>
            )}
              
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>EMBELLISHMENT PLANT LIST</Typography>
            {DSET_SRFEMB.map((row) => (
              <p style={{"color":"black"}}># {row.plant_name}</p>
            ))}
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>DYE-WASH PLANT LIST</Typography>
            {DSET_SRFDW.map((row) => (
              <p style={{"color":"black"}}># {row.plant_name}</p>
            ))}
        </Grid>
        <Grid item xs={12} md={12}>
          <hr/>
          <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>E-PlACEMENT BOARD FILE UPLOAD (PDF File Only)</Typography>

          { VAL_EPB !== null ?
          (
              <Button component={ Link } target="_blank" to={`//${apiurl}/placementboard/downloadepb/` + VAL_EPB} variant="contained" style={{padding:10,margin:5}}>Download File</Button>
          ) :
          (
              <p style={{"color":"red"}}>* Please Upload your E-Placement Board file.</p>
          )}

          <DropzoneArea  onChange={onDrop} showPreviewsInDropzone={false} acceptedFiles={['application/msword, application/pdf']} filesLimit={1} maxWidth={"SM"} maxHeight={100} maxFileSize={15000000} dropzoneText={"Drag and drop a Your PDF file here or click here to upload your E-Placement Board file"} />

          <hr/>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>PLACEMENT BOARD READY</Typography>
            
            
        
            
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={6} md={6}>
            <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={ConfirmUpdate}>Update As Completed</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={Saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch',margin:5}} >Save as Edit</Button>
            </Grid>
        </Grid>

        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>

            
        
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