import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

  
export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_TDS, setVAL_TDS] = useState("");
    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_SMV, setVAL_SMV] = useState([]);
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/smvrelease/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_TDS(response.smv[0].tds_file);
                setVAL_STATUS(response.smv[0].smv_status);
                setVAL_LASTCHANGE(response.smv[0].change_date);
                setVAL_USER(response.smv[0].username);
            }
            else
            {
                setVAL_TDS("N/A");
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/smv/smvoperationlist/${props.SRFID}`)
          .then(res => res.json())
          .then(response => { setVAL_SMV(response.smvlist); })
          .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SMV RELEASE DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"25%"}}>TDS File</th>
                    <th style={{width:"25%"}}>Status</th>
                    <th style={{width:"25%"}}>Last Update</th>
                    <th style={{width:"25%"}}>Updated User</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>
                            { VAL_TDS.length !== 0 ?
                            (
                                <Button component={ Link } color="primary" target="_blank" to={`//${apiurl}/smv/downloadtds/` + VAL_TDS} variant="contained" size="small" style={{padding:10,margin:5}}>Download File</Button>
                            ) :
                            (
                                <p style={{"color":"red"}}>Not Found.</p>
                            )}
                        </td>
                        <td>{VAL_STATUS}</td>
                        <td>{JSON.stringify(VAL_LASTCHANGE).length > 8 ? (Moment(VAL_LASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_USER}</td>
                    </tr>
                </tbody>
            </table>
        </Grid>
        <Grid item md={6}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>SMV VALUES</Typography>

            <table style={{width:"80%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"50%"}}>SMV Operation</th>
                    <th style={{width:"50%"}}>SMV Value</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_SMV.map(item =>
                    <tr>
                        <td>{item.proelmname}</td>
                        <td>{item.smvop_time}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}