import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "../Screens/Loadingscreen";
import SplitScreen from "../Screens/SplitScreen";
import PostLoadingScreen from "../Screens/PostLoading";
import SettingsScreen from "../Screens/SettingsScreen";
import AuthScreen from "../Screens/AuthScreen";


const Stacknav = createStackNavigator();

function Navigate(){
    return(
        <Stacknav.Navigator>
            <Stacknav.Screen name="Auth" component={AuthScreen} options={({navigation})=>({
                headerShown:false,
            })}>

            </Stacknav.Screen>
            <Stacknav.Screen name="Home" component={LandingScreen} options={({navigation})=>({
                headerShown:false,
            })}>
            </Stacknav.Screen>
            <Stacknav.Screen name="Settings" component={SettingsScreen} options={({navigation})=>({
                headerShown:false
            })}>
            </Stacknav.Screen>
            <Stacknav.Screen name="Split" component={SplitScreen} options={({navigation})=>({
                headerShown:false,
            })}>
            </Stacknav.Screen>
           
        </Stacknav.Navigator>
    )
}

export default Navigate;