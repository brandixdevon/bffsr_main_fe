import React, { useEffect }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Swal from 'sweetalert2';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
//All Views
import View_PD from './srfrouteupdate/view_pd';
import View_PM from './srfrouteupdate/view_pm';
import View_SMV from './srfrouteupdate/view_smv';
import View_MM from './srfrouteupdate/view_mm';
import View_PLN from './srfrouteupdate/view_pln';
import View_ST from './srfrouteupdate/view_st';
import View_CUT from './srfrouteupdate/view_cut';
import View_SEW from './srfrouteupdate/view_sew';
import View_QC from './srfrouteupdate/view_qc';
import View_EMB from './srfrouteupdate/view_emb';
import View_EMBITEMS from './srfrouteupdate/view_embitems';
import View_DNW from './srfrouteupdate/view_dnw';
import View_DNWITEMS from './srfrouteupdate/view_dnwitems';
import View_DIS from './srfrouteupdate/view_dis';
   
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

export default function EnhancedTable() {
    const classes = useStyles();
    var apiurl = localStorage.getItem('session_apiurl');
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [DSET_ROUTESMAP, setDSET_ROUTESMAP] = React.useState([]);
 
    //Form Parameters
    const [VAL_SRFIDCLUSTER, setVAL_SRFIDCLUSTER] = React.useState([]);
    const [VAL_SRFIDDATE, setVAL_SRFIDDATE] = React.useState([]);
    const [VAL_SRFIDSEQ, setVAL_SRFIDSEQ] = React.useState([]);
     
    const renderRedirect = () => {
        var myRegxp = /^([0-9]){10}$/;
        if(myRegxp.test(SRFID) === false)
        {
            Swal.fire({  title: 'Error!',  text: 'Invalid SRF ID',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/srfall/"} />
            }
    
    }

    useEffect(() => {
     
      fetch(`http://${apiurl}/srf/SrfMasterDetails/${SRFID}`)
      .then(res => res.json())
      .then(response => { 
          setVAL_SRFIDCLUSTER(response.srfmaster[0].sid_cluster);
          setVAL_SRFIDDATE(response.srfmaster[0].sid_date);
          setVAL_SRFIDSEQ(response.srfmaster[0].sid_seq); 

          fetch(`http://${apiurl}/productroute/routemapping/${response.srfmaster[0].srf_routemasterid}`)
          .then(res1 => res1.json())
          .then(response1 => {setDSET_ROUTESMAP(response1.routemap);})
          .catch(error1 => console.log(error1));
      })
      .catch(error => console.log(error));

      


  }, [SRFID,apiurl]);

  

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
  <Container maxWidth={false} className={classes.container}>
  
    <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
             <Grid item xs={12} md={12}><Typography variant="h6" align="center" gutterBottom style={{color: 'purple'}}>SAMPLE ROOM REQUEST ( {VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ} ) PRODUCT LIFE CYCLE</Typography></Grid>
      <Grid item xs={12} md={12}>
       
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom style={{Color: 'purple'}}>Product Routing Steps</Typography>
      {DSET_ROUTESMAP.map(item =>
              <>
              <List dense={true} className={classes.root}>
              <ListItem dense={true} >
                <ListItemAvatar>
                  <Avatar style={{color:"white",backgroundColor:"purple"}}>
                    {item.hierarchy}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.proelmname} />
              </ListItem>
              </List>

              {
                (() => { switch (item.proelmid) {

                    case 1:

                        return (
                          // eslint-disable-next-line
                          <View_PD SRFID={SRFID} PROELMID={item.proelmid}/>

                        )
                    case 2:

                    return (
                      // eslint-disable-next-line
                      <View_PM SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 3:

                    return (
                      // eslint-disable-next-line
                      <View_SMV SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 4:

                    return (
                      // eslint-disable-next-line
                      <View_MM SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 5:

                    return (
                      // eslint-disable-next-line
                      <View_PLN SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 6:

                    return (
                      // eslint-disable-next-line
                      <View_ST SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 7:

                    return (
                      // eslint-disable-next-line
                      <View_CUT SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 8:

                    return (
                      // eslint-disable-next-line
                      <View_EMB SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 9:

                    return (
                      // eslint-disable-next-line
                      <View_EMBITEMS SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 10:

                    return (
                      // eslint-disable-next-line
                      <View_DNW SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 11:

                    return (
                      // eslint-disable-next-line
                      <View_DNWITEMS SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 12:

                    return (
                      // eslint-disable-next-line
                      <View_QC SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 13:

                    return (
                      // eslint-disable-next-line
                      <View_SEW SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 14:

                    return (
                      // eslint-disable-next-line
                      <View_QC SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 15:

                    return (
                      // eslint-disable-next-line
                      <View_SEW SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 16:

                    return (
                      // eslint-disable-next-line
                      <View_QC SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 17:

                    return (
                      // eslint-disable-next-line
                      <View_SEW SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 18:

                    return (
                      // eslint-disable-next-line
                      <View_QC SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 19:

                    return (
                      // eslint-disable-next-line
                      <View_DIS SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 20:

                    return (
                      // eslint-disable-next-line
                      <View_DIS SRFID={SRFID} PROELMID={item.proelmid}/>

                    )
                    case 21:

                    return (
                      // eslint-disable-next-line
                      <View_DIS SRFID={SRFID} PROELMID={item.proelmid}/>

                    )

                    default:

                        return (

                          <div>Sorry . Please Contact Admin.</div>

                        )

                  }
                  })()
              }

              </>
                      
                      )}
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
