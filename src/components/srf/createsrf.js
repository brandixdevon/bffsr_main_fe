import React, { useEffect }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import { blue, green } from '@material-ui/core/colors';
import Swal from 'sweetalert2'
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import Moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';

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
  square: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    fontSize:12,
    height:25,
    width:25,
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));


export default function EnhancedTable() {
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

  const [SRFID, setSRFID] = React.useState([]);
  const [DSET_CUSTOMERS, setDSET_CUSTOMERS] = React.useState([]);
  const [DSET_SAMPLESTAGE, setDSET_SAMPLESTAGE] = React.useState([]);
  const [DSET_ALLROUTES, setDSET_ALLROUTES] = React.useState([]);
  const [DSET_ROUTESMAP, setDSET_ROUTESMAP] = React.useState([]);

  //Form Parameters
  const [VAL_CUSID, setVAL_CUSID] = React.useState([]);
  const [VAL_STYLE, setVAL_STYLE] = React.useState([]);
  const [VAL_STYLEDESC, setVAL_STYLEDESC] = React.useState([]);
  const [VAL_FLOORSET, setVAL_FLOORSET] = React.useState([]);
  const [VAL_SAMPLESTAGE, setVAL_SAMPLESTAGE] = React.useState([]);
  const [VAL_ROUTE, setVAL_ROUTE] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
   
  const OnChange_customer = (e) => {
    setVAL_CUSID(JSON.stringify(e.value));

    var cus_id = e.value;
    fetch(`http://${apiurl}/master/getsamplestagebycustomer/${cus_id}`)
      .then(res => res.json())
      .then(response => {
        setDSET_SAMPLESTAGE(response.samplestages);
      })
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

  };

  const OnChange_style = (e) => {
    setVAL_STYLE(e.target.value);
  };

  const OnChange_styledesc = (e) => {
    setVAL_STYLEDESC(e.target.value);
  };

  const OnChange_floorset = (e) => {
    setVAL_FLOORSET(e.target.value);
  };

  const OnChange_samplestage = (e) => {
    setVAL_SAMPLESTAGE(JSON.stringify(e.value));
  };

  const OnChange_route = (e) => {
    setVAL_ROUTE(JSON.stringify(e.value));

    var route_id = e.value;
    fetch(`http://${apiurl}/productroute/routemapping/${route_id}`)
      .then(res => res.json())
      .then(response => {
        setDSET_ROUTESMAP(response.routemap);
      })
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if(VAL_CUSID.length <= 0)
    {
      Swal.fire({  title: 'Error!',  text: 'Please Select Customer',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }
    
    if(VAL_STYLE.length <= 1)
    {
      Swal.fire({  title: 'Error!',  text: 'Please Enter Style Name',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }
    
    if(VAL_FLOORSET.length <= 1)
    {
      Swal.fire({  title: 'Error!',  text: 'Please Enter Floorset/Identifire',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }
    
    if(VAL_SAMPLESTAGE.length <= 0)
    {
      Swal.fire({  title: 'Error!',  text: 'Please Select Sample Stage',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }
    
    if(VAL_ROUTE.length <= 0)
    {
      Swal.fire({  title: 'Error!',  text: 'Please Select Product Route',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }
    
    if(selectedDate.length <= 7)
    {
      Swal.fire({  title: 'Error!',  text: 'Please Select Date',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }
    
    var CurrentDate = new Date();
    var GivenDate = new Date(selectedDate);
    
    if(GivenDate < CurrentDate){
      Swal.fire({  title: 'Error!',  text: 'Current date is greater than the SRF Request date.',  icon: 'error',  confirmButtonText: 'OK'});
      return;
    }

    if(VAL_STYLEDESC.length <= 0)
    {
      setVAL_STYLEDESC("");
    }

    const sendOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "customercategory": VAL_CUSID,
        "srfstyle": VAL_STYLE,
        "srfstyledesc":VAL_STYLEDESC,
        "floorset": VAL_FLOORSET,
        "samplestage": VAL_SAMPLESTAGE,
        "requestdate": Moment(GivenDate).format('yyyy-MM-DD'),
        "productroute" : VAL_ROUTE,
        "createby" : Userid
      })
  };

  fetch(`http://${apiurl}/srf/createsrf`,sendOptions)
      .then(response => response.json())
      .then(data => setSRFID(data.Newid))
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

  };

   
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderRedirect = () => {
    if (SRFID.length === 10 ) {
      return <Redirect to={"/srfedit/" + SRFID} />
    }
  }
   useEffect(() => {

    fetch(`http://${apiurl}/customer/userassigncuslist/${Userid}`)
      .then(res => res.json())
      .then(response => {
        setDSET_CUSTOMERS(response.syscustomers);
      })
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

      fetch(`http://${apiurl}/master/getroutes`)
      .then(res => res.json())
      .then(response => {
        setDSET_ALLROUTES(response.productrouts);
      })
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

  }, [Userid,apiurl]);

  return (
    <div className={classes.root}>
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
        <Container  maxWidth={false} className={classes.container}>
          <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            
            <Grid item xs={12} md={6}>
              
            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Customer Category</Typography>
            <Select id="cmbCustomer" variant="outlined" onChange={OnChange_customer} options = {DSET_CUSTOMERS} />
            
            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Style No</Typography>
            <TextField id="txtStyle" onChange={OnChange_style}  variant="outlined" style={{width:"100%"}} size="small"/>  

            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Style Description</Typography>
            <TextField
              id="txtStyleDesc"
              label=""
              multiline
              rows={6}
              defaultValue=""
              variant="outlined"
              style={{width:"100%"}}
              size="small"
              onChange={OnChange_styledesc}
            />

            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Floorset/Identifire</Typography>
            <TextField id="txtFloorset" onChange={OnChange_floorset} variant="outlined" style={{width:"100%"}} size="small"/>

            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Sample Stage</Typography>
            <Select id="cmbSampleStage" variant="outlined" onChange={OnChange_samplestage} options = {DSET_SAMPLESTAGE} />

            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Product Route</Typography>
            <Select id="cmbRoute" variant="outlined" onChange={OnChange_route} options = {DSET_ALLROUTES} />

            <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Sample Required Date</Typography>
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

            <Button variant="contained" color="primary" onClick={handleSubmit}>Create New SRF ID</Button>

            </Grid>

            <Grid px={4} item xs={12} md={6}>
              <p style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Selected Route Element Mapping</p>

              <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'small'} aria-label="enhanced table" >
            <TableHead>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"10%",fontSize:12}} align="left"><b>SEQ.</b></TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"85%",fontSize:12}} align="left"><b>ELEMENT NAME</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {DSET_ROUTESMAP.map(itemselect =>
              <TableRow>
                <TableCell align="left">
                  <Avatar variant="square" className={classes.square}>
                    {itemselect.hierarchy}
                  </Avatar> 
                </TableCell>
                <TableCell align="left" style={{fontSize:12,color:"#1D2951",fontWeight:600,}}>{itemselect.proelmname}</TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TableContainer>

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
