import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
  
export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_EMB, setVAL_EMB] = useState([]);

    const [EMBHIDDEN, setEMBHIDDEN] = useState(true);
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/dispatch/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_STATUS(response.dispatch[0].dis_status);
                setVAL_LASTCHANGE(response.dispatch[0].change_date);
                setVAL_USER(response.dispatch[0].username);
            }
            else
            {
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/placementboard/${props.SRFID}`)
      .then(res => res.json())
      .then(response => { 
          setVAL_EMB(response.placementboard);
          
          if(response.placementboard.length > 0)
          {
            setEMBHIDDEN(false);
          }
        
        })
      .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>DISPATCH DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"35%"}}>Status</th>
                    <th style={{width:"30%"}}>Last Update</th>
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
        </Grid>

        <Grid hidden={EMBHIDDEN} item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>PLACEMENT BOARD UPDATE</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"15%"}}>PB Status</th>
                    <th style={{width:"15%"}}>PB Is Ready?</th>
                    <th style={{width:"25%"}}>Download E-File</th>
                    <th style={{width:"25%"}}>Finished Date</th>
                    <th style={{width:"20%"}}>Prepared By</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_EMB.map(item =>
                    <tr>
                        <td>{item.pb_status}</td>
                        <td>{item.pb_ready}</td>
                        <td>
                        { item.e_pb !== null ?
                            (
                                <Button component={ Link } color="primary" target="_blank" to={`//${apiurl}/placementboard/downloadepb/` + item.e_pb} variant="contained" size="small" style={{padding:10,margin:5}}>Download File</Button>
                            ) :
                            (
                                <p style={{"color":"red"}}>Not Found.</p>
                            )}
                        </td>
                        <td>{JSON.stringify(item.change_date).length > 8 ? (Moment(item.change_date).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{item.username}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
         
    </Grid>
);
}