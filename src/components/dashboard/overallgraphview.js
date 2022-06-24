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
import { PieChart } from 'react-minimal-pie-chart';
import Swal from 'sweetalert2';
import Moment from 'moment';
 

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
          await fetch(`http://${apiurl}/dashboard/dbpiechart_pm`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_pm.length; i += 1) 
            {
              chartData.push({ title: response.pichart_pm[i].label, value: Number(response.pichart_pm[i].value), color: GetColor(response.pichart_pm[i].label) });
            }
            setDS_PM(chartData); 
          })
          .catch(error => console.log(error));

          //SMV
          await fetch(`http://${apiurl}/dashboard/dbpiechart_smv`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_smv.length; i += 1) 
            {
              chartData.push({ title: response.pichart_smv[i].label, value: Number(response.pichart_smv[i].value), color: GetColor(response.pichart_smv[i].label) });
            }
            setDS_SMV(chartData); 
          })
          .catch(error => console.log(error));

          //Placement Board
          await fetch(`http://${apiurl}/dashboard/dbpiechart_pb`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_pb.length; i += 1) 
            {
              chartData.push({ title: response.pichart_pb[i].label, value: Number(response.pichart_pb[i].value), color: GetColor(response.pichart_pb[i].label) });
            }
            setDS_PB(chartData); 
          })
          .catch(error => console.log(error));

          //Marker Making
          await fetch(`http://${apiurl}/dashboard/dbpiechart_mm`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_mm.length; i += 1) 
            {
              chartData.push({ title: response.pichart_mm[i].label, value: Number(response.pichart_mm[i].value), color: GetColor(response.pichart_mm[i].label) });
            }
            setDS_MM(chartData); 
          })
          .catch(error => console.log(error));

          //planning
          await fetch(`http://${apiurl}/dashboard/dbpiechart_pln`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_pln.length; i += 1) 
            {
              chartData.push({ title: response.pichart_pln[i].label, value: Number(response.pichart_pln[i].value), color: GetColor(response.pichart_pln[i].label) });
            }
            setDS_PLN(chartData); 
          })
          .catch(error => console.log(error));

          //Stores
          await fetch(`http://${apiurl}/dashboard/dbpiechart_st`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_st.length; i += 1) 
            {
              chartData.push({ title: response.pichart_st[i].label, value: Number(response.pichart_st[i].value), color: GetColor(response.pichart_st[i].label) });
            }
            setDS_ST(chartData); 
          })
          .catch(error => console.log(error));

          //Cutting
          await fetch(`http://${apiurl}/dashboard/dbpiechart_cut`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_cut.length; i += 1) 
            {
              chartData.push({ title: response.pichart_cut[i].label, value: Number(response.pichart_cut[i].value), color: GetColor(response.pichart_cut[i].label) });
            }
            setDS_CUT(chartData); 
          })
          .catch(error => console.log(error));

          //OHOS EMB
          await fetch(`http://${apiurl}/dashboard/dbpiechart_osohemb`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_emb.length; i += 1) 
            {
              chartData.push({ title: response.pichart_emb[i].label, value: Number(response.pichart_emb[i].value), color: GetColor(response.pichart_emb[i].label) });
            }
            setDS_OSOHEMB(chartData); 
          })
          .catch(error => console.log(error));

          //OHOS EMB Send
          await fetch(`http://${apiurl}/dashboard/dbpiechart_osohembsend`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_embsend.length; i += 1) 
            {
              chartData.push({ title: response.pichart_embsend[i].label, value: Number(response.pichart_embsend[i].value), color: GetColor(response.pichart_embsend[i].label) });
            }
            setDS_OSOHEMBSEND(chartData); 
          })
          .catch(error => console.log(error));

          //OHOS DNW
          await fetch(`http://${apiurl}/dashboard/dbpiechart_osohdnw`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_dnw.length; i += 1) 
            {
              chartData.push({ title: response.pichart_dnw[i].label, value: Number(response.pichart_dnw[i].value), color: GetColor(response.pichart_dnw[i].label) });
            }
            setDS_OSOHDNW(chartData); 
          })
          .catch(error => console.log(error));

          //OHOS DNW Send
          await fetch(`http://${apiurl}/dashboard/dbpiechart_osohdnwsend`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_dnwsend.length; i += 1) 
            {
              chartData.push({ title: response.pichart_dnwsend[i].label, value: Number(response.pichart_dnwsend[i].value), color: GetColor(response.pichart_dnwsend[i].label) });
            }
            setDS_OSOHDNWSEND(chartData); 
          })
          .catch(error => console.log(error));

          //Sewing
          await fetch(`http://${apiurl}/dashboard/dbpiechart_sew`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_sew.length; i += 1) 
            {
              chartData.push({ title: response.pichart_sew[i].label, value: Number(response.pichart_sew[i].value), color: GetColor(response.pichart_sew[i].label) });
            }
            setDS_SEW(chartData); 
          })
          .catch(error => console.log(error));

          //Sewing Rework
          await fetch(`http://${apiurl}/dashboard/dbpiechart_sewrew`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_sewrew.length; i += 1) 
            {
              chartData.push({ title: response.pichart_sewrew[i].label, value: Number(response.pichart_sewrew[i].value), color: GetColor(response.pichart_sewrew[i].label) });
            }
            setDS_SEWREW(chartData); 
          })
          .catch(error => console.log(error));

          //QC
          await fetch(`http://${apiurl}/dashboard/dbpiechart_qc`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_qc.length; i += 1) 
            {
              chartData.push({ title: response.pichart_qc[i].label, value: Number(response.pichart_qc[i].value), color: GetColor(response.pichart_qc[i].label) });
            }
            setDS_QC(chartData); 
          })
          .catch(error => console.log(error));

          //Dispatch
          await fetch(`http://${apiurl}/dashboard/dbpiechart_dis`,sendOptions)
          .then(res => res.json())
          .then(response => { 
            const chartData = [];
            for (let i = 0; i < response.pichart_dis.length; i += 1) 
            {
              chartData.push({ title: response.pichart_dis[i].label, value: Number(response.pichart_dis[i].value), color: GetColor(response.pichart_dis[i].label) });
            }
            setDS_DIS(chartData); 
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

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>PATTERN MAKER</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_PM} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_PM.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>SMV RELEASE</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_SMV} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_SMV.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>PLACEMENT BOARD</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_PB} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_PB.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>MARKER MAKING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_MM} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_MM.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>PLANNING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_PLN} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_PLN.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>STORES</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_ST} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_ST.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>CUTTING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_CUT} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_CUT.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>EMBELLISHMENT SEND</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_OSOHEMB} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHEMB.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>EMBELLISHMENT RECEIVE PENDING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_OSOHEMBSEND} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHEMBSEND.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>DYE - WASH SEND</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_OSOHDNW} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHDNW.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>DYE - WASH RECEIVE PENDING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_OSOHDNWSEND} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_OSOHDNWSEND.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>SEWING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_SEW} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_SEW.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>SEWING REWORK</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_SEWREW} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_SEWREW.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>QUALITY CHECKING</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_QC} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_QC.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
                      </td>
                      </tr>
                  ))}
                  </table>
                </div> 
              </Grid>

              <Grid item xs={12} sm={6} md={3} style={{padding:2,backgroundColor:"#fcfdff"}}>
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:10}} gutterBottom>DISPATCH</Typography>
                <div style={{width:100,height:100,display:"inline",float:"left"}}>
                    <PieChart data={DS_DIS} startAngle={90} lineWidth={70}/>
                </div>
                <div style={{display:"inline",float:"left",padding:10}}>
                  <table style={{width:"100%"}}>
                  {DS_DIS.map((row) => (
                      <tr>
                      <td style={{width:"70%",fontWeight:700,color:row.color}}>
                          {row.title}
                      </td>
                      <td>:</td>
                      <td style={{width:"30%",fontWeight:700,color:row.color}}>
                          {row.value}
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