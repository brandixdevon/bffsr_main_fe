import React,{useEffect} from 'react';
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
import Moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Redirect } from 'react-router-dom';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import { Button } from '@material-ui/core';
import MultiSelect from 'react-multi-select-component';
import DataTable  from './allplntable';
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


export default function Allsrf() {
  const classes = useStyles();
  var apiurl = localStorage.getItem('session_apiurl');
  const [open, setOpen] = React.useState(true);
  const [DSET_CUSTOMRS, setDSET_CUSTOMRS] = React.useState([]);
  const [DSET_STATUSMODE, setDSET_STATUSMODE] = React.useState([]);
  const [ValCUSTOMRS, setValCUSTOMRS] = React.useState([]);
  const [ValSTATUSMODE, setValSTATUSMODE] = React.useState([]);
  const [selectedDateFrom, setselectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setselectedDateTo] = React.useState(new Date());
  const [DOWNLOADDATA, setDOWNLOADDATA] = React.useState([]);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const handleDateChangeFrom = (date) => {
      setselectedDateFrom(date);
    };

    const handleDateChangeTo = (date) => {
      setselectedDateTo(date);
    };
 
        const loginValidation = () => {
          
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
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function GetData ()
  {
    
    if(ValCUSTOMRS.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Please Select Customers.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    } 
    else if(selectedDateFrom.length <= 7)
    {
        Swal.fire({  title: 'Error!',  text: 'Please Select From Date.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }
    else if(selectedDateTo.length <= 7)
    {
        Swal.fire({  title: 'Error!',  text: 'Please Select To Date.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }
    else if(ValSTATUSMODE.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Please Select Planning Status.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }
    else
    {
        const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "customers": ValCUSTOMRS,
              "fromdate": Moment(selectedDateFrom).format('yyyy-MM-DD'),
              "todate": Moment(selectedDateTo).format('yyyy-MM-DD'),
              "keyword":"",
              "function":"PLN",
              "status": ValSTATUSMODE
          })
      };
  
        await fetch(`http://${apiurl}/filter/customsrflist`,sendOptions)
        .then(res => res.json())
        .then(response => {
          setDOWNLOADDATA(response.srfdata);
          Swal.fire({  title: 'Success!',  text: 'Data Set Generate Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
        })
        .catch(error => Swal.fire({  title: 'Error!',  text: error,  icon: 'info',  confirmButtonText: 'OK'}));
    }

    
  
  }

  useEffect(() => {

    //var Var_UserId = localStorage.getItem('session_userid');

    fetch(`http://${apiurl}/master/getcustomersbyuser/ALL`)
    .then(res => res.json())
    .then(response => {setDSET_CUSTOMRS(response.syscustomers);})
    .catch(error => console.log(error));

    setDSET_STATUSMODE([{"value":"'Completed'","label": "Completed"},{"value":"'Pending'","label": "Pending"},{"value":"'Hold'","label": "Hold"}]);
    setDOWNLOADDATA([]);
   
    }, [apiurl]);

  
  return (
    <div className={classes.root}>
    {loginValidation()}
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
          <Grid  style={{backgroundColor: 'white'}} container spacing={1}>
            <Grid item md={6}>
            <Typography variant="subtitle2" gutterBottom>Select Customer Categories</Typography>
            <MultiSelect
                  overrideStrings={{"allItemsAreSelected": "All Customers are selected.","selectAll": "Select All Customers"}}
                  options={DSET_CUSTOMRS}
                  value={ValCUSTOMRS}
                  onChange={setValCUSTOMRS}
                  labelledBy="Select"/>
            </Grid>
            <Grid item md={6}>
            <Typography variant="subtitle2" gutterBottom>Planning Status</Typography>
            <MultiSelect
                  overrideStrings={{"allItemsAreSelected": "All Planning Status are selected.","selectAll": "Select All Status"}}
                  options={DSET_STATUSMODE}
                  value={ValSTATUSMODE}
                  onChange={setValSTATUSMODE}
                  labelledBy="Select" />
            </Grid>
            <Grid item md={3}>
            <Typography variant="subtitle2" gutterBottom>Select From Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
                      <KeyboardDatePicker
                    margin="normal"
                    id="dtpRequireFrom"
                    format="yyyy/MMM/dd"
                    value={selectedDateFrom}
                    onChange={handleDateChangeFrom}
                    KeyboardButtonProps={{ 'aria-label': 'change date',}}
                    variant="outlined" 
                    style={{width:"100%"}} 
                    size="small"
                    />
                      
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={3}>
            <Typography variant="subtitle2" gutterBottom>Select To Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
                      <KeyboardDatePicker
                    margin="normal"
                    id="dtpRequireTo"
                    format="yyyy/MMM/dd"
                    value={selectedDateTo}
                    onChange={handleDateChangeTo}
                    KeyboardButtonProps={{ 'aria-label': 'change date',}}
                    variant="filled" 
                    style={{width:"100%"}} 
                    size="small"
                    />
                      
              </MuiPickersUtilsProvider>
            </Grid>
            
            <Grid item md={3}>
              <Button variant="contained" color="primary" onClick={GetData}>FILTER</Button>
            </Grid>
            <Grid item md={3} alignItems="right">
              
            <ExcelFile filename={"SRF_PLANING_"+ new Date().toISOString().slice(0,20)} fileExtension="xlsx" element={<Button variant="contained" style={{color:"white",backgroundColor:"green"}} >Download Excel File</Button>}>
                <ExcelSheet data={DOWNLOADDATA} name="SRF_List_Dataset">
                    <ExcelColumn label="SRF ID" value="srfseqid"/>
                    <ExcelColumn label="CUSTOMER NAME" value="cus_name"/>
                    <ExcelColumn label="STYLE NAME" value="srf_style"/>
                    <ExcelColumn label="STYLE DESC" value="srf_styledesc"/>
                    <ExcelColumn label="FLOORSET/IDENTIFIRE" value="srf_floorset"/>
                    <ExcelColumn label="SAMPLE STAGE" value="sam_stage_title"/>
                    <ExcelColumn label="CREATE DATE" value="srf_raisedate"/>
                    <ExcelColumn label="REQUIRED DATE" value="srf_reqdate"/>
                    <ExcelColumn label="PLANNING PROMISE DATE" value="srf_plandate"/>
                    <ExcelColumn label="FINISHED DATE" value="srf_finishdate"/>
                    <ExcelColumn label="ROUTE NAME" value="routename"/>
                    <ExcelColumn label="ROUTING" value="routing"/>
                    <ExcelColumn label="CURRENT STATUS" value="mode_name"/>
                    <ExcelColumn label="BODY FABRIC" value="body_fab_type"/>
                    <ExcelColumn label="ISSUE NOTE/DAN" value="issue_note"/>
                    <ExcelColumn label="GARMENT DISPATCH" value="garment_dispatch"/>
                    <ExcelColumn label="COLORS" value="colors"/>
                    <ExcelColumn label="GRAPHICS" value="graphic"/>
                    <ExcelColumn label="WASH DEVELOPMENT" value="wash_development"/>
                    <ExcelColumn label="BODY FABRIC CW" value="body_fab_cw"/>
                    <ExcelColumn label="BODY FABRIC CW UNIT" value="body_fab_cw_unit"/>
                    <ExcelColumn label="FABRIC RELAXING HOURS" value="fab_relax_hours"/>
                    <ExcelColumn label="PLACEMENT BOARD REQUIREMENT" value="placement_board"/>
                    <ExcelColumn label="TOTAL SIZES" value="sizecount"/>
                    <ExcelColumn label="GARMENT SIZES" value="sizes"/>
                    <ExcelColumn label="EMBELLISHMENT PLANTS" value="emb_plant"/>
                    <ExcelColumn label="DYE/WASH PLANTS" value="dw_plant"/>
                    <ExcelColumn label="COMMENTS" value="comment_desc"/>
                    <ExcelColumn label="SMV" value="smvoperation"/>
                </ExcelSheet>
            </ExcelFile>


            </Grid>
            
            <Grid item md={12}>
                <DataTable NEWDATA={DOWNLOADDATA} />
            </Grid>
          </Grid>
          
        </Container>
        <Box bgcolor="text.disabled" color="text.primary" pt={2} pb={2}>
            <Copyright/>
          </Box>
      </main>
    </div>
  );
}