import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

async function uploadImage(uri, path) {
	// Why are we using XMLHttpRequest? See:
	// https://github.com/expo/expo/issues/2402#issuecomment-443726662
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			console.error(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});
	const imageId = uuidv4();
  console.log(imageId);
  const storage = getStorage();
  const storageRef = ref(storage, `${path}/${imageId}`);
  console.log
  // 'file' comes from the Blob or File API
    return  uploadBytes(storageRef, blob).then(async (snapshot) => {
      console.log('Uploaded a blob or file!');
      blob.close();

	    return imageId;
  });

  
  

	// We're done with the blob, close and release it
	
}

 


export default function ImagePickerExample(props) {
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.cancelled) {
      const imageId = await uploadImage(result.uri,"Images");
      props.setImage(imageId);
      // setImage(result.uri);
      // const storage = getStorage();
      // const storageRef = ref(storage,`Images/${uuid.v4()}`);
        
    // 'file' comes from the Blob or File API
    //   uploadBytes(storageRef, await uploadImageAsync(result.uri)).then((snapshot) => {
    //      console.log('Uploaded a blob or file!');
    // });

    }
    
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="העלה תמונה" onPress={pickImage} />
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    </View>
  );
}