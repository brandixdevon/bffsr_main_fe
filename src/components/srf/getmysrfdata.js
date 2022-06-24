import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
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
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ChatIcon from '@material-ui/icons/Chat';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CommentView from './srfcomments';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
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
  { id: 'cus_name', numeric: true, disablePadding: false, label: 'CUSTOMER', width:'10%' },
  { id: 'srf_style', numeric: true, disablePadding: false, label: 'STYLE NO', width:'10%' },
  { id: 'sam_stage_title', numeric: true, disablePadding: false, label: 'STAGE', width:'10%' },
  { id: 'srf_reqdate', numeric: true, disablePadding: false, label: 'REQUIRE DATE', width:'10%' },
  { id: 'srf_plandate', numeric: true, disablePadding: false, label: 'PLAN DATE', width:'10%' },
  { id: 'srf_mode', numeric: true, disablePadding: false, label: 'STATUS', width:'10%' } 
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      <TableCell width={"15%"} style={{fontSize:"10px",fontWeight:"bold",color:"#0064b5"}}>#ACTIONS</TableCell>
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
    
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          My Active Sample Room Requests List
        </Typography>
      )}
      
      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
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

function SRFSTATUS(value)
{
  if(value === "0")
  {
    return "Edit";
  } 
  else if(value === "1")
  {
    return "Processing";
  }
  else if(value === "2")
  {
    return "On Hold";
  }
  else if(value === "3")
  {
    return "Finished";
  }
  else if(value === "4")
  {
    return "Delete";
  }
  else
  {
    return "Undefined";
  }
  
}



