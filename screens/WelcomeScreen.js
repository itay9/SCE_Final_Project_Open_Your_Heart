import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DonorScreen from "./DonorScreen";

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.rootContainer}>
          <Text style={styles.title}>ברוכים הבאים!</Text>

          <View style={styles.imagesContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DonorScreen")}
            >
              <View>
                <Image
                  style={styles.image}
                  source={require("../assets/Images/logoDonate.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("FoodDonated")}
            >
              <View>
                <Image
                  style={styles.image}
                  source={require("../assets/Images/logoReciver.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.imagesContainerTwo}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HousewaresDonated")}
            >
              <View>
                <Image
                  style={styles.image}
                  source={require("../assets/Images/houseimg.png")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ClothesDonated")}
            >
              <View>
                <Image
                  style={styles.image}
                  source={require("../assets/Images/clothesimg.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.imagesContainerThree}>
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
              <View>
                <Image
                  style={styles.image}
                  source={require("../assets/Images/mapimg.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
  },
  image: {
    height: 150,
    width: 150,
    margin: 10,
  },
  imagesContainerTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
  },
  imagesContainerThree: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
  },
});
