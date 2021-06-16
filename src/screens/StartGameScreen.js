import * as React from "react";
import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import {useState} from "react";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = (inputText) => {
        console.log("INPUT HANDLER ", inputText)
        setEnteredValue(inputText.replace(/[^0-9]/g, ""))
    }

    const resetInputHandler = () => {
        setEnteredValue("")
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue)
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert("Invalid Number", "Number has to be a number between 1 and 99.", [{
                text: "OK",
                style: "destructive",
                onPress: resetInputHandler
            }])
            return
        }
        setConfirmed(true)
        setSelectedNumber(choseNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summary_container}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        )

    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start A new Game</TitleText>
                <Card>
                    <BodyText>Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.button_container}>
                        <View style={styles.button}>
                            <Button title="Reset" color={Colors.ACCENT} onPress={resetInputHandler}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" color={Colors.PRIMARY} onPress={confirmInputHandler}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        fontFamily: 'open-sans-bold'
    },
    button_container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summary_container: {
        marginTop: 20,
        alignItems: "center"
    },
    text: {
        fontFamily: 'open-sans'
    }
})

export default StartGameScreen