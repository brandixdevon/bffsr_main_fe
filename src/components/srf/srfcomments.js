import React, { useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TextsmsIcon from '@material-ui/icons/Textsms';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 256
      }
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden'
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto'
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    }
  }));
  
export default function CommentView(props) 
{
    const classes = useStyles();
    var apiurl = localStorage.getItem('session_apiurl');
    const [SRFID, setSRFID] = useState();
    const [DSCOMMENT, setDSCOMMENT] = useState([]);
    const [TEXTCOMMENT, setTEXTCOMMENT] = useState([]);
    const [MSGERROR, setMSGERROR] = useState('');
    const [MSGSUCCESS, setMSGSUCCESS] = useState('');
    var USERID = localStorage.getItem('session_userid');
    Moment.locale('en');
     const AddNewComment = (e) => {

      setMSGERROR("");
      setMSGSUCCESS("");

        if(USERID.length <= 0)
        {
          setMSGERROR("Can not identify User, Please Sign In Again !");
            return;
        }

        if(SRFID.length <= 0)
        {
          setMSGERROR("Can not identify SRF, Please Select Again !");
            return;
        }

        if(TEXTCOMMENT.length <= 0)
        {
          setMSGERROR("Comment Can not Empty!, Please Enter your Comment !");
            return;
        }

        const sendOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "userid": USERID,
              "srfid": SRFID,
              "comment" : TEXTCOMMENT
            })
        };

        fetch(`http://${apiurl}/srf/addcomment`,sendOptions)
        .then(response => response.json())
        .then(data => 
          {
            if(data.Type === "SUCCESS")
            {
                setTEXTCOMMENT("");
                fetch(`http://${apiurl}/srf/srfcommentslist/${SRFID}`)
                .then(res => res.json())
                .then(response => {setDSCOMMENT(response.srfcomments);})
                .catch(error => console.log(error));
                  
                setMSGSUCCESS(data.Msg);
                return;
            }
            else
            {
              setMSGERROR(data.Msg);
            }
          })
        .catch(error => setMSGERROR(error));
    }

    const OnChangeComment = (e) => 
    {
        setMSGERROR("");
        setMSGSUCCESS("");
        setTEXTCOMMENT(e.target.value);
    }

    useEffect(() => {

      setSRFID(props.SRFID);
      fetch(`http://${apiurl}/srf/srfcommentslist/${props.SRFID}`)
      .then(res => res.json())
      .then(response => {setDSCOMMENT(response.srfcomments);})
      .catch(error => console.log(error));

  
    }, [SRFID,apiurl,props]);

return(
  
    <Grid container spacing={3}>
        <Grid item md={12}>
        <Typography variant="h6" style={{color:"red",fontSize:"12px"}}>{MSGERROR}</Typography>
        <Typography variant="h6" style={{color:"green",fontSize:"12px"}}>{MSGSUCCESS}</Typography>

        <TextField
          id="outlined-multiline-static"
          label="Enter your comment in here"
          multiline
          rows={3}
          autoFocus
          variant="outlined"
          style={{width:"100%"}}
          value={TEXTCOMMENT}
          onChange={OnChangeComment}
        />
        <Button style={{margin:"5px"}} variant="contained" color="primary" onClick={AddNewComment}>Add Comment</Button>
        </Grid>
        <Grid item md={12}>
           
            <Timeline align="alternative">
                {DSCOMMENT.map((row,index) => { return(
                <TimelineItem>
                <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                {Moment(row.comment_date).format('dddd DD-MMM HH:mm')}
                </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color='primary'>
                    <TextsmsIcon />
                </TimelineDot>
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Paper elevation={3} style={{backgroundColor:"#d1e3ff",padding:"20px"}} className={classes.paper}>
                    
                    <Typography style={{color:"black",fontSize:"14px", }}>{row.comment_desc}</Typography>
                    <Typography style={{color:"black",fontSize:"14px",fontStyle:"italic",fontWeight:"500"}}>
                    - {row.username}
                    </Typography>

                </Paper>
                </TimelineContent>
            </TimelineItem>
                );})}
                
        
        </Timeline>
        </Grid>
    </Grid>
   
);
}