import React,{useEffect }  from 'react';
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
import Button from '@material-ui/core/Button';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Copyright from '../mainlayout/copyright';
import MainHeader from '../mainlayout/mainheader';
import GetSideView from '../srf/getsrfsideview';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const [VAL_SIZES, setVAL_SIZES] = React.useState([]);
    const [VAL_PLANTS, setVAL_PLANTS] = React.useState([]);
    const [VAL_PANEL, setVAL_PANEL] = React.useState([]);
    const [VAL_QTY, setVAL_QTY] = React.useState([]);
    const [VAL_GATEPASS, setVAL_GATEPASS] = React.useState([]);
    const [VAL_PLACEMENTBOARD, setVAL_PLACEMENTBOARD] = React.useState("");
    const [DSET_LIST, setDSET_LIST] = React.useState([]);
    const [DSET_SIZES, setDSET_SIZES] = React.useState([]);
    const [DSET_PLANTS, setDSET_PLANTS] = React.useState([]);
    const [VAL_REFERENCE_CHANGE, setVAL_REFERENCE_CHANGE] = React.useState(false);
    const [VAL_SELSIZEID, setVAL_SELSIZEID] = React.useState("");
    const [VAL_SELSIZENAME, setVAL_SELSIZENAME] = React.useState("");
    const [VAL_SELPLANTID, setVAL_SELPLANTID] = React.useState("");
    const [VAL_SELPLANTNAME, setVAL_SELPLANTNAME] = React.useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [PROELMID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[1]);

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

    const saveascomplete = () => {
      
      if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(PROELMID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find ELEMENT IN ROUTE ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "userid":Userid,
              "srfid": SRFID,
              "elmid": PROELMID,
          })
        };
      
      fetch(`http://${apiurl}/embellishment/embcompleted`,sendOptions)
              .then(response => response.json())
              .then(data => 
              {
                  if(data.Type === "SUCCESS")
                  {
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                      window.location = "/ALLEMBLIST/";
                  });
                    
                  }

                  if(data.Type === "ERROR")
                  {
                      Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                  }

        
              })
              .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});} );
  }

    const Saveasedit = () => {
        
        window.location = "/ALLEMBLIST/";
        
    };


    const OnChange_panel = (e) => {
        setVAL_PANEL(e.target.value);
      };

      const OnChange_gp = (e) => {
        setVAL_GATEPASS(e.target.value);
        setVAL_REFERENCE_CHANGE(true);
      };

      const OnChange_qty = (e) => {
        setVAL_QTY(e.target.value);
      };

    const OnChange_size = (e) => {
        setVAL_SIZES(JSON.stringify(e.value));
        setVAL_SELSIZEID(e.value);
        setVAL_SELSIZENAME(e.label);

        fetch(`http://${apiurl}/embellishment/getsizeqty/${e.value}`)
        .then(res => res.json())
        .then(response => { setVAL_QTY(response.sizeqty); })
        .catch(error => {console.log(error); setVAL_QTY("0"); } );

      };

      const OnChange_plant = (e) => {
        setVAL_PLANTS(JSON.stringify(e.value));
        setVAL_SELPLANTID(e.value);
        setVAL_SELPLANTNAME(e.label);
      };

      const handleConfirmDeleteSizes = item => {
    
        Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this Entry!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                const sendOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"srfid" : SRFID , "embitemid" : item})
                };

                fetch(`http://${apiurl}/embellishment/deletepanel`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        fetch(`http://${apiurl}/embellishment/embitemlist/${SRFID}/${PROELMID}`)
                        .then(res => res.json())
                        .then(response => { setDSET_LIST(response.list); })
                        .catch(error => console.log(error));

                        Swal.fire({  title: 'Deleted!',  text: 'Embellishment Entry has been deleted!',  icon: 'info',  confirmButtonText: 'OK'});
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

    const addPanels = () => {
         
        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(PROELMID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find ELEMENT IN ROUTE ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_SIZES.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Size',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_PLANTS.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Plant',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_PANEL.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Panel Description',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
 
        const Reg_isinteger = /^\d+$/;

        if (!Reg_isinteger.test(VAL_QTY)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Sending Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(Number(VAL_QTY) === 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Sending Qty. You Can not send 0 qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
    
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userid" : Userid,
                "srfid": SRFID,
                "elmid": PROELMID,
                "size": VAL_SIZES,
                "plant": VAL_PLANTS,
                "panel": VAL_PANEL,
                "qty": VAL_QTY
            })
        };

        fetch(`http://${apiurl}/embellishment/addpanels`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_SIZES("");
                    setVAL_SELSIZEID("");
                    setVAL_SELSIZENAME("");
                    setVAL_PLANTS("");
                    setVAL_SELPLANTID("");
                    setVAL_SELPLANTNAME("");
                    setVAL_PANEL("");
                    setVAL_QTY("");
                    Swal.fire({  title: 'Success!',  text: 'New Panel Added Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/embellishment/embitemlist/${SRFID}/${PROELMID}`)
                .then(res => res.json())
                .then(response => { setDSET_LIST(response.list); })
                .catch(error => console.log(error));
          
            })
            .catch(error => console.log(error));
 
    };

    const OnChange_placementboard = (e) => {
      setVAL_PLACEMENTBOARD(e.value);

      if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(PROELMID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find ELEMENT IN ROUTE ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(Userid.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find User.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "userid" : Userid,
              "srfid": SRFID,
              "elmid": PROELMID,
              "pbstatus": e.value
          })
      };

      fetch(`http://${apiurl}/embellishment/pbcollect`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

          
            })
            .catch(error => console.log(error));

  };

  const updateGatepass = () => {
         
    if(SRFID.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    if(Userid.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find User.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    if(PROELMID.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find ELEMENT IN ROUTE ID.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }

    if(VAL_GATEPASS.length <= 2)
    {
        Swal.fire({  title: 'Error!',  text: 'Please Enter Valid Gate Pass Number',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }


    const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userid" : Userid,
            "srfid": SRFID,
            "elmid": PROELMID,
            "gatepass": VAL_GATEPASS
        })
    };

    fetch(`http://${apiurl}/embellishment/updategp`,sendOptions)
        .then(response => response.json())
        .then(data => 
        {
            if(data.Type === "SUCCESS")
            { 
                setVAL_REFERENCE_CHANGE(false);
                Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
            }

            if(data.Type === "ERROR")
            {
                
                Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            }
      
        })
        .catch(error => console.log(error));

    

};

    useEffect(() => {
    
          fetch(`http://${apiurl}/embellishment/embitemlist/${SRFID}/${PROELMID}`)
          .then(res => res.json())
          .then(response => { setDSET_LIST(response.list); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/embellishment/embdetails/${SRFID}/${PROELMID}`)
          .then(res => res.json())
          .then(response => { 
              setVAL_GATEPASS(response.embellishment[0].gatepass_no);
              setVAL_PLACEMENTBOARD(response.embellishment[0].pb_collect); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/embellishment/srfsizes/${SRFID}`)
          .then(res => res.json())
          .then(response =>  { setDSET_SIZES(response.sizes); })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/embellishment/srfplants/${SRFID}`)
          .then(res => res.json())
          .then(response =>  { setDSET_PLANTS(response.plants); })
          .catch(error => console.log(error));

      
  }, [SRFID,apiurl,PROELMID]);

    
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
        <List><Mainmenu /></List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth={false} className={classes.container}>
      
    <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
        <Grid item xs={12} md={8}>
            
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>EMBELLISHMENT SENDING DETAILS</Typography>
            </Grid>

            <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>GATE PASS NUMBER</Typography>
                <TextField id="txtgp" onChange={OnChange_gp} variant="outlined" value={VAL_GATEPASS} style={{width:"100%"}} size="small"/>
                { VAL_REFERENCE_CHANGE === true ? ( <p style={{"color":"red"}}>** Please click on button to save your gate pass number.</p> ) : ( <></> )}
                <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={updateGatepass}>Update gate pass number</Button>
            </Grid>

            <Grid item xs={6} md={6}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>PLACEMENT BOARD COLLECTED</Typography>
                <Select id="cmbplacementboard" value={{"value" : VAL_PLACEMENTBOARD,"label" : VAL_PLACEMENTBOARD}} variant="outlined" onChange={OnChange_placementboard} options = {[{"value":"YES","label":"YES"},{"value":"NO","label":"NO"}]} />
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>PANEL DETAILS UPDATE</Typography>
            </Grid>
             
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Select SRF Size</Typography>
                <Select id="cmbsize" value={{"value" : VAL_SELSIZEID,"label" : VAL_SELSIZENAME}} variant="outlined" onChange={OnChange_size} options = {DSET_SIZES} />
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Select SRF Plant</Typography>
                <Select id="cmbplant" value={{"value" : VAL_SELPLANTID,"label" : VAL_SELPLANTNAME}} variant="outlined" onChange={OnChange_plant} options = {DSET_PLANTS} />
            </Grid>

            
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Panel Description</Typography>
                <TextField id="txtpanel" onChange={OnChange_panel} variant="outlined" value={VAL_PANEL} style={{width:"100%"}} size="small"/>

            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" style={{color:"blue",fontWeight:"bold"}} gutterBottom>Qty</Typography>
                <TextField id="txtpqty" onChange={OnChange_qty} variant="outlined" value={VAL_QTY} style={{width:"100%"}} size="small"/>

            </Grid>

            <Grid item xs={12} md={12}>
                <Button variant="contained" color="primary" style={{padding:10,margin:5}} onClick={addPanels}>Add to List</Button>
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>Embellishment Panel List</Typography>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow TableRow>
                        <TableCell size="small" style={{"font-weight":"bold",width:"25%",fontSize:"12px",color:"#daaa11"}} align="left">
                        PLANT
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"25%",fontSize:"12px",color:"#daaa11"}} align="left">
                        SIZE
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"25%",fontSize:"12px",color:"#daaa11"}} align="left">
                        PANEL
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"15%",fontSize:"12px",color:"#daaa11"}} align="left">
                        SEND QTY
                        </TableCell>
                        <TableCell size="small" style={{"font-weight":"bold",width:"10%",fontSize:"12px",color:"#daaa11"}} align="right">
                        #
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {DSET_LIST.map((row) => (
                    <TableRow key={row.embitem_id}>
                    <TableCell size="small" align="left">{row.plantname}</TableCell>
                    <TableCell size="small" align="left">{row.sizename}</TableCell>
                    <TableCell size="small" align="left">{row.emb_panel}</TableCell>
                    <TableCell size="small" align="left">{row.send_qty}</TableCell>
                    <TableCell size="small" align="right">
                    <IconButton aria-label="delete" 
                        onClick={() => handleConfirmDeleteSizes(row.embitem_id)}
                        variant="contained"
                        color="secondary"
                        size="small">
                        <DeleteIcon color="error"  />
                    </IconButton>
                    </TableCell>
            </TableRow>
                            ))}
            </TableBody>
            </Table>
            </Grid>
 
            <Grid item xs={6} md={6}>
            
            <Button variant="contained" color="secondary" style={{padding:10,margin:5}} onClick={saveascomplete}>Update As Completed</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={Saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch',margin:5}} >Save as Edit</Button>
            </Grid>
        </Grid>

        </Grid>

        <Grid item xs={12} md={4}>
             
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