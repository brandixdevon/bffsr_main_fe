import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

  
export default function CommentView(props) 
{
    var apiurl = localStorage.getItem('session_apiurl');

    
    const [VAL_EMBITEMS, setVAL_EMBITEMS] = useState([]);
     
    useEffect(() => {

      fetch(`http://${apiurl}/srfdetails/embellishmentitems/${props.SRFID}`)
          .then(res => res.json())
          .then(response => { setVAL_EMBITEMS(response.embitems); })
          .catch(error => console.log(error));

  
    }, [apiurl,props]);

return(
    <Grid container spacing={3}>
       
        <Grid item md={12}>
            <Typography variant="h6" style={{color:"blue",fontSize:"15px"}}>EMBELLISHMENT SEND/RECEIVE ITEMS DETAILS</Typography>

            <table style={{width:"100%"}}>
                <thead style={{height:"30px",color:"black",backgroundColor:"#c3c3c3",textAlign:"center",fontWeight:700,fontSize:"12px"}}>
                    <th style={{width:"10%"}}>Size Name</th>
                    <th style={{width:"10%"}}>Panel</th>
                    <th style={{width:"10%"}}>Plant</th>
                    <th style={{width:"10%"}}>Status</th>
                    <th style={{width:"20%"}}>Sending Details</th>
                    <th style={{width:"20%"}}>Return Details</th>
                    <th style={{width:"20%"}}>Remark</th>
                </thead>
                <tbody style={{height:"30px",color:"black",backgroundColor:"#ebebeb",textAlign:"center",fontWeight:500,fontSize:"14px"}}>
                {VAL_EMBITEMS.map(item =>
                    <tr>
                        <td>{item.size_name}</td>
                        <td>{item.emb_panel}</td>
                        <td>{item.plant_name}</td>
                        <td>{item.embitem_status}</td>
                        <td style={{textAlign:"left"}}>
                            <b>Qty : </b>{item.send_qty}<br/>
                            <b>User : </b>{item.sendby}<br/>
                            <b>Date : </b>{JSON.stringify(item.send_date).length > 8 ? (Moment(item.send_date).format('YYYY-MMM-DD HH:mm HH:mm:ss')):("Not Updated") }
                        </td>
                        <td style={{textAlign:"left"}}>
                            <b>Qty : </b>{item.return_qty}<br/>
                            <b>User : </b>{item.returnby}<br/>
                            <b>Date : </b>{JSON.stringify(item.return_date).length > 8 ? (Moment(item.return_date).format('YYYY-MMM-DD HH:mm HH:mm:ss')):("Not Updated") }
                        </td>
                        <td>{item.remark}</td>
                    </tr>
                )}
                </tbody>
            </table>

        </Grid>
        
    </Grid>
);
}