export default function EnhancedTable() {
  const classes = useStyles();
  const classes_tbhead = useToolbarStyles();
  var apiurl = localStorage.getItem('session_apiurl');
  var Userid = localStorage.getItem('session_userid');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('routename');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [DATASET, setDATASET] = React.useState([]);
  const [opencomment, setOpencomment] = React.useState(false);
  const [Cmtsrfid, setCmtsrfid] = React.useState("");
  const [commentSRF, setcommentSRF] = React.useState("");

  const [SCANVALUE, setSCANVALUE] = React.useState("");

  const TextFieldChange = (e) => 
  {
    setSCANVALUE(e.target.value);

  }

  const FilterSearch = async () => 
  {
    
    if(SCANVALUE.length <= 0)
    {
      await fetch(`http://${apiurl}/srf/mysrfpendinglist/${Userid}`)
      .then(res => res.json())
      .then(response => {
        setDATASET(response.srfmaster);
      }).catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
    }
    else
    {
                const sendOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      "userid": Userid,
                      "keyword":SCANVALUE,
                  })
                };

                await fetch(`http://${apiurl}/srf/mysrfpendinglistfilter`,sendOptions)
                .then(res => res.json())
                .then(response => {

                  if(response.Type === "SUCCESS")
                  {
                    setDATASET(response.srfmaster);
                  }
  
                  if(response.Type === "ERROR")
                  {
                      Swal.fire({  title: 'Error!',  text: response.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                  } 
                })
    }

  }
 
  function ACTIONBUTTON(value,srfid,docid)
  {
    if(value === 0){
      return (
        <div>
        <Tooltip title="Print Document">
        <IconButton aria-label="view" component={ Link } 
            to={"/srfview/" + srfid}
            variant="contained"
            color="primary"
            size="small">
            <PrintIcon style={{color:"#005086"}} />
        </IconButton></Tooltip>
        <Tooltip title="Duplicate Entry">
        <IconButton aria-label="edit" component={ Link } 
            onClick={() => Duplicate(srfid)}
            variant="contained"
            color="primary"
            size="small">
            <FileCopyIcon style={{color:"#4e32a8"}} />
        </IconButton></Tooltip>
        <Tooltip title="Delete Entry">
        <IconButton aria-label="delete" component={ Link } 
            onClick={() => Deletesrf(srfid)}
            variant="contained"
            color="secondary"
            size="small">
            <DeleteIcon color="error"  />
        </IconButton></Tooltip>
        <Tooltip title="Edit Entry">
        <IconButton aria-label="edit" component={ Link } 
            to={"/srfedit/" + srfid}
            variant="contained"
            color="default"
            size="small">
            <EditIcon style={{color:"#1d2d50"}}/>
        </IconButton></Tooltip>
        <Tooltip title="User Comments">
        <IconButton aria-label="view" component={ Link } 
            onClick={() => handleClickOpencomment(srfid,docid)}
            variant="contained"
            color="primary"
            size="small">
            <ChatIcon  style={{color:"#a87b32"}}/>
        </IconButton>
        </Tooltip>
        </div>
      )
      } 
      else
      {
        return (
          <div>
          <Tooltip title="Print Document">
          <IconButton aria-label="view" component={ Link } 
              to={"/srfview/" + srfid}
              variant="contained"
              color="primary"
              size="small">
              <PrintIcon style={{color:"#005086"}} />
          </IconButton></Tooltip>
          <Tooltip title="Duplicate Entry">
          <IconButton aria-label="edit" component={ Link } 
              onClick={() => Duplicate(srfid)}
              variant="contained"
              color="primary"
              size="small">
              <FileCopyIcon style={{color:"#4e32a8"}} />
          </IconButton>
          </Tooltip>
          <Tooltip title="User Comments">
          <IconButton aria-label="view" component={ Link } 
            onClick={() => handleClickOpencomment(srfid,docid)}
            variant="contained"
            color="primary"
            size="small">
            <ChatIcon  style={{color:"#a87b32"}}/>
          </IconButton></Tooltip>
          </div>
        )
      }
  }

  const Duplicate = item => {
    
    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want to Duplicate this Sample request!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
    }).then((result) => {
        if (result.value) {
   
            fetch(`http://${apiurl}/srf/srfduplicate/${item}/${Userid}`)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/srf/mysrfpendinglist/${Userid}`)
                .then(res => res.json())
                .then(response => {
                  setDATASET(response.srfmaster);
                })
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
  
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
  
        }
    })
  
  };

  const Deletesrf = item => {
    
    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want to Delete this Sample request!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
        if (result.value) {
   
            fetch(`http://${apiurl}/srf/srfdelete/${item}/${Userid}`)
            .then(response => response.json())
            .then(data => 
            {
                if(data.Type === "SUCCESS")
                {
                    Swal.fire({  title: 'Success!',  text: data.Msg,  icon: 'info',  confirmButtonText: 'OK'});
                }
  
                if(data.Type === "ERROR")
                {
                    Swal.fire({  title: 'Error!',  text: data.Msg,  icon: 'error',  confirmButtonText: 'OK'});
                }

                fetch(`http://${apiurl}/srf/mysrfpendinglist/${Userid}`)
                .then(res => res.json())
                .then(response => {
                  setDATASET(response.srfmaster);
                })
                .catch(error1 => {Swal.fire({  title: 'Error!',  text: error1,  icon: 'error',  confirmButtonText: 'OK'});});
  
            })
            .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});
  
        }
    })
  
  };
  
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

  useEffect(() => {
    
    fetch(`http://${apiurl}/srf/mysrfpendinglist/${Userid}`)
      .then(res => res.json())
      .then(response => {
        setDATASET(response.srfmaster);
        
      })
      .catch(error => {Swal.fire({  title: 'Error!',  text: error,  icon: 'error',  confirmButtonText: 'OK'});});

  }, [Userid,apiurl]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
      <Toolbar className={clsx(classes_tbhead.root)} >
      <div style={{width:"65%"}}>
          <Typography className={classes.title} variant="h6" id="tableTitle" >
          My Active Sample Room Requests List
          </Typography>
      </div>
      <div style={{width:"30%",textAlign:"right"}}>
          <Tooltip title="Enter Your Keyword (SRF ID or Style)">
              <TextField id="outlined-basic" size="small" style={{width:"100%"}} label="Enter Your Keyword (SRF ID or Style)" variant="outlined" value={SCANVALUE} onChange={TextFieldChange} />
          </Tooltip> 
      </div>
      <div style={{width:"5%",textAlign:"right"}}>
          <Tooltip title="Search">
            <IconButton aria-label="view" onClick={FilterSearch} 
                variant="contained"
                color="primary"
                size="small">
                <SearchIcon />
            </IconButton>
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
                      key={row.srf_id}
                      selected={isItemSelected}
                    >
                    <TableCell width="15%" align="left">
                        
                        {ACTIONBUTTON(row.srf_mode,row.srf_id,row.sid_cluster+row.sid_date+row.sid_seq)}
 
                      </TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left" id={row.srf_id}>{row.sid_cluster}{row.sid_date}{row.sid_seq}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.cus_name}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.srf_style}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{row.sam_stage_title}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{Moment(row.srf_reqdate).format('DD-MMM-yyyy')}</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{JSON.stringify(row.srf_plandate).length > 8 ? (Moment(row.srf_plandate).format('DD-MMM-yyyy')):("Not Updated") }</TableCell>
                      <TableCell style={{fontSize:"13px"}} align="left">{SRFSTATUS(JSON.stringify(row.srf_mode))}</TableCell>
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
