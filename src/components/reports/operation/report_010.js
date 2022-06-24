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
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';
import { Link } from 'react-router-dom';
  
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
    return window.location.replace("/REPORTS_OPERATION/")
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
   
const GetData = async () => {
    
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

    await fetch(`http://${apiurl}/reports/sampleroomoveralldata`,sendOptions)
    .then(response => response.json())
    .then(data => 
    {
        if(data.Type === "SUCCESS")
        {
          setDS_DATA(data.alldata);
          setDOWNLOADDATA(data.alldata);

          Swal.fire({  title: 'Success!',  text: 'Data Loading Successfully.!',  icon: 'info',  confirmButtonText: 'OK'});
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
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:1}} gutterBottom>SAMPLE ROOM SRF LIST CYCLE TIME OVERALL SUMMARY REPORT</Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Select From Date (SRF Requested Date)</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
              <KeyboardDatePicker
                margin="normal"
                maxDate={Date()}
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
              <Typography variant="subtitle2" style={{"font-weight":"bold"}} gutterBottom>Select To Date (SRF Requested Date)</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
              <KeyboardDatePicker
                margin="normal"
                maxDate={Date()}
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

            <ExcelFile filename={"SRF_OVERALL_DETAILS_"+ new Date().toISOString().slice(0,20)} fileExtension="xlsx" element={<Button variant="contained" style={{color:"white",backgroundColor:"green"}} >Download Excel File</Button>}>
                <ExcelSheet data={DOWNLOADDATA} name="SRF_OVERALL_DETAILS">
                    <ExcelColumn label="SRFID" value="srfdoc"/>
                    <ExcelColumn label="ROUTE" value="routename"/>
                    <ExcelColumn label="CUSTOMER" value="cus_name"/>
                    <ExcelColumn label="FLOORSET" value="srf_floorset"/>
                    <ExcelColumn label="STYLE" value="srf_style"/>
                    <ExcelColumn label="DESCRIPTION" value="srf_styledesc"/>
                    <ExcelColumn label="SAMPLE TYPE" value="sam_stage_title"/>
                    <ExcelColumn label="DESCRIPTION" value="srf_styledesc"/>
                    <ExcelColumn label="SAMPLE TYPE" value="sam_stage_title"/>
                    <ExcelColumn label="COLOR" value="colors"/>
                    <ExcelColumn label="SIZE" value="req_sizes"/>
                    <ExcelColumn label="REQ. QTY" value="req_qty"/>
                    <ExcelColumn label="CURRENT STATUS" value="mode_name"/>
                    <ExcelColumn label="SRF OWNER" value="username"/>
                    <ExcelColumn label="SEWING FIRST SMV" value="smv_sewfirst"/>
                    <ExcelColumn label="SEWING SECOND SMV" value="smv_sewsecond"/>
                    <ExcelColumn label="SEWING THIRD SMV" value="smv_sewthird"/>
                    <ExcelColumn label="SRF RAISED" value="srf_raisedate"/>
                    <ExcelColumn label="PATTERN RELEASE START" value="pm_start_date"/>
                    <ExcelColumn label="PATTERN RELEASE END" value="pm_end_date"/>
                    <ExcelColumn label="PATTERN RELEASE STATUS" value="pm_status"/>
                    <ExcelColumn label="SMV START" value="smv_start_date"/>
                    <ExcelColumn label="SMV END" value="smv_end_date"/>
                    <ExcelColumn label="SMV STATUS" value="smv_status"/>
                    <ExcelColumn label="PLACEMENT BOARD START" value="pb_start_date"/>
                    <ExcelColumn label="PLACEMENT BOARD END" value="pb_end_date"/>
                    <ExcelColumn label="PLACEMENT BOARD STATUS" value="pb_status"/>
                    <ExcelColumn label="MARKER MAKING START" value="mm_start_date"/>
                    <ExcelColumn label="MARKER MAKING END" value="mm_end_date"/>
                    <ExcelColumn label="MARKER MAKING STATUS" value="mm_status"/>
                    <ExcelColumn label="PLANNING START" value="pln_start_date"/>
                    <ExcelColumn label="PLANNING END" value="pln_end_date"/>
                    <ExcelColumn label="PLANNING STATUS" value="pln_status"/>
                    <ExcelColumn label="PLANNING COMMITTED" value="srf_plandate"/>
                    <ExcelColumn label="SRF REQUESTED DATE" value="srf_reqdate"/>
                    <ExcelColumn label="STORES START" value="st_start_date"/>
                    <ExcelColumn label="STORES END" value="st_end_date"/>
                    <ExcelColumn label="STORES STATUS" value="st_status"/>
                    <ExcelColumn label="CUTTING START" value="cut_start_date"/>
                    <ExcelColumn label="CUTTING END" value="cut_end_date"/>
                    <ExcelColumn label="CUTTING STATUS" value="cut_status"/>
                    <ExcelColumn label="PERIMETER" value="perimeter"/>
                    <ExcelColumn label="PLY" value="plice"/>
                    <ExcelColumn label="PCS" value="pcs"/>
                    <ExcelColumn label="CUTTING METHOD" value="cut_method"/>
                    <ExcelColumn label="RECUTTING START" value="recut_start_date"/>
                    <ExcelColumn label="RECUTTING END" value="recut_end_date"/>
                    <ExcelColumn label="RECUTTING STATUS" value="recut_status"/>
                    <ExcelColumn label="SEW1 PACKAGE PROCESS START" value="sew1_pkg_start"/>
                    <ExcelColumn label="SEW1 SEWING START" value="sew1_start_date"/>
                    <ExcelColumn label="SEW1 SEWING END" value="sew1_end_date"/>
                    <ExcelColumn label="SEW1 STATUS" value="sew1_status"/>
                    <ExcelColumn label="SEW1 QC START" value="qc1_start_date"/>
                    <ExcelColumn label="SEW1 QC END" value="qc1_end_date"/>
                    <ExcelColumn label="SEW1 QC STATUS" value="qc1_status"/>
                    <ExcelColumn label="SEW2 PACKAGE PROCESS START" value="sew2_pkg_start"/>
                    <ExcelColumn label="SEW2 SEWING START" value="sew2_start_date"/>
                    <ExcelColumn label="SEW2 SEWING END" value="sew2_end_date"/>
                    <ExcelColumn label="SEW2 STATUS" value="sew2_status"/>
                    <ExcelColumn label="SEW2 QC START" value="qc2_start_date"/>
                    <ExcelColumn label="SEW2 QC END" value="qc2_end_date"/>
                    <ExcelColumn label="SEW2 QC STATUS" value="qc2_status"/>
                    <ExcelColumn label="SEW3 PACKAGE PROCESS START" value="sew3_pkg_start"/>
                    <ExcelColumn label="SEW3 SEWING START" value="sew3_start_date"/>
                    <ExcelColumn label="SEW3 SEWING END" value="sew3_end_date"/>
                    <ExcelColumn label="SEW3 STATUS" value="sew3_status"/>
                    <ExcelColumn label="SEW3 QC START" value="qc3_start_date"/>
                    <ExcelColumn label="SEW3 QC END" value="qc3_end_date"/>
                    <ExcelColumn label="SEW3 QC STATUS" value="qc3_status"/>
                    <ExcelColumn label="EMBELLISHMENT START" value="emb_start_date"/>
                    <ExcelColumn label="EMBELLISHMENT END" value="emb_end_date"/>
                    <ExcelColumn label="EMBELLISHMENT GATE PASS" value="emb_gatepass"/>
                    <ExcelColumn label="EMBELLISHMENT STATUS" value="emb_status"/>
                    <ExcelColumn label="EMB. LAST RECEIVED" value="emb_rec_date"/>
                    <ExcelColumn label="DYE-WASH START" value="dw_start_date"/>
                    <ExcelColumn label="DYE-WASH END" value="dw_end_date"/>
                    <ExcelColumn label="DYE-WASH GATE PASS" value="dw_gatepass"/>
                    <ExcelColumn label="DYE-WASH STATUS" value="dow_status"/>
                    <ExcelColumn label="DYE-WASH LAST RECEIVED" value="dw_rec_date"/>
                    <ExcelColumn label="DISPATCH START" value="dis_start_date"/>
                    <ExcelColumn label="DISPATCH END" value="dis_end_date"/>
                    <ExcelColumn label="DISPATCH STATUS" value="dis_status"/>
                </ExcelSheet>
            </ExcelFile>

            </Grid>

          </Grid>
          
          <Grid container spacing={1}>

              <Grid item xs={12} sm={12} md={12} style={{padding:2,backgroundColor:"#fcfdff"}}>
              <Box style={{maxHeight: '65vh',overflow: 'auto', maxWidth: '100vw'}}>


              <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                    <TableCell size="small" style={{width:"5%"}} align="left">
                        <Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>#</Typography>
                    </TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SRFID</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>ROUTE</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>CUSTOMER</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>FLOORSET</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>STYLE</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DESCRIPTION</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SAMPLE TYPE</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DESCRIPTION</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SAMPLE TYPE</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>COLOR</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SIZE</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>REQ. QTY</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>CURRENT STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SRF OWNER</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEWING FIRST SMV</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEWING SECOND SMV</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEWING THIRD SMV</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SRF RAISED</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PATTERN RELEASE START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PATTERN RELEASE END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PATTERN RELEASE STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SMV START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SMV END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SMV STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLACEMENT BOARD START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLACEMENT BOARD END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLACEMENT BOARD STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>MARKER MAKING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>MARKER MAKING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>MARKER MAKING STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLANNING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLANNING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLANNING STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLANNING COMMITTED</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SRF REQUESTED DATE</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>STORES START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>STORES END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>STORES STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>CUTTING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>CUTTING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>CUTTING STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PERIMETER</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PLY</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>PCS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>CUTTING METHOD</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>RECUTTING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>RECUTTING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>RECUTTING STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 PACKAGE PROCESS START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 SEWING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 SEWING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 QC START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 QC END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW1 QC STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 PACKAGE PROCESS START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 SEWING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 SEWING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 QC START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 QC END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW2 QC STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 PACKAGE PROCESS START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 SEWING START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 SEWING END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 QC START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 QC END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>SEW3 QC STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>EMBELLISHMENT START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>EMBELLISHMENT END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>EMBELLISHMENT GATE PASS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>EMBELLISHMENT STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>EMB. LAST ITEM RECEIVED</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DYE-WASH START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DYE-WASH END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DYE-WASH GATE PASS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DYE-WASH STATUS</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DYE-WASH LAST ITEM RECEIVED</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DISPATCH START</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DISPATCH END</Typography></TableCell>
                    <TableCell size="small" align="left"><Typography variant="subtitle2" style={{"font-weight":"bold",fontSize: "12px"}} gutterBottom>DISPATCH STATUS</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DS_DATA.map((row) => (
                <TableRow key={row.cus_name}>
                    <TableCell>
                    <Tooltip title="Route Details">
                      <IconButton aria-label="view" component={ Link } 
                          to={"/srfroute/" + row.srf_id}
                          variant="contained"
                          color="primary"
                          size="small">
                          <PrintIcon style={{color:"#005086"}} />
                      </IconButton>
                    </Tooltip>
                    </TableCell>
                    <TableCell size="small" align="left">{row.srfdoc}</TableCell>
                    <TableCell size="small" align="left">{row.routename}</TableCell>
                    <TableCell size="small" align="left">{row.cus_name}</TableCell>
                    <TableCell size="small" align="left">{row.srf_floorset}</TableCell>
                    <TableCell size="small" align="left">{row.srf_style}</TableCell>
                    <TableCell size="small" align="left">{row.srf_styledesc}</TableCell>
                    <TableCell size="small" align="left">{row.sam_stage_title}</TableCell>
                    <TableCell size="small" align="left">{row.srf_styledesc}</TableCell>
                    <TableCell size="small" align="left">{row.sam_stage_title}</TableCell>
                    <TableCell size="small" align="left">{row.colors}</TableCell>
                    <TableCell size="small" align="left">{row.req_sizes}</TableCell>
                    <TableCell size="small" align="left">{row.req_qty}</TableCell>
                    <TableCell size="small" align="left">{row.mode_name}</TableCell>
                    <TableCell size="small" align="left">{row.username}</TableCell>
                    <TableCell size="small" align="left">{row.smv_sewfirst}</TableCell>
                    <TableCell size="small" align="left">{row.smv_sewsecond}</TableCell>
                    <TableCell size="small" align="left">{row.smv_sewthird}</TableCell>
                    <TableCell size="small" align="left">{row.srf_raisedate}</TableCell>
                    <TableCell size="small" align="left">{row.pm_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.pm_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.pm_status}</TableCell>
                    <TableCell size="small" align="left">{row.smv_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.smv_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.smv_status}</TableCell>
                    <TableCell size="small" align="left">{row.pb_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.pb_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.pb_status}</TableCell>
                    <TableCell size="small" align="left">{row.mm_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.mm_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.mm_status}</TableCell>
                    <TableCell size="small" align="left">{row.pln_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.pln_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.pln_status}</TableCell>
                    <TableCell size="small" align="left">{row.srf_plandate}</TableCell>
                    <TableCell size="small" align="left">{row.srf_reqdate}</TableCell>
                    <TableCell size="small" align="left">{row.st_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.st_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.st_status}</TableCell>
                    <TableCell size="small" align="left">{row.cut_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.cut_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.cut_status}</TableCell>
                    <TableCell size="small" align="left">{row.perimeter}</TableCell>
                    <TableCell size="small" align="left">{row.plice}</TableCell>
                    <TableCell size="small" align="left">{row.pcs}</TableCell>
                    <TableCell size="small" align="left">{row.cut_method}</TableCell>
                    <TableCell size="small" align="left">{row.recut_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.recut_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.recut_status}</TableCell>
                    <TableCell size="small" align="left">{row.sew1_pkg_start}</TableCell>
                    <TableCell size="small" align="left">{row.sew1_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.sew1_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.sew1_status}</TableCell>
                    <TableCell size="small" align="left">{row.qc1_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.qc1_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.qc1_status}</TableCell>
                    <TableCell size="small" align="left">{row.sew2_pkg_start}</TableCell>
                    <TableCell size="small" align="left">{row.sew2_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.sew2_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.sew2_status}</TableCell>
                    <TableCell size="small" align="left">{row.qc2_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.qc2_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.qc2_status}</TableCell>
                    <TableCell size="small" align="left">{row.sew3_pkg_start}</TableCell>
                    <TableCell size="small" align="left">{row.sew3_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.sew3_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.sew3_status}</TableCell>
                    <TableCell size="small" align="left">{row.qc3_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.qc3_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.qc3_status}</TableCell>
                    <TableCell size="small" align="left">{row.emb_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.emb_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.emb_gatepass}</TableCell>
                    <TableCell size="small" align="left">{row.emb_status}</TableCell>
                    <TableCell size="small" align="left">{row.emb_rec_date}</TableCell>
                    <TableCell size="small" align="left">{row.dw_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.dw_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.dw_gatepass}</TableCell>
                    <TableCell size="small" align="left">{row.dow_status}</TableCell>
                    <TableCell size="small" align="left">{row.dw_rec_date}</TableCell>
                    <TableCell size="small" align="left">{row.dis_start_date}</TableCell>
                    <TableCell size="small" align="left">{row.dis_end_date}</TableCell>
                    <TableCell size="small" align="left">{row.dis_status}</TableCell>
                </TableRow>
                    ))}
        </TableBody>
        </Table>
              
              </Box>
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