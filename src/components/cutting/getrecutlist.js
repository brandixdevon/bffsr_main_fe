import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import ViewIcon from '@material-ui/icons/Visibility';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import CommentView from '../srf/srfcomments';

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
  { id: 'recut_id', numeric: true, disablePadding: false, label: 'SRF ID', width:'15%' },
  { id: 'recut_team', numeric: true, disablePadding: false, label: 'TEAM', width:'13%' },
  { id: 'recut_handling', numeric: true, disablePadding: false, label: 'HANDLING', width:'13%' },
  { id: 'recut_method', numeric: true, disablePadding: false, label: 'METHOD', width:'13%' },
  { id: 'recut_start', numeric: true, disablePadding: false, label: 'START DATE', width:'15%' },
  { id: 'recut_status', numeric: true, disablePadding: false, label: 'STATUS', width:'10%' },
  { id: 'recut_id', numeric: true, disablePadding: false, label: 'DONE', width:'10%' }
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
  var apiurl = localStorage.getItem('session_apiurl');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [DATASET, setDATASET] = React.useState([]);
  var Userid = localStorage.getItem('session_userid');

  
  const [CHECKSRFID, setCHECKSRFID] = React.useState([""]);

  const [opencomment, setOpencomment] = React.useState(false);
  const [Cmtsrfid, setCmtsrfid] = React.useState("");
  const [commentSRF, setcommentSRF] = React.useState("");
 
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

  const handleAdd = () => 
  {
    if(Userid.length <= 0)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find User.',  icon: 'error',  confirmButtonText: 'OK'});

        return;
    } 
    else if(CHECKSRFID.length !== 15)
    {
        Swal.fire({  title: 'Error!',  text: 'Sorry! Cannot Find SRF.',  icon: 'error',  confirmButtonText: 'OK'});
        return;
    }
    else
    {
        
        fetch(`http://${apiurl}/cutting/srfdocvalidate/${CHECKSRFID}`)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    window.location = "/ADDRECUT/"+ data.SRFID;
                }
                else if(data.Type === "ERROR")
                {
                  
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }
          
            })
            .catch(error => console.log(error));

    }
 

  }

  const OnChange_addsrf = (e) => {
    setCHECKSRFID(e.target.value);
  };

  function handleClickOpencomment(val,val2)
  {
    setOpencomment(true);
    setCmtsrfid(val);
    setcommentSRF(val2);
  }

  function finishedcut(val)
  {
        if(val.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find RE-CUT ID.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }

        if(Userid.length <= 0)
        {
            Swal.fire({  title: 'Error!',  text: 'Sorry! Can not Find Correct User.',  icon: 'error',  confirmButtonText: 'OK'});
            return;
        }
    
        Swal.fire({
            title: 'Are you sure?',
            text: "Do You Want To Complete This Re-Cutting Operation.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, already completed!'
        }).then((result) => {
            if (result.value) {
   
                fetch(`http://${apiurl}/cutting/recutcompleted/${val}/${Userid}`)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                      fetch(`http://${apiurl}/cutting/recutpendinglist/ALL`)
                      .then(res => res.json())
                      .then(response => {
                        setDATASET(response.recut);
                      })
                      .catch(error => console.log(error));
                       
                    }
  
                    if(data.Type === "ERROR")
                    {
                        Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                    }
                    
                })
                .catch(error => console.log(error));
      
            }
        })
  }

  const handleClosecomment = () => 
  {
    setOpencomment(false);
  }

  useEffect(() => {
    fetch(`http://${apiurl}/cutting/recutpendinglist/ALL`)
      .then(res => res.json())
      .then(response => {
        setDATASET(response.recut);
      })
      .catch(error => console.log(error));
 
  }, [Userid,apiurl]);
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
        <div style={{width:"45%"}}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                All Pending Re-Cutting List
            </Typography>
        </div>
        <div style={{width:"30%",textAlign:"right"}}>
          <Tooltip title="SCAN OR TYPE YOUR SRF DOCUMENT ID">
              <TextField id="outlined-basic" size="small" style={{width:"100%"}} label="Scan Your SRF Document ID" variant="outlined" value={CHECKSRFID} onChange={OnChange_addsrf} autoFocus />
          </Tooltip> 
      </div>
        <div style={{width:"25%",textAlign:"right"}}>
            <Button onClick={() => handleAdd()} style={{backgroundColor:"#5c2a9d",color:"white",width:"200px",height:"45px"}} variant="contained" color="default" size="small" className={classes.button} startIcon={<AddIcon />} >
                ADD NEW RE-CUT 
            </Button>
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
                  
                  return (
                    <TableRow
                      hover
                      role="row"
                      tabIndex={-1}
                      key={row.srf_id}
                      selected={isItemSelected}
                    >
                    <TableCell align="left">
                    <Tooltip title="View Details">
                        <IconButton aria-label="view" component={ Link } 
                            to={"/srfview/" + row.srf_id}
                            variant="contained"
                            color="primary"
                            size="small">
                            <ViewIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="User Comments">
                          <IconButton aria-label="view" component={ Link } 
                              onClick={() => handleClickOpencomment(row.srf_id,row.srfid)}
                              variant="contained"
                              color="primary"
                              size="small">
                              <ChatIcon  style={{color:"#a87b32"}}/>
                          </IconButton>
                          </Tooltip>
                      </TableCell>
                      <TableCell align="left">{row.srfid}</TableCell>
                      <TableCell align="left">{row.recut_team.replace(/"/g, "")}</TableCell>
                      <TableCell align="left">{row.recut_handling.replace(/"/g, "")}</TableCell>
                      <TableCell align="left">{row.recut_method.replace(/"/g, "")}</TableCell>
                      <TableCell align="left">{Moment(row.recut_start).format("YYYY-MMM-DD HH:mm:ss")}</TableCell>
                      <TableCell align="left">{row.recut_status.replace(/"/g, "")}</TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="primary" size="small" onClick={() => finishedcut(row.recut_id)}>FINISHED</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={8} />
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
