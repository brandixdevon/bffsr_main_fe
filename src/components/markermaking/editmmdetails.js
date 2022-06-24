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
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [DSET_FABRIC_YY, setDSET_FABRIC_YY] = React.useState([]);
    const [VAL_FABRIC_ID, setVAL_FABRIC_ID] = React.useState([]);
    const [VAL_FABRIC_YY, setVAL_FABRIC_YY] = React.useState([]);
    const [VAL_FABRIC_YY_UNIT, setVAL_FABRIC_YY_UNIT] = React.useState([]);
    const [VAL_FABRIC_PERIMETER, setVAL_FABRIC_PERIMETER] = React.useState([]);
    const [VAL_FABRIC_PCS, setVAL_FABRIC_PCS] = React.useState([]);
    const [VAL_FABRIC_PLICE, setVAL_FABRIC_PLICE] = React.useState([]);
    const [VAL_REFERENCE, setVAL_REFERENCE] = React.useState([""]);
    const [VAL_CUTTERMUST, setVAL_CUTTERMUST] = React.useState([]);
    const [IsFinished, setIsFinished] = React.useState(false);
 
    const OnChange_fabric_yy = (e) => {
        setVAL_FABRIC_YY(e.target.value);
    };

    const OnChange_fabric_yy_unit = (e) => { 
        setVAL_FABRIC_YY_UNIT(e.target.value);
    };

    const OnChange_fabric_perimeter = (e) => {
        setVAL_FABRIC_PERIMETER(e.target.value);
    };

    const OnChange_fabric_pcs = (e) => {
        setVAL_FABRIC_PCS(e.target.value);
    };

    const OnChange_fabric_plice = (e) => {
        setVAL_FABRIC_PLICE(e.target.value);
    };

    const updatedata = (e) => {
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

        if(VAL_FABRIC_ID === null || VAL_FABRIC_ID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select Entry and Update.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_FABRIC_PERIMETER === null || VAL_FABRIC_PERIMETER.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Perimeter Value.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_isdecimal = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;

        if (!Reg_isdecimal.test(VAL_FABRIC_PERIMETER)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Decimal Value For Perimeter',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_FABRIC_PCS === null || VAL_FABRIC_PCS.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter PCS Value.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_isinteger = /^\d+$/;

        if (!Reg_isinteger.test(VAL_FABRIC_PCS)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For PCS',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_FABRIC_PLICE === null || VAL_FABRIC_PLICE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Plies Value.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if (!Reg_isinteger.test(VAL_FABRIC_PLICE)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Plies',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "userid": Userid,
                "fabricid": VAL_FABRIC_ID,
                "perimeter": VAL_FABRIC_PERIMETER,
                "pcs": VAL_FABRIC_PCS,
                "plice": VAL_FABRIC_PLICE,
            })
        };
  
        fetch(`http://${apiurl}/markermaking/updatefabricentry`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

                    setVAL_FABRIC_ID("");
                    setVAL_FABRIC_YY("");
                    setVAL_FABRIC_YY_UNIT("");
                    setVAL_FABRIC_PERIMETER("");
                    setVAL_FABRIC_PCS("");
                    setVAL_FABRIC_PLICE("");
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

    const gettoupdate = item =>
    {
        
        fetch(`http://${apiurl}/markermaking/getfabricdeatils/${item}`)
              .then(res => res.json())
              .then(response => {
                setVAL_FABRIC_ID(response.fabricdetails[0].fabric_id);
                setVAL_FABRIC_YY(response.fabricdetails[0].yy_value);
                setVAL_FABRIC_YY_UNIT(response.fabricdetails[0].yy_unit);
                setVAL_FABRIC_PERIMETER(response.fabricdetails[0].perimeter);
                setVAL_FABRIC_PCS(response.fabricdetails[0].pcs);
                setVAL_FABRIC_PLICE(response.fabricdetails[0].plice);
                })
              .catch(error => console.log(error));
              
        return;
    };

    const saveascomplete = () => {
        fetch(`http://${apiurl}/markermaking/mmcompleted/${SRFID}/${Userid}`)
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

    const saveasedit = () => {
        
        Swal.fire({  title: 'Success!',  text: 'Save As Edit/Pending Mode',  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
            window.location = "/MMLIST/";
        });
        
    };

    useEffect(() => {
    
      fetch(`http://${apiurl}/patternmaking/pmfabricyy/${SRFID}`)
          .then(res => res.json())
          .then(response => { setDSET_FABRIC_YY(response.fabricyy); })
          .catch(error => console.log(error));

      fetch(`http://${apiurl}/patternmaking/pmdetails/${SRFID}`)
      .then(res => res.json())
      .then(response => {
          setVAL_CUTTERMUST(response.patternmake[0].cutter_must);
          setVAL_REFERENCE(response.patternmake[0].pattern_ref);
        })
      .catch(error => console.log(error));

      if(IsFinished === true)
      {
        const sendOptionsNextStep = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": SRFID,
              "proelmid": '4',
          })};

        fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
        .then(resNextStep => resNextStep.json())
        .then(dataNextStep => 
        {
            if(dataNextStep.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                  window.location = "/MMLIST/";
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
        <Grid item xs={12} md={12}><hr/></Grid>
        <Grid item xs={12} md={8}>
            
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>FABRIC YY DETAILS FOR MARKER MAKING</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"20%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Fabric YY</Typography>
                <TextField id="txtFabricyy"  value={VAL_FABRIC_YY} onChange={OnChange_fabric_yy} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"20%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Unit</Typography>
                <TextField id="txtUnit"  value={VAL_FABRIC_YY_UNIT} onChange={OnChange_fabric_yy_unit} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Perimeter</Typography>
                <TextField id="txtPerimeter"  value={VAL_FABRIC_PERIMETER} onChange={OnChange_fabric_perimeter} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Pcs</Typography>
                <TextField id="txtPcs"  value={VAL_FABRIC_PCS} onChange={OnChange_fabric_pcs} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Plies</Typography>
                <TextField id="txtPlies"  value={VAL_FABRIC_PLICE} onChange={OnChange_fabric_plice} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom></Typography>
                <Button variant="contained" color="primary" style={{padding:10}} onClick={updatedata}>UPDATE</Button>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_FABRIC_YY.map((row) => (
                <TableRow key={row.fabric_id}>
                    <TableCell size="small" align="right">{row.yy_value}</TableCell>
                <TableCell size="small" align="right">{row.yy_unit}</TableCell>
                <TableCell size="small" align="right">{row.perimeter}</TableCell>
                <TableCell size="small" align="right">{row.pcs}</TableCell>
                <TableCell size="small" align="right">{row.plice}</TableCell>
                <TableCell size="small" align="right">
                    <Button variant="contained" style={{backgroundColor:"#cfcfcf",color:"black",padding:10}} onClick={() => gettoupdate(row.fabric_id)} >EDIT</Button>
               </TableCell>
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

        <Grid item xs={12} md={4}>
            
            
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