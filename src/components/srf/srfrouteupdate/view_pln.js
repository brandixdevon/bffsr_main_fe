import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

  
export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    const [SelectedDate, setSelectedDate] = useState("");
    const [VAL_STATUS, setVAL_STATUS] = useState("");
    const [VAL_LASTCHANGE, setVAL_LASTCHANGE] = useState("");
    const [VAL_USER, setVAL_USER] = useState("");

    const [VAL_TNALIST, setVAL_TNALIST] = useState([]);
     
    useEffect(() => {


      fetch(`http://${apiurl}/srfdetails/planning/${props.SRFID}/${props.PROELMID}`)
      .then(res => res.json())
      .then(response => {
          
            if(response.Type === "SUCCESS")
            {
                setVAL_STATUS(response.plan[0].pl_status);
                setVAL_LASTCHANGE(response.plan[0].change_date);
                setVAL_USER(response.plan[0].username);
            }
            else
            {
                setVAL_STATUS("N/A");
                setVAL_LASTCHANGE("N/A");
                setVAL_USER("N/A");
            }
            
        })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/plan/getplantna/${props.SRFID}`)
    .then(res => res.json())
    .then(response => { setVAL_TNALIST(response.plantna); })
    .catch(error => console.log(error));

    fetch(`http://${apiurl}/plan/srfplandate/${props.SRFID}`)
    .then(res => res.json())
    .then(response => { setSelectedDate(response.srfplndate); })
    .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>PLANNING DETAILS</Typography>
            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"20%"}}>Plan Date</th>
                    <th style={{width:"20%"}}>Status</th>
                    <th style={{width:"20%"}}>Last Update</th>
                    <th style={{width:"20%"}}>Updated User</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                    <tr>
                        <td>{JSON.stringify(SelectedDate).length > 8 ? (Moment(SelectedDate).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_STATUS}</td>
                        <td>{JSON.stringify(VAL_LASTCHANGE).length > 8 ? (Moment(VAL_LASTCHANGE).format('YYYY-MMM-DD HH:mm:ss')):("Not Updated") }</td>
                        <td>{VAL_USER}</td>
                    </tr>
                </tbody>
            </table>
        </Grid>
        <Grid item md={8}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>PLANNING TNA DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"80%"}}>Action Item</th>
                    <th style={{width:"30%"}}>TnA Date</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_TNALIST.map(item =>
                    <tr>
                        <td>{item.proelmname}</td>
                        <td>{Moment(item.tnadate).format('YYYY-MMM-DD')}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}