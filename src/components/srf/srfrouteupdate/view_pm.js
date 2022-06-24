import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

  
export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [VAL_CUTTERMUST, setVAL_CUTTERMUST] = useState("");
    const [VAL_PTREF, setVAL_PTREF] = useState("");
    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_FABRICYY, setVAL_FABRICYY] = useState([]);
    const [VAL_TRIMYY, setVAL_TRIMYY] = useState([]);
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/patternmake/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_CUTTERMUST(response.pattern[0].cutter_must);
                setVAL_PTREF(response.pattern[0].pattern_ref);
                setVAL_STATUS(response.pattern[0].pm_status);
                setVAL_LASTCHANGE(response.pattern[0].change_date);
                setVAL_USER(response.pattern[0].username);
            }
            else
            {
                setVAL_CUTTERMUST("N/A");
                setVAL_PTREF("N/A");
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/fabricyy/${props.SRFID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_FABRICYY(response.fabricyy);
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/srfdetails/trimyy/${props.SRFID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_TRIMYY(response.trimyy);
            }
            
        })
      .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>PATTERN RELEASE DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"20%"}}>Cutter Must</th>
                    <th style={{width:"20%"}}>Pattern Reference</th>
                    <th style={{width:"20%"}}>Status</th>
                    <th style={{width:"20%"}}>Last Update</th>
                    <th style={{width:"20%"}}>Updated User</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>
                            { VAL_CUTTERMUST.length !== 0 ?
                            (
                                <Button component={ Link } color="primary" target="_blank" to={`//${apiurl}/patternmaking/downloadcm/` + VAL_CUTTERMUST} variant="contained" size="small" style={{padding:10,margin:5}}>Download File</Button>
                            ) :
                            (
                                <p style={{"color":"red"}}>Not Found.</p>
                            )}
                        </td>
                        <td>{VAL_PTREF}</td>
                        <td>{VAL_STATUS}</td>
                        <td>{JSON.stringify(VAL_LASTCHANGE).length > 8 ? (Moment(VAL_LASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_USER}</td>
                    </tr>
                </tbody>
            </table>
        </Grid>
        <Grid item md={6}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>FABRIC YY DETAILS</Typography>

            <table style={{width:"80%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"50%"}}>Fabric YY</th>
                    <th style={{width:"50%"}}>Qty in Yard</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_FABRICYY.map(item =>
                    <tr>
                        <td>{item.yy_value}</td>
                        <td>{item.yy_unit}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
        <Grid item md={6}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>TRIMS YY DETAILS</Typography>

            <table style={{width:"80%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"50%"}}>Trim YY</th>
                    <th style={{width:"50%"}}>Qty in Yard</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_TRIMYY.map(item =>
                    <tr>
                        <td>{item.yy_value}</td>
                        <td>{item.yy_unit}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
    </Grid>
);
}