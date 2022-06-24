import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
//MASTER
import Login from './components/login/login'
import App from './components/dashboard/dash'
import Routes from './components/routes/allroutes'
import Routesmap from './components/routes/viewroutesmap'
import Customers from './components/customer/allcustomers'
import Allplants from './components/plantdetails/allplants'
//SRF
import Srf from './components/srf/allsrf'
import Srfcreate from './components/srf/createsrf'
import Srfedit from './components/srf/editsrf'
import Srfview from './components/srf/viewsrf'
import Srfroute from './components/srf/srfroute'
import Srfpdf from './components/srf/pdfsrf'
import Reportsrfview from './components/reports/allsrfview'
//SRF MANAGE
import Srfdelete from './components/srfmanage/srfdelete'
//PATTERN MAKING
import Pendingpatterns from './components/patternmake/allpendingpatterns'
import Editpmdetails from './components/patternmake/editpmdetails'
import Allpmlist from './components/patternmake/allpmlist'
import Mysrflist from './components/srf/mysrflist'
//PLACEMENT BOARD
import PendingPlacementboards from './components/placementboard/allpendingpb'
import Editpbdetails from './components/placementboard/editpbdetails'
import Allpblist from './components/placementboard/allpblist'
//MARKER MAKING
import Pendingmarkers from './components/markermaking/allpendingmarkers'
import Editmmdetails from './components/markermaking/editmmdetails'
import Allmmlist from './components/markermaking/allmmlist'
import Mmpdfprint from './components/markermaking/printpdfsrf'
//SMV
import Pendingsmv from './components/smv/allpendingsmv'
import Editsmvdetails from './components/smv/editsmvdetails'
import Allsmvlist from './components/smv/allsmvlist'
//PLANNING
import PendingPlans from './components/planning/allpendingpln'
import Editplndetails from './components/planning/editplndetails'
import Allplnlist from './components/planning/allplnlist'
import PendingSewingForPlans from './components/planning/allsewingready'
//STORE
import PendingStore from './components/stores/allpendingst'
import Editstdetails from './components/stores/editstdetails'
import Allstlist from './components/stores/allstlist'
//CUTTING
import PendingCut from './components/cutting/allpendingcut'
import Editcutdetails from './components/cutting/editcutdetails'
import CutScan from './components/cutting/scancutting'
import PendingReCut from './components/cutting/allpendingrecut'
import ReCutAdd from './components/cutting/addnewrecut'
import Allcutlist from './components/cutting/allcutlist'
//SEWING PACKAGE READY
import PendingSewReady from './components/packageprocess/allpendingpackage'
//EMBELLISHMENT
import PendingEmb from './components/embellishment/allpendingemb'
import Editembdetails from './components/embellishment/editembdetails'
import Printembdetails from './components/embellishment/printembdocument'
import Printemblist from './components/embellishment/allfinishedemb'
import PendingEmbScan from './components/embellishment/allpendingscanemb'
//DYE AND WASH
import PendingDW from './components/dyewash/allpendingdw'
import Editdowdetails from './components/dyewash/editdowdetails'
import Printdowdetails from './components/dyewash/printdowdocument'
import Printdowlist from './components/dyewash/allfinisheddow'
import PendingDowScan from './components/dyewash/allpendingscandow'
//SEWING
import PendingSewing from './components/sewing/allpendingsew'
import SewingIn from './components/sewing/sewinscan'
import SewingInQtyUpdate from './components/sewing/sewinqty'
import SewingOutQtyUpdate from './components/sewing/sewoutqty'
import SewingMoAssign from './components/sewing/moallocate'
import PendingRework from './components/sewing/allpendingrework'
//QUALITY
import PendingQC from './components/quality/allpendingqc'
import Editqcdetails from './components/quality/editqcdetails'
//DISPATCH
import PendingDIS from './components/dispatch/allpendingdis'
import EditDIS from './components/dispatch/editdisdetails'
//DASHBOARDS
import PendingDASHBOARDALLSTATUS from './components/dashboard/overallgraphview'
import PendingDASHBOARDALLSUMMARY from './components/dashboard/overallsummaryview'
//SETTINGS
import SetVersion from './components/settings/version'

//REPORTS
import CommonReports from './components/reports/commonreports'
import OperationReports from './components/reports/operationreports'

import Com_Rpt001 from './components/reports/common/report_001'
import Com_Rpt002 from './components/reports/common/report_002'
import Com_Rpt003 from './components/reports/common/report_003'
import Com_Rpt004 from './components/reports/common/report_004'
import Com_Rpt005 from './components/reports/common/report_005'

