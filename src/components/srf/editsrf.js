import React, { useEffect }  from 'react';
import clsx from 'clsx';
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
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { blue, green } from '@material-ui/core/colors';
import Select from 'react-select';
import Moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Image from 'material-ui-image';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Mainmenu from '../mainlayout/mainmenu';
import {secondaryListItems } from '../mainlayout/submenu';
import { Redirect } from 'react-router-dom';
import { DropzoneArea } from 'material-ui-dropzone';
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
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(1),
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
      rounded: {
        color: '#fff',
        backgroundColor: green[500],
      },
  }));


export default function Editsrf() {
    const classes = useStyles();
    var apiurl = localStorage.getItem('session_apiurl');
    const [open, setOpen] = React.useState(true);
    var Userid = localStorage.getItem('session_userid');

    const [IS_SRFACCESS, setIS_SRFACCESS] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [ISLOADING, setISLOADING] = React.useState(false);
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [DSET_GARMENTSIZES, setDSET_GARMENTSIZES] = React.useState([]);
    const [DSET_SAMPLESTAGE, setDSET_SAMPLESTAGE] = React.useState([]);
    const [DSET_ALLROUTES, setDSET_ALLROUTES] = React.useState([]);
    const [DSET_ROUTESMAP, setDSET_ROUTESMAP] = React.useState([]);
    const [DSET_SRFSIZES, setDSET_SRFSIZES] = React.useState([]);
    const [DSET_SRFEMB, setDSET_SRFEMB] = React.useState([]);
    const [DSET_SRFDW, setDSET_SRFDW] = React.useState([]);
    const [DSET_EMBPLANTS, setDSET_EMBPLANTS] = React.useState([]);
    const [DSET_VENDORS, setDSET_VENDORS] = React.useState([]);
    const [DSET_DWPLNTS, setDSET_DWPLNTS] = React.useState([]);
    const [DSET_COMMENTS, setDSET_COMMENTS] = React.useState([]);
    const [ISDWPLANT, setISDWPLANT] = React.useState(false);
    const [ISEMBPLANT, setISEMBPLANT] = React.useState(false);

    const [ISEDIT, setISEDIT] = React.useState(false);
    const [ISFINISHED, setISFINISHED] = React.useState(false);

    //Form Parameters
    const [VAL_SRFIDCLUSTER, setVAL_SRFIDCLUSTER] = React.useState([]);
    const [VAL_SRFIDDATE, setVAL_SRFIDDATE] = React.useState([]);
    const [VAL_SRFIDSEQ, setVAL_SRFIDSEQ] = React.useState([]);
    const [VAL_CUSID, setVAL_CUSID] = React.useState([]);
    const [VAL_CUSNAME, setVAL_CUSNAME] = React.useState([]);
    const [VAL_STYLE, setVAL_STYLE] = React.useState([]);
    const [VAL_STYLEDESC, setVAL_STYLEDESC] = React.useState([]);
    const [VAL_FLOORSET, setVAL_FLOORSET] = React.useState([]);
    const [VAL_SAMPLESTAGE, setVAL_SAMPLESTAGE] = React.useState([]);
    const [VAL_ROUTE, setVAL_ROUTE] = React.useState([]);

    const [VAL_BODYFABRIC, setVAL_BODYFABRIC] = React.useState("");
    const [VAL_ISSUENOTE, setVAL_ISSUENOTE] = React.useState("");
    const [VAL_GARDISPATCH,setVAL_GARDISPATCH] = React.useState("");
    const [VAL_COLORS,setVAL_COLORS] = React.useState("");
    const [VAL_GRAPHICS,setVAL_GRAPHICS] = React.useState("");
    const [VAL_WASH,setVAL_WASH] = React.useState("");
    const [VAL_BODYFABCW,setVAL_BODYFABCW] = React.useState("");
    const [VAL_BODYFABCWUNIT,setVAL_BODYFABCWUNIT] = React.useState("");
    const [VAL_FABRELAXHOURS,setVAL_FABRELAXHOURS] = React.useState("");
    const [VAL_PLACEMENTBOARD, setVAL_PLACEMENTBOARD] = React.useState("");
    const [VAL_SRFIMG, setVAL_SRFIMG] = React.useState([]);
    const [VAL_SRFIMGBASE64, setVAL_SRFIMGBASE64] = React.useState([]);

    var [VAL_EMBPLANT, setVAL_EMBPLANT] = React.useState([]);
    var [VAL_DWPLANT, setVAL_DWPLANT] = React.useState([]);
    const [VAL_COMMENTDESC, setVAL_COMMENTDESC] = React.useState([]);

    const [VAL_SIZE, setVAL_SIZE] = React.useState([]);
    const [VAL_QTY, setVAL_QTY] = React.useState([]);
    var [VAR_VENDOR, setVAR_VENDOR] = React.useState([]);
    const [VAL_VENDORNAME, setVAL_VENDORNAME] = React.useState([]);
    const [VAL_VENDORADDRESS, setVAL_VENDORADDRESS] = React.useState([]);

    var [VAR_SAMPLESTAGE, setVAR_SAMPLESTAGE] = React.useState([]);
    var [VAR_ROUTE, setVAR_ROUTE] = React.useState([]);
    var [VAR_EMBPLANT, setVAR_EMBPLANT] = React.useState([]);
    var [VAR_DWPLANT, setVAR_DWPLANT] = React.useState([]);

    const [selectedDate, setSelectedDate] = React.useState(new Date());
   
    const OnChange_style = (e) => {
        setVAL_STYLE(e.target.value);
        setISEDIT(true);
    };

    const OnChange_styledesc = (e) => {
        setVAL_STYLEDESC(e.target.value);
        setISEDIT(true);
    };

    const OnChange_floorset = (e) => {
        setVAL_FLOORSET(e.target.value);
        setISEDIT(true);
    };

    const OnChange_samplestage = (e) => { 
        setVAL_SAMPLESTAGE(JSON.stringify(e.value));
        setVAR_SAMPLESTAGE(e);
        setISEDIT(true);
    };

    const OnChange_route = (e) => {
        setVAL_ROUTE(JSON.stringify(e.value));
        setISEDIT(true);
        var route_id = e.value;

        fetch(`http://${apiurl}/master/getroutesvalidate/${route_id}`)
        .then(res => res.json())
        .then(response => { 
            setISDWPLANT(response.routesvalidate[0].dwplant);
            setISEMBPLANT(response.routesvalidate[0].embplant);
        })
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
 
        fetch(`http://${apiurl}/master/getroutesbyid/${route_id}`)
        .then(res => res.json())
        .then(response => {setVAR_ROUTE(response.productrouts);} )
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

        fetch(`http://${apiurl}/productroute/routemapping/${route_id}`)
          .then(res => res.json())
          .then(response => {setDSET_ROUTESMAP(response.routemap);})
          .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
    };

    const OnChange_bodyfabric = (e) => {
        setVAL_BODYFABRIC(e.target.value);
        setISEDIT(true);
    };

    const OnChange_issuenote = (e) => {
        setVAL_ISSUENOTE(e.target.value);
        setISEDIT(true);
    };

    const OnChange_gardispatch = (e) => {
        setVAL_GARDISPATCH(e.value);
        setISEDIT(true);
    };

    const OnChange_colors = (e) => {
        setVAL_COLORS(e.target.value);
        setISEDIT(true);
    };

    const OnChange_graphics = (e) => {
        setVAL_GRAPHICS(e.target.value);
        setISEDIT(true);
    };

    const OnChange_wash = (e) => {
        setVAL_WASH(e.target.value);
        setISEDIT(true);
    };

    const OnChange_bodyfabcw = (e) => {
        setVAL_BODYFABCW(e.target.value);
        setISEDIT(true);
    };

    const OnChange_bodyfabcwunit = (e) => {
        setVAL_BODYFABCWUNIT(e.value);
        setISEDIT(true);
    };

    const OnChange_fabricrelaxhours = (e) => {
        setVAL_FABRELAXHOURS(e.target.value);
        setISEDIT(true);
    };

    const OnChange_placementboard = (e) => {
        setVAL_PLACEMENTBOARD(e.value);
        setISEDIT(true);
    };

    const OnChange_size = (e) => {
        setVAL_SIZE(e.value);
    };

    const OnChange_qty = (e) => {
        setVAL_QTY(e.target.value);
    };

    const OnChange_comment = (e) => {
      setVAL_COMMENTDESC(e.target.value);
    };

    const OnChange_embplants = (e) => { 
    setVAL_EMBPLANT(JSON.stringify(e.value));
    setVAR_EMBPLANT(e);
    };

    const OnChange_dwplants = (e) => { 
        setVAL_DWPLANT(JSON.stringify(e.value));
        setVAR_DWPLANT(e);
    };

    const OnChange_vendor = async (e) => { 
       
        setVAR_VENDOR(e);
        await fetch(`http://${apiurl}/master/getvenaddressbyid/${e.value}`)
        .then(res => res.json())
        .then(response => { 
            setVAL_VENDORNAME(response.venaddress[0].dis_vendor);
            setVAL_VENDORADDRESS(response.venaddress[0].dis_address);
        })
        .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
    };
    
    const OnChange_address = (e) => { 
        setVAL_VENDORADDRESS(e.target.value);
    };

    const addSizes = async (e) => {
        e.preventDefault()

        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_SIZE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Size Name',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        } 
    
        if(VAL_QTY.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Request Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        const Reg_Sizeqty = /^[0-9\b]+$/;

        if (!Reg_Sizeqty.test(VAL_QTY)) 
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Integer Value For Size Qty',  icon: 'error',  confirmButtonText: 'OK'});
            return;
         }

        if(VAL_VENDORNAME.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Vendor Name',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_VENDORADDRESS.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Vendor Address',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "size": VAL_SIZE,
                "qty":VAL_QTY,
                "vendor":VAL_VENDORNAME,
                "address":VAL_VENDORADDRESS
            })
        };

        await fetch(`http://${apiurl}/srf/addsizes`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_SIZE("");
                    setVAL_QTY("");
                    Swal.fire({  title: 'Success!',  text: 'SRF Data/Sizes Update Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    setVAL_SIZE("");
                    setVAL_QTY("");
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/srf/Srfsizes/${SRFID}`)
                .then(res1 => res1.json())
                .then(response1 => {setDSET_SRFSIZES(response1.srfsizes);})
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

        

    };

    const addEmbplant = async (e) => {
        e.preventDefault()

        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_EMBPLANT.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Embllishment plant',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
    
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "embplantid": VAL_EMBPLANT
            })
        };

        await fetch(`http://${apiurl}/srf/addembplant`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_EMBPLANT("");
                    Swal.fire({  title: 'Success!',  text: 'SRF Embellishemnt Plant Added Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    setVAL_EMBPLANT("");
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/EMB`)
                .then(res1 => res1.json())
                .then(response1 => {setDSET_SRFEMB(response1.srfplants);})
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});



    };

    const addDwplant = async (e) => {
        e.preventDefault()

        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_DWPLANT.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Dye/Wash plant',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
    
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "dwplantid": VAL_DWPLANT
            })
        };

        await fetch(`http://${apiurl}/srf/adddwplant`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setVAL_EMBPLANT("");
                    Swal.fire({  title: 'Success!',  text: 'SRF Dye/Wash Plant Added Successfully!',  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    setVAL_EMBPLANT("");
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/DW`)
                .then(res1 => res1.json())
                .then(response1 => {setDSET_SRFDW(response1.srfplants);})
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

    };

    const addComment = async (e) => {
      e.preventDefault()

      if(SRFID.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
  
      if(VAL_COMMENTDESC.length <= 0)
      {
          Swal.fire({  title: 'Error!',  text: 'Please Enter Comment',  icon: 'error',  confirmButtonText: 'OK'});
          return;
      }
  
  
      const sendOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": SRFID,
              "comment": VAL_COMMENTDESC,
              "userid": Userid
          })
      };

      await fetch(`http://${apiurl}/srf/addcomment`,sendOptions)
          .then(response => response.json())
          .then(data => 
          {
              if(data.Type === "SUCCESS")
              {
                  setVAL_COMMENTDESC("");
                  Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
              }

              if(data.Type === "ERROR")
              {
                  Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
              }

              fetch(`http://${apiurl}/srf/srfcomments/${SRFID}`)
            .then(res1 => res1.json())
            .then(response1 => {setDSET_COMMENTS(response1.srfcomments);})
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
        
          })
          .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

          

  };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(SRFID.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_STYLE.length <= 1)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Style Name',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_FLOORSET.length <= 1)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Enter Floorset/Identifire',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_SAMPLESTAGE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Sample Stage',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(VAL_ROUTE.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Product Route',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        if(selectedDate.length <= 7)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Select Date',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        var CurrentDate = new Date();
        var GivenDate = new Date(selectedDate);
    
        if(GivenDate < CurrentDate){
            Swal.fire({  title: 'Error!',  text: 'Current date is greater than the SRF Request date.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(VAL_STYLEDESC.length <= 0)
        {
            setVAL_STYLEDESC("");
        }

        if(VAL_BODYFABCW.length > 0)
        {
            const Reg_isdecimal = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;

            if (!Reg_isdecimal.test(VAL_BODYFABCW)) 
            {
                Swal.fire({  title: 'Error!',  text: 'Please Enter Decimal Value For Body Facric Cutter Width',  icon: 'error',  confirmButtonText: 'OK'});
                return;
            }
        }

        if(VAL_FABRELAXHOURS.length > 0)
        {
            const Reg_isdecimal = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;

            if (!Reg_isdecimal.test(VAL_FABRELAXHOURS)) 
            {
                Swal.fire({  title: 'Error!',  text: 'Please Enter Decimal Value For Fabric Relaxing Hours',  icon: 'error',  confirmButtonText: 'OK'});
                return;
            }
        }

    
        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "srfid": SRFID,
                "srfstyle": VAL_STYLE,
                "srfstyledesc":VAL_STYLEDESC,
                "floorset": VAL_FLOORSET,
                "samplestage": VAL_SAMPLESTAGE,
                "requestdate": Moment(GivenDate).format('yyyy-MM-DD'),
                "productroute" : VAL_ROUTE,
                "bodyfabrictype" : VAL_BODYFABRIC,
                "issuenote" : VAL_ISSUENOTE,
                "garmentdispatch" : VAL_GARDISPATCH,
                "colors" : VAL_COLORS,
                "graphic" : VAL_GRAPHICS,
                "wash" : VAL_WASH,
                "bodyfabcw" : VAL_BODYFABCW,
                "bodyfabcwunit" : VAL_BODYFABCWUNIT,
                "fabrelax" : VAL_FABRELAXHOURS,
                "placementboard" : VAL_PLACEMENTBOARD
            })
        };

        await fetch(`http://${apiurl}/srf/editsrf`,sendOptions)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    setISEDIT(false);
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                }

                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
          
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});


    };
 
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleConfirmDeleteSizes = async item => {
    
        await Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this Size!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                const sendOptions = {
                    method: 'delete',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"srfid" : SRFID , "srfsizeid" : item})
                };

                fetch(`http://${apiurl}/srf/deletesizes`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Deleted!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                    }

                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }

                    fetch(`http://${apiurl}/srf/Srfsizes/${SRFID}`)
                    .then(res1 => res1.json())
                    .then(response1 => {setDSET_SRFSIZES(response1.srfsizes);})
                    .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
                })
                .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
      
            }
        })

    };

    const ConfirmDeleteEmb = async item => {
    
        await Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this Embellishment Plant!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                const sendOptions = {
                    method: 'delete',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"srfid" : SRFID , "plantid" : item , "type":"EMB"})
                };

                fetch(`http://${apiurl}/srf/deleteplants`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Deleted!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                    }

                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }

                    fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/EMB`)
                    .then(res1 => res1.json())
                    .then(response1 => {setDSET_SRFEMB(response1.srfplants);})
                    .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
                })
                .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
      
            }
        })

    };

    const ConfirmDeleteDw = async item => {
    
        await Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Remove this Dye/Wash Plant!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                const sendOptions = {
                    method: 'delete',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"srfid" : SRFID , "plantid" : item , "type":"DW"})
                };

                fetch(`http://${apiurl}/srf/deleteplants`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Deleted!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                    }

                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }

                    fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/DW`)
                    .then(res1 => res1.json())
                    .then(response1 => {setDSET_SRFDW(response1.srfplants);})
                    .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
                })
                .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
      
            }
        })

    };

    const ConfirmDeleteComment = async item => {
    
      await Swal.fire({
          title: 'Are you sure?',
          text: "Do You want to Remove this Comment!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.value) {

              const sendOptions = {
                  method: 'delete',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({"srfid" : SRFID , "commentid" : item})
              };

              fetch(`http://${apiurl}/srf/deletecomment`,sendOptions)
              .then(response => response.json())
              .then(data => 
              {
                  if(data.Type === "SUCCESS")
                  {
                      Swal.fire({  title: 'Deleted!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                  }

                  if(data.Type === "ERROR")
                  {
                      Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                  }

                  fetch(`http://${apiurl}/srf/srfcomments/${SRFID}`)
                .then(res1 => res1.json())
                .then(response1 => {setDSET_COMMENTS(response1.srfcomments);})
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
        
              })
              .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
    
          }
      })

  };

    const renderRedirect = () => {
        var myRegxp = /^([0-9]){10}$/;
        if(myRegxp.test(SRFID) === false)
        {
            Swal.fire({  title: 'Error!',  text: 'Invalid SRF ID',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/ALLACTIVESRF/"} />
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

    const onDrop = async (files) => {
        // POST to a test endpoint for demo purposes
        await files.forEach(file => {
      
            const formData = new FormData();

            
            formData.append('uploadFile', file);
            formData.append('srfid', SRFID);

            const sendOptions = {
                method: 'POST',
                body: formData
            };

            fetch(`http://${apiurl}/srf/srfimageupload`,sendOptions)
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

                fetch(`http://${apiurl}/srf/SrfDetails/${SRFID}`)
                .then(res1 => res1.json())
                .then(response1 => { 
                    setVAL_SRFIMG(response1.srfdetails[0].image_name);
                    
                    fetch(`http://${apiurl}/srf/srfimagebase64/${response1.srfdetails[0].image_name}`)
                    .then(res2 => res2.json())
                    .then(response2 => { 
                        setVAL_SRFIMGBASE64(response2.srfimage[0].base64);
                    })
                    .catch(error2 => {Swal.fire({  title: 'Error!',  text: error2,  icon: 'error',  confirmButtonText: 'OK'});});
                })
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
        
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

        })
 
    };

    const saveascomplete  = async () => {

        var Var_Islogin = localStorage.getItem('session_islogin');
        var Var_UserId = localStorage.getItem('session_userid');

        if(ISEDIT === true)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Save Your Editable Data Before You Completed. (Click On "Update Data" Button)',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
        else if(Var_Islogin === null)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Log In Again',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/login/"} />
        }
        else if(Var_UserId === "")
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry, Can not find user',  icon: 'error',  confirmButtonText: 'OK'});
            return <Redirect to={"/login/"} />
        }
        else
        {
            
            await fetch(`http://${apiurl}/srf/srfeditcomplete/${SRFID}`)
            .then(response => response.json())
            .then(data => {
                
                
                if(data.Type === "SUCCESS")
                {
                    setISFINISHED(true);
                }
                else if(data.Type === "ERROR")
                {
                    
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
    
                return;
    
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

    
        }

        
        
    }

    const saveasedit = () => {
        
        if(ISEDIT === true)
        {
            Swal.fire({  title: 'Error!',  text: 'Please Save Your Editable Data Before You Completed. (Click On "Update Data" Button)',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        Swal.fire({  title: 'Success!',  text: 'Save As Edit Mode',  icon: 'info',  confirmButtonText: 'OK'}).then(function() {

            if(IS_SRFACCESS === true)
            {
                window.location = "/ALLACTIVESRF/";
            }
            else
            {
                window.location = "/MYSRFLIST/";
            } 
        });
        
    };

    useEffect(() => {
    
        if(ISLOADING === false){

            fetch(`http://${apiurl}/srf/SrfMasterDetails/${SRFID}`)
          .then(res => res.json())
          .then(response => { 
              setVAL_SRFIDCLUSTER(response.srfmaster[0].sid_cluster);
              setVAL_SRFIDDATE(response.srfmaster[0].sid_date);
              setVAL_SRFIDSEQ(response.srfmaster[0].sid_seq);
              setVAL_CUSID(response.srfmaster[0].cus_id);
              setVAL_STYLE(response.srfmaster[0].srf_style);
              setVAL_STYLEDESC(response.srfmaster[0].srf_styledesc);
              setVAL_FLOORSET(response.srfmaster[0].srf_floorset);
              setVAL_SAMPLESTAGE(response.srfmaster[0].sam_stage_id);
              setVAL_ROUTE(response.srfmaster[0].srf_routemasterid);
              setSelectedDate(response.srfmaster[0].srf_reqdate);

              fetch(`http://${apiurl}/master/getroutesvalidate/${response.srfmaster[0].srf_routemasterid}`)
            .then(res1 => res1.json())
            .then(response1 => { 
                setISDWPLANT(response1.routesvalidate[0].dwplant);
                setISEMBPLANT(response1.routesvalidate[0].embplant);
            })
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/master/getroutesbyid/${response.srfmaster[0].srf_routemasterid}`)
            .then(res1 => res1.json())
            .then(response1 =>{setVAR_ROUTE(response1.productrouts);} )
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/productroute/routemapping/${response.srfmaster[0].srf_routemasterid}`)
            .then(res1 => res1.json())
            .then(response1 => {setDSET_ROUTESMAP(response1.routemap);})
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/master/getgarmentsizes/${response.srfmaster[0].cus_id}`)
            .then(res1 => res1.json())
            .then(response1 => { setDSET_GARMENTSIZES(response1.garmentsizes); })
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/master/allcustomers/${response.srfmaster[0].cus_id}`)
            .then(res1 => res1.json())
            .then(response1 =>{setVAL_CUSNAME(response1.syscustomers[0].cus_name);} )
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
        
            fetch(`http://${apiurl}/master/getsamplestagebycustomer/${response.srfmaster[0].cus_id}`)
            .then(res1 => res1.json())
            .then(response1 =>{setDSET_SAMPLESTAGE(response1.samplestages);} )
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});}); 

            fetch(`http://${apiurl}/master/getsamplestagesbyid/${response.srfmaster[0].sam_stage_id}`)
            .then(res1 => res1.json())
            .then(response1 =>{setVAR_SAMPLESTAGE(response1.samplestages);} )
            .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/login/accesspermission/${Userid}`)
            .then(res => res.json())
            .then(response => { setIS_SRFACCESS(response.permission[0].srf_access); })
            .catch(error => console.log(error));
 
          
          })
          .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/srf/SrfDetails/${SRFID}`)
            .then(res => res.json())
            .then(response => { 
                if (response.srfdetails[0].body_fab_type !== "null") {setVAL_BODYFABRIC(response.srfdetails[0].body_fab_type);}
                if (response.srfdetails[0].issue_note !== "null") {setVAL_ISSUENOTE(response.srfdetails[0].issue_note);}
                if (response.srfdetails[0].garment_dispatch !== "null") {setVAL_GARDISPATCH(response.srfdetails[0].garment_dispatch);}
                if (response.srfdetails[0].colors !== "null") {setVAL_COLORS(response.srfdetails[0].colors);}
                if (response.srfdetails[0].graphic !== "null") {setVAL_GRAPHICS(response.srfdetails[0].graphic);}
                if (response.srfdetails[0].wash_development !== "null") {setVAL_WASH(response.srfdetails[0].wash_development);}
                if (response.srfdetails[0].body_fab_cw !== "null") {setVAL_BODYFABCW(response.srfdetails[0].body_fab_cw);}
                if (response.srfdetails[0].body_fab_cw_unit !== "null") {setVAL_BODYFABCWUNIT(response.srfdetails[0].body_fab_cw_unit);}
                if (response.srfdetails[0].fab_relax_hours !== "null") {setVAL_FABRELAXHOURS(response.srfdetails[0].fab_relax_hours);}
                if (response.srfdetails[0].placement_board !== "null") {setVAL_PLACEMENTBOARD(response.srfdetails[0].placement_board);}
                setVAL_SRFIMG(response.srfdetails[0].image_name);

                fetch(`http://${apiurl}/srf/srfimagebase64/${response.srfdetails[0].image_name}`)
                .then(res1 => res1.json())
                .then(response1 => { 
                    setVAL_SRFIMGBASE64(response1.srfimage[0].base64);
                })
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});

            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/master/getroutes`)
            .then(res1 => res1.json())
            .then(response1 => { setDSET_ALLROUTES(response1.productrouts); })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            setISLOADING(true);

        }

        if(ISLOADING === true)
        { 

            fetch(`http://${apiurl}/master/getvendors`)
            .then(res => res.json())
            .then(response => { setDSET_VENDORS(response.disvendors); })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
 
            fetch(`http://${apiurl}/srf/Srfsizes/${SRFID}`)
            .then(res => res.json())
            .then(response => {setDSET_SRFSIZES(response.srfsizes);})
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/master/getplantlistbytype/EMB`)
            .then(res => res.json())
            .then(response => { setDSET_EMBPLANTS(response.plants); })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/master/getplantlistbytype/DNW`)
            .then(res => res.json())
            .then(response => { setDSET_DWPLNTS(response.plants); })
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
    
            
        }

        if(ISFINISHED === true)
        {
          
            const sendOptionsNextStep = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "srfid": SRFID,
                    "proelmid": '1',
                })
            };

            fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
            .then(resNextStep => resNextStep.json())
            .then(dataNextStep => 
                {
                    if(dataNextStep.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
                    else if(dataNextStep.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Success!',  text: dataNextStep.Msg,  icon: 'info',  confirmButtonText: 'OK, Send Now'}).then(function() 
                        { 
                            if(IS_SRFACCESS === true)
                            {
                                window.location = "/ALLACTIVESRF/";
                            }
                            else
                            {
                                window.location = "/MYSRFLIST/";
                            }
                        })
                        
                    }
                }).catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

               
        }

     

    }, [ISLOADING, VAL_ROUTE, VAL_CUSID, VAL_SAMPLESTAGE, SRFID, VAL_SRFIMG,ISFINISHED,apiurl,Userid,IS_SRFACCESS]);

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
  <Container  maxWidth={false} className={classes.container}>
    <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            
      <Grid item xs={12} md={6}>
      <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Sample Room Request : Document ID</Typography>
      <TextField id="txtSrfid" value={VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ} inputProps={{ readOnly: true }} variant="outlined" style={{width:"100%",fontSize:12}} size="small"/>  
              
      <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Customer Category</Typography>
      <TextField id="txtcusname" value={VAL_CUSNAME} inputProps={{ readOnly: true }} variant="outlined" style={{width:"100%"}} size="small"/>  
              
      <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Style No</Typography>
      <TextField id="txtStyle" value={VAL_STYLE} onChange={OnChange_style}  variant="outlined" style={{width:"100%"}} size="small"/>  

      <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Style Description</Typography>
      <TextField
        id="txtStyleDesc"
        value={VAL_STYLEDESC}
        label=""
        multiline
        rows={3}
        defaultValue=""
        variant="outlined"
        style={{width:"100%", fontSize:12}}
        size="small"
        onChange={OnChange_styledesc}
        />

<Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Floorset/Identifire</Typography>
<TextField id="txtFloorset"  value={VAL_FLOORSET} onChange={OnChange_floorset} variant="outlined" style={{width:"100%"}} size="small"/>

<Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Sample Stage</Typography>
<Select id="cmbSampleStage" value={VAR_SAMPLESTAGE} variant="outlined" onChange={OnChange_samplestage} options = {DSET_SAMPLESTAGE} />

<Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Product Route</Typography>
<Select id="cmbRoute" value={VAR_ROUTE} variant="outlined" onChange={OnChange_route} options={DSET_ALLROUTES} />

<Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Sample Required Date</Typography>
<MuiPickersUtilsProvider utils={DateFnsUtils}>
      
  <KeyboardDatePicker
    margin="normal"
    id="dtpRequire"
    format="yyyy/MMM/dd"
    value={selectedDate}
    onChange={handleDateChange}
    KeyboardButtonProps={{ 'aria-label': 'change date',}}
    variant="outlined" 
    style={{width:"100%"}} 
    size="small"
    minDate={Date()}
    />
        
</MuiPickersUtilsProvider>

</Grid>

      <Grid pl={4} item xs={12} md={6} style={{maxHeight: 600, Height: 'auto', overflow: 'auto'}}>
      <Typography variant="p" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}> Selected Route Element Mapping </Typography>

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
                <TableCell align="left" style={{fontSize:12,color:"#1D2951",fontWeight:400,}}>{itemselect.proelmname}</TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TableContainer>

