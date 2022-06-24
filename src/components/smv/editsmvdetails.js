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
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import { DropzoneArea } from 'material-ui-dropzone';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import GetSideView from '../srf/getsrfsideview';
import GetPreviousSMV from './getpreviousdata';

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

export default function Editsmv() {
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
    const [DSET_SMVLIST, setDSET_SMVLIST] = React.useState([]);
    const [DSET_SMVPENDINGLIST, setDSET_SMVPENDINGLIST] = React.useState([]);
    const [ISLOADING, setISLOADING] = React.useState(false);
    const [VAL_TDS, setVAL_TDS] = React.useState([]);
    const [VAR_SMVELM_ID, setVAR_SMVELM_ID] = React.useState([]);
    const [VAL_SMVELM_ID, setVAL_SMVELM_ID] = React.useState([]);
    const [VAL_SMVELM_UNIT, setVAL_SMVELM_UNIT] = React.useState([]);
    const [IsFinished, setIsFinished] = React.useState(false);
   
 
    const OnChange_smvvalue = (e) => {
        setVAL_SMVELM_UNIT(e.target.value);
    };

    const OnChange_smvselect = (e) => { 
        setVAL_SMVELM_ID(e.value);
        setVAR_SMVELM_ID(e);
    };
 
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

            fetch(`http://${apiurl}/smv/uploadtds`,sendOptions)
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

                fetch(`http://${apiurl}/smv/smvdetails/${SRFID}`)
              .then(res => res.json())
              .then(response => {
                  setVAL_TDS(response.smvdetails[0].tds_file);
                })
              .catch(error => console.log(error));
        
            })
            .catch(error => console.log(error));

        })

        

    };

    const addSMV = (e) => {
        e.preventDefault()
  
        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_SMVELM_ID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select SMV Operation',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_SMVELM_UNIT.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Time/Value for SMV Operation',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_isdecimal = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;

        if (!Reg_isdecimal.test(VAL_SMVELM_UNIT)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Decimal Value For SMV Value',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
 
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "elmid": VAL_SMVELM_ID,
                "smvtime": VAL_SMVELM_UNIT,
                
            })
        };
  
        fetch(`http://${apiurl}/smv/addsmv`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_SMVELM_ID("");
                    setVAL_SMVELM_UNIT("");
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
                    
                    fetch(`http://${apiurl}/smv/smvoperationlist/${SRFID}`)
                    .then(res => res.json())
                    .then(response => { setDSET_SMVLIST(response.smvlist); })
                    .catch(error => console.log(error));

                    fetch(`http://${apiurl}/smv/listofsmvnotin/${SRFID}`)
                    .then(res => res.json())
                    .then(response => { setDSET_SMVPENDINGLIST(response.proelement); })
                    .catch(error => console.log(error));
          
            })
            .catch(error => console.log(error));
   
    };

   
    const ConfirmDeletesmv = item => {
    
        Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this SMV Operation!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
  
                const sendOptions = {
                    method: 'delete',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"srfid" : SRFID , "smvopid" : item})
                };
  
                fetch(`http://${apiurl}/smv/deleteoperation`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Deleted!',  text: 'SMV Entry has been deleted!',  icon: 'info',  confirmButtonText: 'OK'});
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
  
                        
                        fetch(`http://${apiurl}/smv/smvoperationlist/${SRFID}`)
                        .then(res => res.json())
                        .then(response => { setDSET_SMVLIST(response.smvlist); })
                        .catch(error => console.log(error));

                        fetch(`http://${apiurl}/smv/listofsmvnotin/${SRFID}`)
                        .then(res => res.json())
                        .then(response => { setDSET_SMVPENDINGLIST(response.proelement); })
                        .catch(error => console.log(error));
          
                })
                .catch(error => console.log(error));
      
            }
        })
  
    };

    useEffect(() => {
    
      if(ISLOADING === false){

          fetch(`http://${apiurl}/smv/smvdetails/${SRFID}`)
            .then(res => res.json())
            .then(response => {
                setVAL_TDS(response.smvdetails[0].tds_file);
              })
            .catch(error => console.log(error));
            
          fetch(`http://${apiurl}/smv/smvoperationlist/${SRFID}`)
          .then(res => res.json())
          .then(response => { setDSET_SMVLIST(response.smvlist); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/smv/listofsmvnotin/${SRFID}`)
          .then(res => res.json())
          .then(response => { setDSET_SMVPENDINGLIST(response.proelement); })
          .catch(error => console.log(error));

          setISLOADING(true);

          

      }

      if(IsFinished === true)
      {
           
            const sendOptionsNextStep = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  "srfid": SRFID,
                  "proelmid": '3',
              }) };

          fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
          .then(resNextStep => resNextStep.json())
          .then(dataNextStep => 
          {
              if(dataNextStep.Type === "SUCCESS")
              { 
                    Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                      window.location = "/SMVLIST/";
                  });
              }

              if(dataNextStep.Type === "ERROR")
              {
                  Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
              } 
      
          })
          .catch(error => console.log(error));
      }

      
  }, [ISLOADING,SRFID,apiurl,IsFinished]);

    const saveascomplete = () => {
        fetch(`http://${apiurl}/smv/smvcompleted/${SRFID}/${Userid}`)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                      setIsFinished(true);
                        
                    }else if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }

                   
          
                })
                .catch(error => console.log(error));
    }

    const saveasedit = () => {
        
        Swal.fire({  title: 'Success!',  text: 'Save As Edit/Pending Mode',  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
            window.location = "/SMVLIST/";
        });
        
    };

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
            
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>TDS FILE UPLOAD (Excel File Only)</Typography>

            { VAL_TDS.length !== 0 ?
            (
                <Button component={ Link } target="_blank" to={`//${apiurl}/smv/downloadtds/` + VAL_TDS} variant="contained" style={{padding:10,margin:5}}>Download File</Button>
            ) :
            (
                <p style={{"color":"red"}}>* Please Upload your TDS (Technical Data Sheet) file.</p>
            )}

            <DropzoneArea  onChange={onDrop} showPreviewsInDropzone={false} acceptedFiles={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12']} filesLimit={1} maxWidth={"SM"} maxHeight={100} maxFileSize={15000000} dropzoneText={"Drag and drop a TDS excel file here or click here to upload your TDS file"} />
        
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>SMV OPERATION DETAILS</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"45%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>Select SMV Operation</Typography>
                    <Select id="cmbSMV" value={VAR_SMVELM_ID} variant="outlined" onChange={OnChange_smvselect} options = {DSET_SMVPENDINGLIST} />
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"45%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>SMV Value</Typography>
                    <TextField id="txtValue"  value={VAL_SMVELM_UNIT} onChange={OnChange_smvvalue} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{width:"10%"}} align="right">
                    <Button variant="contained" color="primary" style={{padding:10}} onClick={addSMV}>ADD</Button>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_SMVLIST.map((row) => (
                <TableRow key={row.smvop_id}>
                <TableCell size="small" align="right">{row.proelmname}</TableCell>
                <TableCell size="small" align="right">{row.smvop_time}</TableCell>
                <TableCell size="small" align="right">
                <IconButton aria-label="delete" 
                onClick={() => ConfirmDeletesmv(row.smvop_id)}
                variant="contained"
                color="secondary"
                size="small">
            <DeleteIcon color="error"  />
        </IconButton></TableCell>
        </TableRow>
                    ))}
        </TableBody>
        </Table>

       
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={6} md={6}>
                <Button onClick={saveascomplete} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch'}} >Finished & Complete</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch'}} >Save as Edit</Button>
            </Grid>
        </Grid>

        </Grid>

        <Grid item xs={12} md={6}>

        <GetPreviousSMV srfid={SRFID} />

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