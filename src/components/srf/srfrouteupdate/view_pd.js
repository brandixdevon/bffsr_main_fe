import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

  
export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_SRFRAISEDBY, setVAL_SRFRAISEDBY] = useState("");
    const [VAL_SRFCREATE, setVAL_SRFCREATE] = useState("");
    const [VAL_SRFSTATUS, setVAL_SRFSTATUS] = useState("");
    const [VAL_SRFLASTCHANGE, setVAL_SRFLASTCHANGE] = useState("");
    const [VAL_SRFFINISHED, setVAL_SRFFINISHED] = useState("");

    const [DT_SRFDELETE, setDT_SRFDELETE] = useState([]);
    
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/srfraised/${props.SRFID}`)
      .then(res => res.json())
      .then(response => {
                if(response.Type === "SUCCESS")
                {
                    setVAL_SRFRAISEDBY(response.srfraised[0].username);
                    setVAL_SRFCREATE(response.srfraised[0].srf_raisedate);
                    setVAL_SRFSTATUS(response.srfraised[0].mode_name);
                    setVAL_SRFLASTCHANGE(response.srfraised[0].srf_lastchange);
                    setVAL_SRFFINISHED(response.srfraised[0].srf_finishdate);
                }
                else
                {
                    setVAL_SRFRAISEDBY("N/A");
                    setVAL_SRFCREATE("N/A");
                    setVAL_SRFSTATUS("N/A");
                    setVAL_SRFLASTCHANGE("N/A");
                    setVAL_SRFFINISHED("N/A");
                }
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/srfdelete/${props.SRFID}`)
      .then(res => res.json())
      .then(response => {
                if(response.Type === "SUCCESS")
                {
                    setDT_SRFDELETE(response.deletesrf);
                }
        })
      .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SRF RAISED DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"20%"}}>SRF Raised By</th>
                    <th style={{width:"20%"}}>SRF Raised Date</th>
                    <th style={{width:"20%"}}>Current Status</th>
                    <th style={{width:"20%"}}>Last Update</th>
                    <th style={{width:"20%"}}>SRF Finished Date</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>{VAL_SRFRAISEDBY}</td>
                        <td>{JSON.stringify(VAL_SRFCREATE).length > 8 ? (Moment(VAL_SRFCREATE).format('YYYY-MMM-DD')):("Not Updated") }</td>
                        <td>{VAL_SRFSTATUS}</td>
                        <td>{JSON.stringify(VAL_SRFLASTCHANGE).length > 8 ? (Moment(VAL_SRFLASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{JSON.stringify(VAL_SRFFINISHED).length > 8 ? (Moment(VAL_SRFFINISHED).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                    </tr>
                </tbody>
            </table>
        </Grid>
    
        {DT_SRFDELETE.map(items =>
        <Grid item md={12}>
        <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SRF DELETE DETAILS</Typography>
        <br/>
        <Typography variant="h6" style={{color:"red",fontSize:"15px"}}><b>DELETED BY :</b> {items.username}</Typography>
        <Typography variant="h6" style={{color:"red",fontSize:"15px"}}><b>DELETED DATE :</b> {Moment(items.delete_date).format('YYYY-MMM-DD HH:mm:ss')}</Typography>
        <Typography variant="h6" style={{color:"red",fontSize:"15px"}}><b>DELETED REASON :</b> {items.delete_reason}</Typography>
        </Grid>
                )}
    
    </Grid>
);
}