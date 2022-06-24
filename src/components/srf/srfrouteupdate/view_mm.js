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

    const [VAL_YY, setVAL_YY] = useState([]);
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/markermaking/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_STATUS(response.marker[0].mm_status);
                setVAL_LASTCHANGE(response.marker[0].change_date);
                setVAL_USER(response.marker[0].username);
            }
            else
            { 
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/patternmaking/pmfabricyy/${props.SRFID}`)
      .then(res => res.json())
      .then(response => { setVAL_YY(response.fabricyy); })
      .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>MARKER MAKING DETAILS</Typography>
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
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>FABRIC YY DETAILS (Marker Maker Update)</Typography>

            <table style={{width:"80%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"40%"}}>Fabric YY</th>
                    <th style={{width:"15%"}}>Qty/Unit</th>
                    <th style={{width:"15%"}}>Perimeter</th>
                    <th style={{width:"15%"}}>Pcs</th>
                    <th style={{width:"15%"}}>Plies</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_YY.map(item =>
                    <tr>
                        <td>{item.yy_value}</td>
                        <td>{item.yy_unit}</td>
                        <td>{item.perimeter}</td>
                        <td>{item.pcs}</td>
                        <td>{item.plice}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}