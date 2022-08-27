import React,{useEffect,useState} from "react";
import { View, Text, SafeAreaView ,StyleSheet,TouchableOpacity, Dimensions,Alert} from "react-native";
import * as ProgressBar from "react-native-progress";
import * as FileSystem from "expo-file-system";

import { setFolders } from "../Redux/Slicer";
import { useDispatch } from "react-redux";



const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const PostLoadingScreen=({navigation})=>{
    const [number,SetNumber] = useState(0);

    const [Folder1, setFolder1]= useState([]);
    const [Folder2,setFolder2]= useState([]);
    const [Folder3,setFolder3] = useState([]);
    const [LoadStatus,SetLoadStatus] = useState(false);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     const timer =  setTimeout(() => (number<1)?SetNumber(number+0.2):SetNumber(number+0), 1000);
    // }, [number]);

    const VideosExt = ["mp4","mkv","wmv","mov","avi","MP4","MKV","WMV","MOV","AVI"];
    const ImageExt = ["jpg","png","JPG","PNG"];

    // lodaing folders
    const GetAlbumContent= async()=>{
        // console.log("new images",NewNumberofImages);
        // const Media_Folder_Data = await MediaLibrary.getAlbumAsync("Media");
        // const Media_Assets = await MediaLibrary.getAssetsAsync({
        //     album:Media_Folder_Data,
        //     sortBy:['-modificationTime'],
        //     mediaType:['photo','video']
        // })
        // console.log(Media_Assets);
        // for (let index = NewNumberofImages.newitems; index < Media_Assets.assets.length; index++) {
        //     const element = Media_Assets.assets[index];
        //     await MediaLibrary.deleteAssetsAsync(element);

            
        // }
        // console.log(Media_Assets);
        const outputDir = FileSystem.documentDirectory + "media";
        const migratedFiles = await FileSystem.readDirectoryAsync(outputDir);
        console.log("output folder found",migratedFiles);
        // SetFiels(files=>[...files,outputDir+ "/" +el])
        const videoext=["mp4","mkv","wmv","mov","avi","MP4","MKV","WMV","MOV","AVI","jpg","png","JPG","PNG"]
        try{
            for (let index = 0; index < migratedFiles.length; index++) {
                const element = migratedFiles[index];
                const extension = String(element).split(".",2)[1];
                const Filename = String(element).split(".",2)[0];
                const fileuri = await FileSystem.getInfoAsync(outputDir + "/" + element);
                if (videoext.indexOf(extension)>-1) {
                    if (String(Filename).endsWith("1")) {
                        if (VideosExt.indexOf(extension)>-1) {
                            let File = {
                                "type":"video",
                                "uri": fileuri.uri
                            }
                            setFolder1(uri=>[...uri,File]);
                        }else{
                            let File = {
                                "type":"image",
                                "uri": fileuri.uri
                            }
                            setFolder1(uri=>[...uri,File]);
                        }
                    }else if (String(Filename).endsWith("2")) {
                        if (VideosExt.indexOf(extension)>-1) {
                            let File = {
                                "type":"video",
                                "uri": fileuri.uri
                            }
                            setFolder2(uri=>[...uri,File]);
                        }else{
                            let File = {
                                "type":"image",
                                "uri": fileuri.uri
                            };
                            setFolder2(uri=>[...uri,File]);
                        }
                    }else if (String(Filename).endsWith("3")) {
                        if (VideosExt.indexOf(extension)>-1) {
                            let File = {
                                "type":"video",
                                "uri": fileuri.uri
                            }
                            setFolder3(uri=>[...uri,File]);
                        }else{
                            let File = {
                                "type":"image",
                                "uri": fileuri.uri
                            };
                            setFolder3(uri=>[...uri,File]);
                        }
                    }   
                    
                }
            }
            SetLoadStatus(true);
            
        }catch{
            SetLoadStatus(false);
        }
    };


    //Updating states
    const SetFoldersandroute=()=>{
        try{
            const Data={
                folder1:Folder1,
                folder2:Folder2,
                folder3:Folder3,
            }
            dispatch(setFolders(Data));
            Alert.alert(
                "Proceed",
                "press on the OK button to proceed",
                [
                  {
                    "text":"OK",
                    onPress:()=>navigation.navigate('Split'),
                  }
                ]
      
            );
        }catch{
            console.log("Folder1 didnt loads")
        }
        
    };

    
    console.log(LoadStatus);

    if (LoadStatus) {
        SetFoldersandroute();
    }
    return(
        <SafeAreaView style={Style.maincontainer}>
            {/* <View style={Style.progressbarcontainer}>
                <ProgressBar.Pie progress={number} color="#FE5900" size={250} style={{marginTop:"40%" }}>
                </ProgressBar.Pie>
            </View> */}
            {/* <View style={Style.textbar}>
                <Text style={Style.statuscontent}>Your File is being {String(number * 100).split(".")[0]}% copied, till Now</Text>
            </View> */}
            <View>
                <TouchableOpacity onPress={GetAlbumContent} style={{  width:"100%",
                                            height:"20%",
                                            marginTop:"10%",
                                            alignItems:"center",
                                            display:"flex"}}>
                    <View style={Style.button}>
                        <Text style={Style.buttontext}>Load</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const Style = StyleSheet.create({
    maincontainer:{
        width:Width,
        height:Height,
        position:"absolute",
        flex:1,
    },
    progressbarcontainer:{
        width:"100%",
        height:(Width>Height)?"30%":"60%",
        marginTop:(Width>Height)?"10%":"20%",
        position:"relative",
        alignItems:"center",
    },
    textbar:{
        width:"100%",
        height:"10%"
    },
    statuscontent:{
        textAlign:"center",
        fontSize:(Width>800)? 58:20,
        fontWeight:"bold"
    },
 
    button:{
        width:"50%",
        height:100,
        backgroundColor:"#0B747C",
        borderRadius:10,
        padding:10
    },
    buttontext:{
        textAlign:"center",
        fontWeight:"bold",
        color:"#ffff",
        fontSize:50,
    }


})

export default PostLoadingScreen;