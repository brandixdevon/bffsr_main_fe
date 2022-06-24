import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_SEWSTART, setVAL_SEWSTART] = useState("");
    const [VAL_SEWEND, setVAL_SEWEND] = useState("");
    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_MOLIST, setVAL_MOLIST] = useState([]);
    const [VAL_SEWLIST, setVAL_SEWLIST] = useState([]);
     
    useEffect(() => {

      fetch(`http://${apiurl}/srfdetails/sewing/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_SEWSTART(response.sewing[0].sew_start);
                setVAL_SEWEND(response.sewing[0].sew_end);
                setVAL_STATUS(response.sewing[0].sew_status);
                setVAL_LASTCHANGE(response.sewing[0].change_date);
                setVAL_USER(response.sewing[0].username);
            }
            else
            {
                setVAL_SEWSTART("");
                setVAL_SEWEND("");
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/sewmolist/${props.SRFID}/${props.PROELMID}`)
    .then(res => res.json())
    .then(response => { setVAL_MOLIST(response.sewingmo); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/srfdetails/sewitemlist/${props.SRFID}/${props.PROELMID}`)
    .then(res => res.json())
    .then(response => { setVAL_SEWLIST(response.sewingqty); })
    .catch(error => console.log(error));

    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SEWING DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"15%"}}>Status</th>
                    <th style={{width:"20%"}}>Sewing Start</th>
                    <th style={{width:"20%"}}>Sewing Finished</th>
                    <th style={{width:"20%"}}>Last Update</th>
                    <th style={{width:"25%"}}>Updated User</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>{VAL_STATUS}</td>
                        <td>{JSON.stringify(VAL_SEWSTART).length > 8 ? (Moment(VAL_SEWSTART).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{JSON.stringify(VAL_SEWEND).length > 8 ? (Moment(VAL_SEWEND).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{JSON.stringify(VAL_LASTCHANGE).length > 8 ? (Moment(VAL_LASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_USER}</td>
                    </tr>
                </tbody>
            </table>

            
        </Grid>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>MO/TEAMS DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"25%"}}>MO/Team Name</th>
                    <th style={{width:"25%"}}>Job Start</th>
                    <th style={{width:"25%"}}>Job End</th>
                    <th style={{width:"25%"}}>Job Status</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_MOLIST.map(item =>
                    <tr>
                        <td>{item.mo_name}</td>
                        <td>{JSON.stringify(item.start_time).length > 8 ? (Moment(item.start_time).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{JSON.stringify(item.end_time).length > 8 ? (Moment(item.end_time).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{item.smo_status}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </Grid>

        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SEWING ITEM DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"20%"}}>Size Name</th>
                    <th style={{width:"10%"}}>Order Qty</th>
                    <th style={{width:"10%"}}>Sew In</th>
                    <th style={{width:"25%"}}>Sew In Cmt</th>
                    <th style={{width:"10%"}}>Sew Out</th>
                    <th style={{width:"25%"}}>Sew Out Cmt</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_SEWLIST.map(item =>
                    <tr>
                        <td>{item.size_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.sew_in}</td>
                        <td>{item.sew_in_cmt}</td>
                        <td>{item.sew_out}</td>
                        <td>{item.sew_out_cmt}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}