</Grid>
          
</Grid>

  <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
  <Grid item xs={12} md={6}>
  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Body Fabric Type</Typography>
  <TextField id="txtBodyfabric"  value={VAL_BODYFABRIC} onChange={OnChange_bodyfabric} variant="outlined" style={{width:"100%"}} size="small"/>

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Issue Note No / DAN <span style={{color:'red',fontWeight:500}}> (** Mandatory)</span></Typography>
  <TextField id="txtIssuenote"  value={VAL_ISSUENOTE} onChange={OnChange_issuenote} variant="outlined" style={{width:"100%"}} size="small"/>

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Garment Dispatch</Typography>
  <Select id="cmbGarmentDispatch" value={{"value" : VAL_GARDISPATCH,"label" : VAL_GARDISPATCH}} variant="outlined" onChange={OnChange_gardispatch} options = {[{"value":"Regional","label":"Regional"},{"value":"Overseas","label":"Overseas"}]} />

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Colors</Typography>
  <TextField id="txtColors"  value={VAL_COLORS} onChange={OnChange_colors} variant="outlined" style={{width:"100%"}} size="small"/>
            
  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Graphics</Typography>
  <TextField id="txtGraphic"  value={VAL_GRAPHICS} onChange={OnChange_graphics} variant="outlined" style={{width:"100%"}} size="small"/>
       
  </Grid>
  <Grid item xs={12} md={6}>

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Wash Developments</Typography>
  <TextField id="txtWash"  value={VAL_WASH} onChange={OnChange_wash} variant="outlined" style={{width:"100%"}} size="small"/>

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Main Body Fabric CW</Typography>
  <TextField id="txtbodyfabcw"  value={VAL_BODYFABCW} onChange={OnChange_bodyfabcw} variant="outlined" style={{width:"100%"}} size="small"/>

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Main Body Fabric CW Unit</Typography>
  <Select id="cmbbodyfabcwunit" value={{"value" : VAL_BODYFABCWUNIT,"label" : VAL_BODYFABCWUNIT}} variant="outlined" onChange={OnChange_bodyfabcwunit} options = {[{"value":"INCH","label":"INCH"},{"value":"M","label":"M"},{"value":"CM","label":"CM"}]} />

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Fabric Relaxing Hours</Typography>
  <TextField id="txtfabricrelax"  value={VAL_FABRELAXHOURS} onChange={OnChange_fabricrelaxhours} variant="outlined" style={{width:"100%"}} size="small"/>

  <Typography variant="subtitle2" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Placement Board Requirement</Typography>
  <Select id="cmbplacementboard" value={{"value" : VAL_PLACEMENTBOARD,"label" : VAL_PLACEMENTBOARD}} variant="outlined" onChange={OnChange_placementboard} options = {[{"value":"YES","label":"YES"},{"value":"NO","label":"NO"}]} />


  <Button variant="contained" color="primary" style={{padding:10, margin:10}} onClick={handleSubmit}>Update Data</Button>

  {ISEDIT === true ? ( <Typography style={{color:"#e65d22"}} variant="subtitle2" gutterBottom>** Please Save Your Editable Data Fields.</Typography> ) : null} 
    
    </Grid>
  </Grid>

  <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
    <Grid item xs={6} md={6}>
        <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
            <Grid item xs={12} md={6}>
                <DropzoneArea onChange={onDrop} showPreviewsInDropzone={false} acceptedFiles={['image/jpeg, image/png']} filesLimit={1} maxWidth={"SM"} maxFileSize={15000000} dropzoneText={"Drag and drop an image here or click"} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Image src={VAL_SRFIMGBASE64}/>
            </Grid>
        </Grid>
    </Grid>

    <Grid item xs={6} md={6}>
                
    <Grid hidden={!ISEMBPLANT}>
    <Typography variant="subtitle1" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Embllishment Plant Details</Typography>

    <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow TableRow>
          <TableCell size="small" style={{"font-weight":800,width:"90%"}} align="right">
            <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Select Embellishment Plant</Typography>
            <Select id="cmbEmbplants" value={VAR_EMBPLANT} variant="outlined" onChange={OnChange_embplants} options = {DSET_EMBPLANTS} style={{width:"100%"}} size="small"/>
          </TableCell>
          <TableCell size="small" style={{width:"10%"}} align="right">
            <Button variant="contained" color="primary" style={{padding:10}} onClick={addEmbplant}>ADD</Button>
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {DSET_SRFEMB.map((row) => (
          <TableRow key={row.plant_id}>
            <TableCell size="small" align="right">{row.plant_name}</TableCell>
            <TableCell size="small" align="right">
            <IconButton aria-label="delete" 
                onClick={() => ConfirmDeleteEmb(row.plant_id)}
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

    <Grid hidden={!ISDWPLANT}>
    <Typography variant="subtitle1" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>Dye/Wash Plant Details</Typography>

    <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow TableRow>
          <TableCell size="small" style={{"font-weight":800,width:"90%"}} align="right">
            <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Select Dye/Wash Plant</Typography>
            <Select id="cmbDwplants" value={VAR_DWPLANT} variant="outlined" onChange={OnChange_dwplants} options = {DSET_DWPLNTS} style={{width:"100%"}} size="small"/>
          </TableCell>
          <TableCell size="small" style={{width:"10%"}} align="right">
            <Button variant="contained" color="primary" style={{padding:10}} onClick={addDwplant}>ADD</Button>
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {DSET_SRFDW.map((row) => (
          <TableRow key={row.plant_id}>
            <TableCell size="small" align="right">{row.plant_name}</TableCell>
            <TableCell size="small" align="right">
            <IconButton aria-label="delete" 
                onClick={() => ConfirmDeleteDw(row.plant_id)}
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
         
    </Grid>
  </Grid>

  <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
      <Grid item xs={12} md={12}>
      <Typography variant="subtitle1" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>SRF Garment Sizes</Typography>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow TableRow>
        <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
          <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Size</Typography>
          <Select id="cmbSize" value={{"value" : VAL_SIZE,"label" : VAL_SIZE}} variant="outlined" onChange={OnChange_size} options = {DSET_GARMENTSIZES} style={{width:"100%"}} size="small"/>
        </TableCell>
        <TableCell size="small" style={{"font-weight":800,width:"15%"}} align="right">
          <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Quantity</Typography>
          <TextField id="txtQty" value={VAL_QTY} onChange={OnChange_qty} variant="outlined" style={{width:"100%"}} size="small"/>
        </TableCell>
        <TableCell size="small" style={{"font-weight":800,width:"30%"}} align="right">
            <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Dispatch Vendor</Typography>
            <Select id="cmbVendor" value={VAR_VENDOR} variant="outlined" onChange={OnChange_vendor} options={DSET_VENDORS}  style={{width:"100%"}} size="small"/>
        </TableCell>
        <TableCell size="small" style={{"font-weight":800,width:"30%"}} align="right">
            <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Dispatch Address</Typography>
            <TextField
            id="txtVendorAddress"
            value={VAL_VENDORADDRESS}
            label=""
            multiline
            rows={3}
            defaultValue=""
            variant="outlined"
            style={{width:"100%"}}
            size="small"
            onChange={OnChange_address}
            />
        </TableCell>
        <TableCell size="small" style={{width:"10%"}}  align="right">
          <Button variant="contained" color="primary" style={{padding:10}} onClick={addSizes}>ADD</Button>
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {DSET_SRFSIZES.map((row) => (
        <TableRow key={row.srfsize_id}>
          <TableCell size="small" align="right">{row.size_name}</TableCell>
          <TableCell size="small" align="right">{row.size_qty}</TableCell>
          <TableCell size="small" align="right">{row.dis_vendor}</TableCell>
          <TableCell size="small" align="right">{row.dis_address}</TableCell>
          <TableCell size="small" align="right">
          <IconButton aria-label="delete" 
            onClick={() => handleConfirmDeleteSizes(row.srfsize_id)}
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
  </Grid>

  <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
      <Grid item xs={12} md={12}>
      <Typography variant="subtitle1" gutterBottom style={{color: '#0066CC',fontWeight:600, fontSize:12}}>SRF Comments</Typography>

<Table className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow TableRow>
      <TableCell size="small" style={{"font-weight":800,width:"90%"}} align="right">
        <Typography variant="subtitle2" gutterBottom style={{color: '#8f1544',fontWeight:600, fontSize:12}}>Enter Your Comment/Description In Here</Typography>
        <TextField
        id="txtCommentDesc"
        value={VAL_COMMENTDESC}
        label=""
        multiline
        rows={6}
        defaultValue=""
        variant="outlined"
        style={{width:"100%"}}
        size="small"
        onChange={OnChange_comment} />
      </TableCell>
      <TableCell size="small" style={{width:"10%"}} align="right">
        <Button variant="contained" color="primary" style={{padding:10}} onClick={addComment}>ADD</Button>
      </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {DSET_COMMENTS.map((row) => (
      <TableRow key={row.comment_id}>
        <TableCell size="small" align="right" style={{color: 'black',fontWeight:600, fontSize:13}}>{row.comment_desc}</TableCell>
        <TableCell size="small" align="right">
        <IconButton aria-label="delete" 
        onClick={() => ConfirmDeleteComment(row.comment_id)}
        variant="contained"
        color="secondary"
        size="small">
    <DeleteIcon color="error"  />
</IconButton></TableCell>
</TableRow>
            ))}
</TableBody>
</Table>
      </Grid>
  </Grid>

  

  <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
      <Grid item xs={6} md={6}>
      <Button onClick={saveascomplete} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch'}} >Finished & Complete</Button>
      </Grid>
      <Grid item xs={6} md={6}>
      <Button onClick={saveasedit} variant="contained" color="secondary" style={{padding:10, alignSelf: 'stretch'}} >Save as Edit</Button>
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
