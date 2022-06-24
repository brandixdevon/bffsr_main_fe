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
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
    const [VAL_SIZE, setVAL_SIZE] = React.useState([]);
    const [VAL_REQ_QTY, setVAL_REQ_QTY] = React.useState([]);
    const [VAL_DIS_QTY, setVAL_DIS_QTY] = React.useState([]);
    const [VAL_ITEM_ID, setVAL_ITEM_ID] = React.useState([]);
    const [DSET_ITEMS, setDSET_ITEMS] = React.useState([]);
    var Userid = localStorage.getItem('session_userid');
    const [IsFinished, setIsFinished] = React.useState(false);
    const [DISID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[1]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
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
        
        fetch(`http://${apiurl}/dispatch/getitemdetails/${item}`)
              .then(res => res.json())
              .then(response => {
                setVAL_ITEM_ID(response.dispatchdetails[0].srfsize_id);
                setVAL_SIZE(response.dispatchdetails[0].size_name);
                setVAL_REQ_QTY(response.dispatchdetails[0].size_qty);
                setVAL_DIS_QTY('');
                })
              .catch(error => console.log(error));
              
        return;
    };

    const Saveasedit = () => {
        
        window.location = "/DISPATCHLIST/";
        
    };

    const ConfirmUpdate = item => {
    
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
    
        Swal.fire({
            title: 'Are you sure?',
            text: "Do You Complete this Dispatch Process.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, already completed!'
        }).then((result) => {
            if (result.value) {
   
                fetch(`http://${apiurl}/dispatch/dispatchcompleted/${SRFID}/${Userid}`)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                      setIsFinished(true);
                        
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
                    
                })
                .catch(error => console.log(error));
      
            }
        })
  
    };

    const OnChange_dispatchqty = (e) => {
      setVAL_DIS_QTY(e.target.value);
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

    if(VAL_ITEM_ID === null || VAL_ITEM_ID.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select Entry and Update.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    if(VAL_DIS_QTY === null || VAL_DIS_QTY.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Qty For Dispatch.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    const Reg_Sizeqty = /^[0-9\b]+$/;

    if (!Reg_Sizeqty.test(VAL_DIS_QTY)) 
    {
        Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Dispatch Qty',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    if(VAL_DIS_QTY > VAL_REQ_QTY)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Dispatch Quantity Can Not Be Greater Than Request Quantity.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    
    const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "srfid": SRFID,
            "userid": Userid,
            "srfsizeid": VAL_ITEM_ID,
            "disqty": VAL_DIS_QTY,
        })
    };

    fetch(`http://${apiurl}/dispatch/updateiemdetails`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

                setVAL_ITEM_ID("");
                setVAL_SIZE("");
                setVAL_REQ_QTY("");
                setVAL_DIS_QTY("");
            }

            if(data.Type === "ERROR")
            {
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            }

            fetch(`http://${apiurl}/dispatch/getitems/${SRFID}`)
            .then(res => res.json())
            .then(response => { setDSET_ITEMS(response.dispatchitems); })
            .catch(error => console.log(error));
      
        })
        .catch(error => console.log(error));

};

useEffect(() => {
    
  fetch(`http://${apiurl}/dispatch/getitems/${SRFID}`)
  .then(res => res.json())
  .then(response => { setDSET_ITEMS(response.dispatchitems); })
  .catch(error => console.log(error));

if(IsFinished === true)
{
const sendOptionsNextStep = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
      "srfid": SRFID,
      "proelmid": DISID,
  })
};

fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
.then(resNextStep => resNextStep.json())
.then(dataNextStep => 
{
  if(dataNextStep.Type === "SUCCESS")
  { 
        Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
          window.location = "/DISPATCHLIST/";
      });
  }

  if(dataNextStep.Type === "ERROR")
  {
      Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
  } 

})
.catch(error => console.log(error));
}

}, [SRFID,apiurl,IsFinished,DISID]);


    
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
        <Grid item xs={12} md={12}>
           
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={12} md={12}>
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>GARMENT/S OR ITEM/S TO DISPATCH</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"20%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Size</Typography>
                <TextField id="txtFabricyy"  value={VAL_SIZE} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"20%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Req. Qty</Typography>
                <TextField id="txtUnit"  value={VAL_REQ_QTY} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Dis. Qty</Typography>
                <TextField id="txtPerimeter"  value={VAL_DIS_QTY} onChange={OnChange_dispatchqty} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Dis. Vendor</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom>Vendor Address</Typography>
                </TableCell>
                <TableCell size="small" style={{width:"15%"}} align="right">
                <Typography variant="subtitle2" gutterBottom></Typography>
                <Button variant="contained" color="primary" style={{padding:10}} onClick={updatedata}>UPDATE</Button>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_ITEMS.map((row) => (
                <TableRow key={row.srfsize_id}>
                    <TableCell size="small" align="right">{row.size_name}</TableCell>
                <TableCell size="small" align="right">{row.size_qty}</TableCell>
                <TableCell size="small" align="right">{row.dis_qty}</TableCell>
                <TableCell size="small" align="right">{row.dis_vendor}</TableCell>
                <TableCell size="small" align="right">{row.dis_address}</TableCell>
                <TableCell size="small" align="right">
                    <Button variant="contained" style={{backgroundColor:"#cfcfcf",color:"black",padding:10}} onClick={() => gettoupdate(row.srfsize_id)} >EDIT</Button>
               </TableCell>
        </TableRow>
                    ))}
        </TableBody>
        </Table>
            </Grid>
            <Grid item xs={6} md={6}>
            <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={ConfirmUpdate}>Update As Completed</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={Saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch',margin:5}} >Save as Edit</Button>
            </Grid>
        </Grid>

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