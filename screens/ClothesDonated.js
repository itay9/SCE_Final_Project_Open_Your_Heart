import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import {
  FirebaseStorage,
  getStorage,
  getDownloadURL,
  ref,
} from "firebase/storage";
function ClothesDonated() {
  const db = getFirestore();

  const [clothes, setClothes] = useState([]);
  useEffect(async () => {
    const q = query(
      collection(db, "Donations"),
      where("category", "==", "clothes")
    );

    const querySnapshot = await getDocs(q);
    setClothes(
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          let imgurl;
          if (data.imageId == null) {
            //TODO alert or other option
          } else {
            const imageUrl = data.imageId;
            const storage = getStorage();
            const storageRef = ref(storage, `Images/${imageUrl}`);
            imgurl = await getDownloadURL(storageRef);
          }

          data.imageId;

          return {
            description: data.description,
            city: data.city,
            street: data.street,
            houseNum: data.houseNum,
            phone: data.phone,

            img: imgurl,
          };
        })
      )
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            {clothes.map((clothes, index) => {
              return (
                <View key={index} style={styles.container}>
                  <View>
                    <View style={styles.textContainer}>
                      <View style={styles.adress}>
                        <Text style={styles.text}>כתובת: </Text>
                        <Text style={styles.text}>{clothes.city}, </Text>
                        <Text style={styles.text}>{clothes.street}, </Text>
                        <Text style={styles.text}>{clothes.houseNum}</Text>
                        <Text></Text>
                      </View>
                      <Text style={styles.text}>{clothes.description} </Text>
                      <Text style={styles.text}>טלפון: {clothes.phone}</Text>
                    </View>

                    <Image
                      source={{ uri: clothes.img }}
                      style={{ width: 200, height: 150, marginTop: 10 }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "left",
    marginRight: 4,
  },
  adress: {
    flexDirection: "row",
  },
  textContainer: {
    margin: 0,
    padding: 0,
  },
  container: {
    margin: 5,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
});
export default ClothesDonated;
