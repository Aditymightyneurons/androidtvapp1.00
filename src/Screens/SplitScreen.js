import React,{useEffect,useState, useRef} from "react";
import { View,SafeAreaView,Image,StyleSheet, Dimensions, TouchableOpacity,Text } from "react-native";
import { Video} from "expo-av";
import { LogBox, StatusBar } from "react-native";
import TextTicker from "react-native-text-ticker";

const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
LogBox.ignoreLogs(["EventEmitter.removeListener"]);


const SplitScreen=({navigation, route})=>{



    const Spliting = (route.params !== undefined)? route.params:{"split": "1", "ratio":"1"};
    // console.log(Spliting);
    const Exit = (route.params !== undefined)? route.params["exit"]:false;
    // console.log(Duration);
    const Split = Spliting["split"];
    const Ratio = Spliting["ratio"];
    const Music = Spliting["music"];
    const [Folder1VideoDuration,SetFolder1VideoDuration] = useState(null);
    const [Folder2VideoDuration,SetFolder2VideoDuration] = useState(null);
    const [Folder3VideoDuration,SetFolder3VideoDuration] = useState(null);
    const Folder1Duration =(Folder1VideoDuration!==null)?Folder1VideoDuration: Spliting["duration"];
    const Folder2Duration =(Folder2VideoDuration !== null)?Folder2VideoDuration: Spliting["duration"];
    const Folder3Duration = (Folder3VideoDuration !== null)?Folder3VideoDuration: Spliting["duration"];
    const Folder1 = Spliting["folder1"];
    const Folder2 = Spliting["folder2"];
    const Folder3 = Spliting["folder3"];
    const TexttoPlay = Spliting["text"];
    const [Transform,SetTransForm] = useState(0);
    
    
    const [Folder1ImageWidth,SetFolder1ImageWidth] = useState(null);
    const [Folder2ImageWidth,SetFolder2ImageWidth] = useState(null);
    const [Folder3ImageWidth,SetFolder3ImageWidth] = useState(null);  
    
    const video = useRef(null);
    const [status, setStatus] = useState({});


    const [active3, setActive3] = useState(0);
    const [active2, setActive2] = useState(0);
    const [active1, setActive1] = useState(0);
   
    useEffect(()=>{
        

        if (Folder1.length === 1) {
            return setActive1(0);
        }else{
            const Interval = setInterval(() => {          
                setActive1(prev=>{
                    if (prev === Folder1.length-1) {
                        return 0;
                    }
                    else{
                        return prev+1;
                    }
                });
            }, Folder1Duration);
        }
        if (Exit) {
            console.log("interval stoped");
            return clearInterval(Interval);
        }
    },[]);
    useEffect(()=>{
        if (Folder2.length === 1) {
            return setActive2(0);
        }else{
            const Interval = setInterval(() => {
            
            setActive2(prev=>{
                if (prev === Folder2.length-1) {
                    return 0;
                } else {
                    return prev+1;
                } 
            });
            }, Folder2Duration);
        }
        

            if (Exit) {
                console.log("interval stoped");
                return clearInterval(Interval);
            }
    },[]);
    useEffect(()=>{
        if (Folder3.length === 1) {
            return setActive3(0);
        }else{
            const Interval = setInterval(() => {
                        
                        setActive3(prev=>{
                            
                            if (prev === Folder3.length-1) {
                                return 0;
                            } else {
                                return prev+1;
                            }
                        });
            }, Folder3Duration);
        }
        

            if (Exit) {
                console.log("interval stoped");
                return clearInterval(Interval);
            }
    },[]);
    
    if (Split === "1" && Folder1.length>0) {
        if (Folder1[active1].type === "image") {
            const Size =  Image.getSize(Folder1[active1].uri,(width, height) =>
            SetFolder1ImageWidth(width));
        }
        
        return(
            <SafeAreaView style={{width:Width,height:Height,flex:1,flexDirection:(Width>Height)? "row":"column"}}>
                <StatusBar hidden={true}></StatusBar>
                <View style={{width:Width, height:Height}} >
                    {(Folder1[active1].type === "image")?
                        <Image style={{width:"100%", height:"100%",resizeMode:"stretch"}} resizeMode="stretch" source={{uri:Folder1[active1].uri}}></Image>:
                        <Video  style={{width:"100%",height:"100%",resizeMode:"stretch"}}
                                source={{uri:Folder1[active1].uri}}
                                resizeMode="stretch"
                                isMuted
                                isLooping
                                onLoad={duration=>SetFolder1VideoDuration(duration.durationMillis)}
                                shouldPlay
                                onPlaybackStatusUpdate={status => setStatus(() => status)}>
                        </Video>
                    }
                </View>
                <View style={{overflow:"hidden",position:"absolute",width:Width/2,height:30,left:Width/4,top:Height/1.1,borderColor:"#fff",borderWidth:2,backgroundColor:"rgba(52, 52, 52, 0.8)",borderRadius:10}}>
                        <TextTicker
                            style={{ fontSize: 24, color:"#fff" }}
                            loop
                            scrollSpeed={50}
                            bounce
                            >
                                            {TexttoPlay}
                        </TextTicker>
                        
                </View>
            </SafeAreaView>
        )
    }else if (Split === "2" && Folder1.length>0 && Folder2.length>0 && Ratio === "0.5") {
        if (Folder1[active1].type === "image") {
            const Size =  Image.getSize(Folder1[active1].uri,(width, height) =>
            SetFolder1ImageWidth(width));
        }
        if (Folder2[active2].type ==="image") {
            const Size =  Image.getSize(Folder2[active2].uri,(width, height) =>
            SetFolder2ImageWidth(width));
        }
           return(
                <SafeAreaView style={{width:Width,height:Height,flex:1,flexDirection:(Width>Height)? "row":"column"}}>
                    <StatusBar hidden={true}></StatusBar>
                    <View style={{width:(Width>Height)?Width/2:Width, height:(Width>Height)?Height:Height/2}} >
                        {(Folder1[active1].type === "image")?
                            <Image  style={{ width:(Width>Height)?Width/2:Width, 
                                    height:(Width>Height)?Height:Height/2,
                                    flex:1,
                                    resizeMode:(Folder1ImageWidth !==null && Folder1ImageWidth >Width/2)?"stretch":"contain"}} 
                                    resizeMode={(Folder1ImageWidth !==null && Folder1ImageWidth >Width/2)?"stretch":"contain"} 
                                     source={{uri:Folder1[active1].uri}}></Image>:
                            <Video  style={{ width:(Width>Height)?Width/2:Width, 
                                    height:(Width>Height)?Height:Height/2,
                                    flex:1,
                                    
                                    resizeMode:(Folder1ImageWidth !==null && Folder1ImageWidth >Width/2)?"stretch":"contain"}} 
                                    resizeMode={(Folder1ImageWidth !==null && Folder1ImageWidth >Width/2)?"stretch":"contain"} 
                                    source={{uri:Folder1[active1].uri}}
                                    onLoad={duration=>SetFolder1VideoDuration(duration.durationMillis)}
                                    isLooping
                                    isMuted
                                    shouldPlay
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}>
                            </Video>
                        }
                        
                    </View>
                    <View style={{width:(Width>Height)?Width/2:Width,height:(Width>Height)? Height:Height/2}}>
                    {(Folder2[active2].type ==="image")?
                            <Image style={{ width:(Width>Height)?Width/2:Width, 
                                height:(Width>Height)?Height:Height/2,
                                flex:1,
                                resizeMode:(Folder2ImageWidth !==null && Folder2ImageWidth >Width/2)?"stretch":"contain"}} 
                                resizeMode={(Folder2ImageWidth !==null && Folder2ImageWidth >Width/2)?"stretch":"contain"}  
                                source={{uri:Folder2[active2].uri}}></Image>:
                            <Video style={{ width:(Width>Height)?Width/2:Width, 
                                    height:(Width>Height)?Height:Height/2,
                                    flex:1,
                                    resizeMode:(Folder2ImageWidth !==null && Folder2ImageWidth >Width/2)?"stretch":"contain"}} 
                                    resizeMode={(Folder2ImageWidth !==null && Folder2ImageWidth >Width/2)?"stretch":"contain"}  
                                    source={{uri:Folder2[active2].uri}}
                                    ref={video}
                                    isMuted
                                    onLoad={duration=>SetFolder2VideoDuration(duration.durationMillis)}
                                    isLooping
                                    shouldPlay
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}>
                            </Video>
                }
                    </View>
                    <View style={{overflow:"hidden",position:"absolute",width:Width/2,height:30,left:Width/4,top:Height/1.2,borderColor:"#fff",borderWidth:2,backgroundColor:"rgba(52, 52, 52, 0.8)",borderRadius:10}}>
                        <TextTicker
                            style={{ fontSize: 24, color:"#fff" }}
                            loop
                            scrollSpeed={50}
                            bounce
                            >
                                            {TexttoPlay}
                        </TextTicker>
                    </View>
                </SafeAreaView>
           )
    }else if (Split === "2" && Ratio === "0.3" && Folder1.length>0 && Folder2.length>0) {
        if (Folder1[active1].type === "image") {
            const Size =  Image.getSize(Folder1[active1].uri,(width, height) =>
            SetFolder1ImageWidth(width));
        }
        if (Folder2[active2].type ==="image") {
            const Size =  Image.getSize(Folder2[active2].uri,(width, height) =>
            SetFolder2ImageWidth(width));
        }

       return(
            <SafeAreaView style={{width:Width,height:Height,flex:1,flexDirection:(Width>Height)? "row":"column"}}>
                <StatusBar hidden={true}></StatusBar>
                <View style={{width:(Width>Height)?Width*0.33:Width, height:(Width>Height)?Height:Height*0.33}} >
                    {(Folder1[active1].type === "image")?
                        <Image style={{ width:(Width>Height)?Width*0.33:Width, 
                                        height:(Width>Height)?Height:Height*0.33,
                                        flex:1,
                                        resizeMode:(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.33)?"stretch":"contain"}} 
                                        resizeMode={(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.33)?"stretch":"contain"} 
                                        source={{uri:Folder1[active1].uri}}></Image>:
                        <Video  style={{ width:(Width>Height)?Width*0.33:Width, 
                                        height:(Width>Height)?Height:Height*0.33,
                                        flex:1,
                                        resizeMode:(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.33)?"stretch":"contain"}} 
                                        resizeMode={(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.33)?"stretch":"contain"} 
                                        source={{uri:Folder1[active1].uri}}
                                        isMuted
                                        onLoad={duration=>SetFolder1VideoDuration(duration.durationMillis)}
                                        shouldPlay
                                        onPlaybackStatusUpdate={status => setStatus(() => status)}>
                        </Video>
                    }
                </View>
                <View style={{width:(Width>Height)?Width*0.67:Width,height:(Width>Height)? Height:Height* 0.67}}>
        {(Folder2[active2].type ==="image")?
                <Image style={{width:(Width>Height)?Width*0.67:Width, 
                                height:(Width>Height)? Height:Height* 0.67, 
                                flex:1, 
                                resizeMode:(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.67)?"stretch":"contain"}} 
                                resizeMode={(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.67)?"stretch":"contain"} 
                                source={{uri:Folder2[active2].uri}}></Image>:
                <Video style={{width:(Width>Height)?Width*0.67:Width, 
                                height:(Width>Height)? Height:Height* 0.67, flex:1, 
                                resizeMode:(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.67)?"stretch":"contain"}}
                                source={{uri:Folder2[active2].uri}}
                                resizeMode={(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.67)?"stretch":"contain"}
                                ref={video}
                                isMuted
                                onLoad={duration=>SetFolder2VideoDuration(duration.durationMillis)}
                                shouldPlay
                                onPlaybackStatusUpdate={status => setStatus(() => status)}>
                </Video>
            }
                </View>
                <View style={{overflow:"hidden",position:"absolute",width:Width/2,height:30,left:Width/4,top:Height/1.2,backgroundColor:"rgba(52, 52, 52, 0.8)",borderColor:"#fff",borderWidth:2,borderRadius:10}}>
                    <TextTicker
                        style={{ fontSize: 24, color:"#fff" }}
                        loop
                        scrollSpeed={50}
                        bounce
                        >
                        {TexttoPlay}
                    </TextTicker>
                </View>
            </SafeAreaView>
       )
    }else if (Split === "3" && Folder1.length>0 && Folder2.length>0 && Folder3.length>0 ) {
        if (Folder1[active1].type === "image") {
            const Size =  Image.getSize(Folder1[active1].uri,(width, height) =>
            SetFolder1ImageWidth(width));
        }
        if (Folder2[active2].type ==="image") {
            const Size =  Image.getSize(Folder2[active2].uri,(width, height) =>
            SetFolder2ImageWidth(width));
        }
        if (Folder3[active2].type ==="image") {
            const Size =  Image.getSize(Folder3[active1].uri,(width, height) =>
            SetFolder3ImageWidth(width));
        }

       return(
            <SafeAreaView style={{width:Width,height:Height,flex:1,flexDirection:(Width>Height)? "row":"column"}}>
                <StatusBar hidden={true}></StatusBar>
            {/* Split 1 */}
            <View style={{width:(Width>Height)?Width*0.35:Width, height:(Width>Height)?Height:Height*0.35}} >
                {(Folder1[active1].type === "image")?
                    <Image style={{width:(Width>Height)?Width*0.35:Width, 
                                    height:(Width>Height)?Height:Height*0.35,flex:1,
                                    resizeMode:(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.35)?"stretch":"contain"}} 
                                    resizeMode={(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.35)?"stretch":"contain"} 
                                    source={{uri:Folder1[active1].uri}}></Image>:
                    <Video  style={{width:(Width>Height)?Width*0.35:Width, 
                                    height:(Width>Height)?Height:Height*0.35,flex:1,
                                    resizeMode:(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.35)?"stretch":"contain"}}
                                    source={{uri:Folder1[active1].uri}}
                                    resizeMode={(Folder1ImageWidth !==null && Folder1ImageWidth >Width*0.35)?"stretch":"contain"}
                                    isMuted
                                    shouldPlay
                                    isLooping
                                    onLoad={duration=>SetFolder1VideoDuration(duration.durationMillis)}
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}>
                    </Video>
                }
            </View>
            {/* Split 2 */}
            <View style={{width:(Width>Height)?Width*0.35:Width,height:(Width>Height)? Height:Height* 0.35}}>
                    {(Folder2[active2].type ==="image")?
                            <Image style={{ width:(Width>Height)?Width*0.35:Width,
                                             height:(Width>Height)?Height:Height*0.35,
                                             flex:1,
                                             resizeMode:(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.35)?"stretch":"contain"}} 
                                             source={{uri:Folder2[active2].uri}}></Image>:
                            <Video style={{width:(Width>Height)?Width*0.35:Width, 
                                            height:(Width>Height)?Height:Height*0.35,
                                            flex:1,
                                            resizeMode:(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.35)?"stretch":"contain"}}
                                            source={{uri:Folder2[active2].uri}}
                                            resizeMode={(Folder2ImageWidth !==null && Folder2ImageWidth >Width*0.35)?"stretch":"contain"}
                                            ref={video}
                                            isMuted
                                            onLoad={duration=>SetFolder2VideoDuration(duration.durationMillis)}
                                            isLooping
                                            shouldPlay
                                            onPlaybackStatusUpdate={status => setStatus(() => status)}>
                            </Video>}
            </View>
            {/* Split 3 */}
            <View style={{width:(Width>Height)?Width*0.3:Width,height:(Width>Height)? Height:Height* 0.3}}>
                    {(Folder3[active3].type ==="image")?
                            <Image style={{width:(Width>Height)?Width*0.35:Width, 
                                height:(Width>Height)?Height:Height*0.35,flex:1,
                                resizeMode:(Folder3ImageWidth !==null && Folder3ImageWidth >Width*0.3)?"stretch":"contain"}} resizeMode={(Folder3ImageWidth !==null && Folder3ImageWidth >Width*0.3)?"stretch":"contain"} source={{uri:Folder3[active3].uri}}></Image>:
                            <Video style={{width:(Width>Height)?Width*0.35:Width, 
                                height:(Width>Height)?Height:Height*0.35,flex:1,
                                resizeMode:(Folder3ImageWidth !==null && Folder3ImageWidth >Width*0.3)?"stretch":"contain"}}
                                    source={{uri:Folder3[active3].uri}}
                                    resizeMode={(Folder3ImageWidth !==null && Folder3ImageWidth >Width*0.3)?"stretch":"contain"}
                                    ref={video}
                                    isMuted
                                    onLoad={duration=>SetFolder3VideoDuration(duration.durationMillis)}
                                    isLooping
                                    shouldPlay
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}>
                            </Video>}
            </View>
            <View style={{overflow:"hidden",position:"absolute",width:Width/2,height:30,left:Width/4,top:Height/1.2,backgroundColor:"rgba(52, 52, 52, 0.8)",borderRadius:10}}>
                <TextTicker
                    style={{ fontSize: 24, color:"#fff" }}
                    loop
                    scrollSpeed={50}
                    bounce
                    >
                    {TexttoPlay}
                </TextTicker>
            </View>
            </SafeAreaView>
       )
    }else {
        return(<SafeAreaView>
            <TouchableOpacity onPress={getimages}  style={{width:"100%",alignItems:"center",height:100,marginBottom:50,position:"relative",marginTop:50,display:"flex"}}>
                <View style={{width:"50%",marginTop:"10%",height:"100%",backgroundColor:"#E68000",borderRadius:10,padding:25}}>
                    <Text style={{fontSize:40,textAlign:"center",justifyContent:"center",fontWeight:"bold",color:"#fff"}}>Play</Text>
                </View> 
            </TouchableOpacity>
        </SafeAreaView>)
    }
}


export default SplitScreen