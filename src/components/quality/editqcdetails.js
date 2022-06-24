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
//import Select from 'react-select';
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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
    backgroundColor:"#d65d4d"
  }
});

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

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle style={{backgroundColor:"#3632a8"}} disableTypography className={classes.root} {...other}>
        <Typography variant="h6" style={{color: "white"}}>{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  

export default function Editqc() {
    const classes = useStyles();
    var apiurl = localStorage.getItem('session_apiurl');
    const [open, setOpen] = React.useState(true);
    var Userid = localStorage.getItem('session_userid');
    const [IsFinished, setIsFinished] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [QCID] = React.useState(window.location.href.split('/').reverse()[2]);
    const [ELMID] = React.useState(window.location.href.split('/').reverse()[1]);
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [DSET_QCITEMS, setDSET_QCITEMS] = React.useState([]);
    const [DSET_REWORKITEMS, setDSET_REWORKITEMS] = React.useState([]);

    const [Openaddrework, setOpenaddrework] = React.useState(false);
    const [QcqtyId, setQcqtyId] = React.useState([]);
    const [OrderSize, setOrderSize] = React.useState([]);
    const [OrderQty, setOrderQty] = React.useState([]);
    const [ReworkQty, setReworkQty] = React.useState([]);
    const [ReworkReason, setReworkReason] = React.useState([]);
    const [RECMSGERROR, setRECMSGERROR]= React.useState("");

    const [Openuprework, setOpenuprework] = React.useState(false);
    const [ReWorkSize, setReWorkSize] = React.useState([]);
    const [ReWorkQty, setReWorkQty] = React.useState([]);
    const [ReWorkId, setReWorkId] = React.useState([]);
    const [QcAppQty, setQcAppQty] = React.useState([]);

    const [VAL_QCITEM_ID, setVAL_QCITEM_ID] = React.useState([]);
    const [VAL_SIZE, setVAL_SIZE] = React.useState([]);
    const [VAL_REQUEST, setVAL_REQUEST] = React.useState([]);
    const [VAL_OUT, setVAL_OUT] = React.useState([]);
    const [VAL_APPROVE, setVAL_APPROVE] = React.useState([]);
    const [VAL_REJECT, setVAL_REJECT] = React.useState([]);
    const [VAL_COMMENT, setVAL_COMMENT] = React.useState("");
 
    
    const OnChange_approve_qty = (e) => {
      setVAL_APPROVE(e.target.value);
    };

    const OnChange_reject_qty = (e) => {
      setVAL_REJECT(e.target.value);
    };

    const OnChange_comment = (e) => {
      setVAL_COMMENT(e.target.value);
    };

    const OnChange_rwqty = (e) => {
      setReworkQty(e.target.value);
    };

    const OnChange_rwreason = (e) => {
      setReworkReason(e.target.value);
    };

    const OnChange_rwappqty = (e) => {
      setQcAppQty(e.target.value);
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

        if(VAL_QCITEM_ID === null || VAL_QCITEM_ID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Select Entry and Update.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_APPROVE === null || VAL_APPROVE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Approved Qty.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_Sizeqty = /^[0-9\b]+$/;

        if (!Reg_Sizeqty.test(VAL_APPROVE)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Approved Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
         }

        if(VAL_REJECT === null || VAL_REJECT.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Reject Qty.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if (!Reg_Sizeqty.test(VAL_REJECT)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Rejected Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
         }

         var VALSUM = Number(VAL_APPROVE) + Number(VAL_REJECT); 

         if(VALSUM !== Number(VAL_OUT))
         {
          Swal.fire({  title: 'Error!',  text: 'Your Approved and Rejected Quantities are Mismatching with Sewing Out Quantity! Please Recheck Approved and Rejected Qty.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
         }

        if(Number(VAL_REJECT) > 0)
        {
            if(JSON.stringify(VAL_COMMENT).length <= 0 || VAL_COMMENT === null || VAL_COMMENT === "")
            {
              Swal.fire({  title: 'Error!',  text: 'Sorry! Please Enter Valid Reason For Rejected Qty.',  icon: 'error',  confirmButtonText: 'OK'});
              return;
            }
        }
    
        
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "userid": Userid,
                "qcqtyid": VAL_QCITEM_ID,
                "approve": VAL_APPROVE,
                "reject": VAL_REJECT,
                "comment": VAL_COMMENT,
            })
        };
  
        fetch(`http://${apiurl}/quality/updateqtyitem`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                { 
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});

                    setVAL_QCITEM_ID("");
                    setVAL_SIZE("");
                    setVAL_REQUEST("");
                    setVAL_OUT("");
                    setVAL_APPROVE("");
                    setVAL_REJECT("");
                    setVAL_COMMENT("");
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
  
                fetch(`http://${apiurl}/quality/pendingqcitems/${ELMID}/${SRFID}`)
            .then(res => res.json())
            .then(response => { setDSET_QCITEMS(response.qcitems); })
            .catch(error => console.log(error));
          
            })
            .catch(error => console.log(error));
  
    };
 
  function OpenAddRework(val1,val2,val3)
  {
    setQcqtyId(val1);
    setOrderSize(val2);
    setOrderQty(val3);
    setReworkQty("");
    setReworkReason("");
    setRECMSGERROR("");
    setOpenaddrework(true);
  }

  function OpenUpdateRework(val1,val2,val3)
  {
    setReWorkId(val1);
    setReWorkSize(val2);
    setReWorkQty(val3);
    setQcAppQty("");
    setOpenuprework(true);
  }

  const CloseAddRework = () => 
  {
    setOpenaddrework(false);
  }

  const CloseUpRework = () => 
  {
    setOpenuprework(false);
  }

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
        
        fetch(`http://${apiurl}/quality/getqcitemdetails/${item}`)
              .then(res => res.json())
              .then(response => {
                setVAL_QCITEM_ID(response.qcitemdetails[0].qcqty_id);
                setVAL_SIZE(response.qcitemdetails[0].size_name);
                setVAL_REQUEST(response.qcitemdetails[0].order_qty);
                setVAL_OUT(response.qcitemdetails[0].outqty);
                setVAL_APPROVE(response.qcitemdetails[0].qc_approve);
                setVAL_REJECT(response.qcitemdetails[0].qc_reject);

                if (response.qcitemdetails[0].qc_cmt !== "null") {setVAL_COMMENT(response.srfdetails[0].body_fab_type);}
                else{setVAL_COMMENT("");}

                })
              .catch(error => console.log(error));
              
        return;
    };

    const addtorework = () => {
        
      setRECMSGERROR(""); 
      const Reg_Sizeqty = /^[0-9\b]+$/;

      if (!Reg_Sizeqty.test(ReworkQty)) 
      {
          setRECMSGERROR("Please Enter Integer Value For Rework Quantity");
          return;
      }

      if (QcqtyId.length === 0) 
      {
          setRECMSGERROR("Please Select Size Again");
          return;
      }

      const sendOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userid": Userid,
            "srfid": SRFID,
            "proelmid": `${ELMID}`,
            "qcqtyid": QcqtyId,
            "rwqty": ReworkQty,
            "rwcomment": ReworkReason

        })
      };

      fetch(`http://${apiurl}/quality/addtoreworklist`,sendOptions)
      .then(res => res.json())
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
      .then(datato =>
        {
          fetch(`http://${apiurl}/quality/getreworkitems/${ELMID}/${SRFID}`)
            .then(resdata => resdata.json())
            .then(response => { setDSET_REWORKITEMS(response.reworkdetails); })
            .catch(errorin => {Swal.fire({  title: 'Error!',  text: errorin,  icon: 'error',  confirmButtonText: 'OK'});});
        })
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});} );

      setOpenaddrework(false);
      
  };

  const reworkqc = () => {
        
    setRECMSGERROR(""); 
    const Reg_Sizeqty = /^[0-9\b]+$/;

    if (!Reg_Sizeqty.test(QcAppQty)) 
    {
        setRECMSGERROR("Please Enter Integer Value For Rework QC Quantity");
        return;
    }

    if (ReWorkId.length === 0) 
    {
        setRECMSGERROR("Please Select Rework Entry Again");
        return;
    }

    const sendOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          "userid": Userid,
          "rwid": ReWorkId,
          "qcqty": QcAppQty

      })
    };

    fetch(`http://${apiurl}/quality/updatereworklist`,sendOptions)
    .then(res => res.json())
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
    .then(datato =>
      {
        fetch(`http://${apiurl}/quality/getreworkitems/${ELMID}/${SRFID}`)
          .then(resdata => resdata.json())
          .then(response => { setDSET_REWORKITEMS(response.reworkdetails); })
          .catch(errorin => {Swal.fire({  title: 'Error!',  text: errorin,  icon: 'error',  confirmButtonText: 'OK'});});
      })
    .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});} );

    setOpenuprework(false);
    
};

    const saveascomplete = () => {
        fetch(`http://${apiurl}/quality/qccompleted/${SRFID}/${QCID}/${Userid}`)
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

    const saveasedit = () => {
        
        Swal.fire({  title: 'Success!',  text: 'Save As Edit/Pending Mode',  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
            window.location = "/QCLIST/";
        });
        
    };

    useEffect(() => {
    
      fetch(`http://${apiurl}/quality/pendingqcitems/${ELMID}/${SRFID}`)
      .then(res => res.json())
      .then(response => { setDSET_QCITEMS(response.qcitems); })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/quality/getreworkitems/${ELMID}/${SRFID}`)
      .then(res => res.json())
      .then(response => { setDSET_REWORKITEMS(response.reworkdetails); })
      .catch(error => console.log(error));

      if(IsFinished === true)
      {
        const sendOptionsNextStep = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": SRFID,
              "proelmid": `${ELMID}`,
          })
        };

        fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
        .then(resNextStep => resNextStep.json())
        .then(dataNextStep => 
        {
            if(dataNextStep.Type === "SUCCESS")
            { 
                Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                  window.location = "/QCLIST/";
              });
            }

            if(dataNextStep.Type === "ERROR")
            {
                Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
    
        })
        .catch(error => console.log(error));
      }

  
}, [SRFID,apiurl,ELMID,QCID,IsFinished]);

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
            
            <Typography variant="subtitle1" style={{color:"purple"}} gutterBottom>UPDATE QUALITY CHECKING DETAILS</Typography>
  
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Size</Typography>
                <TextField id="txtFabricyy"  value={VAL_SIZE} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Order</Typography>
                <TextField id="txtUnit"  value={VAL_REQUEST} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Sewing</Typography>
                <TextField id="txtPerimeter"  value={VAL_OUT} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Approve</Typography>
                <TextField id="txtPcs"  value={VAL_APPROVE} onChange={OnChange_approve_qty} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Reject</Typography>
                <TextField id="txtPlies"  value={VAL_REJECT} onChange={OnChange_reject_qty} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell colSpan={2} size="small" style={{"font-weight":800,width:"50%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Reason/Comment</Typography>
                <TextField id="txtPlies"  value={VAL_COMMENT} onChange={OnChange_comment} variant="outlined" style={{width:"100%"}} size="small"/>
                </TableCell>
                <TableCell size="small" style={{width:"15%"}} align="right">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom></Typography>
                <Button variant="contained" color="primary" style={{padding:10}} onClick={updatedata}>UPDATE</Button>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_QCITEMS.map((row) => (
                <TableRow key={row.qcqty_id}>
                    <TableCell size="small" align="right">{row.size_name}</TableCell>
                <TableCell size="small" align="right">{row.order_qty}</TableCell>
                <TableCell size="small" align="right">{row.outqty}</TableCell>
                <TableCell size="small" align="right">{row.qc_approve}</TableCell>
                <TableCell size="small" align="right">{row.qc_reject}</TableCell>
                <TableCell size="small" align="right">{row.qc_cmt}</TableCell>
                <TableCell size="small" align="right">
                    <Button variant="contained" style={{backgroundColor:"#cfcfcf",color:"black",padding:5}} onClick={() => gettoupdate(row.qcqty_id)} >EDIT</Button>
               </TableCell>
               <TableCell size="small" align="right">
                    <Button variant="contained" style={{backgroundColor:"#343434",color:"white",padding:5}} onClick={() => OpenAddRework(row.qcqty_id,row.size_name,row.order_qty)} >REWORK</Button>
               </TableCell>
        </TableRow>
                    ))}
        </TableBody>
        </Table>

              <Dialog maxWidth="md" fullWidth={true} onClose={CloseAddRework} aria-labelledby="customized-dialog-title-Comment" open={Openaddrework} >
                  <DialogTitle id="customized-dialog-title-Comment" onClose={CloseAddRework}>
                  {"Add This Size Quantity To Rework" }
                  </DialogTitle>
                  <DialogContent dividers>
                  <Typography variant="h6" style={{color:"red",fontSize:"15px"}}>{RECMSGERROR}</Typography>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>Size</Typography>
                      <TextField id="txtRWsize"  value={OrderSize} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>Order Qty</Typography>
                      <TextField id="txtRWoqty"  value={OrderQty} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>Rework Qty</Typography>
                      <TextField id="txtRWqty" value={ReworkQty} variant="outlined" style={{width:"100%"}} size="small" onChange={OnChange_rwqty}/>
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>Special Comment/Remark</Typography>
                      <TextField id="txtRWcomment"  value={ReworkReason} variant="outlined" style={{width:"100%"}} size="small" onChange={OnChange_rwreason}/>
                  </Grid>
                  <Grid item xs={12} md={12}>
                  <br/>
                  <Button variant="contained" style={{backgroundColor:"#a34444",color:"white",padding:10}} onClick={() => addtorework()} >ADD TO REWORK LIST</Button>
                  </Grid>
                      
                  </DialogContent>
                  <DialogActions>
                  
                  </DialogActions>
              </Dialog>
 
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={6} md={6}>
                <Button onClick={saveascomplete} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch'}} >Finished & Complete</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch'}} >Save as Edit</Button>
            </Grid> 
        </Grid>

        </Grid>

        <Grid item xs={12} md={12}>

        <Typography variant="subtitle1" style={{color:"brown"}} gutterBottom>REWORK ITEMS</Typography>

        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow TableRow>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Size</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>ReWork Qty</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":900,width:"15%"}} align="left">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>ReWork Status</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="left">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Approve Qty</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"30%"}} align="left">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Reason/Comment</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="left">
                <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13}} gutterBottom>Update</Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DSET_REWORKITEMS.map((row) => (
                <TableRow key={row.rew_id}>
                    <TableCell size="small" align="left">{row.garmentsize}</TableCell>
                <TableCell size="small" align="left">{row.rework_qty}</TableCell>
                <TableCell size="small" align="left">{row.rework_status}</TableCell>
                <TableCell size="small" align="left">{row.qc_accept}</TableCell>
                <TableCell size="small" align="left">{row.rework_remark}</TableCell>
                <TableCell size="small" align="left">
                    {row.rework_status === "Work Done" ? (
                      <Button variant="contained" style={{backgroundColor:"#6e41b5",color:"white",padding:5}} onClick={() => OpenUpdateRework(row.rew_id,row.garmentsize,row.rework_qty)} >CHECK</Button>
                    ) : (
                      <></>
                    )}
                    
               </TableCell>
        </TableRow>
                    ))}
        </TableBody>
        </Table>

        <Dialog maxWidth="md" fullWidth={true} onClose={CloseUpRework} aria-labelledby="customized-dialog-title-Comment" open={Openuprework} >
                  <DialogTitle id="customized-dialog-title-Comment" onClose={CloseUpRework}>
                  {"QC and Approve Rework Item" }
                  </DialogTitle>
                  <DialogContent dividers>
                  <Typography variant="h6" style={{color:"red",fontSize:"15px"}}>{RECMSGERROR}</Typography>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>Size</Typography>
                      <TextField id="txtRWusize"  value={ReWorkSize} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small"/>
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>Rework Qty</Typography>
                      <TextField id="txtRWuqty" value={ReWorkQty} InputProps={{readOnly:true}} variant="outlined" style={{width:"100%"}} size="small" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <Typography variant="subtitle2" style={{fontWeight:700,fontSize:13,color:"purple"}} gutterBottom>QC Approve Qty</Typography>
                      <TextField id="txtRWappqty"  value={QcAppQty} variant="outlined" style={{width:"100%"}} size="small" onChange={OnChange_rwappqty}/>
                  </Grid>
                  <Grid item xs={12} md={12}>
                  <br/>
                  <Button variant="contained" style={{backgroundColor:"#36c270",color:"white",padding:10}} onClick={() => reworkqc()} >UPDATE REWORK QC STATUS</Button>
                  </Grid>
                      
                  </DialogContent>
                  <DialogActions>
                  
                  </DialogActions>
              </Dialog>

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