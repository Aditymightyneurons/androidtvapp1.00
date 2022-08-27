import React,{useState, useEffect, useRef} from 'react';
import { StyleSheet,Text, TextInput,StatusBar, View,ScrollView,TouchableOpacity ,SafeAreaView,Dimensions} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import { BackHandler } from 'react-native';
// import SettingIcon from '../Compnenets/settingicon';
import * as FileSystem from "expo-file-system";
import { Audio } from 'expo-av';
import { LogBox } from "react-native";


LogBox.ignoreLogs(["EventEmitter.removeListener"]);


const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const SettingsScreen=({navigation})=>{

    const [messege,setmessege] = useState("Swipe");
    const [enableMusic,SetEnableMusic] = useState(null);
    const [Duration,SetDuration] = useState(10);
    const [Texttoplay,SetTextTOplay] = useState("");
    const [Split,SetSplit] = useState(null);
    const [Ratio,SetRatio] = useState(null);
    const [Folder1, setFolder1]= useState([]);
    const [Folder2,setFolder2]= useState([]);
    const [Folder3,setFolder3] = useState([]);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [playbackObject, setPlaybackObject] = useState(null);
    // const [playbackStatus, setPlaybackStatus] = useState(null);
    const [sound, setSound] = useState(null);

     // for Screen Split One Setting AsycStorage item
     const ScreenSplitToOne=async()=>{
        SetSplit("1");
        SetRatio("1");
        // navigation.navigate('Split',{split: "1", ratio:"1"});
    };
    // for Screen Split 2 50:50 Setting AsycStorage item
    const ScreenSplittoTwoHalf=async()=>{
        SetSplit("2");
        SetRatio("0.5");
        // navigation.navigate('Split',{split: "2", ratio:"0.5"});
    };

    // for Screen Split 2 30:70 Setting AsycStorage item
    const ScreenSplittoTwoOneThird=async()=>{
        SetSplit("2");
        SetRatio("0.3");

        // navigation.navigate('Split',{split: "2", ratio:"0.3"});
    };


    // for Screen Split 2 50:50 Setting AsycStorage item
    const ScreenSplitToThree=async()=>{
        SetSplit("3");
        SetRatio("3");
        // navigation.navigate('Split',{split: "3", ratio:"3"});
    };
    
    const getimages=async()=>{
        const SoundExtension = ["mp3","WAV","MP3","wav"];
        const Vidextension=["mp4","mkv","wmv","mov","avi","MP4","MKV","WMV","MOV","AVI"];
        const Imageextention= ["jpg","png","JPG","PNG","jpeg","JPEG"];
        try{
            const Files =await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "media");
            for (let index = 0; index < Files.length; index++) {
                const element = Files[index]
                console.log(element)
                if (element.startsWith("folder1")===true) {
                    const imageFolder = FileSystem.documentDirectory+"media"+"/"+ element;
                    const infofile = await FileSystem.getInfoAsync(imageFolder);
                    if (Vidextension.indexOf(element.split(".",2)[1])>-1) {
                        const file = {
                            "type":"video",
                            "uri": infofile.uri
                        }
                        console.log(file)
                        Folder1.push(file);
                    }else if (Imageextention.indexOf(element.split(".",2)[1])>-1) {
                        const file = {
                            "type":"image",
                            "uri": infofile.uri
                        }
                        Folder1.push(file);
                    }
                    
                    
                    
                    
                }else if (element.startsWith("folder2")===true) {
                    const imageFolder = FileSystem.documentDirectory+"media"+"/"+ element;
                    const infofile = await FileSystem.getInfoAsync(imageFolder);
                    if (Vidextension.indexOf(element.split(".",2)[1])>-1) {
                        const file = {
                            "type":"video",
                            "uri": infofile.uri
                        }
                        Folder2.push(file);
                    }else if (Imageextention.indexOf(element.split(".",2)[1])>-1) {
                        const file = {
                            "type":"image",
                            "uri": infofile.uri
                        }
                        Folder2.push(file);
                    }
                }else if (element.startsWith("folder3")===true) {
                    const imageFolder = FileSystem.documentDirectory+"media"+"/"+ element;
                    const infofile = await FileSystem.getInfoAsync(imageFolder);
                    if (Vidextension.indexOf(element.split(".",2)[1])>-1) {
                        const file = {
                            "type":"video",
                            "uri": infofile.uri
                        }
                        Folder3.push(file);
                    }else if (Imageextention.indexOf(element.split(".",2)[1])>-1) {
                        const file = {
                            "type":"image",
                            "uri": infofile.uri
                        }
                        Folder3.push(file);
                    }
                }else if(SoundExtension.indexOf(element.split(".",2)[1])>-1) {

                    const soundfolder = FileSystem.documentDirectory+"media"+"/"+ element;
                    const infofile = await FileSystem.getInfoAsync(soundfolder);
                    SetEnableMusic(infofile.uri);
                }
            }
        }catch{
            console.log("no output media folder found");
        }
    }
    const SetDurationvalue=()=>{
        if (Split !== null ) {
            navigation.navigate('Split',{duration: Duration *1000,split: Split, ratio:Ratio, exit:false, music:enableMusic,folder1:Folder1,folder2:Folder2, folder3:Folder3,text:Texttoplay});
        }else{
            alert("You Did not Selected a Split");
        }

    }
   
    const ExitApp=()=>{
        navigation.navigate('Split',{duration: String(Duration),split: Split, ratio:Ratio,exit:true,music:enableMusic,folder1:Folder1,folder2:Folder2, folder3:Folder3,text:Texttoplay});
        BackHandler.exitApp();

    }
    
    const handleAudioPlayPause = async () => {
        if (enableMusic !== null) {
            // if (playbackObject !== null && playbackStatus === null) {
            //     const status = await playbackObject.loadAsync(
            //       { uri: audio.uri },
            //       { shouldPlay: true }
            //     );
            //     console.log(status);
            //     setIsPlaying(true);
            //     return setPlaybackStatus(status);
            // }
        const audio = {
            filename: 'My Awesome Audio',
            uri: enableMusic
          };
        if (enableMusic !== null) {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
            audio
            );
            setSound(sound);
            // console.log(sound);
            await sound.playAsync(); 
            console.log("playingsound");
            console.log(audio.uri);
            await sound.setIsLoopingAsync(true);
        }
        }
        
    };
    const stopplaying=async()=>{
        if (sound!== null) {
            await sound.pauseAsync();
        }
    }
    useEffect(()=>{
        getimages();
    },[])
    return(
        <SafeAreaView style={Styles.maincontainer}>
           
                <View style={Styles.headerContainer}>
                    {/* <SettingIcon></SettingIcon> */}
                    <Text style={Styles.headertextstyle}>Settings</Text>
                              
                </View>
                <ScrollView style={Styles.scrollview}>
                    
                    <View style={Styles.SplitsContainer}>
                            <View style={Styles.screensplitcontainer}>
                                <Text onPress={ExitApp} style={{color:"#727272",fontSize:20,fontWeight:"800"}}>Exit</Text>
                            </View>
                        <View style={Styles.screensplitcontainer}>
                            <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>Split Screen 1</Text>
                            <SwipeButton
                                containerStyles={{borderRadius:5}}
                                height={30}
                                width={250}
                                onSwipeFail={()=>setmessege("Swipe")}
                                onSwipeStart={()=>setmessege("..........")}
                                onSwipeSuccess={ScreenSplitToOne}
                                railBackgroundColor="#004AA2"
                                railFillBackgroundColor="#03F8C0"
                                railStyles={{borderRadius: 5}}
                                title={messege}
                                titleFontSize={18}
                                titleColor="#ffff"
                                thumbIconBackgroundColor="#FF3085"
                                thumbIconBorderColor="#ffff"
                                swipeSuccessThreshold={80}
                                >
                            </SwipeButton>
                        </View>
                        <View style={Styles.screensplitcontainer}>
                            <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>50 50 Split</Text>
                            <SwipeButton
                                containerStyles={{borderRadius:5}}
                                height={30}
                                width={250}
                                onSwipeFail={()=>setmessege("Swipe")}
                                onSwipeStart={()=>setmessege("..........")}
                                onSwipeSuccess={ScreenSplittoTwoHalf}
                                railBackgroundColor="#004AA2"
                                railFillBackgroundColor="#03F8C0"
                                railStyles={{borderRadius: 5}}
                                title={messege}
                                titleFontSize={18}
                                titleColor="#ffff"
                                thumbIconBackgroundColor="#FF3085"
                                thumbIconBorderColor="#ffff"
                                swipeSuccessThreshold={80}
                                >
                            </SwipeButton>
                        </View>
                        <View style={Styles.screensplitcontainer}>
                            <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>30 70 Split</Text>
                            <SwipeButton
                                containerStyles={{borderRadius:5}}
                                height={30}
                                width={250}
                                onSwipeFail={()=>setmessege("Swipe")}
                                onSwipeStart={()=>setmessege("..........")}
                                onSwipeSuccess={ScreenSplittoTwoOneThird}
                                railBackgroundColor="#004AA2"
                                railFillBackgroundColor="#03F8C0"
                                railStyles={{borderRadius: 5}}
                                title={messege}
                                titleFontSize={18}
                                titleColor="#ffff"
                                thumbIconBackgroundColor="#FF3085"
                                thumbIconBorderColor="#ffff"
                                swipeSuccessThreshold={80}
                                >
                            </SwipeButton>
                        </View>
                        <View style={Styles.screensplitcontainer}>
                            <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>Split Screen 3</Text>
                            <SwipeButton
                                containerStyles={{borderRadius:5}}
                                height={30}
                                width={250}
                                onSwipeFail={()=>setmessege("Swipe")}
                                onSwipeStart={()=>setmessege("..........")}
                                onSwipeSuccess={ScreenSplitToThree}
                                railBackgroundColor="#004AA2"
                                railFillBackgroundColor="#03F8C0"
                                railStyles={{borderRadius: 5}}
                                title={messege}
                                titleFontSize={18}
                                titleColor="#ffff"
                                thumbIconBackgroundColor="#FF3085"
                                thumbIconBorderColor="#ffff"
                                swipeSuccessThreshold={80}
                                >
                            </SwipeButton>
                        </View>
                        <View style={Styles.screensplitcontainer}>
                            <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>Background Music</Text>
                            <SwipeButton
                                containerStyles={{borderRadius:5}}
                                height={30}
                                width={250}
                                onSwipeFail={stopplaying}
                                onSwipeStart={()=>setmessege("...............")}
                                onSwipeSuccess={handleAudioPlayPause}
                                railBackgroundColor="#004AA2"
                                railFillBackgroundColor="#03F8C0"
                                railStyles={{borderRadius: 5}}
                                title={messege}
                                titleFontSize={18}
                                titleColor="#ffff"
                                thumbIconBackgroundColor="#FF3085"
                                thumbIconBorderColor="#ffff"
                                swipeSuccessThreshold={80}
                                >
                            </SwipeButton>
                            
                        </View>
                        <View style={Styles.screensplitcontainer}>
                        <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>Image Change Duration</Text>
                            <TextInput onChangeText={newduration=>SetDuration(newduration)} style={{width:150,
                                height:40, borderRadius:5, 
                                borderColor:"#757575", borderWidth:2, marginBottom:50, marginTop:10,textAlign:"center"}} 
                                keyboardType="numeric" placeholder='Duration'></TextInput>
                            <Text style={{color:"#727272",fontSize:20,fontWeight:"800"}}>Text To Play</Text>
                            <TextInput onChangeText={newText=>SetTextTOplay(newText)} style={{width:450,
                                height:40, borderRadius:5, 
                                borderColor:"#757575", borderWidth:2, marginBottom:50, marginTop:10,textAlign:"center"}} 
                                keyboardType="default" placeholder='Text To Play'></TextInput>
                        </View>
                        <View style={{width:"100%",height:2,backgroundColor:"#D0D0D0"}}></View>
                    </View>
                    
                    <View style={Styles.SplitsContainer}>
                        
                        <TouchableOpacity onPress={SetDurationvalue} style={{width:"100%",alignItems:"center",height:100,marginBottom:50,position:"relative",marginTop:100,display:"flex"}}>
                               <View style={{width:"50%",height:"100%",backgroundColor:"#E68000",borderRadius:10,padding:25}}>
                                    <Text style={{fontSize:40,textAlign:"center",justifyContent:"center",fontWeight:"bold",color:"#fff"}}>Save</Text>
                                </View> 
                        </TouchableOpacity>
                        
                    </View>
                </ScrollView>
                
           
        </SafeAreaView>
    )
}

const Styles =StyleSheet.create({
    maincontainer:{
        paddingTop:StatusBar.currentHeight,
        flex:1,
    },
    headerContainer:{
        position:"relative",
        width:Width*.9,
        height:Height* 0.3,
        top:Height*0.1,
        left:Width*0.05,
        alignContent:"center"
    },
    
    headertextstyle:{
        textAlign:"center",
        fontSize: (Width>1248)? 52:35,
        color:"#9A9A9A",
        fontWeight:"bold"
    },
    scrollview:{
        backgroundColor:"#E8E8E8",
        marginHorizontal:5

    },
    SplitsContainer:{
        position:"relative",
        width:Width,
        height:"auto",
        flex:1,
        marginBottom:50
    },
    screensplitcontainer:{
        position:"relative",
        width:"100%",
        height:100,
        marginTop:50,
        alignItems:"center"
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

export default SettingsScreen;