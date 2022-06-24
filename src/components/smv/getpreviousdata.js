import React,{useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Link } from 'react-router-dom';

const defaultProps = {
    bgcolor: '#fcfcfc',
    borderColor: '#8f30ba',
    m: 1,
    border: 1,
    style: { width: '100%', height: '100%' },
  };

  

export default function GetSideView({srfid}) {

    //Form Parameters
    var apiurl = localStorage.getItem('session_apiurl');
    const [DT_SMVSRFLIST, setDT_SMVSRFLIST] = React.useState([]);
    var Userid = localStorage.getItem('session_userid');

    function Copysmv(item1,item2){

        Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Copy this SMV Operation Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2b9449',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, copy it!'
        }).then((result) => {
            if (result.value) {
  
                const sendOptions = {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"fromsrfid" : item1 , "fromproelmid" : item2 ,"tosrfid" : srfid , "userid" : Userid})
                };
  
                fetch(`http://${apiurl}/smv/copysmvdata`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                            window.location = "/smvupdate/"+srfid;
                        });
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
  
                        
          
                })
                .catch(error => console.log(error));
      
            }
        })
  
    };

    useEffect(() => 
    {

        fetch(`http://${apiurl}/smv/oldsmvdata/${srfid}`)
          .then(res => res.json())
          .then(response => { 
              setDT_SMVSRFLIST(response.smvlist);
          
          })
          .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
    

    }, [srfid,apiurl])
    
  return (
    <Box display="flex" justifyContent="center">
        <Box p={2} borderRadius="borderRadius" {...defaultProps}>
            <Typography variant="body2" color="textprimary" align="center">OLD SMV DETAILS RELATED STYLE AND CUSTOMER</Typography>

            <Table aria-label="History Table">
            <TableHead>
                <TableRow TableRow> 
                <TableCell size="small" style={{width:"10%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>#</Typography> 
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"35%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>SRF</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"10%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>TDS</Typography>
                </TableCell>
                <TableCell size="small" style={{"font-weight":800,width:"35%"}} align="right">
                    <Typography variant="subtitle2" gutterBottom>SMV VALUES</Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {DT_SMVSRFLIST.map((row) => (
                <TableRow key={row.smvop_id}>
                    <TableCell size="small" align="right">
                        <Button variant="contained" color="primary" style={{padding:4}} onClick={() => Copysmv(row.srf_id,row.proelmid)}>COPY</Button>
                    </TableCell>
                    <TableCell size="small" align="right">{row.srfseqid}</TableCell>
                    <TableCell size="small" align="right">
                        <IconButton aria-label="download" 
                        component={ Link } target="_blank" to={`//${apiurl}/smv/downloadtds/` + row.tds_file}
                        variant="contained"
                        color="primary"
                        size="small">
                        <CloudDownloadIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell size="small" align="right">{row.smvoperation}</TableCell>
                    
                </TableRow>
                    ))}
        </TableBody>
        </Table>
        
            
        </Box>
    </Box>
  );

}