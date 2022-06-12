import  React , {useState,useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
  } from "firebase/firestore";



export default function MapScreen() {
    const db = getFirestore();

  const [donations,setDonations ] = useState([]);
  useEffect(async () => {
    const q = query(
      collection(db, "Donations"),
      
    );
    const querySnapshot = await getDocs(q);
    setDonations(
    
       querySnapshot.docs.map( (doc) => {
        return doc.data();
        
      }
    ));
    
  }, []);



  return (
    <View style={styles.container}>
       <MapView style = {styles.map}
    initialRegion={{
      latitude: 31.254199,
      longitude: 34.793214,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    
  > 
  {donations.map((donation, index) => (
    <Marker
      key={index}
      coordinate={{latitude: donation.latitude, longitude: donation.longitude}}
      
    />
  ))}
  </MapView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});