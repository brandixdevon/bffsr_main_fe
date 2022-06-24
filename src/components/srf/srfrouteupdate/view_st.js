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
    
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/stores/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
                if(response.Type === "SUCCESS")
                {
                    setVAL_STATUS(response.stores[0].st_status);
                    setVAL_LASTCHANGE(response.stores[0].change_date);
                    setVAL_USER(response.stores[0].username);
                }
                else
                {
                    setVAL_STATUS("N/A");
                    setVAL_LASTCHANGE("N/A");
                    setVAL_USER("N/A");
                }
        })
      .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>STORES DETAILS</Typography>
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
    </Grid>
);
}