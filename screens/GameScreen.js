import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Title from "../ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../ui/PrimaryButton";
import Card from "../ui/Card";
import InstructionText from "../ui/instructionText";
import GuessLogItem from "../components/game/GuessLogItem";


function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxboundary = 100;

function GameScreen ({userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length)
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() =>{
    minBoundary = 1;
    maxboundary = 100;
  }, []);

  function nextGuessHandler(direction) { // direction ==> 'lower', 'greater'
    if (
      (direction  === 'lower' && currentGuess < userNumber ) || 
      (direction  === 'greater' && currentGuess > userNumber )
    ) {
      Alert.alert("Don't lie!", "you know that this is wrong..."
        [{text: 'sorry!', styles: 'cancel'}]
      );
      return;
    }

    if (direction === 'lower') {
      maxboundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    
    const newRandomNumber = generateRandomBetween(minBoundary, maxboundary, currentGuess);
    setCurrentGuess(newRandomNumber);
    setGuessRounds(prevGuessRounds => [newRandomNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (

    <View style={styles.screen}>

      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      
      <Card>
        <InstructionText style={styles.instuctionText}>
          Higher or Lower
        </InstructionText>

        <View style={styles.buttonsContainer}>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color={'white'}/>
            </PrimaryButton>
          </View>
         
         <View style={styles.buttonContainer}>
           <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
           <Ionicons name="md-add" size={24} color={'white'}/>
           </PrimaryButton>
         </View>

        </View> 

      </Card>

      <View style={styles.listContainer}>
       {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)}*/}
       <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>

    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 28, 
  },
  instuctionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: 'row',
  }, 
  buttonContainer:{
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },

});
