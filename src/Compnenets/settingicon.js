import React,{useEffect} from "react";
import { TouchableOpacity,Animated,StyleSheet,Easing } from "react-native";



const SettingsIcon = require("../../assets/Icon/settings.png");


const SettingIcon=(props)=>{

    const spinValue = new Animated.Value(0);
    const startanim=()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 3000,
                    delay: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }),
                  Animated.timing(spinValue, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  })
            ]),
                {
                    iterations: 2
                }
        ).start(()=>{
            startanim()
          });
    }
    useEffect(()=>{
        startanim();
    });

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
    return(
        <TouchableOpacity onPress={()=>props.nav(true)} style={Styles.ImageContanier}>
            <Animated.Image  style={{transform: [{ rotate: spin }],width:"100%",height:"100%",resizeMode:"contain"}} source={SettingsIcon} />
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    ImageContanier:{
        width:"40%",
        height:"40%",
        overflow:"hidden",
        left:"30%",
        position:"relative"
    },
})

export default SettingIcon;