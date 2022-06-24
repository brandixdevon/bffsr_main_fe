import React  from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
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
  elmheading: {
    fontSize:12,
    color:"#815099",
    "font-weight":"bold"
  },
    tableheading: {
      fontSize:12,
      color:"black",
      "font-weight":"bold"
    },
}));


export default function EnhancedTable() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };



    return (
      <div className={classes.root}>
     
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
      <Grid style={{backgroundColor: 'white'}}  container>
        <Grid item xs={12} md={12}>
        <p style={{paddingLeft:10}}><b>Common Reports List</b></p>
        </Grid>
        <Grid item xs={12} md={12}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'small'} aria-label="enhanced table" >
            <TableHead>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"15%",fontSize:12}} align="left"><b>Action</b></TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:12}} align="left"><b>Report Name</b></TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"35%",fontSize:12}} align="left"><b>Filters</b></TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"20%",fontSize:12}} align="left"><b>Export Type</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"10%",fontSize:14}} align="left">
                    <Button component={ Link } size="small" to={"/COM_RPT005/"} variant="outlined" color="secondary" style={{padding:10}}>Get Data</Button>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Search All SRF in Sample Room</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Customer Category / SRF Current Status / Requested Date Range</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Grid View / Excel Export</TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"10%",fontSize:14}} align="left">
                    <Button component={ Link } size="small" to={"/COM_RPT001/"} variant="outlined" color="secondary" style={{padding:10}}>Get Data</Button>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Category Wise Sample Room Capacity</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Live Update</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Graph View</TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"10%",fontSize:14}} align="left">
                    <Button component={ Link } size="small" to={"/COM_RPT002/"} variant="outlined" color="secondary" style={{padding:10}}>Get Data</Button>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Category Wise Sample Room Capacity Forecast </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Requested Date Range</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Grid View / Excel Export</TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"10%",fontSize:14}} align="left">
                    <Button component={ Link } size="small" to={"/COM_RPT003/"} variant="outlined" color="secondary" style={{padding:10}}>Get Data</Button>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Sample Room Delivery Failure Forecast</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Requested Date Range</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Grid View / Excel Export</TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"10%",fontSize:14}} align="left">
                    <Button component={ Link } size="small" to={"/COM_RPT004/"} variant="outlined" color="secondary" style={{padding:10}}>Get Data</Button>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Sample Room OTD Hit Data</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Requested Date Range</TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%",fontSize:14}} align="left">Grid View / Excel Export</TableCell>
              </TableRow>
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
