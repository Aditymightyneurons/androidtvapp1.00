import React,{useEffect,useState} from 'react';
import { Alert,StyleSheet, Text, TouchableOpacity, View,SafeAreaView, Dimensions,Image} from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';



const LogoImage = require("../../assets/logo/mpd.png");
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const LandingScreen=({navigation})=>{

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        // display some allert or request again to read media files.
        getPermission();
      };
    }
    if (permission.granted) {
      console.log("granted");
    }
  };
  const CheckforFiles=async()=>{
    const outputDir = FileSystem.documentDirectory + "media";
    const migratedFiles = await FileSystem.readDirectoryAsync(outputDir);
    if (migratedFiles.length>0) {
        Alert.alert(
          "Do you want to insert new media?",
          "if yes, make sure you have inserted Flash Drive",
          [
            {
              "text":"no",
              onPress:()=> navigation.navigate('Settings'),
              style: "cancel"
            },
            {
              "text":"Yes",
              onPress:()=>getPermission()
            }
          ]

        )
    }

  };
  
  useEffect(()=>{
    CheckforFiles();
  },[]);


    // This function fetch media from external storage folder named "media" to library
    const openImagePickerAsync = async () => {
        getPermission()
        // const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        // if (permissions.granted) {
          // Gets SAF URI from response
          const albumUri = StorageAccessFramework.getUriForDirectoryInRoot("media");
          console.log("this is where files are",albumUri);
          const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(albumUri);
          if (!permissions.granted) {
            return;
          };
          // console.log(permissions);
          const permittedUri = permissions.directoryUri;
          // console.log("permitted uri",permittedUri);
          // Checks if users selected the correct folder
          if (!permittedUri.includes("media")) {
            return;
          }
          
          try{
            const Files =await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "media");
            for (let index = 0; index < Files.length; index++) {
              const element = FileSystem.documentDirectory+"media"+"/"+ Files[index];
              FileSystem.deleteAsync(element);
              console.log("filedeleted",Files[index]);
            }
          }catch{
            console.log("no output media folder found");
          }
          
          console.log("......start")
          await StorageAccessFramework.copyAsync({
            from: permittedUri,
            to: FileSystem.documentDirectory,
          });
          console.log("......end")
          const outputDir = FileSystem.documentDirectory + "media";
          console.log("This is where files migrated",outputDir);
          // const MediaFolder = await FileSystem.getInfoAsync(outputDir);
          // console.log("media folder details",MediaFolder);
          const migratedFiles = await FileSystem.readDirectoryAsync(outputDir);
          // const files = await StorageAccessFramework.readAsStringAsync(migratedFiles)
          navigation.navigate('Settings');
          // try{
          //   for (let index = 0; index < migratedFiles.length; index++) {
          //     const element = migratedFiles[index];
          //     if (element.startsWith(".trashed")===false) {

          //       console.log(element);
          //       NewimagesList.push(element);
          //     }
          //   }
          //   console.log("output folder found",NewimagesList);
            
          // }catch{
          //   console.log("outputfolder not found 2nd")
          // }

          // const Status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          //   {
          //     title: "MAXPRO Permissions",
          //     message:"Android Tv wants to write to exernal storage" ,
          //     buttonPositive: "OK",
          //     buttonNegative: "Cancel",

          //   });
          
          // if (Status === PermissionsAndroid.RESULTS.GRANTED) {
          //   const album = await MediaLibrary.getAlbumAsync("Media");
          //   if (album !== null) {
          //     await MediaLibrary.deleteAlbumsAsync(album.id);
          //     console.log("media folder deleted");
          //   };
          //   console.log(Status);
          //       migratedFiles.map(
          //         async fileName => {
          //           if (!fileName.includes("trashed")) {
          //             const asset = await MediaLibrary.createAssetAsync(outputDir + '/' + fileName);
          //           // console.log("asseet",asset);
                    
          //           // console.log("album",album);
          //             await MediaLibrary.createAlbumAsync("Media", asset, true);
          //             console.log("media folder created");
          //           }
          //       });

          //       navigation.navigate('Settings');
          // }
          
    };

  // On load this function is getting media storage access permission
    
      


    
    
        return(
          <SafeAreaView style={Styles.maincontainer}>
              <View style={Styles.imagecontainer}>
                  <Image style={Styles.image} source={LogoImage}></Image>
              </View>
              <View style={Styles.headingstyle}>
                  <Text style={Styles.headertextstyle} >Welcome to <Text style={Styles.boldertext}>MAXPRO</Text></Text>
              </View>
              <TouchableOpacity style={Styles.buttonstyle} onPress={openImagePickerAsync}>
                  <Text style={Styles.bottontextstyle}>Import Media Files</Text>
              </TouchableOpacity>
              
          </SafeAreaView>
      )

};

const Styles = StyleSheet.create({
    maincontainer:{
        width:Width,
        height:Height,
        position:"absolute",
        flex:1,
    },
    imagecontainer:{
        width:Width*0.8,
        height:Height * 0.3,
        position:"absolute",
        top:Height*0.2,
        left:Width*0.1,
        overflow:"hidden",
        padding:2,
    },
    image:{
        position:"relative",
        width:"100%",
        height:"100%",
        resizeMode:"contain",
    },
    headingstyle:{
        position:"absolute",
        width:Width*0.8,
        height:Height * 0.2,
        left:Width*0.1,
        top:Height*0.5,
        overflow:"hidden",
    },
    headertextstyle:{
        textAlign:"center",
        fontSize: (Width>1248)? 52:25,
        color:"#9A9A9A"
    },
    boldertext:{
        fontWeight:"bold",
        color:"#2772A5",
        fontSize: (Width>1248)? 58:28,
    },
    buttonstyle:{
        width:(Width>1248)?Width*0.4:Width*0.8,
        height:(Width>1248)? 200:80,
        position:"absolute",
        top:Height*0.7,
        left:(Width>1248)?Width*0.3:Width*0.1,
        overflow:"hidden",
        padding:(Width>1248)? 60:20,
        backgroundColor:"#0B747C",
        borderRadius:10
    },
    bottontextstyle:{
        fontSize:(Width>1248)? 60:30,
        color:"#ffff",
        fontWeight:"bold",
        textAlign:"center"
    }



})


export default LandingScreen;
