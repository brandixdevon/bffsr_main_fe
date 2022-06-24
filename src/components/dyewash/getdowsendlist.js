import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ViewIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ChatIcon from '@material-ui/icons/Chat';
import CommentView from '../srf/srfcomments';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
    backgroundColor:"#d65d4d"
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle style={{backgroundColor:"#3632a8"}} disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{color: "white"}}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
 
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'srf_id', numeric: true, disablePadding: false, label: 'SRF ID' , width:'10%'},
  { id: 'gatepass_no', numeric: true, disablePadding: false, label: 'GATE PASS', width:'15%' },
  { id: 'plant_name', numeric: true, disablePadding: false, label: 'D/W PLANT', width:'15%' },
  { id: 'dow_panel', numeric: true, disablePadding: false, label: 'PANEL', width:'15%' },
  { id: 'size_name', numeric: true, disablePadding: false, label: 'SIZE', width:'10%' },
  { id: 'send_qty', numeric: true, disablePadding: false, label: 'QTY', width:'10%' },
  { id: 'send_date', numeric: true, disablePadding: false, label: 'SEND DATE', width:'10%' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      <TableCell width={"10%"} style={{fontSize:"10px",fontWeight:"bold",color:"#0064b5"}}>#ACTIONS</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            width={headCell.width}
            style={{fontSize:"10px",fontWeight:"bold",color:"#0064b5"}}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : true}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));
 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

 
