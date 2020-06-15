/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob'

const App = () => {

  const requestStoragePermissions = useCallback(async () => {
    console.log("Downlogind file...");

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message:
            "The app needs permission to save the file.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

  }, [downloadFile]);

  const downloadFile = useCallback(() => {
    var date      = new Date();
    var url       = "http://www.clker.com/cliparts/B/B/1/E/y/r/marker-pin-google-md.png";
    var ext       = extention(url);
    ext = "."+ext[0];
    const { config, fs } = RNFetchBlob
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads : {
          useDownloadManager : true,
          notification : true,
          path:  PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
          description : 'Image'
      }
    }
    config(options).fetch('GET', url).then((res) => {
      console.log("Success Downloaded");
    });
  }, []);

  const extention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableHighlight onPress={Platform.OS === 'android' ? requestStoragePermissions : downloadFile}>
          <Text>Hola</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
