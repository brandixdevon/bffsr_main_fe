import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Copyright from '../../mainlayout/copyright';
import MainHeader from '../../mainlayout/mainheader';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactExport from "react-data-export";
  
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
    color:'white',
    backgroundColor:'gray',
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
    width: '100vw',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    
  },
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Allsrf() {
  
  const classes = useStyles();
  var apiurl = localStorage.getItem('session_apiurl');

  //Datasets
  const [DS_DATA, setDS_DATA] = React.useState([]);
  const [DOWNLOADDATA, setDOWNLOADDATA] = React.useState([]);

  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  
  const handleDrawerOpen = () => {
    return window.location.replace("/REPORTS_COMMON/")
  };

  const handleFromDateChange = (date) => {
       
      if(date.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct Date.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
      else
      {
        setSelectedFromDate(date);
      }
  };

  const handleToDateChange = (date) => {
       
    if(date.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct Date.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }
    else
    {
      setSelectedToDate(date);
    }
};
   
const GetData = () => {
    
  if(selectedFromDate.length <= 0)
  {
      Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select From Date.',  icon: 'error',  confirmButtonText: 'OK'});
      return;
  }

  if(selectedToDate.length <= 0)
  {
      Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select To Date.',  icon: 'error',  confirmButtonText: 'OK'});
      return;
  }

  const sendOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "fromdate": Moment(selectedFromDate).format('yyyy-MM-DD'),
        "todate": Moment(selectedToDate).format('yyyy-MM-DD')
    })
};

    fetch(`http://${apiurl}/reports/forecastcapacity`,sendOptions)
    .then(response => response.json())
    .then(data => 
    {
        if(data.Type === "SUCCESS")
        {
          setDS_DATA(data.capacity);
          setDOWNLOADDATA(data.capacity);
        }
        else if(data.Type === "ERROR")
        {
            Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
        }
        
    })
    .catch(error => console.log(error));

};


  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
      
        <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={classes.menuButton}
            >
                <ArrowBackIcon />
            </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Sample Room Management System
          </Typography>
          <MainHeader />
        </Toolbar>
      </AppBar>
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="false" className={classes.container}>
          <Grid container spacing={1}>
          
            <Grid item xs={12} md={12}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:1}} gutterBottom>SAMPLE ROOM CUSTOMER CATEGORY WISE CAPACITY USAGE - FORECAST</Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Select From Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
              <KeyboardDatePicker
                margin="normal"
                id="dtpRequire"
                format="yyyy/MMM/dd"
                value={selectedFromDate}
                onChange={handleFromDateChange}
                KeyboardButtonProps={{ 'aria-label': 'change date',}}
                variant="outlined" 
                style={{width:"100%"}} 
                size="small"
              />

              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Select To Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
              <KeyboardDatePicker
                margin="normal"
                id="dtpRequire"
                format="yyyy/MMM/dd"
                value={selectedToDate}
                onChange={handleToDateChange}
                KeyboardButtonProps={{ 'aria-label': 'change date',}}
                variant="outlined" 
                style={{width:"100%"}} 
                size="small"
              />

              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} md={3}>
            <Button variant="contained" color="secondary" style={{padding:10,margin:5,backgroundColor:"#5d29ab"}} onClick={GetData}>GET DATA</Button>

            </Grid>

            <Grid item xs={6} md={3}>

            <ExcelFile filename={"CAPACITY_DETAILS_"+ new Date().toISOString().slice(0,20)} fileExtension="xlsx" element={<Button variant="contained" style={{color:"white",backgroundColor:"green"}} >Download Excel File</Button>}>
                <ExcelSheet data={DOWNLOADDATA} name="CUSTOMER_WISE_CAPACITY_DETAILS">
                    <ExcelColumn label="CUSTOMER CATEGORY" value="cus_name"/>
                    <ExcelColumn label="SRF COUNT" value="count"/>
                </ExcelSheet>
            </ExcelFile>

            </Grid>

          </Grid>
          
          <Grid container spacing={1}>

              <Grid item xs={12} sm={12} md={12} style={{padding:2,backgroundColor:"#fcfdff"}}>

              <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{width:"80%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>CUSTOMER CATEGORY NAME</Typography>
                    </TableCell>
                    <TableCell size="small" style={{width:"20%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>SRF COUNT</Typography>
                    </TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
            {DS_DATA.map((row) => (
                <TableRow key={row.srfdoc}>
                    <TableCell size="small" align="left">{row.cus_name}</TableCell>
                    <TableCell size="small" align="left">{row.count}</TableCell>
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