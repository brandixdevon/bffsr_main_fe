import React,{useEffect} from 'react';
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
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import MultiSelect from 'react-multi-select-component';
import { Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import ViewIcon from '@material-ui/icons/Visibility';
 

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
  var Var_UserId = localStorage.getItem('session_userid');

  const [DSET_CUSTOMRS, setDSET_CUSTOMRS] = React.useState([]);
  const [DSET_STATUSMODE, setDSET_STATUSMODE] = React.useState([]);
  const [DSET_USERS, setDSET_USERS] = React.useState([]);
  const [ValSelectCUSTOMRS, setSelectValCUSTOMRS] = React.useState([]);
  const [ValSelectSTATUSMODE, setSelectValSTATUSMODE] = React.useState([]);
  const [ValSelectUSERS, setSelectValUSERS] = React.useState([]);
  const [LASTSYNC, setLASTSYNC] = React.useState([]);

  //Datasets
  const [DS_PM, setDS_PM] = React.useState([]);
  const [DS_SMV, setDS_SMV] = React.useState([]);
  const [DS_PB, setDS_PB] = React.useState([]);
  const [DS_MM, setDS_MM] = React.useState([]);
  const [DS_PLN, setDS_PLN] = React.useState([]);
  const [DS_ST, setDS_ST] = React.useState([]);
  const [DS_CUT, setDS_CUT] = React.useState([]);
  const [DS_OSOHEMB, setDS_OSOHEMB] = React.useState([]);
  const [DS_OSOHEMBSEND, setDS_OSOHEMBSEND] = React.useState([]);
  const [DS_OSOHDNW, setDS_OSOHDNW] = React.useState([]);
  const [DS_OSOHDNWSEND, setDS_OSOHDNWSEND] = React.useState([]);
  const [DS_SEW, setDS_SEW] = React.useState([]);
  const [DS_SEWREW, setDS_SEWREW] = React.useState([]);
  const [DS_QC, setDS_QC] = React.useState([]);
  const [DS_DIS, setDS_DIS] = React.useState([]);

  
  const handleDrawerOpen = () => {
    return window.location.replace("/APP/")
  };

  function GetColor(headvalue)
  {
    
    if(headvalue === "Pending")
    {
      return '#2660bd';
    }
    else if(headvalue === "Hold")
    {
      return '#d93621';
    }
    else if(headvalue === "Sewing In")
    {
      return '#9e42f5';
    }
    else if(headvalue === "Start")
    {
      return '#2660bd';
    }
    else if(headvalue === "Not Start")
    {
      return '#d98507';
    }
    else
    {
      return '#d98507';
    }
  }
 
  async function getData()
    {
      if(ValSelectCUSTOMRS.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Please Select Customer/s.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
      else if(ValSelectSTATUSMODE.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Please Select Sample Stage Type/s.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
      else if(ValSelectUSERS.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Please Select User/s.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
      else
      {
        
        const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "customers": ValSelectCUSTOMRS,
              "stages": ValSelectSTATUSMODE,
              "users": ValSelectUSERS
          })};
          
          //Pattern Making
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_pm`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            
            setDS_PM(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //SMV
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_smv`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            
            setDS_SMV(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Placement Board
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_pb`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_PB(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Marker Making
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_mm`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_MM(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //planning
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_pln`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_PLN(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Stores
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_st`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_ST(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Cutting
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_cut`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_CUT(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //OHOS EMB
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_osohemb`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            
            setDS_OSOHEMB(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //OHOS EMB Send
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_osohembsend`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_OSOHEMBSEND(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //OHOS DNW
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_osohdnw`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_OSOHDNW(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //OHOS DNW Send
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_osohdnwsend`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_OSOHDNWSEND(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Sewing
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_sew`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_SEW(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Sewing Rework
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_sewrew`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_SEWREW(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //QC
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_qc`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_QC(response.datadashboard); 
          })
          .catch(error => console.log(error));

          //Dispatch
          await fetch(`http://${apiurl}/dashboard/dbsummaryview_dis`,sendOptions)
          .then(res => res.json())
          .then(response => { 
             
            setDS_DIS(response.datadashboard); 
          })
          .catch(error => console.log(error));


          //Last Sync DateTime
          setLASTSYNC(Moment().format('MMMM Do YYYY, h:mm:ss a'));

      }
    }

    useEffect(() => {

      var Var_UserId = localStorage.getItem('session_userid');
  
      fetch(`http://${apiurl}/master/getcustomersbyuser/${Var_UserId}`)
      .then(res => res.json())
      .then(response => {setDSET_CUSTOMRS(response.syscustomers);})
      .catch(error => console.log(error));
  
      fetch(`http://${apiurl}/master/getsamplestages`)
      .then(res => res.json())
      .then(response => {setDSET_STATUSMODE(response.samplestages);})
      .catch(error => console.log(error));
  
      fetch(`http://${apiurl}/master/getusersfordashbaord/${Var_UserId}`)
      .then(res => res.json())
      .then(response => {setDSET_USERS(response.sysusers);})
      .catch(error => console.log(error));
  
  
      }, [apiurl,Var_UserId]);
  
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
            
          <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>Select Customer </Typography>
                <MultiSelect
                  overrideStrings={{"allItemsAreSelected": "All Customers are selected.","selectAll": "Select All Customers"}}
                  options={DSET_CUSTOMRS}
                  value={ValSelectCUSTOMRS}
                  onChange={setSelectValCUSTOMRS}
                  labelledBy="Select"/>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>Select Sample Type</Typography>
                <MultiSelect
                  overrideStrings={{"allItemsAreSelected": "All Sample Types are selected.","selectAll": "Select All Sample Types"}}
                  options={DSET_STATUSMODE}
                  value={ValSelectSTATUSMODE}
                  onChange={setSelectValSTATUSMODE}
                  labelledBy="Select" />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>Select SRF Raised Users</Typography>
                <MultiSelect
                  overrideStrings={{"allItemsAreSelected": "All Users are selected.","selectAll": "Select All Users"}}
                  options={DSET_USERS}
                  value={ValSelectUSERS}
                  onChange={setSelectValUSERS}
                  labelledBy="Select" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" color="primary" onClick={getData}>VIEW DATA</Button>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>LAST SYNC : {LASTSYNC}</Typography>
            </Grid>

          </Grid>
          
        </Container>
        <Container maxWidth="false" className={classes.container}>
          <Grid container spacing={1}>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>PATTERN MAKER <small>({DS_PM.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_PM.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.pm_status)}}>
                          {row.pm_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>SMV RELEASE <small>({DS_SMV.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_SMV.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.smv_status)}}>
                          {row.smv_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>PLACEMENT BOARD <small>({DS_PB.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_PB.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.pb_status)}}>
                          {row.pb_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>MARKER MAKING <small>({DS_MM.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_MM.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.mm_status)}}>
                          {row.mm_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>PLANNING <small>({DS_PLN.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_PLN.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.pl_status)}}>
                          {row.pl_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>STORES <small>({DS_ST.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_ST.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.st_status)}}>
                          {row.st_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>CUTTING <small>({DS_CUT.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_CUT.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.cut_status)}}>
                          {row.cut_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>EMBELLISHMENT SEND <small>({DS_OSOHEMB.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHEMB.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.emb_status)}}>
                          {row.emb_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>EMBELLISHMENT RECEIVE PENDING <small>({DS_OSOHEMBSEND.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHEMBSEND.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.embitem_status)}}>
                          {row.embitem_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>DYE - WASH SEND <small>({DS_OSOHDNW.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHDNW.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.dow_status)}}>
                          {row.dow_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>DYE - WASH RECEIVE PENDING <small>({DS_OSOHDNWSEND.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHDNWSEND.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.dowitem_status)}}>
                          {row.dowitem_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>SEWING <small>({DS_SEW.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_SEW.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.sew_status)}}>
                          {row.sew_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>SEWING REWORK <small>({DS_SEWREW.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_SEWREW.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.rework_status)}}>
                          {row.rework_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>QUALITY CHECKING <small>({DS_QC.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_QC.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.qc_status)}}>
                          {row.qc_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item sm={12} md={6} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>DISPATCH <small>({DS_DIS.length})</small></Typography>
                
                <div style={{display:"inline",float:"left",padding:10,height:200,width:"100%",overflow:"scroll"}}>
                  <table style={{width:"100%"}}>
                  {DS_DIS.map((row) => (
                      <tr>
                      <td style={{width:"5%"}}>
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              target="new"
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_docid}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_style}
                      </td>
                      <td style={{width:"15%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.sam_stage_title}
                      </td>
                      <td style={{width:"25%",fontWeight:600,fontSize:"12px",color:"black"}}>
                          {row.srf_customer}
                      </td>
                      <td style={{width:"20%",fontWeight:600,fontSize:"12px",color:GetColor(row.dis_status)}}>
                          {row.dis_status}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
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