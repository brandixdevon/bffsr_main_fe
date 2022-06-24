import React, { useEffect }  from 'react';
import { Text, View} from '@react-pdf/renderer';

export default function EnhancedTable(props) {
    
    var apiurl = localStorage.getItem('session_apiurl');
    const [dowid] = React.useState(props.DOWID);
    const [plantid] = React.useState(props.PLANTID);
    const [DSET_PANELS, setDSET_PANELS] = React.useState([]);

    useEffect(() => {

        fetch(`http://${apiurl}/dyeorwash/getdowitemlist/${dowid}/${plantid}`)
      .then(res => res.json())
      .then(response => { 
          setDSET_PANELS(response.dowsenditems);
      })
      .catch(error => console.log(error));

    }, [dowid,plantid,apiurl]);

 
    return (<>
        
        {
            DSET_PANELS.map(rowitem => { return (
            <View style={{flexDirection: 'row',}}>
                <view style={{width:"15%",borderColor:"black",borderWidth:"0.5",minHeight:"20px",fontSize:"8px",color:"#000",paddingTop:"3px",paddingLeft:"3px",textAlign:"center"}}><Text >{rowitem.size_name}</Text></view>
                <view style={{width:"15%",borderColor:"black",borderWidth:"0.5",minHeight:"20px",fontSize:"8px",color:"#000",paddingTop:"3px",paddingLeft:"3px",textAlign:"center"}}><Text >{rowitem.dow_panel}</Text></view>
                <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px",fontSize:"8px",color:"#000",paddingTop:"3px",paddingLeft:"3px",textAlign:"center"}}><Text >{rowitem.send_qty}</Text></view>
                <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text ></Text></view>
                <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text ></Text></view>
                <view style={{width:"10%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text ></Text></view>
                <view style={{width:"30%",borderColor:"black",borderWidth:"0.5",minHeight:"20px"}}><Text ></Text></view>
            </View>
            )})
        }
        
    </>);


}
