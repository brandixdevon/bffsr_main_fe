import React,{useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import Swal from 'sweetalert2';

const defaultProps = {
    bgcolor: '#f5f5f5',
    borderColor: '#8f30ba',
    m: 1,
    border: 1,
    style: { width: '100%', height: '100%' },
  };

export default function GetSideView({srfid}) {

    //Form Parameters
    var apiurl = localStorage.getItem('session_apiurl');
    const [VAL_SRFIDCLUSTER, setVAL_SRFIDCLUSTER] = React.useState([]);
    const [VAL_SRFIDDATE, setVAL_SRFIDDATE] = React.useState([]);
    const [VAL_SRFIDSEQ, setVAL_SRFIDSEQ] = React.useState([]);
    const [VAL_CUSNAME, setVAL_CUSNAME] = React.useState([]);
    const [VAL_STYLE, setVAL_STYLE] = React.useState([]);
    const [VAL_STYLEDESC, setVAL_STYLEDESC] = React.useState([]);
    const [VAL_FLOORSET, setVAL_FLOORSET] = React.useState([]);
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

    useEffect(() => 
    {

        fetch(`http://${apiurl}/srf/SrfMasterDetails/${srfid}`)
          .then(res => res.json())
          .then(response => { 
              setVAL_SRFIDCLUSTER(response.srfmaster[0].sid_cluster);
              setVAL_SRFIDDATE(response.srfmaster[0].sid_date);
              setVAL_SRFIDSEQ(response.srfmaster[0].sid_seq);
              setVAL_STYLE(response.srfmaster[0].srf_style);
              setVAL_STYLEDESC(response.srfmaster[0].srf_styledesc);
              setVAL_FLOORSET(response.srfmaster[0].srf_floorset);
              setSelectedDate(response.srfmaster[0].srf_reqdate);

              fetch(`http://${apiurl}/master/allcustomers/${response.srfmaster[0].cus_id}`)
              .then(res1 => res1.json())
              .then(response1 =>{setVAL_CUSNAME(response1.syscustomers[0].cus_name);} )
              .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
          
          })
          .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            fetch(`http://${apiurl}/srf/SrfDetails/${srfid}`)
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
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

            

    }, [srfid,apiurl])
    
  return (
    <Box display="flex" justifyContent="center">
        <Box p={2} borderRadius="borderRadius" {...defaultProps}>
            <Typography variant="body2" color="textSecondary" align="center">SAMPLE REQUISITION SUMMERY DETAILS</Typography>
        
            <Typography variant="h7" style={{color:"purple"}} gutterBottom>SRF Doc ID</Typography>
            <Typography variant="caption" display="block" gutterBottom>{VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ}</Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Customer Category</Typography>
            <Typography variant="caption" display="block" gutterBottom>{VAL_CUSNAME}</Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Style No</Typography>
            <Typography variant="caption" display="block" gutterBottom>{VAL_STYLE}</Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Style Description</Typography>
            <Typography variant="caption" display="block" gutterBottom>{VAL_STYLEDESC} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Floorset/Identifire</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_FLOORSET} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Sample Required Date</Typography>
            <Typography variant="caption" display="block" gutterBottom>  {Moment(selectedDate).format('DD-MMM-yyyy')} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Issue Note No / DAN</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_ISSUENOTE} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Body Fabric Type</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_BODYFABRIC} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Garment Dispatch</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_GARDISPATCH} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Colors</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_COLORS} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Graphics</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_GRAPHICS} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Wash Developments</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_WASH} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Main Body Fabric CW</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_BODYFABCW} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Main Body Fabric CW Unit</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_BODYFABCWUNIT} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Fabric Relaxing Hours</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_FABRELAXHOURS} </Typography>

            <Typography variant="h7" gutterBottom style={{color:"purple"}}>Placement Board Requirement</Typography>
            <Typography variant="caption" display="block" gutterBottom> {VAL_PLACEMENTBOARD} </Typography>
        </Box>
    </Box>
  );

}