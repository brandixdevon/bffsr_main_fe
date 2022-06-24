import React, { useEffect }  from 'react';
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
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Swal from 'sweetalert2';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import Barcode from 'react-barcode';
import Image from 'material-ui-image';
   
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
    const [DSET_SRFSIZES, setDSET_SRFSIZES] = React.useState([]);
    const [DSET_SRFEMB, setDSET_SRFEMB] = React.useState([]);
    const [DSET_SRFDW, setDSET_SRFDW] = React.useState([]);
    const [DSET_COMMENTS, setDSET_COMMENTS] = React.useState([]);
    const [ISDWPLANT, setISDWPLANT] = React.useState(false);
    const [ISEMBPLANT, setISEMBPLANT] = React.useState(false);

    //Form Parameters
    const [VAL_SRFIDCLUSTER, setVAL_SRFIDCLUSTER] = React.useState([]);
    const [VAL_SRFIDDATE, setVAL_SRFIDDATE] = React.useState([]);
    const [VAL_SRFIDSEQ, setVAL_SRFIDSEQ] = React.useState([]);
    const [VAL_CUSNAME, setVAL_CUSNAME] = React.useState([]);
    const [VAL_STYLE, setVAL_STYLE] = React.useState([]);
    const [VAL_STYLEDESC, setVAL_STYLEDESC] = React.useState([]);
    const [VAL_FLOORSET, setVAL_FLOORSET] = React.useState([]);
    const [VAL_CREATEBY, setVAL_CREATEBY] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState([]);

    const [VAL_BODYFABRIC, setVAL_BODYFABRIC] = React.useState([]);
    const [VAL_ISSUENOTE, setVAL_ISSUENOTE] = React.useState([]);
    const [VAL_GARDISPATCH,setVAL_GARDISPATCH] = React.useState([]);
    const [VAL_COLORS,setVAL_COLORS] = React.useState([]);
    const [VAL_GRAPHICS,setVAL_GRAPHICS] = React.useState([]);
    const [VAL_WASH,setVAL_WASH] = React.useState([]);
    const [VAL_BODYFABCW,setVAL_BODYFABCW] = React.useState([]);
    const [VAL_BODYFABCWUNIT,setVAL_BODYFABCWUNIT] = React.useState([]);
    const [VAL_FABRELAXHOURS,setVAL_FABRELAXHOURS] = React.useState([]);
    const [VAL_PLACEMENTBOARD, setVAL_PLACEMENTBOARD] = React.useState([]);
    const [VAL_SRFIMGBASE64, setVAL_SRFIMGBASE64] = React.useState([]);

    var [VAR_SAMPLESTAGE, setVAR_SAMPLESTAGE] = React.useState([]);
    var [VAR_ROUTE, setVAR_ROUTE] = React.useState([]);
    
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
              setVAL_STYLE(response.srfmaster[0].srf_style);
              setVAL_STYLEDESC(response.srfmaster[0].srf_styledesc);
              setVAL_FLOORSET(response.srfmaster[0].srf_floorset);
              setSelectedDate(response.srfmaster[0].srf_reqdate);

              fetch(`http://${apiurl}/master/getusername/${response.srfmaster[0].srf_createby}`)
              .then(res1 => res1.json())
              .then(response1 =>{setVAL_CREATEBY(response1.username[0].username);} )
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

              fetch(`http://${apiurl}/master/getroutesvalidate/${response.srfmaster[0].srf_routemasterid}`)
              .then(res1 => res1.json())
              .then(response1 => { 
                  setISDWPLANT(response1.routesvalidate[0].dwplant);
                  setISEMBPLANT(response1.routesvalidate[0].embplant);
              })
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

              fetch(`http://${apiurl}/master/getroutesbyid/${response.srfmaster[0].srf_routemasterid}`)
              .then(res1 => res1.json())
              .then(response1 =>{setVAR_ROUTE(response1.productrouts[0].label);} )
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

              fetch(`http://${apiurl}/master/getsamplestagesbyid/${response.srfmaster[0].sam_stage_id}`)
              .then(res1 => res1.json())
              .then(response1 =>{setVAR_SAMPLESTAGE(response1.samplestages[0].label);} )
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
        
              fetch(`http://${apiurl}/master/allcustomers/${response.srfmaster[0].cus_id}`)
              .then(res1 => res1.json())
              .then(response1 =>{setVAL_CUSNAME(response1.syscustomers[0].cus_name);} )
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
            
              fetch(`http://${apiurl}/productroute/routemapping/${response.srfmaster[0].srf_routemasterid}`)
              .then(res1 => res1.json())
              .then(response1 => {setDSET_ROUTESMAP(response1.routemap);})
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
          })
          .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/srf/SrfDetails/${SRFID}`)
            .then(res => res.json())
            .then(response => { 
                setVAL_BODYFABRIC(response.srfdetails[0].body_fab_type);
                setVAL_ISSUENOTE(response.srfdetails[0].issue_note);
                setVAL_GARDISPATCH(response.srfdetails[0].garment_dispatch);
                setVAL_COLORS(response.srfdetails[0].colors);
                setVAL_GRAPHICS(response.srfdetails[0].graphic);
                setVAL_WASH(response.srfdetails[0].wash_development);
                setVAL_BODYFABCW(response.srfdetails[0].body_fab_cw);
                setVAL_BODYFABCWUNIT(response.srfdetails[0].body_fab_cw_unit);
                setVAL_FABRELAXHOURS(response.srfdetails[0].fab_relax_hours);
                setVAL_PLACEMENTBOARD(response.srfdetails[0].placement_board);

                fetch(`http://${apiurl}/srf/srfimagebase64/${response.srfdetails[0].image_name}`)
              .then(res1 => res1.json())
              .then(response1 => { setVAL_SRFIMGBASE64(response1.srfimage[0].base64);})
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
 
        

        fetch(`http://${apiurl}/srf/Srfsizes/${SRFID}`)
        .then(res => res.json())
        .then(response => {setDSET_SRFSIZES(response.srfsizes);})
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

        fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/EMB`)
        .then(res => res.json())
        .then(response => {setDSET_SRFEMB(response.srfplants);})
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

        fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/DW`)
        .then(res => res.json())
        .then(response => {setDSET_SRFDW(response.srfplants);})
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

        fetch(`http://${apiurl}/srf/srfcomments/${SRFID}`)
        .then(res => res.json())
        .then(response => {setDSET_COMMENTS(response.srfcomments);})
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
 
     
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
      <Grid style={{backgroundColor: 'white'}}  container>
        <Grid item xs={12} md={4}>
            <Button component={ Link } target="_blank" to={"/srfpdf/" + SRFID} variant="contained" color="secondary" style={{padding:10}}>Download PDF</Button>
        </Grid>
        <Grid item xs={12} md={4}>
            <Button component={ Link } target="_blank" to={"/srfroute/" + SRFID} variant="contained" color="primary" style={{padding:10}}>SRF ROUTE DETAILS</Button>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
  
    <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={12} md={4}><Barcode id="imgBarcode" value={VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ} renderer={'svg'}/></Grid>
            <Grid item xs={12} md={8}><Typography variant="h3" align="center" gutterBottom style={{fontSize:40,color:"#815099","font-weight":"bold"}}>SAMPLE ROOM REQUEST FORM</Typography></Grid>
      <Grid item xs={12} md={6}>
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>SRF Create By</Typography>
      <Typography variant="caption" display="block" gutterBottom>{VAL_CREATEBY}</Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Customer Category</Typography>
      <Typography variant="caption" display="block" gutterBottom>{VAL_CUSNAME}</Typography>
      </Box>
       
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Style No</Typography>
      <Typography variant="caption" display="block" gutterBottom>{VAL_STYLE}</Typography>
      </Box> 

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Style Description</Typography>
      <Typography variant="caption" display="block" gutterBottom>{VAL_STYLEDESC} </Typography>
      </Box>
      

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Floorset/Identifire</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_FLOORSET} </Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Sample Stage</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAR_SAMPLESTAGE} </Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Sample Required Date</Typography>
      <Typography variant="caption" display="block" gutterBottom> {Moment(selectedDate).format('DD-MMM-yyyy')} </Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Issue Note No / DAN</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_ISSUENOTE} </Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Product Route</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAR_ROUTE} </Typography>
      </Box> 

      </Grid>
      <Grid item xs={12} md={6}>
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Body Fabric Type</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_BODYFABRIC} </Typography>
      </Box>
    
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Garment Dispatch</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_GARDISPATCH} </Typography>
      </Box>
   
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Colors</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_COLORS} </Typography>
      </Box>
           
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Graphics</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_GRAPHICS} </Typography>
      </Box>
            
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Wash Developments</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_WASH} </Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Main Body Fabric CW</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_BODYFABCW} </Typography>
      </Box>
   
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Main Body Fabric CW Unit</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_BODYFABCWUNIT} </Typography>
      </Box>

      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Fabric Relaxing Hours</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_FABRELAXHOURS} </Typography>
      </Box>
   
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography variant="button" gutterBottom className={classes.elmheading}>Placement Board Requirement</Typography>
      <Typography variant="caption" display="block" gutterBottom> {VAL_PLACEMENTBOARD} </Typography>
      </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
       
      <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
      <Typography gutterBottom className={classes.elmheading}>Product Routing Steps</Typography>
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
                <TableCell align="left" style={{fontSize:12,color:"#1D2951","font-weight":600}}>{itemselect.proelmname}</TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TableContainer>
      </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid hidden={!ISEMBPLANT}>
        <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
        <Typography gutterBottom className={classes.elmheading}>Embllishment Plant Details</Typography>

        {DSET_SRFEMB.map((row) => (
          <><Box p={1} m={0.5} style={{color:"black",backgroundColor:"#e6f0ff"}}><Typography variant="caption" display="block" gutterBottom># {row.plant_name} </Typography></Box></>
            ))}
        </Box>
        </Grid>
        <Grid hidden={!ISDWPLANT}>
        <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
        <Typography gutterBottom className={classes.elmheading}>Dye/Wash Plant Details</Typography>

        {DSET_SRFDW.map((row) => (
          <><Box p={1} m={0.5} style={{color:"black",backgroundColor:"#e6f0ff"}}><Typography variant="caption" display="block" gutterBottom># {row.plant_name} </Typography></Box></>
            ))}
        </Box>
        </Grid>

      </Grid>

      <Grid item xs={12} md={12}>
  
    <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
    <Typography gutterBottom className={classes.elmheading}>SIZE REQUEST</Typography>
    <Table className={classes.table}>
      <TableHead>
        <TableRow TableRow>
        <TableCell size="small" style={{width:"10%"}} align="left">
          <Typography className={classes.tableheading} gutterBottom>Size</Typography>
        </TableCell>
        <TableCell size="small" style={{width:"10%"}} align="left">
          <Typography className={classes.tableheading} gutterBottom>Order Qty</Typography>
        </TableCell>
        <TableCell size="small" style={{width:"10%"}} align="left">
          <Typography className={classes.tableheading} gutterBottom>Dis. Qty</Typography>
        </TableCell>
        <TableCell size="small" style={{width:"20%"}} align="left">
          <Typography className={classes.tableheading} gutterBottom>Vendor</Typography>
        </TableCell>
        <TableCell size="small" style={{width:"25%"}} align="left">
          <Typography className={classes.tableheading} gutterBottom>Dispatch Address</Typography>
        </TableCell>
        <TableCell size="small" style={{width:"15%"}} align="left">
          <Typography className={classes.tableheading} gutterBottom>Dispatch Remark</Typography>
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {DSET_SRFSIZES.map((row) => (
        <TableRow key={row.size_name}>
          <TableCell size="small" align="left" style={{fontSize:12,color:"black"}}>{row.size_name}</TableCell>
          <TableCell size="small" align="left" style={{fontSize:12,color:"black"}}>{row.size_qty}</TableCell>
          <TableCell size="small" align="left" style={{fontSize:12,color:"black"}}>{row.dis_qty}</TableCell>
          <TableCell size="small" align="left" style={{fontSize:12,color:"black"}}>{row.dis_vendor}</TableCell>
          <TableCell size="small" align="left" style={{fontSize:12,color:"black"}}>{row.dis_address}</TableCell>
          <TableCell size="small" align="left" style={{fontSize:12,color:"black"}}>{row.dis_comment}</TableCell>
        </TableRow>
                ))}
</TableBody>
</Table>
    </Box>
    </Grid>

      <Grid item xs={12} md={12}>
        <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
          <Typography variant="button" gutterBottom className={classes.elmheading}>SRF Image</Typography>
          <Image src={VAL_SRFIMGBASE64}/>
        </Box>
      </Grid>

     

  <Grid item xs={12} md={12}>
  <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
    <Typography gutterBottom className={classes.elmheading}>SRF Comments</Typography>

  {DSET_COMMENTS.map((row) => (
    <><Box p={1} m={0.5} style={{color:"black",backgroundColor:"#e6f0ff"}}><Typography variant="caption" display="block" gutterBottom># {row.comment_desc} </Typography></Box></>
            ))} 
  
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
