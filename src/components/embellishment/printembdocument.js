import React, { useEffect }  from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer,Image  } from '@react-pdf/renderer';
import DataList from './printembdoclistdetail';

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
        fontSize:"9px",color:"black",fontWeight:600,marginBottom:"2px"
    },
    titlethead: {
        fontSize:"7px",color:"black",fontWeight:500,textAlign:"center",margin:"2px"
    },
    desc: {
        fontSize:"9px",color:"black",fontWeight:600
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
    const [EMBID] = React.useState(window.location.href.split('/').reverse()[0]);
    const [DSET_PANELDETAILS, setDSET_PANELDETAILS] = React.useState([]);

    //Form Parameters
    const [VAL_SRFIDCLUSTER, setVAL_SRFIDCLUSTER] = React.useState([]);
    const [VAL_SRFIDDATE, setVAL_SRFIDDATE] = React.useState([]);
    const [VAL_SRFIDSEQ, setVAL_SRFIDSEQ] = React.useState([]);
    const [VAL_CUSNAME, setVAL_CUSNAME] = React.useState([]);
    const [VAL_STYLE, setVAL_STYLE] = React.useState([]);
    const [VAL_GP, setVAL_GP] = React.useState([]);
    const [VAL_COLOR, setVAL_COLOR] = React.useState([]);
    const [VAL_GRAPHIC, setVAL_GRAPHIC] = React.useState([]);
    const [VAL_PREPAREBY, setVAL_PREPAREBY] = React.useState([]);
    const [VAL_OWNBY, setVAL_OWNBY] = React.useState([]);
    const [VAL_SAMPLETYPE, setVAL_SAMPLETYPE] = React.useState([]);
    const [VAL_BODYFABTYPE, setVAL_BODYFABTYPE] = React.useState([]);

    const [VAL_BARCODEBASE64, setVAL_BARCODEBASE64] = React.useState([]);

    const [isReady, setIsReady] = React.useState(false);
    
     
const getclustername = (item) =>
{
    if(item === "BFF")
    {
        return <>Brandix Fast Fashion</>;
    }
    else if(item === "BDD")
    {
        return <>Brandix Deep Discount</>;
    }
}

useEffect(() => {

  if(isReady === false){

      fetch(`http://${apiurl}/embellishment/getembheader/${EMBID}`)
      .then(res => res.json())
      .then(response => { 
        setVAL_SRFIDCLUSTER(response.embheaders[0].sid_cluster);
        setVAL_SRFIDDATE(response.embheaders[0].sid_date);
        setVAL_SRFIDSEQ(response.embheaders[0].sid_seq);
        setVAL_STYLE(response.embheaders[0].srf_style);
        setVAL_CUSNAME(response.embheaders[0].cus_name);
        setVAL_COLOR(response.embheaders[0].colors);
        setVAL_GRAPHIC(response.embheaders[0].graphic);
        setVAL_OWNBY(response.embheaders[0].createuser);
        setVAL_SAMPLETYPE(response.embheaders[0].sam_stage_title);
        setVAL_BODYFABTYPE(response.embheaders[0].body_fab_type);


          fetch(`http://${apiurl}/srf/srfbarcode/${response.embheaders[0].sid_cluster}/${response.embheaders[0].sid_date}/${response.embheaders[0].sid_seq}`)
          .then(res1 => res1.json())
          .then(response1 => { setVAL_BARCODEBASE64(response1.srfbarcode[0].base64);})
          .catch(error1 => console.log(error1));
        
      })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/embellishment/getembendplant/${EMBID}`)
      .then(res => res.json())
      .then(response => { 
          setDSET_PANELDETAILS(response.embplants);
      })
      .catch(error => console.log(error));

      fetch(`http://${apiurl}/embellishment/getembgp/${EMBID}`)
      .then(res => res.json())
      .then(response => { 
          setVAL_GP(response.embgp[0].gatepass_no);
          setVAL_PREPAREBY(response.embgp[0].username);
      })
      .catch(error => console.log(error));
  }
  setIsReady(true); 

}, [EMBID,apiurl,isReady]);
 
const Template = ({ valueset }) => { 

        
  return <DataList EMBID={valueset.emb_id} PLANTID={valueset.plant_id}/>;

}
 
    return (
        <div>
        
        <PDFViewer title={VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ} style={{width:"100%", height:"95vh"}}>
        
            <Document title={VAL_SRFIDCLUSTER+VAL_SRFIDDATE+VAL_SRFIDSEQ}>
                <Page size="A4" style={styles.page}>

                {DSET_PANELDETAILS.map(rowitems =>
                   <> 
                   <View style={{flexDirection: 'row',}}>
                        <View style={{width:"100%",textAlign:"center",padding:"5px"}}>
                            <Text style={{fontSize:"15px",color:"purple",width: '100%'}}>SAMPLE ROOM EMBELLISHMENT SENDING NOTE</Text>
                        </View>
                    </View> 
                    <View style={{flexDirection: 'row',}}>
                        <View style={styles.section30}>
                            <Image style={{width: 'auto',height:'auto'}} src={VAL_BARCODEBASE64} />
                        </View>
                        <View style={styles.section80}>
                            <Text style={styles.title1}>FROM : {getclustername(VAL_SRFIDCLUSTER)}</Text>
                            <Text style={styles.title1}>TO : {rowitems.plantname}</Text>
                            <Text style={styles.title1}>CUSTOMER : {VAL_CUSNAME}</Text>
                            <Text style={styles.title1}>STYLE : {VAL_STYLE}</Text>
                            <Text style={styles.title1}>COLOR : {VAL_COLOR}</Text>
                            <Text style={styles.title1}>GRAPHICS : {VAL_GRAPHIC}</Text>
                            <Text style={styles.title1}>BODY FABRIC TYPE : {VAL_BODYFABTYPE}</Text>
                            <Text style={styles.title1}>SAMPLE TYPE : {VAL_SAMPLETYPE}</Text>
                            <Text style={styles.title1}>GATE PASS NO : {VAL_GP}</Text>
                            <Text style={styles.title1}>PREPARE BY : {VAL_PREPAREBY}</Text>
                            <Text style={styles.title1}>SAMPLE REQUEST BY : {VAL_OWNBY}</Text>
                        </View>
                        
                    </View>
                    <View style={{flexDirection: 'row',}}>
                      <view style={{width:"15%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>SIZE</Text></view>
                      <view style={{width:"15%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>PANEL</Text></view>
                      <view style={{width:"10%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>SAW. PLANT SEND QTY</Text></view>
                      <view style={{width:"10%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>EMB. PLANT RECEIVE QTY</Text></view>
                      <view style={{width:"10%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>EMB. PLANT SEND QTY</Text></view>
                      <view style={{width:"10%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>SAW. PLANT RECEIVE QTY</Text></view>
                      <view style={{width:"30%",borderColor:"black",borderWidth:"1",padding:"3px"}}><Text style={styles.titlethead}>REMARK</Text></view>
                    </View>
                    <Template valueset={{"emb_id":rowitems.emb_id,"plant_id":rowitems.plant_id}}/>
                    <View style={{flexDirection: 'row'}}>
                      <view style={{width:"100%",borderColor:"black",borderBottom:"1",borderStyle:"dashed",marginTop:"10px",marginBottom:"15px"}}></view>
                    </View>
                    </>
                    
                )}
                    
                </Page>
            </Document>
        </PDFViewer>
        
        </div>
  );


}