export default function EnhancedTable() {
  const classes = useStyles();
  const classes_tbhead = useToolbarStyles();
  var apiurl = localStorage.getItem('session_apiurl');
  var Userid = localStorage.getItem('session_userid');
  const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('srf_id');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [DATASET, setDATASET] = React.useState([]);

  const [opencomment, setOpencomment] = React.useState(false);
  const [Cmtsrfid, setCmtsrfid] = React.useState("");
  const [commentSRF, setcommentSRF] = React.useState("");

  const [SCANVALUE, setSCANVALUE] = React.useState("");

  const [openrec, setOpenrec] = React.useState(false);
  const [dowitemid, setdowitemid] = React.useState("");
  const [recSRF, setrecSRF] = React.useState("");
  const [recSRF_ID ,setrecSRF_ID] = React.useState("");
  const [recGP, setrecGP] = React.useState("");
  const [recPLANT, setrecPLANT] = React.useState("");
  const [recPANEL, setrecPANEL] = React.useState("");
  const [recSIZE, setrecSIZE] = React.useState("");
  const [sendQTY, setsendQTY] = React.useState("");
  const [recQTY, setrecQTY] = React.useState("");
  const [recCOMMENT, setrecCOMMENT] = React.useState("");
  const [RECMSGERROR, setRECMSGERROR]= React.useState("");

  const [IsqtyUpdate, setIsqtyUpdate] = React.useState(false);
  const [IsFinished, setIsFinished] = React.useState(false);
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, DATASET.length - page * rowsPerPage);

  Moment.locale('en');

  function handleClickOpencomment(val,val2)
  {
    setOpencomment(true);
    setCmtsrfid(val);
    setcommentSRF(val2);
  }

  const handleClosecomment = () => 
  {
    setOpencomment(false);
  }

  function handleClickOpenrec(val,val2,val3,val4,val5,val6,val7,val8)
  {
    setOpenrec(true);
    setrecQTY("");
    setrecCOMMENT("");
    setrecQTY("");
    setRECMSGERROR("");
    setdowitemid(val);
    setrecSRF(val2);
    setrecSRF_ID(val8);

    setrecGP(val3);
    setrecPLANT(val4);
    setrecPANEL(val5);
    setrecSIZE(val6);
    setsendQTY(val7);
  }

  const handleCloserec = () => 
  {
    setOpenrec(false);
  }

  const TextFieldChange = (e) => 
  {
    setSCANVALUE(e.target.value);
    
    if(e.target.value.length > 15 )
    {
      
      Swal.fire({  title: 'Error!',  text: 'Sorry! Incorrect SRF Document ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
    }
    else if(e.target.value.length === 15)
    {
      window.location = '/ALLDOWSCANLIST/' + e.target.value;
      return;
    }

  }

  const RecQtyChange = (e) => {
    setrecQTY(e.target.value);
  }

  const RecCmtChange = (e) => {
    setrecCOMMENT(e.target.value);
  }

  const UpdateRecive = () => {

    if(dowitemid.length < 1)
    {
      setRECMSGERROR("Sorry! Item Can not identify.");
      return;
    }

    if(recSRF_ID < 1)
    {
      setRECMSGERROR("Sorry! SRF Can not identify.");
      return;
    }

    const Reg_Sizeqty = /^[0-9\b]+$/;

    if (!Reg_Sizeqty.test(recQTY)) 
    {
      setRECMSGERROR("Please Enter Integer Value For Received Quantity");
        return;
      }

      if(Number(sendQTY) < Number(recQTY))
    {
        if(recCOMMENT.length < 3)
        {
          setRECMSGERROR("Sorry! Received Qty Can not be greater than send qty.");
              return;
        }
    }
 
    
    if(Number(sendQTY) !== Number(recQTY))
    {
        if(recCOMMENT.length < 3)
        {
          setRECMSGERROR("Sorry! Please Enter Reason For Quantity Mismatch.");
              return;
        }
    }

    const sendOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "userid": Userid,
        "dowitemid": dowitemid,
        "recqty": recQTY,
        "reason" : recCOMMENT
      })
  };

    fetch(`http://${apiurl}/dyeorwashscan/updaterecqty`,sendOptions)
    .then(response => response.json())
    .then(data => 
      {
        if(data.Type === "SUCCESS")
        {
          setIsqtyUpdate(true);
        }
        else
        {
          setIsqtyUpdate(false);
          setRECMSGERROR(data.Msg);
        }
      })
    .catch(error => setRECMSGERROR(error));

    setOpenrec(false);

  }

  useEffect(() => {

    fetch(`http://${apiurl}/dyeorwashscan/pendingdowscan/${SRFID}`)
      .then(res => res.json())
      .then(response => {
        setDATASET(response.dyeorwash);
      })
      .catch(error => console.log(error));

      if(SRFID.length === 15)
      {
        setSCANVALUE(SRFID);
      }

      if(IsqtyUpdate === true )
      {
        fetch(`http://${apiurl}/dyeorwashscan/pendingdowscan/${SRFID}`)
          .then(res => res.json())
          .then(response => {
            setDATASET(response.dyeorwash);
          })
          .catch(error => console.log(error));

          fetch(`http://${apiurl}/dyeorwashscan/getpendingcount/${dowitemid}`)
          .then(res => res.json())
          .then(response => {
            if(response.itemcount === 0 || response.itemcount === "0")
            {
              setIsFinished(true);
              setIsqtyUpdate(false);
            }
            else
            {
              setIsFinished(false);
              setIsqtyUpdate(false);
            }
          })
          .catch(error => console.log(error));
      }

      if(IsFinished === true)
      {
        const sendOptionsNextStep = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "srfid": recSRF_ID,
              "proelmid": "11",
          })
        };

        fetch(`http://${apiurl}/srf/srfnext`,sendOptionsNextStep)
        .then(resNextStep => resNextStep.json())
        .then(dataNextStep => 
        {
            if(dataNextStep.Type === "SUCCESS")
            { 
              setIsFinished(false);
                Swal.fire({  title: 'Success!',  text: `All Dye-Wash Items Received for ${recSRF}`,  icon: 'info',  confirmButtonText: 'OK'}).then(function() {
                  window.location = "/ALLDOWSCANLIST/ALL";
              });
            }

            if(dataNextStep.Type === "ERROR")
            {
              setIsFinished(false);
                Swal.fire({  title: 'Error!',  text: dataNextStep.Msg,  icon: 'error',  confirmButtonText: 'OK'});
            } 
    
        })
        .catch(error => console.log(error));
      }

  }, [apiurl,SRFID,IsqtyUpdate,IsFinished,recSRF_ID,dowitemid,recSRF]);


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
     
      <Toolbar className={clsx(classes_tbhead.root)} >
      <div style={{width:"50%"}}>
          <Typography className={classes.title} variant="h6" id="tableTitle" >
            All Dye/Wash Receive Pending Panels List
          </Typography>
      </div>
      <div style={{width:"50%",textAlign:"right"}}>
          <Tooltip title="Scan Your Barcode">
              <TextField id="outlined-basic" size="small" label="Scan Your SRF Barcode" variant="outlined" value={SCANVALUE} onChange={TextFieldChange} />
          </Tooltip> 
      </div>
          
          
      </Toolbar>

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(DATASET, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.routename);
                  //const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="row"
                      tabIndex={-1}
                      key={row.dowitem_id}
                      selected={isItemSelected}
                    >
                    <TableCell width="15%" align="left">
                    <Tooltip title="View Details">
                          <IconButton aria-label="view" component={ Link } 
                              to={"/srfview/" + row.srf_id}
                              variant="contained"
                              color="primary"
                              size="small">
                              <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Scan Receiving">
                          <IconButton aria-label="edit" component={ Link } 
                              onClick={() => handleClickOpenrec(row.dowitem_id,row.srfidseq,row.gatepass_no,row.plant_name,row.dow_panel,row.size_name,row.send_qty,row.srf_id)}
                              variant="contained"
                              color="default"
                              size="small">
                              <AssignmentReturnedIcon color="action" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="User Comments">
                          <IconButton aria-label="view" component={ Link } 
                              onClick={() => handleClickOpencomment(row.srf_id,row.srfidseq)}
                              variant="contained"
                              color="primary"
                              size="small">
                              <ChatIcon  style={{color:"#a87b32"}}/>
                          </IconButton>
                          </Tooltip>
                      </TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left" id={row.srf_id}>{row.srfidseq}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.gatepass_no}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.plant_name}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.dow_panel}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.size_name}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.send_qty}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{Moment(row.send_date).format('DD-MMM-yyyy')}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                {
                  SRFID === "ALL" ? (<TableCell colSpan={8} />):
                  (<>
                    <TableCell colSpan={8}>SCAN ID : {SRFID}</TableCell>
                    </>
                  )
                }
                 
                </TableRow>
              )}
            </TableBody>

                        <Dialog maxWidth="md" fullWidth={true} onClose={handleClosecomment} aria-labelledby="customized-dialog-title-Comment" open={opencomment} >
                            <DialogTitle id="customized-dialog-title-Comment" onClose={handleClosecomment}>
                            {"Comments For SRF : " }{ commentSRF}
                            </DialogTitle>
                            <DialogContent dividers>
                                <CommentView SRFID={Cmtsrfid} />
                            </DialogContent>
                            <DialogActions>
                            
                            </DialogActions>
                        </Dialog>

                        <Dialog maxWidth="md" fullWidth={true} onClose={handleCloserec} aria-labelledby="customized-dialog-title-rec" open={openrec} >
                            <DialogTitle id="customized-dialog-title-rec" onClose={handleCloserec}>
                            {"Dye-Wash Receiving Update " }
                            </DialogTitle>
                            <DialogContent dividers>
                              <Grid container spacing={3}>
                                  <Grid item md={12} spacing={1}>
                                    <Typography variant="h6" style={{color:"red",fontSize:"15px"}}>{RECMSGERROR}</Typography>
                                  </Grid>
                                  <Grid item md={6} spacing={2}><b>SRF DOC ID : </b>{recSRF}</Grid>
                                  <Grid item md={6} spacing={2}><b>GATE PASS NO : </b>{recGP}</Grid>
                                  <Grid item md={6} spacing={2}><b>PLANT NAME : </b>{recPLANT}</Grid>
                                  <Grid item md={6} spacing={2}><b>PANEL : </b>{recPANEL}</Grid>
                                  <Grid item md={6} spacing={2}><b>SIZE : </b>{recSIZE}</Grid>
                                  <Grid item md={6} spacing={2}><b>SEND QTY : </b>{sendQTY}</Grid>

                              </Grid>
                              <Grid container spacing={3}>
                                   
                                  <Grid item md={12} spacing={2}>
                                    <Typography variant="h6" style={{color:"blue",fontSize:"12px"}}>Receiving Quantity</Typography>
                                    <TextField id="outlined-basic" size="small" autoFocus variant="outlined" value={recQTY} onChange={RecQtyChange} />
                                  </Grid>
                                  
                                  <Grid item md={12} spacing={2}>
                                    <Typography variant="h6" style={{color:"blue",fontSize:"12px"}}>Special Reason/Remark</Typography>
                                      <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        style={{width:"100%"}}
                                        value={recCOMMENT}
                                        onChange={RecCmtChange}
                                      />
                                  </Grid>

                              </Grid>
                            </DialogContent>
                            <DialogActions>
                            <Button style={{margin:"5px"}} variant="contained" color="primary" onClick={UpdateRecive}>Mark as Received and SAVE</Button>
                            </DialogActions>
                        </Dialog>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={DATASET.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
  );
}
