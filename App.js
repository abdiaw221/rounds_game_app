import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from './src/components/Header'
import StartGameScreen from "./src/screens/StartGameScreen";
import GameScreen from "./src/screens/GameScreen";
import GameOverScreen from "./src/screens/GameOverScreen";
import * as Font from "expo-font"
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
}

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)
    const [dataLoaded, setDataLoaded] = useState(false)

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        )
    }
    const configureNewGameHandler = () => {
        setGuessRounds(0)
        setUserNumber(null)
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber)
        setGuessRounds(0)
    }

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds)
    }

    let content = <StartGameScreen onStartGame={startGameHandler}/>
    content = <GameOverScreen
        roundsNumber={1}
        userNumber={1}
        onRestart={configureNewGameHandler}
    />
    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
        content =
            <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>
    }
    return (
        <View style={styles.container}>
            <Header title="Guest A Number"/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
