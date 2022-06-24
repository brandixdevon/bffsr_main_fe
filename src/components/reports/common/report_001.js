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
import Copyright from '../../mainlayout/copyright';
import MainHeader from '../../mainlayout/mainheader';
  
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

  
  const handleDrawerOpen = () => {
    return window.location.replace("/REPORTS_COMMON/")
  };




   
    useEffect(() => {

        fetch(`http://${apiurl}/reports/currentcapacity`)
        .then(res => res.json())
        .then(response => { 
          
          setDS_DATA(response.capacity); 

        })
        .catch(error => console.log(error));
  
  
      }, [apiurl]);
  
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
                <Typography style={{fontSize:15,color:"purple",fontWeight:700,padding:1}} gutterBottom>SAMPLE ROOM ACTIVE SRF LIST COUNT BY CATEGORY WISE </Typography>
            </Grid>

          </Grid>
          
          <Grid container spacing={1}>

              <Grid item xs={12} sm={12} md={12} style={{padding:2,backgroundColor:"#fcfdff"}}>

              <table style={{width:"100%",borderColor:"black",padding:3}}>
                  <thead>
                    <tr>
                      <td style={{width:"55%",fontWeight:700,color:"blueviolet"}}>
                         CUSTOMER CATEGORY
                      </td>
                      <td style={{width:"15%",fontWeight:700,color:"blueviolet"}}>
                         TOTAL SRF COUNT
                      </td>
                      <td style={{width:"15%",fontWeight:700,color:"blueviolet"}}>
                         PROCESSING SRF COUNT
                      </td>
                      <td style={{width:"15%",fontWeight:700,color:"blueviolet"}}>
                         ON HOLD SRF COUNT
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                  {DS_DATA.map((row) => (
                      <tr style={{marginBottom:2,backgroundColor:"#f2f6f7"}}>
                        <td style={{width:"55%",fontWeight:700,color:"black",padding:2}}>
                            {row.cus_name}
                        </td>
                        <td style={{width:"15%",fontWeight:700,color:"blue",padding:2}}>
                            {row.total}
                        </td>
                        <td style={{width:"15%",fontWeight:700,color:"green",padding:2}}>
                            {row.processing}
                        </td>
                        <td style={{width:"15%",fontWeight:700,color:"orange",padding:2}}>
                            {row.onhold}
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
 
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