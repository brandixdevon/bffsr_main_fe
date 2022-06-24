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
//import Select from 'react-select';
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
    const [DSET_TRIM_YY, setDSET_TRIM_YY] = React.useState([]);
    const [DSET_FABRIC_YY, setDSET_FABRIC_YY] = React.useState([]);
    const [ISLOADING, setISLOADING] = React.useState(false);
    const [VAL_CUTTERMUST, setVAL_CUTTERMUST] = React.useState([]);
    const [VAL_TRIM_YY, setVAL_TRIM_YY] = React.useState([]);
    const [VAL_TRIM_YY_UNIT, setVAL_TRIM_YY_UNIT] = React.useState([]);
    const [VAL_FABRIC_YY, setVAL_FABRIC_YY] = React.useState([]);
    const [VAL_FABRIC_YY_UNIT, setVAL_FABRIC_YY_UNIT] = React.useState([]);
    const [VAL_REFERENCE, setVAL_REFERENCE] = React.useState([""]);
    const [VAL_REFERENCE_CHANGE, setVAL_REFERENCE_CHANGE] = React.useState(false);

    const [IsFinished, setIsFinished] = React.useState(false);
 
    const OnChange_trim_yy = (e) => {
        setVAL_TRIM_YY(e.target.value);
    };

    const OnChange_trim_yy_uint = (e) => { 
        setVAL_TRIM_YY_UNIT(e.target.value);
    };

    const OnChange_fabric_yy = (e) => {
        setVAL_FABRIC_YY(e.target.value);
    };

    const OnChange_fabric_yy_uint = (e) => { 
        setVAL_FABRIC_YY_UNIT(e.target.value);
    };

    const OnChange_reference = (e) => {
        setVAL_REFERENCE(e.target.value);
        setVAL_REFERENCE_CHANGE(true);
    };

    const updatedata = async (e) => {
        e.preventDefault()
  
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

        if (VAL_REFERENCE === null) {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Pattern reference',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_REFERENCE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Pattern reference',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
     
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "userid": Userid,
                "patternref": VAL_REFERENCE
            })
        };
  
        await fetch(`http://${apiurl}/patternmaking/pmreferance`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: 'Pattern Reference Update Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
                fetch(`http://${apiurl}/patternmaking/pmdetails/${SRFID}`)
              .then(res => res.json())
              .then(response => {
                  setVAL_CUTTERMUST(response.patternmake[0].cutter_must);
                  setVAL_REFERENCE(response.patternmake[0].pattern_ref);
                  setVAL_REFERENCE_CHANGE(false);
                })
              .catch(error => console.log(error));
          
            })
            .catch(error => console.log(error));
  
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

    const onDrop = async (files) => {
        // POST to a test endpoint for demo purposes
        await files.forEach(file => {
      
            const formData = new FormData();

            
            formData.append('uploadFile', file);
            formData.append('srfid', SRFID);

            const sendOptions = {
                method: 'POST',
                body: formData
            };

            fetch(`http://${apiurl}/patternmaking/uploadcuttermust`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    Swal.fire({  title: 'Success!',  text: 'New File Upload Success.!',  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/patternmaking/pmdetails/${SRFID}`)
              .then(res => res.json())
              .then(response => {
                  setVAL_CUTTERMUST(response.patternmake[0].cutter_must);
                  setVAL_REFERENCE(response.patternmake[0].pattern_ref);
                })
              .catch(error => console.log(error));
        
            })
            .catch(error => console.log(error));

        })

        

    };

    const addFabric = async (e) => {
        e.preventDefault()
  
        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_FABRIC_YY.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Fabric YY Value',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        
        if(VAL_FABRIC_YY_UNIT.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Fabric YY Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_isdecimal = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;

        if (!Reg_isdecimal.test(VAL_FABRIC_YY_UNIT)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Decimal Value For Fabric YY Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

 
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "userid": Userid,
                "fabricvalue": VAL_FABRIC_YY,
                "fabricunit": VAL_FABRIC_YY_UNIT,
                
            })
        };
  
        await fetch(`http://${apiurl}/patternmaking/addfabric`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_FABRIC_YY("");
                    setVAL_FABRIC_YY_UNIT("");
                    Swal.fire({  title: 'Success!',  text: 'Fabric Added Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
                fetch(`http://${apiurl}/patternmaking/pmfabricyy/${SRFID}`)
                .then(res => res.json())
                .then(response => { setDSET_FABRIC_YY(response.fabricyy); })
                .catch(error => console.log(error));
          
            })
            .catch(error => console.log(error));
   
    };

    const addTrims = async (e) => {
        e.preventDefault()
  
        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_TRIM_YY.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Trim YY Value',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_TRIM_YY_UNIT.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Trim YY Unit',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
 
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "userid": Userid,
                "trimvalue": VAL_TRIM_YY,
                "trimunit": VAL_TRIM_YY_UNIT,
                
            })
        };
  
        await fetch(`http://${apiurl}/patternmaking/addtrims`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_TRIM_YY("");
                    setVAL_TRIM_YY_UNIT("");
                    Swal.fire({  title: 'Success!',  text: 'Trim Added Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
                fetch(`http://${apiurl}/patternmaking/pmtrimyy/${SRFID}`)
                .then(res => res.json())
                .then(response => { setDSET_TRIM_YY(response.trimyy); })
                .catch(error => console.log(error));
    
          
            })
            .catch(error => console.log(error));
   
    };


    const ConfirmDeleteFabric = async item => {
    
        await Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this Fabric Item!",
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
                    body: JSON.stringify({"srfid" : SRFID , "fabricyyid" : item})
                };
  
                fetch(`http://${apiurl}/patternmaking/deletefabric`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Deleted!',  text: 'Fabric Entry has been deleted!',  icon: 'info',  confirmButtonText: 'OK'});
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
  
                    fetch(`http://${apiurl}/patternmaking/pmfabricyy/${SRFID}`)
                    .then(res => res.json())
                    .then(response => { setDSET_FABRIC_YY(response.fabricyy); })
                    .catch(error => console.log(error));
          
                })
                .catch(error => console.log(error));
      
            }
        })
  
    };

    const ConfirmDeleteTrim = async item => {
    
        await Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this Trim Item!",
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
                    body: JSON.stringify({"srfid" : SRFID , "trimyyid" : item})
                };
  
                fetch(`http://${apiurl}/patternmaking/deletetrims`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Deleted!',  text: 'Trim Entry has been deleted!',  icon: 'info',  confirmButtonText: 'OK'});
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
  
                    fetch(`http://${apiurl}/patternmaking/pmtrimyy/${SRFID}`)
                    .then(res => res.json())
                    .then(response => { setDSET_TRIM_YY(response.trimyy); })
                    .catch(error => console.log(error));
          
                })
                .catch(error => console.log(error));
      
            }
        })
  
    };

    const saveascomplete = async () => {
        
        await fetch(`http://${apiurl}/patternmaking/pmcompleted/${SRFID}/${Userid}`)
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
                .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});} );
    }

    const saveasedit = () => {
        
        Swal.fire({  title: 'Success!',  text: 'Save As Edit/Pending Mode',  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
            window.location = "/PMLIST/";
        });
        
    };

    useEffect(() => {
    
        if(ISLOADING === false){

            fetch(`http://${apiurl}/patternmaking/pmdetails/${SRFID}`)
              .then(res => res.json())
              .then(response => {
                  setVAL_CUTTERMUST(response.patternmake[0].cutter_must);
                  setVAL_REFERENCE(response.patternmake[0].pattern_ref);
                })
              .catch(error => console.log(error));
              
            fetch(`http://${apiurl}/patternmaking/pmtrimyy/${SRFID}`)
            .then(res => res.json())
            .then(response => { setDSET_TRIM_YY(response.trimyy); })
            .catch(error => console.log(error));

            fetch(`http://${apiurl}/patternmaking/pmfabricyy/${SRFID}`)
            .then(res => res.json())
            .then(response => { setDSET_FABRIC_YY(response.fabricyy); })
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
                    "proelmid": '2',
                })
            };

            fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
            .then(resNextStep => resNextStep.json())
            .then(dataNextStep => 
            {
                if(dataNextStep.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                        window.location = "/PMLIST/";
                    });
                }

                if(dataNextStep.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                } 
        
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});} );
        }

        
    }, [ISLOADING,SRFID,apiurl,IsFinished]);


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
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>PATTERN REFERENCE</Typography>
            <TextField id="txtColors"  value={VAL_REFERENCE} onChange={OnChange_reference} variant="outlined" style={{width:"100%"}} size="small"/>
            { VAL_REFERENCE_CHANGE === true ?
            ( <p style={{"color":"red"}}>** Please click on button to save your reference number.</p> ) : ( <></> )}
            <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={updatedata}>UPDATE REFERENCE</Button>
        
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>CUTTER MUST (Excel File Only)</Typography>

            { VAL_CUTTERMUST.length !== 0 ?
            (
                <Button component={ Link } target="_blank" to={`//${apiurl}/patternmaking/downloadcm/` + VAL_CUTTERMUST} variant="contained" style={{padding:10,margin:5}}>Download File</Button>
            ) :
            (
                <p style={{"color":"red"}}>* Please Upload your cutter must file.</p>
            )}

            <DropzoneArea  onChange={onDrop} showPreviewsInDropzone={false} acceptedFiles={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12']} filesLimit={1} maxWidth={"SM"} maxHeight={100} maxFileSize={15000000} dropzoneText={"Drag and drop a file here or click here to upload your cutter must file"} />
        
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>FABRIC YY DETAILS</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"45%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Fabric YY</Typography>
                <TextField id="txtColors"  value={VAL_FABRIC_YY} onChange={OnChange_fabric_yy} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"45%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Qty in Yard</Typography>
                <TextField id="txtColors"  value={VAL_FABRIC_YY_UNIT} onChange={OnChange_fabric_yy_uint} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{width:"10%"}} align="right">
                <Button variant="contained" color="primary" style={{padding:10}} onClick={addFabric}>ADD</Button>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_FABRIC_YY.map((row) => (
                <TableRow key={row.fabric_id}>
                    <TableCell size="small" align="right">{row.yy_value}</TableCell>
                <TableCell size="small" align="right">{row.yy_unit}</TableCell>
                <TableCell size="small" align="right">
                <IconButton aria-label="delete" 
                onClick={() => ConfirmDeleteFabric(row.fabric_id)}
                variant="contained"
                color="secondary"
                size="small">
            <DeleteIcon color="error"  />
        </IconButton></TableCell>
        </TableRow>
                    ))}
        </TableBody>
        </Table>

        <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>TRIMS YY DETAILS</Typography>
  
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{"font-weight":800,width:"45%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>Trim YY</Typography>
                    <TextField id="txtColors" value={VAL_TRIM_YY} onChange={OnChange_trim_yy} variant="outlined" style={{width:"100%"}} size="small"/>
                    </TableCell>
                    <TableCell size="small" style={{"font-weight":800,width:"45%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>Qty With Unit</Typography>
                    <TextField id="txtColors" value={VAL_TRIM_YY_UNIT} onChange={OnChange_trim_yy_uint} variant="outlined" style={{width:"100%"}} size="small"/>
                    </TableCell>
                    <TableCell size="small" style={{width:"10%"}} align="right">
                    <Button variant="contained" color="primary" style={{padding:10}} onClick={addTrims}>ADD</Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_TRIM_YY.map((row) => (
                <TableRow key={row.trim_id}>
                <TableCell size="small" align="right">{row.yy_value}</TableCell>
                <TableCell size="small" align="right">{row.yy_unit}</TableCell>
                <TableCell size="small" align="right">
                <IconButton aria-label="delete" 
                onClick={() => ConfirmDeleteTrim(row.trim_id)}
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