import React, { useEffect }  from 'react';
import { Text, View, StyleSheet} from '@react-pdf/renderer';

// Create styles for PDF Doc
const styles = StyleSheet.create({
  titlethead: {
        fontSize:"7px",color:"#66666",fontWeight:500,textAlign:"center",margin:"2px"
    }
});



export default function EnhancedTable(props) {
    
    var apiurl = localStorage.getItem('session_apiurl');
    const [embid] = React.useState(props.EMBID);
    const [plantid] = React.useState(props.PLANTID);
    const [DSET_PANELS, setDSET_PANELS] = React.useState([]);

    useEffect(() => {

        fetch(`http://${apiurl}/embellishment/getembitemlist/${embid}/${plantid}`)
        .then(res => res.json())
        .then(response => { 
            setDSET_PANELS(response.embsenditems);
        })
        .catch(error => console.log(error));

    }, [embid,plantid,apiurl]);


    
    return (DSET_PANELS.map(sizeitems => {
        
        return (<View style={{flexDirection: 'row',}}>
            <view style={{width:"15%",borderColor:"black",borderWidth:"0.5",minHeight:"20px",fontSize:"8px",color:"#000",paddingTop:"3px",paddingLeft:"3px",textAlign:"center"}}><Text >{sizeitems.size_name}</Text></view>
            <view style={{width:"15%",borderColor:"black",borderWidth:"0.5",minHeight:"20px",fontSize:"8px",color:"#000",paddingTop:"3px",paddingLeft:"3px",textAlign:"center"}}><Text >{sizeitems.emb_panel}</Text></view>
            <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px",fontSize:"8px",color:"#000",paddingTop:"3px",paddingLeft:"3px",textAlign:"center"}}><Text >{sizeitems.send_qty}</Text></view>
            <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text style={styles.titlethead} ></Text></view>
            <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text style={styles.titlethead} ></Text></view>
            <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text style={styles.titlethead} ></Text></view>
            <view style={{width:"30%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text style={styles.titlethead} ></Text></view>
  </View>)}));


}