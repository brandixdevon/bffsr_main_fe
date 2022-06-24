import React,{useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import SwapCallsOutlinedIcon from '@material-ui/icons/SwapCallsOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GridOnIcon from '@material-ui/icons/GridOn';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import StyleIcon from '@material-ui/icons/Style';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import FilterListIcon from '@material-ui/icons/FilterList';
import PrintIcon from '@material-ui/icons/Print';
import ReorderIcon from '@material-ui/icons/Reorder';
import BuildIcon from '@material-ui/icons/Build';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import PieChartIcon from '@material-ui/icons/PieChart';
import DeleteIcon from '@material-ui/icons/Delete';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {blue} from '@material-ui/core/colors';

export default function Mainmenu() {
  
  //const [IS_ADMIN, setIS_ADMIN] = React.useState(false);
  const [IS_SRF, setIS_SRF] = React.useState(false);
  const [IS_SRF_DELETE, setIS_SRF_DELETE] = React.useState(false);
  const [IS_PM, setIS_PM] = React.useState(false);
  const [IS_MM, setIS_MM] = React.useState(false);
  const [IS_SMV, setIS_SMV] = React.useState(false);
  const [IS_PB, setIS_PB] = React.useState(false);
  const [IS_PLN, setIS_PLN] = React.useState(false);
  const [IS_STR, setIS_STR] = React.useState(false);
  const [IS_CUT, setIS_CUT] = React.useState(false);
  const [IS_OSOHS, setIS_OSOHS] = React.useState(false);
  const [IS_OSOHR, setIS_OSOHR] = React.useState(false);
  const [IS_SEW, setIS_SEW] = React.useState(false);
  const [IS_QC, setIS_QC] = React.useState(false);
  const [IS_DISPATCH, setIS_DISPATCH] = React.useState(false);

  useEffect(() => {

    var Var_UserId = localStorage.getItem('session_userid');
    var apiurl = localStorage.getItem('session_apiurl');

    fetch(`http://${apiurl}/login/accesspermission/${Var_UserId}`)
    .then(res => res.json())
    .then(response => 
      {
        setIS_SRF(response.permission[0].srf_access);
        setIS_SRF_DELETE(response.permission[0].srf_delete);
        setIS_PM(response.permission[0].pm_access);
        setIS_MM(response.permission[0].mm_access);
        setIS_SMV(response.permission[0].smv_access);
        setIS_PB(response.permission[0].pb_access);
        setIS_PLN(response.permission[0].pln_access);
        setIS_STR(response.permission[0].str_access);
        setIS_CUT(response.permission[0].cut_access);
        setIS_OSOHS(response.permission[0].osohs_access);
        setIS_OSOHR(response.permission[0].osohr_access);
        setIS_SEW(response.permission[0].sew_access);
        setIS_QC(response.permission[0].qc_access);
        setIS_DISPATCH(response.permission[0].dis_access);
      })
    .catch(error => console.log(error));
    }, []);

  return (<div>
  { IS_SRF === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>SAMPLE REQUEST</p>
    <ListItem dense={true} button component="a" href="/SRFCREATE">
      <ListItemIcon>
        <CreateNewFolderIcon />
      </ListItemIcon>
      <ListItemText primary="Create New SRF" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLACTIVESRF">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="All Open SRFs" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/SRFLISTREPORT">
      <ListItemIcon>
        <GridOnIcon/>
      </ListItemIcon>
      <ListItemText primary="SRF Export to Excel" />
    </ListItem></> : null }

    { IS_SRF_DELETE === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>SRF MANAGE</p>
    <ListItem dense={true} button component="a" href="/SRFDELETE">
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Delete Active SRF" />
    </ListItem></> : null }

    { IS_PM === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>PATTERN MAKING</p>
    <ListItem dense={true} button component="a" href="/PMLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLPMLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/SRFCREATE">
      <ListItemIcon>
        <CreateNewFolderIcon />
      </ListItemIcon>
      <ListItemText primary="Create New SRF" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/MYSRFLIST">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Open SRFs" />
    </ListItem></> : null }

    { IS_SMV === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>SMV RELEASE</p>
    <ListItem dense={true} button component="a" href="/SMVLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLSMVLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    { IS_PB === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>PLACEMENT BOARD</p>
    <ListItem dense={true} button component="a" href="/PBLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLPBLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    { IS_MM === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>MARKER MAKING</p>
    <ListItem dense={true} button component="a" href="/MMLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLMMLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    { IS_PLN === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>PLANNING</p>
    <ListItem dense={true} button component="a" href="/PLNLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/SEWPENDINGFORPLAN/ALL">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="SEW Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLPLNLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    { IS_STR === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>STORES</p>
    <ListItem dense={true} button component="a" href="/STLIST/ALL">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLSTLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    { IS_CUT === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>CUTTING</p>
    <ListItem dense={true} button component="a" href="/CUTLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/CUTSCAN">
      <ListItemIcon>
        <AddToHomeScreenIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Cut Scan" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLCUTLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/RECUTLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Re-Cut List" />
    </ListItem>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>PACKAGE PROCESS</p>
    <ListItem dense={true} button component="a" href="/PACKAGEPROCESS">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem></> : null }

    { IS_OSOHS === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>OSOH SENDING</p>
    <ListItem dense={true} button component="a" href="/ALLEMBLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Embellishment Send" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/EMBPRINTLIST">
      <ListItemIcon>
        <PrintIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Emb. Note Print" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLDWLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Dye-Wash Send" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/DOWPRINTLIST">
      <ListItemIcon>
        <PrintIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="D/W Note Print" />
    </ListItem></> : null }

    { IS_OSOHR === true ? <>
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>OSOH RECEIVING</p>
    <ListItem dense={true} button component="a" href="/ALLEMBSCANLIST/ALL">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Embellishment Receive" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLDOWSCANLIST/ALL">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Dye-Wash Receive" />
    </ListItem></> : null }

    { IS_SEW === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>SEWING</p>
    <ListItem dense={true} button component="a" href="/SEWLIST/ALL">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/SEWIN">
      <ListItemIcon>
        <ReorderIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Sewing IN/OUT" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLSEWLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/REWORKLIST">
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Sewing Rework" />
    </ListItem></> : null }

    { IS_QC === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>QUALITY</p>
    <ListItem dense={true} button component="a" href="/QCLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLQCLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    { IS_DISPATCH === true ? <> 
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>DISPATCH</p>
    <ListItem dense={true} button component="a" href="/DISPATCHLIST">
      <ListItemIcon>
        <ViewQuiltIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Pending List" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLDISPATCHLIST">
      <ListItemIcon>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Search SRF List" />
    </ListItem></> : null }

    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>DASHBOARD</p>
    <ListItem dense={true} button component="a" href="/DASHBOARDALLSTATUS">
      <ListItemIcon>
        <PieChartIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Current Overall Status" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/DASHBOARDALLSUMMARY">
      <ListItemIcon>
        <PieChartIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Current Summary Status" />
    </ListItem>

    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>REPORTS</p>
    <ListItem dense={true} button component="a" href="/REPORTS_COMMON">
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Common Data" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/REPORTS_OPERATION">
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="Operation Data" />
    </ListItem>
   
    <p style={{"color":blue['A700'],"paddingLeft":10,"marginBottom":5,"marginTop":5,"fontWeight":"bold"}}>MASTER DATA</p>
    <ListItem dense={true} button component="a" href="/ROUTES">
      <ListItemIcon>
        <SwapCallsOutlinedIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="List Of Routes" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/CUSTOMERS">
      <ListItemIcon>
        <StyleIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="List Of Customers" />
    </ListItem>
    <ListItem dense={true} button component="a" href="/ALLPLANTS">
      <ListItemIcon>
        <LocationCityIcon />
      </ListItemIcon>
      <ListItemText size="small" primary="List Of Plants" />
    </ListItem>
  </div>);

}
