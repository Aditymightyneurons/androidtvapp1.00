import React,{useEffect,useState} from "react";
import { View,Text,SafeAreaView,StyleSheet,Dimensions,Image,TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



const LogoImage = require("../../assets/logo/mpd.png");


const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
const AuthScreen=({navigation})=>{
    
    const [token,SetToken]=useState(null);
    const [messege,SetMessege] = useState("");
    const GetTheToken = async()=>{
        try{
            const token  = await AsyncStorage.getItem("token");
            if (token === undefined || token === null) {
                const Resp =await axios.get("https://adityachakrabortydevopsgame.pythonanywhere.com/api/auth/").then((response)=>{
                    console.log(response.data);
                    return response.data;
                })
                SetToken(String(Resp.token));
                await AsyncStorage.setItem("token",String(Resp.token));
            }else{
                return navigation.navigate('Home');
            }

        }catch(e){
            console.log(e);
        }
    };
    console.log(token)
    useEffect(()=>{
        GetTheToken();
    },[])

    const VerifyTheToken=async ()=>{
        try{
          if (token!== undefined && token !== null) {
                const TokenData = {
                "key":token
                };
                const Resp =await axios.post("https://adityachakrabortydevopsgame.pythonanywhere.com/api/auth/",TokenData).then((response)=>{
                    console.log(response.status);
                    return response.data;

                })
                if (Resp.token !== "") {
                    console.log("Tokn is",Resp.token);
                    await AsyncStorage.setItem("token",Resp.token)
                    return navigation.navigate('Home');
                }
                }else{
                    SetMessege("Your Token is not verified us");
                }
        }catch(e){
          console.log(e);
        }
    };
    return(
        <SafeAreaView style={Styles.maincontainer}>
            <View style={Styles.imagecontainer}>
                <Image style={Styles.image} source={LogoImage}></Image>
            </View>
            <View style={Styles.TextContainer}>
                {(messege!=="")?
                <Text style={Styles.TextMenu}>Please Refer this Code Below</Text>:
                <Text style={Styles.TextMenu}>{messege}</Text>}
            </View>
            <View style={Styles.Inputbox}>
                <Text style={{textAlign:"center",fontSize:30}}>{token}</Text>
            </View>
            <TouchableOpacity style={Styles.buttonstyle} onPress={VerifyTheToken}>
                <Text  style={Styles.bottontextstyle}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
    
}

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
    TextContainer:{
        position:"absolute",
        width:Width*0.8,
        height:Height * 0.2,
        left:Width*0.1,
        top:Height*0.5,
        overflow:"hidden",
    },
    TextMenu:{
        textAlign:"center",
        color:"#054353",
        fontSize:30,
        fontWeight:"bold"
    },
    Inputbox:{
        alignItems:"center",
        position:"absolute",
        width:(Width>Height)?Width * 0.4:Width * 0.8,
        left:(Width>Height)?Width*0.3:Width*0.1,
        height:100,
        top:Height * 0.65,
        textAlign:"center",
        borderRadius:10,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"#636363",
        padding:25

    },
    buttonstyle:{
        width:(Width>1248)?Width*0.4:Width*0.8,
        height:(Width>1248)? 180:80,
        position:"absolute",
        top:Height*0.8,
        left:(Width>1248)?Width*0.3:Width*0.1,
        overflow:"hidden",
        padding:(Width>1248)? 30:20,
        backgroundColor:"#0B747C",
        borderRadius:10
    },
    bottontextstyle:{
        fontSize:(Width>1248)? 40:30,
        color:"#ffff",
        fontWeight:"bold",
        textAlign:"center"
    }
})
export default AuthScreen;