import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'react-vertical-timeline-component/style.min.css';
import Avatar from '@material-ui/core/Avatar';
import { blue, green } from '@material-ui/core/colors';
import Moment from 'moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function YESNO(value)
{
  if(value === "true")
  {
    return <CheckCircleIcon style={{ color: "green" }}/>;
  }
  else
  {
    return <CancelIcon  color="error"/>;
  }
  
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    square: {
      color: theme.palette.getContrastText(blue[900]),
      backgroundColor: blue[900],
    },
    rounded: {
      color: '#fff',
      backgroundColor: green[500],
    },
  }));

  
export default function EnhancedTable() {
    const classes = useStyles();
    var apiurl = localStorage.getItem('session_apiurl');
    const [MASTERDATASET, setMASTERDATASET] = React.useState([]);
    const [DATASET, setDATASET] = React.useState([]);
  

  Moment.locale('en');

  useEffect(() => {
    var URL_id = window.location.href.split('/').reverse()[0];
    fetch(`http://${apiurl}/productroute/routemapping/${URL_id}`)
      .then(res => res.json())
      .then(response => {
        setDATASET(response.routemap);
      })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/productroute/routedetail/${URL_id}`)
      .then(res => res.json())
      .then(response => {
        setMASTERDATASET(response.routedetails);
      })
      .catch(error => console.log(error));

  }, [apiurl]);

  return (
    <div className={classes.root}>
    <Container maxWidth={false} className={classes.container}>
      <Grid style={{backgroundColor: 'white'}}  container spacing={1}>
        <Grid item xs={12} md={4}>
        <Button component={ Link } to={"/ROUTES/"} variant="outlined" color="primary" size="large" className={classes.button} startIcon={<ArrowBackIcon />} >
          Back To List
      </Button>
        </Grid>
        <Grid item xs={12} md={8}><h2>Route Elements Mapping Details</h2></Grid>
        <Grid item xs={12} md={12}>
          <Box borderColor="primary.main" border={2} p={1} m={0.5} borderRadius="borderRadius">
            {MASTERDATASET.map(itemnew => 
              <div>
              <table>
                <tbody>
                  <tr>
                    <td><Typography variant="button" gutterBottom style={{Color: 'purple'}}>Route Name :</Typography></td>
                    <td>{itemnew.routename}</td>
                  </tr>
                  <tr>
                    <td><Typography variant="button" gutterBottom style={{Color: 'purple'}}>Route Shortcode :</Typography></td>
                    <td>{itemnew.routeshort}</td>
                  </tr>
                  <tr>
                    <td><Typography variant="button" gutterBottom style={{Color: 'purple'}}>Route Is Active :</Typography></td>
                    <td>{YESNO(JSON.stringify(itemnew.isactive))}</td>
                  </tr>
                  <tr>
                    <td><Typography variant="button" gutterBottom style={{Color: 'purple'}}>Route Has Dye/Wash Plants :</Typography></td>
                    <td>{YESNO(JSON.stringify(itemnew.dwplant))}</td>
                  </tr>
                  <tr>
                    <td><Typography variant="button" gutterBottom style={{Color: 'purple'}}>Route Has Embellishment Plants :</Typography></td>
                    <td>{YESNO(JSON.stringify(itemnew.embplant))}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
                 
              </div>
              )}
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>

        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'small'} aria-label="enhanced table" >
            <TableHead>
              <TableRow>
                <TableCell><b>ORDER</b></TableCell>
                <TableCell><b>ELEMENT NAME</b></TableCell>
                <TableCell><b>IS MANDATORY STEP</b></TableCell>
                <TableCell><b>NEED SMV INPUT</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {DATASET.map(itemselect =>
              <TableRow>
                <TableCell align="left">
                  <Avatar variant="square" className={classes.square}>
                    {itemselect.hierarchy}
                  </Avatar> 
                </TableCell>
                <TableCell style={{fontSize:"13px"}} align="left">{itemselect.proelmname}</TableCell>
                <TableCell style={{fontSize:"13px"}} align="left">{YESNO(JSON.stringify(itemselect.isrequired))}</TableCell>
                <TableCell style={{fontSize:"13px"}} align="left">{YESNO(JSON.stringify(itemselect.issmv))}</TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TableContainer>

        </Grid>
      </Grid>
    </Container>
       
    </div>
  );
}
