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
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import GetSideView from '../srf/getsrfsideview';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
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
    const [VAL_TDS, setVAL_TDS] = React.useState([]);
    const [DSET_SMVLIST, setDSET_SMVLIST] = React.useState([]);
    var Userid = localStorage.getItem('session_userid');
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDateTNA, setSelectedDateTNA] = React.useState(new Date());
    const [DSET_PROELM, setDSET_PROELM] = React.useState([]);
    const [VAR_PROELM, setVAR_PROELM] = React.useState([]);
    const [VAL_PROELM, setVAL_PROELM] = React.useState([]);
    const [DSET_TNALIST, setDSET_TNALIST] = React.useState([]);
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
        
        window.location = "/PLNLIST/";
        
    };

    const handleDateChange = (date) => {
       
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

        if(date.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct Date.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": SRFID,
              "userid": Userid,
              "plandate": Moment(date).format('yyyy-MM-DD')
          })
      };

          fetch(`http://${apiurl}/plan/changeplandate`,sendOptions)
          .then(response => response.json())
          .then(data => 
          {
              if(data.Type === "SUCCESS")
              {
                fetch(`http://${apiurl}/plan/srfplandate/${SRFID}`)
                .then(res => res.json())
                .then(response => { setSelectedDate(response.srfplndate); })
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

    const handleTNADateChange = (date) => {
       
      setSelectedDateTNA(date);

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
            text: "Do You Complete this Planning Process.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, completed!'
        }).then((result) => {
            if (result.value) {
   
                fetch(`http://${apiurl}/plan/plncompleted/${SRFID}/${Userid}`)
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

    const AddToTna = () => {
    
      if(SRFID.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }

      if(VAL_PROELM.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select Action In TnA List.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }

      if(selectedDateTNA.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select Date for TnA.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
  
      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "elmid": VAL_PROELM,
            "plandate": Moment(selectedDateTNA).format('yyyy-MM-DD')
        })
    };

        fetch(`http://${apiurl}/plan/addplntna`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            {
              fetch(`http://${apiurl}/plan/getplantna/${SRFID}`)
            .then(res => res.json())
            .then(response => { setDSET_TNALIST(response.plantna); })
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

  const handleConfirmDeleteTna = item => {
    
    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want to Remove this TnA Entry!",
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
                body: JSON.stringify({"srfid" : SRFID , "tnaid" : item})
            };

            fetch(`http://${apiurl}/plan/deletetna`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    Swal.fire({  title: 'Deleted!',  text: 'TnA Entry has been deleted!',  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/plan/getplantna/${SRFID}`)
            .then(res => res.json())
            .then(response => { setDSET_TNALIST(response.plantna); })
            .catch(error => console.log(error));
      
            })
            .catch(error => console.log(error));
  
        }
    })

};

    const OnChange_proelm = (e) => { 
      setVAL_PROELM(JSON.stringify(e.value));
      setVAR_PROELM(e);
  };

  useEffect(() => {
    
    fetch(`http://${apiurl}/smv/smvdetails/${SRFID}`)
    .then(res => res.json())
    .then(response => { setVAL_TDS(response.smvdetails[0].tds_file); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/smv/smvoperationlist/${SRFID}`)
    .then(res => res.json())
    .then(response => { setDSET_SMVLIST(response.smvlist); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/plan/routeelements/${SRFID}`)
    .then(res => res.json())
    .then(response => { setDSET_PROELM(response.elements); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/plan/getplantna/${SRFID}`)
    .then(res => res.json())
    .then(response => { setDSET_TNALIST(response.plantna); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/plan/srfplandate/${SRFID}`)
    .then(res => res.json())
    .then(response => { setSelectedDate(response.srfplndate); })
    .catch(error => console.log(error));

    if(IsFinished === true)
    {
      const sendOptionsNextStep = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "proelmid": '5',
        })};

      fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
      .then(resNextStep => resNextStep.json())
      .then(dataNextStep => 
      {
          if(dataNextStep.Type === "SUCCESS")
          { 
              Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                window.location = "/PLNLIST/";
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
            { VAL_TDS.length !== 0 ?
                (
                    <Button component={ Link } target="_blank" to={`//${apiurl}/smv/downloadtds/` + VAL_TDS} variant="contained" style={{padding:10,margin:5}}>Click Here To Download TDS File</Button>
                ) :
                (
                    <p style={{"color":"red"}}>* TDS (Technical Data Sheet) file not founded.</p>
                )}
            </Grid>
            <Grid item xs={12} md={12}>

            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{width:"70%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>SMV Operation</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"30%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>SMV Value</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_SMVLIST.map((row) => (
                <TableRow key={row.smvop_id}>
                    <TableCell size="small" align="left">{row.proelmname}</TableCell>
                    <TableCell size="small" align="left">{row.smvop_time}</TableCell>
                </TableRow>
                    ))}
        </TableBody>
        </Table>

            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Target Sample Delivery Date  </Typography>
              { JSON.stringify(selectedDate).length > 8 ?
                (
                  <p style={{"color":"Green"}}>Sample Delivery Date Is - {`${Moment(selectedDate).format('LL')}`}</p>
                ) :
                (
                    <p style={{"color":"red"}}>* Please Select Planning Date (Sample Delivery Date).</p>
                )}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
              <KeyboardDatePicker
                margin="normal"
                minDate={Date()}
                id="dtpRequire"
                format="yyyy/MMM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{ 'aria-label': 'change date',}}
                variant="outlined" 
                style={{width:"100%"}} 
                size="small"
              />

              </MuiPickersUtilsProvider>

              <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Select and Add to TNA List  </Typography>
              <Select id="cmbSampleStage" value={VAR_PROELM} variant="outlined" onChange={OnChange_proelm} options = {DSET_PROELM} />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
              <KeyboardDatePicker
                margin="normal"
                minDate={Date()}
                id="dtpRequire"
                format="yyyy/MMM/dd"
                value={selectedDateTNA}
                onChange={handleTNADateChange}
                KeyboardButtonProps={{ 'aria-label': 'change date',}}
                variant="outlined" 
                style={{width:"100%"}} 
                size="small"
              />

              </MuiPickersUtilsProvider>

              <Button variant="contained" color="secondary" style={{padding:10,margin:5,backgroundColor:"#5d29ab"}} onClick={AddToTna}>ADD TO TNA</Button>

              <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{width:"70%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Action Item</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"30%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>TnA Date</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"30%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>#</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_TNALIST.map((row) => (
                <TableRow key={row.plntnaid}>
                    <TableCell size="small" align="left">{row.proelmname}</TableCell>
                    <TableCell size="small" align="left">{Moment(row.tnadate).format('LL')}</TableCell>
                    <TableCell size="small" align="left">
                    <IconButton aria-label="delete" 
                      onClick={() => handleConfirmDeleteTna(row.plntnaid)}
                      variant="contained"
                      color="secondary"
                      size="small">
                      <DeleteIcon color="error"  />
                    </IconButton>
                    </TableCell>
                </TableRow>
                    ))}
        </TableBody>
        </Table>

            </Grid>
            <Grid item xs={6} md={6}>
            <Button variant="contained" color="secondary" style={{padding:10,margin:5}} onClick={ConfirmUpdate}>FINISHED & COMPLETE</Button>
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