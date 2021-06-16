import * as React from "react"
import {StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {

    return (
        <View style={styles.header_container}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header_container: {
        width:'100%',
        height:90,
        paddingTop:36,
        backgroundColor:Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_title: {
        color:'black',
        fontSize:18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header