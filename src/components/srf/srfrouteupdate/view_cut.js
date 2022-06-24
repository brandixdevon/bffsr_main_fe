import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_CUTTEAM, setVAL_CUTTEAM] = useState("");
    const [VAL_CUTMETHOD, setVAL_CUTMETHOD] = useState("");
    const [VAL_CUTHANDLE, setVAL_CUTHANDLE] = useState("");
    const [VAL_CUTSTART, setVAL_CUTSTART] = useState("");
    const [VAL_CUTEND, setVAL_CUTEND] = useState("");
    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_RECUTLIST, setVAL_RECUTLIST] = useState([]);
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/cut/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_CUTTEAM(response.cut[0].cut_team);
                setVAL_CUTMETHOD(response.cut[0].cut_method);
                setVAL_CUTHANDLE(response.cut[0].cut_handling);
                setVAL_CUTSTART(response.cut[0].cut_start);
                setVAL_CUTEND(response.cut[0].cut_end);
                setVAL_STATUS(response.cut[0].cut_status);
                setVAL_LASTCHANGE(response.cut[0].change_date);
                setVAL_USER(response.cut[0].username);
            }
            else
            {
                setVAL_CUTTEAM("");
                setVAL_CUTMETHOD("");
                setVAL_CUTHANDLE("");
                setVAL_CUTSTART("");
                setVAL_CUTEND("");
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/recut/${props.SRFID}`)
    .then(res => res.json())
    .then(response => { setVAL_RECUTLIST(response.recut); })
    .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>CUT DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"35%"}}>Status</th>
                    <th style={{width:"15%"}}>Last Update</th>
                    <th style={{width:"35%"}}>Updated User</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>{VAL_STATUS}</td>
                        <td>{JSON.stringify(VAL_LASTCHANGE).length > 8 ? (Moment(VAL_LASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_USER}</td>
                    </tr>
                </tbody>
            </table>

            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>CUT OPERATION INFORMATION</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"20%"}}>Cut Start</th>
                    <th style={{width:"20%"}}>Cut Finished</th>
                    <th style={{width:"20%"}}>Cutting Team</th>
                    <th style={{width:"20%"}}>Handling Type</th>
                    <th style={{width:"20%"}}>Cutting Method</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>{JSON.stringify(VAL_CUTSTART).length > 8 ? (Moment(VAL_CUTSTART).format('YYYY-MMM-DD HH:mm HH:mm:ss')):("Not Updated") }</td>
                        <td>{JSON.stringify(VAL_CUTEND).length > 8 ? (Moment(VAL_CUTEND).format('YYYY-MMM-DD HH:mm HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_CUTTEAM}</td>
                        <td>{VAL_CUTHANDLE}</td>
                        <td>{VAL_CUTMETHOD}</td>
                    </tr>
                </tbody>
            </table>
        </Grid>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>RE-CUT DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"20%"}}>Re-Cut Start</th>
                    <th style={{width:"20%"}}>Re-Cut Finished</th>
                    <th style={{width:"20%"}}>Re-Cutting Team</th>
                    <th style={{width:"20%"}}>Handling Type</th>
                    <th style={{width:"20%"}}>Re-Cutting Method</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_RECUTLIST.map(item =>
                    <tr>
                        <td>{JSON.stringify(item.recut_start).length > 8 ? (Moment(item.recut_start).format('YYYY-MMM-DD HH:mm HH:mm:ss')):("Not Updated") }</td>
                        <td>{JSON.stringify(item.recut_end).length > 8 ? (Moment(item.recut_end).format('YYYY-MMM-DD HH:mm HH:mm:ss')):("Not Updated") }</td>
                        <td>{item.recut_team}</td>
                        <td>{item.recut_handling}</td>
                        <td>{item.recut_method}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}