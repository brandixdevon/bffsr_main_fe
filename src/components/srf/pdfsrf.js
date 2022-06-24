import React, { useEffect }  from 'react';
import Moment from 'moment';
import { Page, Text, View, Document, StyleSheet, PDFViewer,Image  } from '@react-pdf/renderer';

// Create styles for PDF Doc
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 15
  },
  section: {
    margin: 3,
    padding: 5,
    width: '100%'
  },
  section50: {
    margin: 3,
    padding: 5,
    width: '50%'
  },
  section30: {
    margin: 3,
    padding: 5,
    width: '30%'
  },
  section80: {
    margin: 3,
    padding: 5,
    width: '80%'
  },
  sectiontxtborder100: {
    margin: 1,
    padding: 3,
    borderColor: '#347',
    borderWidth:1,
    width: '100%'

  },
  sectiontxtborder50: {
    margin: 1,
    padding: 3,
    borderColor: '#347',
    borderWidth:1,
    width: '50%',

  },
  title: { 
    fontFamily: 'arial', color: '#F22300', fontSize:15 
    },
    title1: {
        fontSize:"10px",color:"purple",fontWeight:800
    },
    desc: {
        fontSize:"9px",color:"black",fontWeight:600
    },
    descHeader: {
        fontSize:"9px",color:"#6b5200",fontWeight:900
    },
    emphasis: { 
      fontFamily: 'Helvetica-Bold', color: '#F22300' 
    },
  breakable: { 
      width: '100%', height: 400, backgroundColor: 'tomato' 
    },
  unbreakable: { 
      width: '100%', height: 400 
    }
});

