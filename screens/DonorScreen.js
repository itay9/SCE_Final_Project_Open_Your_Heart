import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import * as Location from "expo-location";
import config from "../config";
import ImagePickerExample from "../components/ImagePicker";

function DonorScreen({navigation}) {
  const db = getFirestore();
  const [dropDown, setDropDown] = useState(false);
  const [image, setImage] = useState(null);
  const addImage = () => {};
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNum, setHouseNum] = useState("");
  const [description, setDescription] = useState("");
  const data = [
    { label: "אוכל", value: "food" },
    { label: "בגדים", value: "clothes" },
    { label: "כלי בית", value: "home" },
  ];
  
  const [category, setCategory] = useState(null);
  const [phone, setPhone] = useState("");

  const testfunc = (open) => {};
  const saveDataToDB = async () => {
    let location;

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //TODO alret or other option
      return;
    }
    try {
      location = await Location.getCurrentPositionAsync({});
    } catch {
      return;
    }

    const docRef = await addDoc(collection(db, "Donations"), {
      city: city,
      street: street,
      houseNum: houseNum,
      description: description,
      category: category,
      imageId: image,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      phone: phone,
    });
  };
  return (
    <View>
      <DropDownPicker
        style={{ backgroundColor: "BDF2D5" }}
        textStyle={{
          fontSize: 20,
        }}
        placeholder="בחר קטגוריית תרומה"
        open={dropDown}
        value={category}
        items={data}
        setOpen={setDropDown}
        setValue={setCategory}
        // setItems={testfunc}
      />
      <TextInput
        style={styles.input}
        placeholder="עיר"
        onChangeText={(city) => setCity(city)}
        value={city}
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        placeholder="רחוב"
        onChangeText={(street) => setStreet(street)}
        value={street}
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        placeholder="מספר בית"
        onChangeText={(houseNum) => setHouseNum(houseNum)}
        value={houseNum.toString()}
        keyboardType="default"
      />

      <TextInput
      style={styles.input}
      placeholder="טלפון"
        onChangeText={(phone) => setPhone(phone)}
        value={phone.toString()}
        keyboardType="default"
      />
      <TextInput
      style={styles.description}
      numberOfLines={5}
      placeholder="תיאור"
      multiline={true}
        onChangeText={(description) => setDescription(description)}
        value={description}
        keyboardType="default"
      />
      <View style={{ width: 100, height: 100 }}>
        <ImagePickerExample setImage={setImage} />
      </View>

      <Pressable style={styles.button} onPress={saveDataToDB} onPressOut={()=> navigation.navigate("Welcome")} >
        <Text style={styles.text}>אישור</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#C2DED1",
    marginTop:10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    width: 40,
    height: 40,
    fontSize: 16,
    margin: 10,
    width:200,
    textAlign: "right",
  },
  description:{
    width: 100,
    height: 80,
    fontSize: 16,
    margin: 10,
    width:200,
    textAlign: "right",
    borderColor:'white',
    borderWidth:1
  }
 
 
});
export default DonorScreen;
