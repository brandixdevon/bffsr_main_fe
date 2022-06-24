import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_QCLIST, setVAL_QCLIST] = useState([]);
    const [VAL_REWORK, setVAL_REWORK] = useState([]);
     
    useEffect(() => {

      fetch(`http://${apiurl}/srfdetails/qc/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_STATUS(response.qc[0].qc_status);
                setVAL_LASTCHANGE(response.qc[0].change_date);
                setVAL_USER(response.qc[0].username);
            }
            else
            {
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/qcitemlist/${props.SRFID}/${props.PROELMID}`)
    .then(res => res.json())
    .then(response => { setVAL_QCLIST(response.qcitems); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/quality/getreworkitems/${props.PROELMID}/${props.SRFID}`)
    .then(res => res.json())
    .then(response => { setVAL_REWORK(response.reworkdetails); })
    .catch(error => console.log(error));

    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>QUALITY CHECKING DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"15%"}}>Status</th>
                    <th style={{width:"20%"}}>Last Update</th>
                    <th style={{width:"25%"}}>Updated User</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>{VAL_STATUS}</td>
                        <td>{JSON.stringify(VAL_LASTCHANGE).length > 8 ? (Moment(VAL_LASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_USER}</td>
                    </tr>
                </tbody>
            </table>

            
        </Grid>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>QC ITEMS DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"15%"}}>Size Name</th>
                    <th style={{width:"10%"}}>Order Qty</th>
                    <th style={{width:"10%"}}>Sewing Out Qty</th>
                    <th style={{width:"10%"}}>Approve Qty</th>
                    <th style={{width:"10%"}}>Reject Qty</th>
                    <th style={{width:"45%"}}>Comments</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_QCLIST.map(item =>
                    <tr>
                        <td>{item.size_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.outqty}</td>
                        <td>{item.qc_approve}</td>
                        <td>{item.qc_reject}</td>
                        <td>{item.qc_cmt}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </Grid>

        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SEWING REWORK ITEM DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"15%"}}>Size Name</th>
                    <th style={{width:"10%"}}>Rework Qty</th>
                    <th style={{width:"15%"}}>Rework Status</th>
                    <th style={{width:"10%"}}>QC Approved</th>
                    <th style={{width:"50%"}}>Remark</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_REWORK.map(item =>
                    <tr>
                        <td>{item.garmentsize}</td>
                        <td>{item.rework_qty}</td>
                        <td>{item.rework_status}</td>
                        <td>{item.qc_accept}</td>
                        <td>{item.rework_remark}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}