export default function Pdfout() {
    
    var apiurl = localStorage.getItem('session_apiurl');
    const [SRFID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [DSET_ROUTESMAP, setDSET_ROUTESMAP] = React.useState([]);
    const [DSET_SRFSIZES, setDSET_SRFSIZES] = React.useState([]);
    const [DSET_SRFEMB, setDSET_SRFEMB] = React.useState([]);
    const [DSET_SRFDW, setDSET_SRFDW] = React.useState([]);
    const [DSET_COMMENTS, setDSET_COMMENTS] = React.useState([]);
    const [VAL_CREATEBY, setVAL_CREATEBY] = React.useState([]);

    //Form Parameters
    const [VAL_SRFIDCLUSTER, setVAL_SRFIDCLUSTER] = React.useState([]);
    const [VAL_SRFIDDATE, setVAL_SRFIDDATE] = React.useState([]);
    const [VAL_SRFIDSEQ, setVAL_SRFIDSEQ] = React.useState([]);
    const [VAL_CUSNAME, setVAL_CUSNAME] = React.useState([]);
    const [VAL_STYLE, setVAL_STYLE] = React.useState([]);
    const [VAL_STYLEDESC, setVAL_STYLEDESC] = React.useState([]);
    const [VAL_FLOORSET, setVAL_FLOORSET] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState([]);

    const [VAL_BODYFABRIC, setVAL_BODYFABRIC] = React.useState([]);
    const [VAL_ISSUENOTE, setVAL_ISSUENOTE] = React.useState([]);
    const [VAL_GARDISPATCH,setVAL_GARDISPATCH] = React.useState([]);
    const [VAL_COLORS,setVAL_COLORS] = React.useState([]);
    const [VAL_GRAPHICS,setVAL_GRAPHICS] = React.useState([]);
    const [VAL_WASH,setVAL_WASH] = React.useState([]);
    const [VAL_BODYFABCW,setVAL_BODYFABCW] = React.useState([]);
    const [VAL_BODYFABCWUNIT,setVAL_BODYFABCWUNIT] = React.useState([]);
    const [VAL_FABRELAXHOURS,setVAL_FABRELAXHOURS] = React.useState([]);
    const [VAL_PLACEMENTBOARD, setVAL_PLACEMENTBOARD] = React.useState([]);
    const [VAL_SRFIMGBASE64, setVAL_SRFIMGBASE64] = React.useState([]);
 
    const [VAL_BARCODEBASE64, setVAL_BARCODEBASE64] = React.useState([]);

    var [VAR_SAMPLESTAGE, setVAR_SAMPLESTAGE] = React.useState([]);
    var [VAR_ROUTE, setVAR_ROUTE] = React.useState([]);

    const [isReady, setIsReady] = React.useState(false);
    
    useEffect(() => {
    
            fetch(`http://${apiurl}/srf/SrfMasterDetails/${SRFID}`)
            .then(res => res.json())
            .then(response => {
                
                setVAL_SRFIDCLUSTER(response.srfmaster[0].sid_cluster);
                setVAL_SRFIDDATE(response.srfmaster[0].sid_date);
                setVAL_SRFIDSEQ(response.srfmaster[0].sid_seq);
                setVAL_STYLE(response.srfmaster[0].srf_style);
                setVAL_STYLEDESC(response.srfmaster[0].srf_styledesc);
                setVAL_FLOORSET(response.srfmaster[0].srf_floorset);
                setSelectedDate(response.srfmaster[0].srf_reqdate);

                fetch(`http://${apiurl}/master/getusername/${response.srfmaster[0].srf_createby}`)
              .then(res1 => res1.json())
              .then(response1 =>{setVAL_CREATEBY(response1.username[0].username);} )
              .catch(error1 => console.log(error1));

                fetch(`http://${apiurl}/master/getroutesbyid/${response.srfmaster[0].srf_routemasterid}`)
                .then(res1 => res1.json())
                .then(response1 =>{setVAR_ROUTE(response1.productrouts[0].label);} )
                .catch(error => console.log(error));

                fetch(`http://${apiurl}/productroute/routemapping/${response.srfmaster[0].srf_routemasterid}`)
                .then(res1 => res1.json())
                .then(response1 => {setDSET_ROUTESMAP(response1.routemap);})
                .catch(error => console.log(error));

                fetch(`http://${apiurl}/srf/srfbarcode/${response.srfmaster[0].sid_cluster}/${response.srfmaster[0].sid_date}/${response.srfmaster[0].sid_seq}`)
                .then(res1 => res1.json())
                .then(response1 => { setVAL_BARCODEBASE64(response1.srfbarcode[0].base64);})
                .catch(error => console.log(error));

                fetch(`http://${apiurl}/master/getsamplestagesbyid/${response.srfmaster[0].sam_stage_id}`)
                .then(res1 => res1.json())
                .then(response1 =>{setVAR_SAMPLESTAGE(response1.samplestages[0].label);} )
                .catch(error => console.log(error));
        
                fetch(`http://${apiurl}/master/allcustomers/${response.srfmaster[0].cus_id}`)
                .then(res1 => res1.json())
                .then(response1 =>{setVAL_CUSNAME(response1.syscustomers[0].cus_name);} )
                .catch(error => console.log(error));
              
            })
            .catch(error => console.log(error));

            fetch(`http://${apiurl}/srf/SrfDetails/${SRFID}`)
            .then(res => res.json())
            .then(response => { 
                setVAL_BODYFABRIC(response.srfdetails[0].body_fab_type);
                setVAL_ISSUENOTE(response.srfdetails[0].issue_note);
                setVAL_GARDISPATCH(response.srfdetails[0].garment_dispatch);
                setVAL_COLORS(response.srfdetails[0].colors);
                setVAL_GRAPHICS(response.srfdetails[0].graphic);
                setVAL_WASH(response.srfdetails[0].wash_development);
                setVAL_BODYFABCW(response.srfdetails[0].body_fab_cw);
                setVAL_BODYFABCWUNIT(response.srfdetails[0].body_fab_cw_unit);
                setVAL_FABRELAXHOURS(response.srfdetails[0].fab_relax_hours);
                setVAL_PLACEMENTBOARD(response.srfdetails[0].placement_board);
                 
                fetch(`http://${apiurl}/srf/srfimagebase64/${response.srfdetails[0].image_name}`)
                .then(res1 => res1.json())
                .then(response1 => { setVAL_SRFIMGBASE64(response1.srfimage[0].base64);})
                .catch(error => console.log(error));

            })
            .catch(error => console.log(error));
   

                fetch(`http://${apiurl}/srf/Srfsizes/${SRFID}`)
                .then(res => res.json())
                .then(response => {setDSET_SRFSIZES(response.srfsizes);})
                .catch(error => console.log(error));

                fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/EMB`)
                .then(res => res.json())
                .then(response => {setDSET_SRFEMB(response.srfplants);})
                .catch(error => console.log(error));

                fetch(`http://${apiurl}/srf/srfplantdetails/${SRFID}/DW`)
                .then(res => res.json())
                .then(response => {setDSET_SRFDW(response.srfplants);})
                .catch(error => console.log(error));

                fetch(`http://${apiurl}/srf/srfcomments/${SRFID}`)
                .then(res => res.json())
                .then(response => {setDSET_COMMENTS(response.srfcomments);})
                .catch(error => console.log(error));
 
        setIsReady(true);

    }, [SRFID,apiurl]);

    
    return (
        <div>
        { isReady ? (
        <PDFViewer title={VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ} style={{width:"100%", height:"95vh"}}>
        
            <Document title={VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ}>
                <Page size="A4" style={styles.page}>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.section30}>
                            <Image style={{width: 'auto',height:'auto'}} src={VAL_BARCODEBASE64} />
                        </View>
                        <View style={styles.section80}>
                            <Text style={{fontSize:"20px",color:"purple",width: '100%'}}>BFF - SAMPLE ROOM REQUEST FORM</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>SRF Create By</Text>
                            <Text style={styles.desc}>{VAL_CREATEBY}</Text>
                        </View>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Customer Category</Text>
                            <Text style={styles.desc}>{VAL_CUSNAME}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Style No</Text>
                            <Text style={styles.desc}>{VAL_STYLE}</Text>
                        </View>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Floorset/Identifire</Text>
                            <Text style={styles.desc}>{VAL_FLOORSET}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Style Description</Text>
                            <Text style={styles.desc}>{VAL_STYLEDESC}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Sample Stage</Text>
                            <Text style={styles.desc}>{VAR_SAMPLESTAGE}</Text>
                        </View>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Sample Required Date</Text>
                            <Text style={styles.desc}>{Moment(selectedDate).format('DD-MMM-yyyy')}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Product Route</Text>
                            <Text style={styles.desc}>{VAR_ROUTE}</Text>
                        </View>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Issue Note No / DAN</Text>
                            <Text style={styles.desc}>{VAL_ISSUENOTE}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Product Routing Steps</Text>
                            <Text style={styles.desc}>
                            {DSET_ROUTESMAP.map(item =>
                            " [" + item.hierarchy + "]-" + item.proelmname +" "
                            )}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Body Fabric Type</Text>
                            <Text style={styles.desc}>{VAL_BODYFABRIC}</Text>
                        </View>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Garment Dispatch</Text>
                            <Text style={styles.desc}>{VAL_GARDISPATCH}</Text>
                        </View>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Placement Board Requirement</Text>
                            <Text style={styles.desc}>{VAL_PLACEMENTBOARD}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Colors</Text>
                            <Text style={styles.desc}>{VAL_COLORS}</Text>
                        </View>
                        <View style={styles.sectiontxtborder50}>
                            <Text style={styles.title1}>Graphics</Text>
                            <Text style={styles.desc}>{VAL_GRAPHICS}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Main Body Fabric CW</Text>
                            <Text style={styles.desc}>{VAL_BODYFABCW}</Text>
                        </View>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Main Body Fabric CW Unit</Text>
                            <Text style={styles.desc}>{VAL_BODYFABCWUNIT}</Text>
                        </View>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Fabric Relaxing Hours</Text>
                            <Text style={styles.desc}>{VAL_FABRELAXHOURS}</Text>
                        </View>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Wash Developments</Text>
                            <Text style={styles.desc}>{VAL_WASH}</Text>
                        </View> 
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                        <Text style={styles.title1}>SRF Garment Sizes</Text>
                            <View style={{flexDirection: 'row',borderBottomColor:'black', marginBottom:'3px', borderBottomWidth:"0.5px"}}>
                            <view style={{width: '15%',}}><Text style={styles.descHeader}>SIZE</Text></view>
                            <view style={{width: '15%',}}><Text style={styles.descHeader}>Order Qty</Text></view>
                            <view style={{width: '30%',}}><Text style={styles.descHeader}>Vendor</Text></view>
                            <view style={{width: '40%',}}><Text style={styles.descHeader}>Address</Text></view>
                            </View> 
                            {DSET_SRFSIZES.map(item =>
                            <View style={{flexDirection: 'row',borderBottomColor:'gray', marginBottom:'1px', borderBottomWidth:"0.5px"}}>
                            <view style={{width: '15%',}}><Text style={styles.desc}>{item.size_name}</Text></view>
                            <view style={{width: '15%',}}><Text style={styles.desc}>{item.size_qty}</Text></view>
                            <view style={{width: '30%',}}><Text style={styles.desc}>{item.dis_vendor}</Text></view>
                            <view style={{width: '40%',}}><Text style={styles.desc}>{item.dis_address}</Text></view>
                            </View> 
                            )}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Embllishment Plant Details</Text>
                            {DSET_SRFEMB.map(item =>
                            <Text style={styles.desc}># {item.plant_name}</Text>
                            )}
                        </View>
                        <View style={styles.sectiontxtborder100}>
                            <Text style={styles.title1}>Dye/Wash Plant Details</Text>
                            {DSET_SRFDW.map(item =>
                            <Text style={styles.desc}># {item.plant_name}</Text>
                            )}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={{margin: 1,padding: 3,borderColor: '#347',borderWidth:1,width: '100%',height: '300px'}}>
                            <Image style={{height:'100%'}} src={VAL_SRFIMGBASE64} />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.sectiontxtborder100}>
                                <Text style={styles.title1}>Comments</Text>
                                {DSET_COMMENTS.map(item =>
                                <Text style={styles.desc}># {item.comment_desc}</Text>
                                )}
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        ) : ('') 
        }
        </div>
  );


}
