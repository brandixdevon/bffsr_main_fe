import React, { useEffect }  from 'react';
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
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
import GetSideView from '../srf/getsrfsideview';

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

export default function Editsrf() {
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

    const [SEWID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[1]);

    const [DSET_SEWQTY, setDSET_SEWQTY] = React.useState([]);
    
    const [VAL_SEWQTY_ID, setVAL_SEWQTY_ID] = React.useState([]);
    const [VAL_SEW_SIZE, setVAL_SEW_SIZE] = React.useState([]);
    const [VAL_SEW_ORDERQTY, setVAL_SEW_ORDERQTY] = React.useState([]);
    const [VAL_SEW_INQTY, setVAL_SEW_INQTY] = React.useState([]);
    const [VAL_SEW_INCOMMENT, setVAL_SEW_INCOMMENT] = React.useState([]);
     
    const OnChange_inqty = (e) => {
      setVAL_SEW_INQTY(e.target.value);
    };

    const OnChange_incomment = (e) => { 
      setVAL_SEW_INCOMMENT(e.target.value);
    };

    const updatedata = (e) => {
        e.preventDefault()
        
        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(Userid.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct User.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_SEWQTY_ID === null || VAL_SEWQTY_ID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select Entry and Update.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
  
        if(VAL_SEW_INQTY === null || VAL_SEW_INQTY.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Sewing In Qty.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_Sizeqty = /^[0-9\b]+$/;

        if (!Reg_Sizeqty.test(VAL_SEW_INQTY)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Sewing In Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
         }

         if(parseInt(VAL_SEW_ORDERQTY) < parseInt(VAL_SEW_INQTY))
         {
            Swal.fire({  title: 'Error!',  text: 'Sewing In Qty Can not be greater than Order Qty.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
         }
        
        if(VAL_SEW_ORDERQTY !== VAL_SEW_INQTY)
        {
          if(VAL_SEW_INCOMMENT === null || VAL_SEW_INCOMMENT.length <= 0)
          {
              Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Comment For Sawing Out Value Mismatch.',  icon: 'error',  confirmButtonText: 'OK'});
              return;
          }
        }
    
        
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userid": Userid,
                "sewentryid": VAL_SEWQTY_ID,
                "inqty": VAL_SEW_INQTY,
                "comment": VAL_SEW_INCOMMENT,
            })
        };
  
        fetch(`http://${apiurl}/sewing/updatesewinqty`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

                    setVAL_SEWQTY_ID("");
                    setVAL_SEW_SIZE("");
                    setVAL_SEW_ORDERQTY("");
                    setVAL_SEW_INQTY("");
                    setVAL_SEW_INCOMMENT("");
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
                fetch(`http://${apiurl}/sewing/getsewinqty/${SRFID}/${SEWID}`)
                .then(res => res.json())
                .then(response => { setDSET_SEWQTY(response.sewingqty); })
                .catch(error => console.log(error));
          
            })
            .catch(error => console.log(error));
  
    };
 
    const renderRedirect = () => {
        var myRegxp = /^([0-9]){10}$/;
        if(myRegxp.test(SRFID) === false)
        {
            Swal.fire({  title: 'Error!',  text: 'Invalid SRF ID',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/LOGIN/"} />
            }
    
    };

    const loginValidation = () => {
        //Swal.fire({  title: 'Error!',  text: 'Please Log In',  icon: 'error',  confirmButtonText: 'OK'});
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

    const gettoupdate = item =>
    {
        
        fetch(`http://${apiurl}/sewing/getsewqtydetails/${item}`)
              .then(res => res.json())
              .then(response => {
                setVAL_SEWQTY_ID(response.sewingqtydetails[0].sewqty_id);
                setVAL_SEW_SIZE(response.sewingqtydetails[0].size_name);
                setVAL_SEW_ORDERQTY(response.sewingqtydetails[0].order_qty);
                setVAL_SEW_INQTY("");
                setVAL_SEW_INCOMMENT("");
                })
              .catch(error => console.log(error));
              
        return;
    };
     useEffect(() => {
    
      fetch(`http://${apiurl}/sewing/getsewinqty/${SRFID}/${SEWID}`)
          .then(res => res.json())
          .then(response => { setDSET_SEWQTY(response.sewingqty); })
          .catch(error => console.log(error)); 
      
  }, [SRFID,SEWID,apiurl]);

    return (
        <div className={classes.root}>
        {loginValidation()}
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
        <Grid item xs={12} md={3} lg={3}>
          <Button component={ Link } to={"/SEWIN/"} variant="contained" style={{padding:5,margin:5,backgroundColor:"#455433",color:"white"}} >Go Back</Button>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Button component={ Link } to={"/sewoutqtyupdate/" + SRFID + "/" + SEWID} variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#28AB9C",color:"white"}} >Qty Out</Button>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Button component={ Link } to={"/SEWMOALLOCATE/" + SRFID + "/" + SEWID}  variant="contained" color="secondary" style={{padding:5,margin:5,backgroundColor:"#8E1FBA",color:"white"}} >MO List</Button>
        </Grid>
        <Grid item xs={12} md={12}>
            
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>UPDATE SEWING IN QUANTITY DATA</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Size</Typography>
                <TextField id="txtFabricyy"  value={VAL_SEW_SIZE} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Order Qty</Typography>
                <TextField id="txtUnit"  value={VAL_SEW_ORDERQTY} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Sew In Qty</Typography>
                <TextField id="txtPerimeter"  value={VAL_SEW_INQTY} onChange={OnChange_inqty} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"40%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Sew In Comment</Typography>
                <TextField id="txtPcs"  value={VAL_SEW_INCOMMENT} onChange={OnChange_incomment} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom></Typography>
                <Button variant="contained" color="primary" style={{padding:10}} onClick={updatedata}>UPDATE</Button>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_SEWQTY.map((row) => (
              <TableRow key={row.sewqty_id}>
                <TableCell size="small" align="right">{row.size_name}</TableCell>
                <TableCell size="small" align="right">{row.order_qty}</TableCell>
                <TableCell size="small" align="right">{row.sew_in}</TableCell>
                <TableCell size="small" align="right">{row.sew_in_cmt}</TableCell>
                <TableCell size="small" align="right">
                   { row.sew_in === null || row.sew_in.length <= 0 ?
                    <Button variant="contained" style={{backgroundColor:"#C5814F",color:"white",padding:10}} onClick={() => gettoupdate(row.sewqty_id)} >EDIT</Button>
                   :
                    <></>
                   }
                </TableCell>
              </TableRow>
                    ))}
        </TableBody>
        </Table>

          
        </Grid>

        <Grid item xs={12} md={12}>
            
            
           <GetSideView srfid={SRFID} />
            
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