import Opr_Rpt001 from './components/reports/operation/report_001'
import Opr_Rpt002 from './components/reports/operation/report_002'
import Opr_Rpt003 from './components/reports/operation/report_003'
import Opr_Rpt004 from './components/reports/operation/report_004'
import Opr_Rpt005 from './components/reports/operation/report_005'
import Opr_Rpt006 from './components/reports/operation/report_006'
import Opr_Rpt007 from './components/reports/operation/report_007'
import Opr_Rpt008 from './components/reports/operation/report_008'
import Opr_Rpt009 from './components/reports/operation/report_009'
import Opr_Rpt010 from './components/reports/operation/report_010'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route exact path="/">
        <Redirect to="/LOGIN" />
      </Route>
      <Route path="/LOGIN" component={Login} />
      <Route path="/APP" component={App} />
      <Route path="/ROUTES" component={Routes} />
      <Route path="/ROUTESMAP/:id" component={Routesmap} />
      <Route path="/CUSTOMERS" component={Customers} />
      <Route path="/ALLPLANTS" component={Allplants} />
      <Route path="/ALLACTIVESRF" component={Srf} />
      <Route path="/SRFCREATE" component={Srfcreate} />
      <Route path="/SRFEDIT/:id" component={Srfedit} />
      <Route path="/SRFVIEW/:id" component={Srfview} />
      <Route path="/SRFROUTE/:id" component={Srfroute} />
      <Route path="/SRFPDF/:id" component={Srfpdf} />
      <Route path="/SRFLISTREPORT" component={Reportsrfview} />
      <Route path="/SRFDELETE" component={Srfdelete} />
      <Route path="/MYSRFLIST" component={Mysrflist} />
      <Route path="/ALLPMLIST" component={Allpmlist} />
      <Route path="/PMLIST" component={Pendingpatterns} />
      <Route path="/PMUPDATE/:id" component={Editpmdetails} />
      <Route path="/MMSRFPRINT/:id" component={Mmpdfprint} />
      <Route path="/ALLPBLIST" component={Allpblist} />
      <Route path="/PBLIST" component={PendingPlacementboards} />
      <Route path="/PBUPDATE/:id" component={Editpbdetails} />
      <Route path="/ALLMMLIST" component={Allmmlist} />
      <Route path="/MMLIST" component={Pendingmarkers} />
      <Route path="/MMUPDATE/:id" component={Editmmdetails} />
      <Route path="/ALLSMVLIST" component={Allsmvlist} />
      <Route path="/SMVLIST" component={Pendingsmv} />
      <Route path="/SMVUPDATE/:id" component={Editsmvdetails} />
      <Route path="/ALLPLNLIST" component={Allplnlist} />
      <Route path="/PLNLIST" component={PendingPlans} />
      <Route path="/PLNUPDATE/:id" component={Editplndetails} />
      <Route path="/SEWPENDINGFORPLAN" component={PendingSewingForPlans} />
      <Route path="/ALLSTLIST" component={Allstlist} />
      <Route path="/STLIST" component={PendingStore} />
      <Route path="/STUPDATE/:id" component={Editstdetails} />
      <Route path="/ALLCUTLIST" component={Allcutlist} />
      <Route path="/CUTSCAN" component={CutScan} />
      <Route path="/CUTLIST" component={PendingCut} />
      <Route path="/CUTUPDATE/:id" component={Editcutdetails} />
      <Route path="/RECUTLIST" component={PendingReCut} />
      <Route path="/ADDRECUT/:id" component={ReCutAdd} />
      <Route path="/PACKAGEPROCESS" component={PendingSewReady} />
      <Route path="/ALLEMBLIST" component={PendingEmb} />
      <Route path="/EMBUPDATE/:id/:elmid" component={Editembdetails} />
      <Route path="/EMBPRINT/:embid" component={Printembdetails} />
      <Route path="/EMBPRINTLIST" component={Printemblist} />
      <Route path="/ALLEMBSCANLIST/:id" component={PendingEmbScan} />
      <Route path="/ALLDWLIST" component={PendingDW} />
      <Route path="/DOWUPDATE/:id/:elmid" component={Editdowdetails} />
      <Route path="/DOWPRINT/:dowid" component={Printdowdetails} />
      <Route path="/DOWPRINTLIST" component={Printdowlist} />
      <Route path="/ALLDOWSCANLIST/:id" component={PendingDowScan} />
      <Route path="/SEWLIST" component={PendingSewing} />
      <Route path="/SEWIN" component={SewingIn} />
      <Route path="/SEWINQTYUPDATE/:id/:elmid" component={SewingInQtyUpdate} />
      <Route path="/SEWOUTQTYUPDATE/:id/:elmid" component={SewingOutQtyUpdate} />
      <Route path="/SEWMOALLOCATE/:id/:elmid" component={SewingMoAssign} />
      <Route path="/REWORKLIST" component={PendingRework} />
      <Route path="/QCLIST" component={PendingQC} />
      <Route path="/QCUPDATE/:id/:srfid" component={Editqcdetails} />
      <Route path="/DISPATCHLIST" component={PendingDIS} />
      <Route path="/DISPATCHUPDATE/:id/:elmid" component={EditDIS} />
      <Route path="/DASHBOARDALLSTATUS" component={PendingDASHBOARDALLSTATUS} />
      <Route path="/DASHBOARDALLSUMMARY" component={PendingDASHBOARDALLSUMMARY} />
      <Route path="/SETTINGS_VERSION" component={SetVersion} />
      <Route path="/REPORTS_COMMON" component={CommonReports} />
      <Route path="/REPORTS_OPERATION" component={OperationReports} />
      <Route path="/COM_RPT001" component={Com_Rpt001} />
      <Route path="/COM_RPT002" component={Com_Rpt002} />
      <Route path="/COM_RPT003" component={Com_Rpt003} />
      <Route path="/COM_RPT004" component={Com_Rpt004} />
      <Route path="/COM_RPT005" component={Com_Rpt005} />
      <Route path="/OPR_RPT001" component={Opr_Rpt001} />
      <Route path="/OPR_RPT002" component={Opr_Rpt002} />
      <Route path="/OPR_RPT003" component={Opr_Rpt003} />
      <Route path="/OPR_RPT004" component={Opr_Rpt004} />
      <Route path="/OPR_RPT005" component={Opr_Rpt005} />
      <Route path="/OPR_RPT006" component={Opr_Rpt006} />
      <Route path="/OPR_RPT007" component={Opr_Rpt007} />
      <Route path="/OPR_RPT008" component={Opr_Rpt008} />
      <Route path="/OPR_RPT009" component={Opr_Rpt009} />
      <Route path="/OPR_RPT010" component={Opr_Rpt010} />
    </Router>
    
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root